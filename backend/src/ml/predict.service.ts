import { createInterface } from "readline";
import type { Interface } from "readline";
import { ChildProcessWithoutNullStreams, spawn, spawnSync } from "child_process";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";

interface PredictionResult {
  riskPercentage: number;
  riskLevel: string;
}

interface PendingRequest {
  resolve: (value: PredictionResult) => void;
  reject: (reason?: unknown) => void;
  timeout: NodeJS.Timeout;
}

const PREDICTOR_SCRIPT = fileURLToPath(new URL("../../ml/predict.py", import.meta.url));

function findPythonCommand(): string {
  const candidates = process.platform === "win32" ? ["py", "python"] : ["python3", "python"];

  for (const candidate of candidates) {
    try {
      const result = spawnSync(candidate, ["--version"], { encoding: "utf8" });
      if (result.status === 0) {
        return candidate;
      }
    } catch {
      // ignore failures and try the next candidate
    }
  }

  throw new Error("Python executable not found. Install Python and ensure 'python' or 'py' is available in PATH.");
}

class PythonPredictionServer {
  private process?: ChildProcessWithoutNullStreams;
  private pending = new Map<string, PendingRequest>();
  private lineReader?: Interface;

  private get isReady(): boolean {
    return Boolean(this.process && !this.process.killed);
  }

  private startProcess(): void {
    const python = findPythonCommand();
    const child = spawn(python, [PREDICTOR_SCRIPT, "--server"], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    this.process = child;
    this.lineReader = createInterface({ input: child.stdout });

    this.lineReader.on("line", (line: string) => {
      try {
        const message = JSON.parse(line);
        const requestId = String(message.id ?? "");
        const pending = this.pending.get(requestId);
        if (!pending) {
          return;
        }

        clearTimeout(pending.timeout);
        this.pending.delete(requestId);

        if (message.error) {
          pending.reject(new Error(String(message.error)));
          return;
        }

        pending.resolve(message.result as PredictionResult);
      } catch (error) {
        // ignore invalid lines or parsing failures
      }
    });

    child.stderr.on("data", (chunk) => {
      const message = chunk.toString("utf8");
      console.error("Python prediction stderr:", message);
    });

    child.on("exit", (code, signal) => {
      const error = new Error(`Python prediction process exited with code=${code} signal=${signal}`);
      this.rejectAll(error);
      this.process = undefined;
    });

    child.on("error", (error) => {
      this.rejectAll(error);
      this.process = undefined;
    });
  }

  private ensureProcess(): void {
    if (!this.isReady) {
      this.startProcess();
    }
  }

  private rejectAll(error: Error) {
    for (const pending of this.pending.values()) {
      clearTimeout(pending.timeout);
      pending.reject(error);
    }
    this.pending.clear();
  }

  public async request(command: "heart" | "diabetes", data: Record<string, unknown>): Promise<PredictionResult> {
    this.ensureProcess();

    if (!this.process) {
      throw new Error("Prediction process could not be started.");
    }

    const requestId = randomUUID();
    return new Promise<PredictionResult>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(requestId);
        reject(new Error("Prediction request timed out."));
      }, 10000);

      this.pending.set(requestId, { resolve, reject, timeout });
      const payload = JSON.stringify({ id: requestId, command, data });
      this.process!.stdin.write(`${payload}\n`, "utf8", (error) => {
        if (error) {
          clearTimeout(timeout);
          this.pending.delete(requestId);
          reject(error);
        }
      });
    });
  }
}

const predictionServer = new PythonPredictionServer();

export async function predictHeart(data: Record<string, unknown>): Promise<PredictionResult> {
  return predictionServer.request("heart", data);
}

export async function predictDiabetes(data: Record<string, unknown>): Promise<PredictionResult> {
  return predictionServer.request("diabetes", data);
}

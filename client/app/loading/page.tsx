"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";

const tips = [
  "Checking lifestyle factors",
  "Calculating health score",
  "Estimating disease risk",
  "Preparing recommendations",
];

export default function Page() {
  const router = useRouter();
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const tipInterval = window.setInterval(() => {
      setTipIndex((index) => (index + 1) % tips.length);
    }, 1000);

    const timeout = window.setTimeout(() => {
      router.replace("/report");
    }, 2500);

    return () => {
      window.clearInterval(tipInterval);
      window.clearTimeout(timeout);
    };
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white/95 p-10 shadow-[0_35px_80px_-35px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:p-12"
      >
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-100">
            <HeartPulse className="h-10 w-10 animate-pulse" />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Analyzing Your Health...
            </h1>
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              Our AI is evaluating your responses.
            </p>
          </div>

          <div className="mt-8 w-full">
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-emerald-600"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
              />
            </div>
          </div>

          <motion.div
            key={tipIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-8 rounded-3xl bg-slate-50 p-5 text-sm font-medium text-slate-700 shadow-sm shadow-slate-100"
          >
            • {tips[tipIndex]}
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}

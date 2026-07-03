"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const validate = () => {
    const nextErrors = { name: "", email: "", password: "" };
    if (!name.trim()) nextErrors.name = "Name is required.";
    if (!email.trim()) nextErrors.email = "Email is required.";
    if (!password) nextErrors.password = "Password is required.";
    setErrors(nextErrors);
    return !nextErrors.name && !nextErrors.email && !nextErrors.password;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    if (!validate()) {
      setMessageType("error");
      setMessage("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await authService.register({ name, email, password });
      setMessageType("success");
      setMessage("Account created successfully");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: any) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to create account.";
      setMessageType("error");
      setMessage(backendMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 sm:px-8">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-xl shadow-slate-200/50 sm:p-10">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600">Create your account</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950">Register with VitalSense AI</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Enter your details to create a new account and get started with your health assessments.
          </p>
        </div>

        {message && (
          <div
            className={`mb-6 rounded-2xl px-4 py-3 text-sm ${messageType === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
              }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-2 w-full rounded-3xl border px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${errors.name ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"
                }`}
            />
            {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-2 w-full rounded-3xl border px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${errors.email ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"
                }`}
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-2 w-full rounded-3xl border px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${errors.password ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"
                }`}
            />
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-3xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
}

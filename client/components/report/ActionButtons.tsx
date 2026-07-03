"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";

export default function ActionButtons() {
  const router = useRouter();

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-700">
            <ArrowLeft className="h-4 w-4 text-emerald-600" />
            Action Buttons
          </div>
          <p className="mt-3 text-sm text-slate-500">Quick actions to continue your health journey.</p>
          <div className="h-px w-16 rounded-full bg-slate-200" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            type="button"
            onClick={() => router.push("/assessment")}
          >
            <ArrowLeft className="h-5 w-5" />
            Start New Assessment
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-950 transition duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            type="button"
            onClick={() => window.alert("Coming Soon")}
          >
            <Download className="h-5 w-5" />
            Export Report
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { Play, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function QuickActions() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push('/assessment')}
        className="inline-flex items-center gap-3 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow"
      >
        <Play className="h-4 w-4" />
        Start New Assessment
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push('/report')}
        className="inline-flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700"
      >
        <FileText className="h-4 w-4 text-slate-600" />
        View Report
      </motion.button>
    </div>
  );
}

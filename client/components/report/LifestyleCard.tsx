"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface LifestyleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function LifestyleCard({ icon: Icon, title, description }: LifestyleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: "0 14px 40px rgba(15,23,42,0.08)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/30"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
    </motion.article>
  );
}

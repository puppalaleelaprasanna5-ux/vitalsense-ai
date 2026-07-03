"use client";

import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const score = 84;
const circumference = 2 * Math.PI * 54;
const dashOffset = circumference * (1 - score / 100);

export default function HealthScoreCard() {
  const progress = useMotionValue(0);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const controls = animate(progress, score, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate(value) {
        setDisplayScore(Math.round(value));
      },
    });

    return () => controls.stop();
  }, [progress]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.12)]"
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-slate-50">
          <svg className="h-full w-full" viewBox="0 0 124 124" role="img" aria-label="Health score progress">
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            <circle cx="62" cy="62" r="54" className="fill-transparent stroke-slate-200 stroke-[12]" />
            <motion.circle
              cx="62"
              cy="62"
              r="54"
              className="fill-transparent stroke-[12] stroke-linecap-round"
              stroke="url(#scoreGradient)"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">            <div className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">{displayScore}</div>
            <div className="mt-1 text-sm uppercase tracking-[0.3em] text-slate-500">Score</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xl font-semibold text-slate-900">Health Score</div>
          <div className="text-sm text-slate-500">{score} / 100</div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <span aria-hidden="true">🟢</span>
            Excellent
          </div>
        </div>
      </div>
    </motion.section>
  );
}

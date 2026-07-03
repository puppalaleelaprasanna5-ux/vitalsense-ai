"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  Sparkles,
  Activity,
  Droplet,
  Bed,
  HeartPulse,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface Risk {
  id: string;
  title: string;
  value: string;
  Icon: IconType;
}

interface Recommendation {
  id: string;
  title: string;
  subtitle: string;
  Icon: IconType;
}

const risks: Risk[] = [
  { id: "heart", title: "Heart Risk", value: "18%", Icon: HeartPulse },
  { id: "diabetes", title: "Diabetes Risk", value: "12%", Icon: BarChart3 },
];

const recommendations: Recommendation[] = [
  { id: "exercise", title: "Exercise", subtitle: "Daily movement goals", Icon: Activity },
  { id: "water", title: "Water Intake", subtitle: "Stay hydrated all day", Icon: Droplet },
  { id: "sleep", title: "Sleep", subtitle: "Improve nightly recovery", Icon: Bed },
];

const riskCardClasses =
  "flex items-center justify-between rounded-2xl bg-white px-4 py-4 shadow-sm shadow-slate-200/70";

const recCardClasses =
  "flex items-center gap-4 rounded-3xl bg-white px-4 py-4 shadow-sm shadow-slate-200/70";

function RiskCard({ risk }: { risk: Risk }) {
  const { title, value, Icon } = risk;
  return (
    <div className={riskCardClasses} key={risk.id}>
      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="mt-1 text-xl font-semibold text-slate-950">{value}</p>
      </div>
      <Icon className="h-6 w-6 text-emerald-600" />
    </div>
  );
}

function RecCard({ item }: { item: Recommendation }) {
  const { title, subtitle, Icon } = item;
  return (
    <div className={recCardClasses} key={item.id}>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-20 xl:px-12"
    >
      <div className="max-w-2xl space-y-8 lg:max-w-xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 px-4 py-2 text-sm font-medium text-emerald-900 shadow-sm shadow-emerald-200/50">
          <Sparkles className="h-4 w-4 text-emerald-600" />
          AI-Powered Health Assessment
        </div>

        <div className="space-y-6">
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Understand Your Health Before Problems Begin.
          </h1>
          <p className="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            VitalSense AI connects cutting-edge health analytics with simple daily insights, empowering you to act early and maintain a strong, balanced lifestyle.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <button className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
            Start Free Assessment
          </button>
          <button className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
            Learn More
          </button>
        </div>
      </div>

      <div className="relative flex justify-center lg:justify-end">
        <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_35px_80px_-35px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:p-10">
          <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-950/95 px-5 py-5 text-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.4)]">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Health Score</p>
              <p className="mt-2 text-5xl font-semibold tracking-tight text-emerald-300">82</p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
              <ShieldCheck className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-8 grid gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            {risks.map((r) => (
              <RiskCard key={r.id} risk={r} />
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {recommendations.map((rec) => (
              <RecCard key={rec.id} item={rec} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

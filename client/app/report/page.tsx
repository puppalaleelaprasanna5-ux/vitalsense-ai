"use client";

import { Activity, HeartPulse, Droplet, Leaf, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ActionButtons from "@/components/report/ActionButtons";
import DiseaseRiskCard from "@/components/report/DiseaseRiskCard";
import Footer from "@/components/report/Footer";
import HealthFactors from "@/components/report/HealthFactors";
import HealthScoreCard from "@/components/report/HealthScoreCard";
import LifestyleCard from "@/components/report/LifestyleCard";
import OverallHealthCard from "@/components/report/OverallHealthCard";
import ReportNavbar from "@/components/report/ReportNavbar";

export default function Page() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("assessmentAnswers");
    if (!stored) {
      router.replace("/");
      return;
    }

    try {
      JSON.parse(stored);
      setIsAuthorized(true);
    } catch {
      router.replace("/");
    }
  }, [router]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 xl:px-12">
      <ReportNavbar />
      <div className="mx-auto w-full max-w-7xl space-y-12 pt-8 sm:pt-10 lg:pt-14">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Health Assessment Report
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Personalized insights based on your assessment.
          </p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          className="grid gap-8 xl:grid-cols-[0.9fr_1.4fr]"
        >
          <HealthScoreCard />
          <OverallHealthCard />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
                  <HeartPulse className="h-4 w-4" />
                  Disease Risk Analysis
                </div>
                <p className="mt-3 text-sm text-slate-500">Track key risk areas with clear percentages and risk status.</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <DiseaseRiskCard
                title="Heart Disease"
                risk={18}
                status="Low Risk"
                color="bg-emerald-600"
                icon={HeartPulse}
              />
              <DiseaseRiskCard
                title="Diabetes"
                risk={12}
                status="Very Low Risk"
                color="bg-emerald-600"
                icon={Activity}
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/40"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">
                  <Droplet className="h-4 w-4 text-emerald-600" />
                  Lifestyle Recommendations
                </div>
                <p className="mt-3 text-sm text-slate-500">Small habits that deliver better daily health outcomes.</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <LifestyleCard
                icon={Leaf}
                title="Diet"
                description="Eat a balanced diet rich in vegetables and whole grains."
              />
              <LifestyleCard
                icon={Activity}
                title="Exercise"
                description="Walk or exercise for at least 30 minutes daily."
              />
              <LifestyleCard
                icon={Droplet}
                title="Water"
                description="Drink 2.5–3 liters of water every day."
              />
              <LifestyleCard
                icon={Moon}
                title="Sleep"
                description="Maintain 7–8 hours of quality sleep."
              />
            </div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <HealthFactors />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
        >
          <ActionButtons />
        </motion.div>

        <Footer />
      </div>
    </main>
  );
}

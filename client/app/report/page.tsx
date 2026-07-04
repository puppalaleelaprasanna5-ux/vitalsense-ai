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

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import dashboardService from "../../services/dashboard.service";

function riskStatusFromScore(score?: number) {
  if (typeof score !== "number") return { label: "Unknown", color: "bg-slate-200 text-slate-700" };
  if (score >= 80) return { label: "Low Risk", color: "bg-emerald-100 text-emerald-700" };
  if (score >= 50) return { label: "Moderate Risk", color: "bg-amber-100 text-amber-700" };
  return { label: "High Risk", color: "bg-red-100 text-red-700" };
}

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    async function loadAssessment() {
      setLoading(true);
      setError(null);
      try {
        const res = await dashboardService.getAssessmentHistory();
        const items = res?.assessments ?? [];
        items.sort((a: any, b: any) => (new Date(b.createdAt).getTime() || 0) - (new Date(a.createdAt).getTime() || 0));
        if (!mounted) return;
        setAssessment(items[0] ?? null);
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.response?.data?.message || err?.message || "Unable to load assessment report.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadAssessment();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-7xl space-y-6 py-10">
          <div className="h-24 rounded-xl bg-white p-6 shadow-sm animate-pulse" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="h-28 rounded-xl bg-white p-6 shadow-sm animate-pulse" />
            <div className="h-28 rounded-xl bg-white p-6 shadow-sm animate-pulse" />
            <div className="h-28 rounded-xl bg-white p-6 shadow-sm animate-pulse" />
            <div className="h-28 rounded-xl bg-white p-6 shadow-sm animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl bg-red-50 p-6">
            <h3 className="text-lg font-semibold text-red-700">Unable to load assessment report.</h3>
            <p className="mt-2 text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <ProtectedRoute>
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 xl:px-12">
          <div className="mx-auto w-full max-w-4xl rounded-xl bg-white p-6 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900">No assessment available</h1>
            <p className="mt-4 text-sm text-slate-600">Start an assessment to generate your personalized health report.</p>
            <button onClick={() => router.push('/assessment')} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow">
              Start Assessment
            </button>
          </div>
        </main>
      </ProtectedRoute>
    );
  }

  const status = riskStatusFromScore(assessment.healthScore);

  return (
    <ProtectedRoute>
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
            <HealthScoreCard score={assessment.healthScore} />
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
                  risk={assessment.heartRisk ?? 0}
                  status={assessment.heartRisk >= 50 ? "High Risk" : assessment.heartRisk >= 25 ? "Moderate Risk" : "Low Risk"}
                  color="bg-emerald-600"
                  icon={HeartPulse}
                />
                <DiseaseRiskCard
                  title="Diabetes"
                  risk={assessment.diabetesRisk ?? 0}
                  status={assessment.diabetesRisk >= 50 ? "High Risk" : assessment.diabetesRisk >= 25 ? "Moderate Risk" : "Low Risk"}
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
    </ProtectedRoute>
  );
}

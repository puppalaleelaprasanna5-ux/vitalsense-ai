"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dashboardService from "../../services/dashboard.service";

function riskStatusFromScore(score?: number) {
  if (typeof score !== "number") return { label: "Unknown", color: "bg-slate-200 text-slate-700" };
  if (score >= 80) return { label: "Low Risk", color: "bg-emerald-100 text-emerald-700" };
  if (score >= 50) return { label: "Moderate Risk", color: "bg-amber-100 text-amber-700" };
  return { label: "High Risk", color: "bg-red-100 text-red-700" };
}

export default function HistoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assessments, setAssessments] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await dashboardService.getAssessmentHistory();
        const items = res?.assessments ?? [];
        // Ensure newest first
        items.sort((a: any, b: any) => (new Date(b.createdAt).getTime() || 0) - (new Date(a.createdAt).getTime() || 0));
        if (!mounted) return;
        setAssessments(items);
      } catch (err: any) {
        setError(err?.response?.data?.message || err?.message || "Unable to load assessment history.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 rounded-xl bg-white p-4 shadow-sm" />
              </div>
            ))}
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
            <h3 className="text-lg font-semibold text-red-700">Unable to load assessment history.</h3>
            <p className="mt-2 text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Assessment History</h1>

        {assessments.length === 0 ? (
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="mb-4 text-lg font-semibold text-slate-900">No assessments found</p>
            <p className="mb-6 text-sm text-slate-600">Take your first assessment to see personalized insights.</p>
            <button onClick={() => router.push('/assessment')} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow">
              Take Your First Assessment
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {assessments.map((a: any, idx: number) => {
              const date = a.createdAt ? new Date(a.createdAt).toLocaleString() : '—';
              const status = riskStatusFromScore(a.healthScore);
              return (
                <motion.div
                  key={a.id ?? idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="flex flex-col rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Assessment Date</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">{date}</p>
                      </div>

                      <div className="ml-6 hidden sm:block">
                        <p className="text-sm font-medium text-slate-500">Status</p>
                        <span className={`mt-1 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${status.color}`}>{status.label}</span>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Health Score</p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">{a.healthScore ?? '—'}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-500">Heart Risk</p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">{a.heartRisk ?? '—'}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-500">Diabetes Risk</p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">{a.diabetesRisk ?? '—'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3 sm:mt-0 sm:ml-6">
                    <button onClick={() => router.push('/report')} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow">
                      View Report
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

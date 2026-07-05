"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/dashboard/Sidebar";
import TopNav from "../../components/dashboard/TopNav";
import HealthCard from "../../components/dashboard/HealthCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentAssessments from "../../components/dashboard/RecentAssessments";
import AppNavbar from "../../components/layout/AppNavbar";
import dashboardService from "../../services/dashboard.service";


export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("User");
  const [assessments, setAssessments] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const userRes = await dashboardService.getCurrentUser();
        const historyRes = await dashboardService.getAssessmentHistory();

        if (!mounted) return;

        setUserName(userRes?.user?.name ?? userRes?.name ?? "User");
        setAssessments(historyRes?.assessments ?? []);
      } catch (err: any) {
        setError(err?.response?.data?.message || err?.message || "Unable to load dashboard.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const latest = assessments?.[0];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1280px] px-5 py-4">        <div className="flex">
        <Sidebar />

        <main className="flex-1">
          <AppNavbar currentUserName={userName} />
          <TopNav userName={userName} />

          {loading ? (
            <div className="space-y-6">
              <div className="h-32 rounded-xl bg-white p-6 shadow-sm animate-pulse" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                <div className="h-28 rounded-xl bg-white p-6 shadow-sm animate-pulse" />
                <div className="h-28 rounded-xl bg-white p-6 shadow-sm animate-pulse" />
                <div className="h-28 rounded-xl bg-white p-6 shadow-sm animate-pulse" />
                <div className="h-28 rounded-xl bg-white p-6 shadow-sm animate-pulse" />
              </div>
            </div>
          ) : error ? (
            <div className="rounded-xl bg-red-50 p-6">
              <h3 className="text-lg font-semibold text-red-700">Unable to load dashboard.</h3>
              <p className="mt-2 text-sm text-red-600">{error}</p>
            </div>
          ) : (
            <section className="grid gap-6 xl:grid-cols-4">
              <div className="xl:col-span-3">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
                  <HealthCard title="Overall Health Score" value={latest?.healthScore ?? '—'} subtitle="Wellness index" />
                  <HealthCard title="Heart Risk" value={latest?.heartRisk ? `${latest.heartRisk}%` : '—'} subtitle="Estimated risk" />
                  <HealthCard title="Diabetes Risk" value={latest?.diabetesRisk ? `${latest.diabetesRisk}%` : '—'} subtitle="Estimated risk" />
                  <HealthCard title="Last Assessment" value={latest?.createdAt ? new Date(latest.createdAt).toLocaleDateString() : 'No assessments yet'} subtitle="Most recent" />
                </div>

                <div className="mt-5 rounded-xl bg-transparent p-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
                  </div>

                  <div className="mt-4">
                    <QuickActions />
                  </div>
                </div>

                {assessments && assessments.length > 0 ? (
                  <RecentAssessments assessments={assessments} />
                ) : (
                  <div className="mt-6 rounded-xl bg-white p-6 text-center">
                    <p className="mb-4 text-lg font-semibold text-slate-900">No assessments yet</p>
                    <p className="mb-6 text-sm text-slate-600">Start your first assessment to see personalized insights.</p>
                    <button onClick={() => router.push('/assessment')} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow">
                      Start Your First Assessment
                    </button>
                  </div>
                )}
              </div>

              <aside className="mt-6 lg:mt-0">
                <div className="sticky top-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h4 className="text-base font-semibold text-slate-800">Summary</h4>
                  <p className="mt-3 leading-6 text-sm text-slate-600">A concise view of your recent health metrics and quick actions to get started.</p>
                </div>
              </aside>
            </section>
          )}
        </main>
      </div>
      </div>
    </div>
  );
}

import Sidebar from "../../components/dashboard/Sidebar";
import TopNav from "../../components/dashboard/TopNav";
import HealthCard from "../../components/dashboard/HealthCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentAssessments from "../../components/dashboard/RecentAssessments";

export const revalidate = 0;

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="flex">
          <Sidebar />

          <main className="flex-1">
            <TopNav userName={"Alex Morgan"} />

            <section className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  <HealthCard title="Overall Health Score" value={84} subtitle="Wellness index" />
                  <HealthCard title="Heart Risk" value={`18%`} subtitle="Estimated risk" />
                  <HealthCard title="Diabetes Risk" value={`12%`} subtitle="Estimated risk" />
                  <HealthCard title="Last Assessment" value={'Today'} subtitle="Most recent" />
                </div>

                <div className="mt-6 rounded-xl bg-transparent p-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
                  </div>

                  <div className="mt-4">
                    <QuickActions />
                  </div>
                </div>

                <RecentAssessments />
              </div>

              <aside className="mt-6 lg:mt-0">
                <div className="sticky top-6 rounded-xl bg-white p-6 shadow-sm">
                  <h4 className="text-sm font-semibold text-slate-700">Summary</h4>
                  <p className="mt-3 text-sm text-slate-600">A concise view of your recent health metrics and quick actions to get started.</p>
                </div>
              </aside>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

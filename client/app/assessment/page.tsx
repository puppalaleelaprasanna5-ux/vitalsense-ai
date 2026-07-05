import AssessmentWizard from "@/components/assessment/AssessmentWizard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppNavbar from "@/components/layout/AppNavbar";

export default function Page() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 py-4 sm:py-5">        <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
        <AppNavbar />
      </div>
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-6">
          <div className="w-full max-w-4xl">
            <AssessmentWizard />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
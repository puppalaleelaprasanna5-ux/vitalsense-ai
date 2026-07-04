import AssessmentWizard from "@/components/assessment/AssessmentWizard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppNavbar from "@/components/layout/AppNavbar";

export default function Page() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 py-6 sm:py-10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <AppNavbar />
        </div>
        <div className="flex min-h-full items-start justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-3xl">
            <AssessmentWizard />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
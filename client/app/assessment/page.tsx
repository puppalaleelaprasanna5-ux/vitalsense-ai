import AssessmentWizard from "@/components/assessment/AssessmentWizard";

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="flex min-h-full items-start justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl">
          <AssessmentWizard />
        </div>
      </div>
    </main>
  );
}
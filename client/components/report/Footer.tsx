"use client";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/95 px-6 py-8 text-sm text-slate-500 sm:px-8">
      <div className="mx-auto max-w-7xl space-y-6 text-center">
        <div className="mx-auto h-px max-w-2xl bg-slate-200" />
        <p className="text-slate-700 font-semibold">VitalSense AI © 2026</p>
        <p className="max-w-2xl mx-auto leading-7 text-slate-500">
          This assessment provides educational insights only and is not a substitute for professional medical advice.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500">
          <button type="button" className="transition hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-white">
            Privacy
          </button>
          <span>•</span>
          <button type="button" className="transition hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-white">
            Terms
          </button>
          <span>•</span>
          <button type="button" className="transition hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-white">
            Contact
          </button>
        </div>
        <div className="mx-auto h-px max-w-2xl bg-slate-200" />
      </div>
    </footer>
  );
}

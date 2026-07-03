"use client";

interface NavigationButtonsProps {
  onPrev: () => void;
  onNext: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  finishLabel?: string;
}

export default function NavigationButtons({ onPrev, onNext, disablePrev = false, disableNext = false, finishLabel = "Finish" }: NavigationButtonsProps) {
  return (
    <div className="mt-6 flex w-full items-center justify-between gap-4">
      <button
        type="button"
        onClick={onPrev}
        disabled={disablePrev}
        className={`inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-medium transition ${disablePrev ? "border-slate-200 text-slate-400 bg-white" : "border-slate-300 text-slate-700 bg-white hover:shadow-sm"
          }`}
      >
        Previous
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={disableNext}
        className={`inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition ${disableNext ? "opacity-60 pointer-events-none bg-emerald-600" : "hover:bg-emerald-700"
          }`}
      >
        {finishLabel}
      </button>
    </div>
  );
}

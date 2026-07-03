"use client";

interface OptionCardProps {
  id: string;
  text: string;
  subtitle?: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function OptionCard({ id, text, subtitle, selected, onSelect }: OptionCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(id)}
      className={`w-full text-left transition-shadow duration-150 ${selected ? "bg-emerald-50 border-emerald-200 shadow-md" : "bg-white border-slate-200 hover:shadow-sm"} rounded-2xl border px-4 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-slate-900">{text}</div>
          {subtitle && <div className="mt-1 text-xs text-slate-500">{subtitle}</div>}
        </div>

        <div
          className={`ml-3 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors ${selected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"
            }`}
        >
          {selected ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="h-2 w-2 rounded-full bg-slate-300" />
          )}
        </div>
      </div>
    </button>
  );
}
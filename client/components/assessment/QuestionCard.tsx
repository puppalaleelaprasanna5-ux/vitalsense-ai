"use client";

import OptionCard from "./OptionCard";

interface Option {
  id: string;
  text: string;
  subtitle?: string;
}

interface QuestionPayload {
  id: string;
  text: string;
  description?: string;
  options: Option[];
}

interface QuestionCardProps {
  index: number;
  total: number;
  question: QuestionPayload;
  selectedOption?: string | null;
  onSelect: (optionId: string) => void;
}

export default function QuestionCard({ index, total, question, selectedOption, onSelect, }: QuestionCardProps) {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold leading-tight text-slate-900">{question.text}</h2>
        {question.description && <p className="mt-2 text-sm text-slate-500">{question.description}</p>}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((opt) => (
          <OptionCard
            key={opt.id}
            id={opt.id}
            text={opt.text}
            subtitle={opt.subtitle}
            selected={selectedOption === opt.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
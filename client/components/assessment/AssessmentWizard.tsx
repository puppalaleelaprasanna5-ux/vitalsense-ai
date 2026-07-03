"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import NavigationButtons from "./NavigationButtons";
import { assessmentQuestions } from "../../constants/assessment";

type AnswersRecord = Record<string, string | number>;

export default function AssessmentWizard(): JSX.Element {
  const questions = useMemo(() => assessmentQuestions, []);
  const total = questions.length;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswersRecord>(() => {
    const initial: AnswersRecord = {};
    questions.forEach((q) => (initial[q.id] = ""));
    return initial;
  });

  const current = questions[currentIndex];

  function isAnswered(qId: string): boolean {
    const val = answers[qId];
    return val !== "" && val !== null && val !== undefined;
  }

  function handleChoiceSelect(optionId: string) {
    setAnswers((prev) => ({ ...prev, [current.id]: optionId }));
  }

  function handleNumberChange(value: string) {
    const parsed = value === "" ? "" : Number(value);
    setAnswers((prev) => ({ ...prev, [current.id]: parsed }));
  }

  function goPrev() {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }

  function goNext() {
    const last = currentIndex === total - 1;
    if (!last) {
      setCurrentIndex((i) => Math.min(total - 1, i + 1));
      return;
    }

    // Finish
    // eslint-disable-next-line no-console
    console.log("Assessment Answers:", answers);
  }

  const isCurrentRequired = current.required ?? false;
  const disableNext = isCurrentRequired && !isAnswered(current.id);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col px-6 py-12 sm:px-8">
      <div className="mx-auto w-full rounded-2xl bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">VitalSense AI</h3>
        </div>

        <div className="mb-5">
          <ProgressBar current={currentIndex} total={total} />
        </div>

        <div className="mb-4 text-sm text-slate-500">Question {currentIndex + 1} of {total}</div>

        <div className="min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              {current.type === "choice" ? (
                <QuestionCard
                  key={current.id}
                  index={currentIndex}
                  total={total}
                  question={{ id: current.id, text: current.title, options: (current.options ?? []).map((o) => ({ id: o.id, text: o.label })) }}
                  selectedOption={typeof answers[current.id] === "string" ? (answers[current.id] as string) : ""}
                  onSelect={handleChoiceSelect}
                />
              ) : (
                <div className="w-full">
                  <div className="mb-4">
                    <h2 className="text-2xl font-semibold text-slate-900">{current.title}</h2>
                    {current.description && <p className="mt-2 text-sm text-slate-500">{current.description}</p>}
                  </div>

                  <div className="mt-6 max-w-sm">
                    <input
                      inputMode="numeric"
                      value={answers[current.id] === "" ? "" : String(answers[current.id])}
                      onChange={(e) => handleNumberChange(e.target.value)}
                      placeholder={current.placeholder ?? ""}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-lg placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <NavigationButtons
          onPrev={goPrev}
          onNext={goNext}
          disablePrev={currentIndex === 0}
          disableNext={disableNext}
          finishLabel={currentIndex === total - 1 ? "Finish" : "Next"}
        />
      </div>
    </div>
  );
}

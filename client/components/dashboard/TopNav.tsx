"use client";

import { User } from "lucide-react";
import { useEffect, useState } from "react";

export default function TopNav({ userName = "User" }: { userName?: string }) {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "short",
        day: "numeric",
      })
    );
  }, []);

  return (
    <header className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Welcome back,
        </h2>

        <p className="text-2xl font-bold tracking-tight text-slate-900">
          {userName}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {today}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-3 rounded-full bg-slate-50 px-3 py-1 text-sm text-slate-700 sm:flex">
          <User className="h-5 w-5 text-slate-600" />
          <span className="font-medium">{userName}</span>
        </div>
      </div>
    </header>
  );
}
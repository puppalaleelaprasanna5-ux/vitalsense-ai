"use client";

import { User } from "lucide-react";
import { useEffect, useState } from "react";

export default function TopNav({
  userName = "User",
}: {
  userName?: string;
}) {
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
    <header className="mb-2 flex items-center justify-between">
      <div>
        <h2 className="text-[34px] font-bold tracking-tight text-slate-900">
          Welcome back,{" "}
          <span className="text-emerald-600">{userName}</span>
        </h2>

        <p className="mt-0.5 text-sm text-slate-500">
          {today}
        </p>
      </div>

      <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm md:flex">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
          <User className="h-4 w-4 text-emerald-600" />
        </div>

        <div>
          <p className="text-[11px] text-slate-500">
            Logged in as
          </p>

          <p className="text-sm font-semibold text-slate-900">
            {userName}
          </p>
        </div>
      </div>
    </header>
  );
}
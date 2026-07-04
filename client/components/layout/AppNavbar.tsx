"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import authService from "@/services/auth.service";

interface AppNavbarProps {
  currentUserName?: string;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/history", label: "History" },
  { href: "/report", label: "Report" },
];

export default function AppNavbar({ currentUserName }: AppNavbarProps) {
  const pathname = usePathname();
  const [userName, setUserName] = useState(currentUserName ?? "User");

  useEffect(() => {
    if (currentUserName) {
      setUserName(currentUserName);
      return;
    }

    async function loadUserName() {
      try {
        const res = await authService.getCurrentUser();
        const nextName = res?.user?.name ?? res?.name ?? "User";
        setUserName(nextName);
      } catch {
        setUserName("User");
      }
    }

    loadUserName();
  }, [currentUserName]);

  return (
    <nav className="mb-6 rounded-2xl border border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Link href="/dashboard" className="text-lg font-semibold tracking-tight text-slate-900">
            VitalSense AI
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${isActive
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="text-sm font-medium text-slate-700">{userName}</div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

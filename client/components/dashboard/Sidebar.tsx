"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Activity, FileText, User, LogOut } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:gap-6 lg:py-8 lg:px-6">
      <div className="flex h-full flex-col justify-between">
        <nav className="space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Home className="h-5 w-5 text-emerald-600" />
            Dashboard
          </Link>

          <Link href="/assessment" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Activity className="h-5 w-5 text-slate-500" />
            Assessment
          </Link>

          <Link href="/history" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <FileText className="h-5 w-5 text-slate-500" />
            History
          </Link>
        </nav>

        <nav className="space-y-1">
          <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <User className="h-5 w-5 text-slate-500" />
            Profile
          </Link>

          <Link href="#" onClick={handleLogout} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <LogOut className="h-5 w-5 text-red-500" />
            Logout
          </Link>
        </nav>
      </div>
    </aside>
  );
}

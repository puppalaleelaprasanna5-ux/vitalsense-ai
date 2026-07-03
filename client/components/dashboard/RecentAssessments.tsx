"use client";

import { motion } from "framer-motion";

type AssessmentItem = {
  id: string;
  createdAt?: string;
  healthScore?: number;
  heartRisk?: number | string;
  diabetesRisk?: number | string;
};

export default function RecentAssessments({ assessments }: { assessments?: AssessmentItem[] }) {
  const rows = assessments && assessments.length > 0
    ? assessments
    : [
      { id: '1', createdAt: 'Today', healthScore: 84, heartRisk: '18%', diabetesRisk: '12%' },
    ];

  return (
    <div className="mt-6">
      <h3 className="mb-4 text-sm font-semibold text-slate-700">Recent Assessments</h3>

      <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
        <table className="w-full table-fixed">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Health Score</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Heart Risk</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              const date = row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '—';
              const heart = typeof row.heartRisk === 'number' ? `${row.heartRisk}%` : row.heartRisk ?? '—';
              return (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-4 py-4 text-sm text-slate-700">{date}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-slate-900">{row.healthScore ?? '—'}</td>
                  <td className="px-4 py-4 text-sm text-slate-700">{heart}</td>
                  <td className="px-4 py-4 text-sm text-slate-700">Complete</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

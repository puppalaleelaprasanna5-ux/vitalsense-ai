"use client";

import { motion } from "framer-motion";

const sample = [
  { id: '1', date: 'Today', health: 84, heart: '18%', status: 'Complete' },
  { id: '2', date: '2026-06-28', health: 75, heart: '22%', status: 'Complete' },
  { id: '3', date: '2026-06-10', health: 69, heart: '30%', status: 'Needs Review' },
];

export default function RecentAssessments() {
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
            {sample.map((row, idx) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-4 py-4 text-sm text-slate-700">{row.date}</td>
                <td className="px-4 py-4 text-sm font-semibold text-slate-900">{row.health}</td>
                <td className="px-4 py-4 text-sm text-slate-700">{row.heart}</td>
                <td className="px-4 py-4 text-sm text-slate-700">{row.status}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

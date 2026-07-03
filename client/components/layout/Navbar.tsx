export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">❤️</span>
          <h1 className="text-xl font-bold text-gray-900">
            VitalSense AI
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-gray-700 transition hover:text-emerald-600">
            Sign In
          </button>

          <button className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
            Start Assessment
          </button>
        </div>
      </div>
    </nav>
  );
}
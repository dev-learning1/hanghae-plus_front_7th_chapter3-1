export const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-white"
            style={{ backgroundColor: "#007bff" }}
          >
            L
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none text-slate-900">Hanghae Company</h1>
            <p className="mt-0.5 text-[11px] leading-none text-slate-500">
              Design System Migration Project
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-semibold text-slate-900">Demo User</div>
            <div className="text-xs text-slate-500">demo@example.com</div>
          </div>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full font-semibold text-sky-600"
            style={{ backgroundColor: "#e3f2fd" }}
          >
            DU
          </div>
        </div>
      </div>
    </header>
  );
};


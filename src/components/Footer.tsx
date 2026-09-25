export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-[#121418] py-6 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/logo.png"
            alt="FitLog Logo"
            className="w-6 h-6 object-contain"
          />
          <span className="text-white font-black tracking-widest text-sm">
            FITLOG
          </span>
        </div>

        <p className="text-zinc-500 text-xs font-medium">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
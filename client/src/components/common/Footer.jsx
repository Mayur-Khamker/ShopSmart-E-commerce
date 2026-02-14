export default function Footer() {
  return (
    <footer className="mt-14 border-t border-white/10 bg-[#0b1220]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-semibold text-white">ShopSmart</p>
            <p className="mt-1 text-sm text-white/60">
            </p>
          </div>

          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} 
          </div>
        </div>
      </div>
    </footer>
  );
}

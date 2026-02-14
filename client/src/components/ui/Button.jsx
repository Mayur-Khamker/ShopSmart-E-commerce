export default function Button({
  children,
  className = "",
  variant = "primary", // primary | outline | danger | ghost
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/20 hover:opacity-95",
    outline:
      "border border-white/15 bg-white/5 text-white hover:bg-white/10",
    danger:
      "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/20 hover:opacity-95",
    ghost: "text-white/80 hover:text-white hover:bg-white/10",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>

      <Footer />
    </div>
  );
}

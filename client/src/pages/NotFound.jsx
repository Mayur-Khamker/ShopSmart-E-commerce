import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-10 text-center">
      <h1 className="text-4xl font-extrabold text-white">404</h1>
      <p className="text-white/65">Page not found</p>

      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}

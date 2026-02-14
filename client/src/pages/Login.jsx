import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    try {
      login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6">
      <h1 className="text-2xl font-extrabold text-white">Login</h1>
      <p className="mt-1 text-sm text-white/65">
        Fake auth (frontend only).
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-white/80">Email</label>
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-indigo-500/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mayur@gmail.com"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-white/80">
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-indigo-500/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
          />
        </div>

        {error && <p className="text-sm text-red-300">{error}</p>}

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}

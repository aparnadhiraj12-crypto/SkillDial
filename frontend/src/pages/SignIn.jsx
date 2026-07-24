import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import SkillDial from "../components/SkillDial";

const API_URL = "http://localhost:4000/api";

export default function SignIn() {
  const [role, setRole] = useState("freelancer");
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/signup";
      const body =
        mode === "login"
          ? { email: form.email, password: form.password }
          : { name: form.name, email: form.email, password: form.password, role };

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate(data.user.role === "poster" ? "/post-job" : "/feed");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-violet-ink text-white p-12 relative overflow-hidden">
        <div className="blob w-[360px] h-[360px] -top-24 -right-24" style={{ background: "var(--color-violet)" }} />
        <div className="blob w-[260px] h-[260px] bottom-10 -left-16" style={{ background: "var(--color-coral)", animationDelay: "4s" }} />

        <Link to="/" className="flex items-center gap-2 font-[var(--font-display-bold)] font-extrabold text-lg z-10 w-fit">
          <span className="w-6 h-6 rounded-[6px] bg-white text-violet-ink flex items-center justify-center text-[10px] font-bold">
            SD
          </span>
          SkillDial
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-white/15 chip-pop px-3 py-1.5 mb-5">
            <ShieldCheck size={13} />
            Verified students only
          </span>
          <h1 className="font-[var(--font-display-bold)] text-4xl font-extrabold leading-tight tracking-tight mb-4">
            Show your skill level.
            <br />
            Not just your resume.
          </h1>
          <p className="text-white/65 max-w-sm leading-relaxed">
            Every profile carries a verified skill dial — rated 1 to 5, backed by real portfolio
            work. Posters see exactly who they're hiring, at a glance.
          </p>
        </motion.div>

        <div className="z-10 space-y-3">
          {[
            { skill: "HTML / CSS", level: 5 },
            { skill: "Python", level: 4 },
            { skill: "Data analysis", level: 3 },
          ].map((s, i) => (
            <motion.div
              key={s.skill}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.15 }}
              className="flex items-center justify-between border-t border-white/10 pt-3"
            >
              <span className="text-sm text-white/70 font-mono">{s.skill}</span>
              <SkillDial level={s.level} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-lilac">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <Link to="/" className="lg:hidden flex items-center gap-2 font-[var(--font-display-bold)] font-extrabold text-lg mb-10 w-fit">
            <span className="w-6 h-6 rounded-[6px] bg-violet text-white flex items-center justify-center text-[10px] font-bold">
              SD
            </span>
            SkillDial
          </Link>

          <h2 className="font-[var(--font-display-bold)] text-2xl font-extrabold tracking-tight mb-1 text-violet-ink">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-muted text-sm mb-8">
            {mode === "login" ? "Sign in to continue." : "Free for verified students."}
          </p>

          {mode === "signup" && (
            <div className="grid grid-cols-2 gap-2 mb-6" role="radiogroup" aria-label="I am a">
              <button
                type="button"
                role="radio"
                aria-checked={role === "freelancer"}
                onClick={() => setRole("freelancer")}
                className={`text-left chip-pop border-2 px-4 py-3 transition-all active:scale-[0.98] ${
                  role === "freelancer" ? "border-violet bg-white shadow-[0_6px_16px_-6px_rgba(109,93,246,0.35)]" : "border-transparent bg-white/60 hover:bg-white"
                }`}
                style={{ borderRadius: "16px" }}
              >
                <p className="text-sm font-bold">Freelancer</p>
                <p className="text-xs text-muted mt-0.5">I want to find work</p>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={role === "poster"}
                onClick={() => setRole("poster")}
                className={`text-left chip-pop border-2 px-4 py-3 transition-all active:scale-[0.98] ${
                  role === "poster" ? "border-violet bg-white shadow-[0_6px_16px_-6px_rgba(109,93,246,0.35)]" : "border-transparent bg-white/60 hover:bg-white"
                }`}
                style={{ borderRadius: "16px" }}
              >
                <p className="text-sm font-bold">Poster</p>
                <p className="text-xs text-muted mt-0.5">I want to hire</p>
              </button>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div>
                <label htmlFor="name" className="text-xs font-bold text-muted block mb-1.5">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  autoFocus
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Aisha Rahman"
                  className="w-full h-11 chip-pop border border-violet/10 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/30 transition-shadow bg-white"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="text-xs font-bold text-muted block mb-1.5">
                {role === "freelancer" || mode === "signup" ? "College / work email" : "Email"}
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder={role === "freelancer" ? "you@college.edu" : "you@company.com"}
                className="w-full h-11 chip-pop border border-violet/10 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/30 transition-shadow bg-white"
              />
              {role === "freelancer" && mode === "signup" && (
                <p className="text-xs text-muted mt-1.5">
                  We verify you're a current student from this email.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-bold text-muted block mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 chip-pop border border-violet/10 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/30 transition-shadow bg-white"
              />
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 chip-pop bg-violet hover:bg-violet-dark text-white text-sm font-bold transition-all active:scale-[0.98] mt-2 disabled:opacity-60 shadow-[0_10px_24px_-8px_rgba(109,93,246,0.55)] hover:-translate-y-0.5"
            >
              {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="text-sm text-muted text-center mt-6">
            {mode === "login" ? "New to SkillDial?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-violet font-bold hover:underline"
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
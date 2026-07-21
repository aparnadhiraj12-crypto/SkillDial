import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      <div className="hidden lg:flex flex-col justify-between bg-ink text-paper p-12 relative overflow-hidden">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg z-10 w-fit">
          <span className="w-2.5 h-2.5 bg-lime rounded-sm" />
          SkillDial
        </Link>

        <div className="z-10 animate-[fadeUp_0.5s_ease-out]">
          <h1 className="font-display text-4xl font-semibold leading-tight mb-4">
            Show your skill level.
            <br />
            Not just your resume.
          </h1>
          <p className="text-white/60 max-w-sm">
            Every profile carries a skill dial — rate yourself 1 to 5 on what you know, backed by real
            portfolio work. Posters see exactly who they're hiring.
          </p>
        </div>

        <div className="z-10 space-y-3">
          {[
            { skill: "HTML / CSS", level: 5 },
            { skill: "Python", level: 4 },
            { skill: "Data analysis", level: 3 },
          ].map((s, i) => (
            <div
              key={s.skill}
              className="flex items-center justify-between border-t border-white/10 pt-3 animate-[fadeUp_0.5s_ease-out_backwards]"
              style={{ animationDelay: `${i * 100 + 150}ms` }}
            >
              <span className="text-sm text-white/70 font-(--font-mono)">{s.skill}</span>
              <SkillDial level={s.level} />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 opacity-[0.06] grid grid-cols-6 gap-8 p-12 pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => (
            <SkillDial key={i} level={(i % 5) + 1} size="lg" />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm animate-[fadeUp_0.4s_ease-out]">
          <Link to="/" className="lg:hidden flex items-center gap-2 font-display font-semibold text-lg mb-10 w-fit">
            <span className="w-2.5 h-2.5 bg-brand rounded-sm" />
            SkillDial
          </Link>

          <h2 className="font-display text-2xl font-semibold mb-1">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-muted text-sm mb-8">
            {mode === "login" ? "Sign in to continue." : "Free for verified students."}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-6" role="radiogroup" aria-label="I am a">
            <button
              type="button"
              role="radio"
              aria-checked={role === "freelancer"}
              onClick={() => setRole("freelancer")}
              className={`text-left rounded-lg border px-4 py-3 transition-all duration-150 active:scale-[0.98] ${
                role === "freelancer" ? "border-brand bg-brand/5" : "border-line hover:border-strong"
              }`}
            >
              <p className="text-sm font-medium">Freelancer</p>
              <p className="text-xs text-muted mt-0.5">I want to find work</p>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={role === "poster"}
              onClick={() => setRole("poster")}
              className={`text-left rounded-lg border px-4 py-3 transition-all duration-150 active:scale-[0.98] ${
                role === "poster" ? "border-brand bg-brand/5" : "border-line hover:border-strong"
              }`}
            >
              <p className="text-sm font-medium">Poster</p>
              <p className="text-xs text-muted mt-0.5">I want to hire</p>
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div>
                <label htmlFor="name" className="text-xs font-medium text-muted block mb-1.5">
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
                  className="w-full h-11 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-shadow"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="text-xs font-medium text-muted block mb-1.5">
                {role === "freelancer" || mode === "signup" ? "College / work email" : "Email"}
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder={role === "freelancer" ? "you@college.edu" : "you@company.com"}
                className="w-full h-11 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-shadow"
              />
              {role === "freelancer" && mode === "signup" && (
                <p className="text-xs text-muted mt-1.5">
                  We verify you're a current student from this email.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-medium text-muted block mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-shadow"
              />
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-brand hover:bg-brand-dark text-white text-sm font-medium transition-all duration-150 active:scale-[0.98] mt-2 disabled:opacity-60"
            >
              {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="text-sm text-muted text-center mt-6">
            {mode === "login" ? "New to SkillDial?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-brand font-medium hover:underline"
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
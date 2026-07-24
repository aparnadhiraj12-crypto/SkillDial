import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Layers, Briefcase, Wallet, ArrowRight, ShieldCheck, Star } from "lucide-react";
import Navbar from "../components/Navbar";
import SkillDial from "../components/SkillDial";
import Reveal, { RevealGroup, revealItem } from "../components/Reveal";
import AnimatedNumber from "../components/AnimatedNumber";

const categories = [
  { title: "Assignments", sub: "from ₹50/hr", icon: FileText, bg: "var(--color-sun)", bg2: "#ff9d3d", shadow: "rgba(255,176,32,0.45)" },
  { title: "Projects", sub: "peer-to-peer", icon: Layers, bg: "var(--color-violet)", bg2: "#8b7bff", shadow: "rgba(109,93,246,0.45)" },
  { title: "Internships", sub: "from companies", icon: Briefcase, bg: "var(--color-sky)", bg2: "#5fb0ff", shadow: "rgba(46,144,250,0.45)" },
  { title: "Low-cost gigs", sub: "company posted", icon: Wallet, bg: "var(--color-coral)", bg2: "#ff8f7f", shadow: "rgba(255,107,87,0.45)" },
];

const stats = [
  { value: 2400, format: (n) => `${n.toLocaleString("en-IN")}+`, label: "verified students" },
  { value: 18, format: (n) => `₹${n}L+`, label: "paid out to date" },
  { value: 4.7, format: (n) => `${n.toFixed(1)} / 5`, label: "average rating" },
];

const freelancers = [
  { initials: "AR", name: "Aisha R.", course: "BTech CSE, 3rd yr", skills: [{ name: "UI design", level: 5 }, { name: "Figma", level: 4 }], rating: 4.8, jobs: 12, rate: 200, accent: "var(--color-violet)" },
  { initials: "RK", name: "Rohan K.", course: "MTech Data Sci, 1st yr", skills: [{ name: "Python", level: 5 }, { name: "ML", level: 3 }], rating: 4.9, jobs: 8, rate: 150, accent: "var(--color-sky)" },
  { initials: "SP", name: "Sneha P.", course: "BSc Stats, 2nd yr", skills: [{ name: "Excel", level: 4 }, { name: "Writing", level: 5 }], rating: 4.7, jobs: 20, rate: 80, accent: "var(--color-coral)" },
];

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const isPoster = user?.role === "poster";
  const isFreelancer = user?.role === "freelancer";

  return (
    <div className="min-h-screen bg-lilac overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="blob w-[420px] h-[420px] -top-32 -left-32" style={{ background: "var(--color-violet)" }} />
        <div className="blob w-[320px] h-[320px] top-10 right-[-6rem]" style={{ background: "var(--color-sun)", animationDelay: "3s" }} />
        <div className="blob w-[260px] h-[260px] bottom-[-4rem] left-1/3" style={{ background: "var(--color-coral)", animationDelay: "6s" }} />

        <div className="max-w-[1560px] mx-auto px-6 sm:px-10 xl:px-16 py-16 sm:py-24 grid lg:grid-cols-[1fr_420px] gap-14 items-center relative">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-mint bg-mint-soft chip-pop px-3 py-1.5 mb-6"
            >
              <ShieldCheck size={13} />
              Verified students only
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-[var(--font-display-bold)] text-4xl sm:text-[3.5rem] font-extrabold leading-[1.05] tracking-tight mb-5 text-violet-ink"
            >
              Freelance work,
              <br />
              matched to your <span className="text-violet">skill.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted text-lg max-w-lg mb-8 leading-relaxed"
            >
              Build a verified skill profile, then get matched to paid assignments, projects and
              internships — or browse and apply yourself. Built exclusively for enrolled students.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              {!isPoster && (
                <Link
                  to={user ? "/feed" : "/signin"}
                  className="h-[52px] px-7 chip-pop bg-violet hover:bg-violet-dark text-white text-sm font-bold flex items-center justify-center gap-2 shadow-[0_10px_24px_-8px_rgba(109,93,246,0.55)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-8px_rgba(109,93,246,0.6)] active:translate-y-0 transition-all"
                >
                  Get matched to work <ArrowRight size={15} />
                </Link>
              )}
              {!isFreelancer && (
                <Link
                  to={user ? "/post-job" : "/signin"}
                  className="h-[52px] px-7 chip-pop border-2 border-violet/15 hover:border-violet/30 bg-white text-sm font-bold flex items-center justify-center text-violet-ink hover:-translate-y-0.5 transition-all"
                >
                  Post a job
                </Link>
              )}
            </motion.div>

            <div className="flex items-center gap-8 flex-wrap">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                >
                  <p className="stat-figure font-[var(--font-display-bold)] text-2xl font-extrabold text-violet-ink">
                    <AnimatedNumber value={s.value} format={s.format} />
                  </p>
                  <p className="text-xs text-muted mt-0.5">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Signature element: floating credential card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ duration: 0.7, delay: 0.25, type: "spring", bounce: 0.35 }}
            className="card-pop glossy p-6 relative shadow-[0_24px_48px_-16px_rgba(36,31,82,0.28)]"
          >
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs font-bold text-muted">Student credential</p>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-mint bg-mint-soft chip-pop px-2.5 py-1">
                <ShieldCheck size={11} /> Verified
              </span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-violet text-white flex items-center justify-center text-sm font-extrabold font-[var(--font-display-bold)] shadow-[0_6px_14px_-4px_rgba(109,93,246,0.5)]">
                AR
              </div>
              <div>
                <p className="text-sm font-bold">Aisha Rahman</p>
                <p className="text-xs text-muted">BTech CSE · IIT Hyderabad</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              {[
                { skill: "UI design", level: 5 },
                { skill: "Figma", level: 4 },
                { skill: "React", level: 3 },
              ].map((s) => (
                <div key={s.skill} className="flex items-center justify-between">
                  <span className="text-sm font-mono text-muted">{s.skill}</span>
                  <SkillDial level={s.level} />
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-violet/10 flex items-center justify-between">
              <p className="text-xs text-muted">Match to open jobs</p>
              <p className="text-sm font-extrabold text-violet">92% avg. fit</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative">
        <div className="max-w-[1560px] mx-auto px-6 sm:px-10 xl:px-16 py-14">
          <Reveal>
            <p className="text-xs font-bold text-violet uppercase tracking-wide mb-6">What's on SkillDial</p>
          </Reveal>
          <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  variants={revealItem}
                  whileHover={{ y: -4 }}
                  className="card-pop p-5"
                >
                  <div
                    className="icon-badge w-11 h-11 mb-5"
                    style={{ background: `linear-gradient(135deg, ${c.bg}, ${c.bg2})`, "--badge-shadow": c.shadow }}
                  >
                    <Icon size={19} strokeWidth={2} color="white" className="relative z-10" />
                  </div>
                  <p className="font-bold text-sm">{c.title}</p>
                  <p className="text-xs text-muted mt-0.5">{c.sub}</p>
                </motion.div>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Featured freelancers */}
      <section className="max-w-[1560px] mx-auto px-6 sm:px-10 xl:px-16 py-14">
        <Reveal className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-bold text-violet-ink">Featured student freelancers</p>
            <p className="text-xs text-muted mt-0.5">Ranked by verified skill and completed work.</p>
          </div>
          <Link to={user ? "/jobs" : "/signin"} className="text-xs font-bold text-violet hover:underline flex items-center gap-1 whitespace-nowrap">
            View all <ArrowRight size={12} />
          </Link>
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {freelancers.map((f) => (
            <motion.div key={f.name} variants={revealItem} whileHover={{ y: -4 }} className="card-pop p-5">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-extrabold font-[var(--font-display-bold)] text-white shadow-md"
                  style={{ background: f.accent }}
                >
                  {f.initials}
                </div>
                <div>
                  <p className="text-sm font-bold">{f.name}</p>
                  <p className="text-xs text-muted">{f.course}</p>
                </div>
              </div>
              <div className="space-y-1.5 mb-4">
                {f.skills.map((s) => (
                  <div key={s.name} className="flex items-center justify-between">
                    <span className="text-xs text-muted font-mono">{s.name}</span>
                    <SkillDial level={s.level} />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted pt-3 border-t border-violet/10 flex items-center gap-1">
                <Star size={11} className="fill-sun text-sun" /> {f.rating} · {f.jobs} projects · ₹{f.rate}/hr
              </p>
            </motion.div>
          ))}
        </RevealGroup>
      </section>
    </div>
  );
}
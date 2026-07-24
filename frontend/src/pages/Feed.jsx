import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight, TrendingUp, Clock, Sparkles, Flame } from "lucide-react";
import Navbar from "../components/Navbar";
import SkillDial from "../components/SkillDial";
import { RevealGroup, revealItem } from "../components/Reveal";

const TABS = [
  { key: "recommended", label: "Recommended", icon: TrendingUp },
  { key: "recent", label: "Most recent", icon: Clock },
];

const CATEGORY_STYLES = {
  Assignment: "text-cat-assignment bg-cat-assignment-bg",
  Project: "text-violet bg-lilac",
  Internship: "text-cat-internship bg-cat-internship-bg",
  Gig: "text-cat-gig bg-cat-gig-bg",
};

const MOCK_JOBS = [
  { id: 1, title: "Build a landing page in React", poster: "Aisha R.", posterType: "student", category: "Project", pricingType: "hourly", rate: 150, skills: ["React", "Tailwind"], postedAgo: "2h ago", matchScore: 92 },
  { id: 2, title: "Solve 10 DSA assignment problems", poster: "Rohan K.", posterType: "student", category: "Assignment", pricingType: "fixed", rate: 500, skills: ["DSA", "C++"], postedAgo: "5h ago", matchScore: 71 },
  { id: 3, title: "Frontend Intern — 3 months", poster: "Nimbus Labs", posterType: "company", category: "Internship", pricingType: "stipend", rate: 8000, skills: ["React", "CSS"], postedAgo: "1d ago", matchScore: 88 },
  { id: 4, title: "Data entry + Excel cleanup", poster: "Sneha P.", posterType: "student", category: "Gig", pricingType: "hourly", rate: 80, skills: ["Excel"], postedAgo: "1d ago", matchScore: 40 },
  { id: 5, title: "ML model for sales prediction", poster: "Vertex AI", posterType: "company", category: "Internship", pricingType: "stipend", rate: 12000, skills: ["Python", "ML"], postedAgo: "2d ago", matchScore: 65 },
  { id: 6, title: "Redesign portfolio site in Figma", poster: "Kabir S.", posterType: "student", category: "Project", pricingType: "fixed", rate: 1200, skills: ["Figma", "UI design"], postedAgo: "2d ago", matchScore: 84 },
  { id: 7, title: "Write 5 blog posts on fintech", poster: "PayCircle", posterType: "company", category: "Gig", pricingType: "fixed", rate: 2000, skills: ["Writing"], postedAgo: "3d ago", matchScore: 35 },
];

function priceLabel(job) {
  if (job.pricingType === "hourly") return `₹${job.rate}/hr`;
  if (job.pricingType === "fixed") return `₹${job.rate} fixed`;
  return `₹${job.rate}/mo`;
}

function initials(name) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

function matchRing(score) {
  if (score >= 80) return "text-mint";
  if (score >= 55) return "text-coral";
  return "text-muted";
}

export default function Feed() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("recommended");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const sorted = [...MOCK_JOBS].sort((a, b) =>
    tab === "recommended" ? b.matchScore - a.matchScore : b.id - a.id
  );
  const filtered = sorted.filter((j) => j.title.toLowerCase().includes(search.toLowerCase()));
  const visible = filtered.slice(0, visibleCount);
  const topMatch = [...MOCK_JOBS].sort((a, b) => b.matchScore - a.matchScore)[0];

  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen bg-lilac">
      <Navbar />

      <div className="px-6 sm:px-10 xl:px-16 py-8 max-w-[1560px] mx-auto grid lg:grid-cols-[1fr_320px] gap-8 relative overflow-hidden">
        <div className="blob w-[300px] h-[300px] -top-16 left-1/4 -z-10" style={{ background: "var(--color-sun)" }} />
        {/* Main feed */}
        <div>
          {/* Bold welcome banner, Derrida-style */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="banner-pop rounded-[var(--radius-card)] p-6 sm:p-8 text-white mb-6 relative overflow-hidden"
          >
            <div className="blob w-40 h-40 -right-8 -top-10 bg-white/20" style={{ filter: "blur(20px)" }} />
            <div className="blob w-24 h-24 right-16 bottom-[-2rem] bg-white/20" style={{ filter: "blur(20px)", animationDelay: "2s" }} />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/20 chip-pop px-3 py-1.5 mb-4">
                <Sparkles size={12} />
                {MOCK_JOBS.length} matches, ranked by your skill dial
              </span>
              <h1 className="font-[var(--font-display-bold)] text-2xl sm:text-[1.75rem] font-bold mb-1">
                Hey {firstName}, your best match today
              </h1>
              <p className="text-white/80 text-sm mb-5">
                {topMatch.title} — {topMatch.matchScore}% fit with your profile
              </p>
              <Link
                to={`/jobs/${topMatch.id}`}
                className="inline-flex items-center gap-1.5 bg-white text-violet-ink text-sm font-bold chip-pop px-5 py-2.5 hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                View top match <ArrowUpRight size={15} />
              </Link>
            </div>
          </motion.div>

          <div className="relative mb-5">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs, e.g. React landing page"
              className="w-full h-12 chip-pop border border-transparent bg-white pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet/30 shadow-[0_1px_2px_rgba(36,31,82,0.06)]"
            />
          </div>

          <div className="flex gap-2 mb-6">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 text-sm font-semibold chip-pop px-4 py-2 transition-colors ${
                    active ? "bg-violet text-white" : "bg-white text-muted hover:text-violet-ink"
                  }`}
                >
                  <Icon size={14} />
                  {t.label}
                </button>
              );
            })}
          </div>

          <motion.div layout className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {visible.map((job, i) => (
                <motion.div
                  layout
                  key={job.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link to={`/jobs/${job.id}`} className="card-pop group p-5 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 shrink-0 rounded-full bg-lilac text-violet-ink flex items-center justify-center text-sm font-bold font-[var(--font-display-bold)]">
                        {initials(job.poster)}
                      </div>
                      {tab === "recommended" && (
                        <span className={`text-xs font-bold flex items-center gap-1 ${matchRing(job.matchScore)}`}>
                          <Flame size={12} />
                          {job.matchScore}%
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold mb-1 leading-snug">{job.title}</h3>
                    <p className="text-xs text-muted mb-4">
                      {job.poster} {job.posterType === "company" && "· company"} · {job.postedAgo}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 mb-4 mt-auto">
                      {job.skills.map((s) => (
                        <span key={s} className="text-[11px] bg-lilac text-violet-ink px-2.5 py-1 chip-pop font-mono font-medium">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-violet/10">
                      <span className={`text-[11px] px-2.5 py-1 chip-pop ${CATEGORY_STYLES[job.category]}`}>
                        {job.category}
                      </span>
                      <span className="text-sm font-bold text-violet-ink">{priceLabel(job)}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <p className="text-sm text-muted text-center py-12 sm:col-span-2 xl:col-span-3">No jobs match your search.</p>
            )}
          </motion.div>

          {visibleCount < filtered.length && (
            <button
              onClick={() => setVisibleCount((v) => v + 4)}
              className="w-full mt-5 h-12 chip-pop border border-violet/15 text-sm font-semibold text-violet-ink transition-colors bg-white hover:bg-lilac"
            >
              Show more
            </button>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card-pop p-5">
            <p className="text-xs font-bold text-violet-ink mb-3">Profile strength</p>
            <div className="h-2 bg-lilac rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet to-coral rounded-full" style={{ width: "60%" }} />
            </div>
            <p className="text-xs text-muted mb-3">60% complete</p>
            <Link to="/profile" className="text-xs font-bold text-violet hover:underline">
              Complete your profile →
            </Link>
          </div>

          <div className="card-pop p-5">
            <p className="text-xs font-bold text-violet-ink mb-3">Your top skills</p>
            <div className="space-y-2.5">
              {[
                { name: "React", level: 4 },
                { name: "Tailwind", level: 5 },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <span className="text-xs font-mono">{s.name}</span>
                  <SkillDial level={s.level} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
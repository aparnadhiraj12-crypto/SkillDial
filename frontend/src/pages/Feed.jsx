import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight, TrendingUp, Clock, ChevronDown, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import SkillDial from "../components/SkillDial";

const TABS = [
  { key: "recommended", label: "Recommended", icon: TrendingUp },
  { key: "recent", label: "Most recent", icon: Clock },
];

const CATEGORY_STYLES = {
  Assignment: "bg-amber-50 text-amber-700",
  Project: "bg-brand/10 text-brand",
  Internship: "bg-teal-50 text-teal-700",
  Gig: "bg-fuchsia-50 text-fuchsia-700",
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

  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="px-6 sm:px-12 py-10 max-w-6xl mx-auto grid lg:grid-cols-[1fr_280px] gap-10">
        {/* Main feed */}
        <div>
          {/* Welcome banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-brand to-violet-600 text-white p-6 sm:p-8 mb-8">
            <div className="banner-pattern absolute inset-0" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/15 rounded-full px-3 py-1 mb-4">
                <Sparkles size={12} />
                3 new matches today
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-1">
                Welcome back, {firstName}
              </h1>
              <p className="text-white/70 text-sm">Here's work matched to your skills today.</p>
            </div>
          </div>

          <div className="flex justify-center mb-2 text-muted">
            <ChevronDown size={16} className="scroll-cue" />
          </div>

          <div className="relative mb-5">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs, e.g. React landing page"
              className="w-full h-12 rounded-xl border border-line bg-white pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand shadow-sm"
            />
          </div>

          <div className="flex gap-1 mb-6 border-b border-line">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 border-b-2 -mb-px transition-colors ${
                    active ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  <Icon size={14} />
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {visible.map((job) => (
              <Link to={`/jobs/${job.id}`} key={job.id} className="card group flex items-center gap-4 p-5">
                <div className="w-11 h-11 shrink-0 rounded-full bg-ink/5 text-ink flex items-center justify-center text-sm font-medium font-display">
                  {initials(job.poster)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <h3 className="text-sm font-medium truncate">{job.title}</h3>
                    <span className="text-sm font-semibold text-brand whitespace-nowrap">
                      {priceLabel(job)}
                    </span>
                  </div>
                  <p className="text-xs text-muted mb-3">
                    {job.poster} {job.posterType === "company" && "· company"} · {job.postedAgo}
                    {tab === "recommended" && (
                      <span className="text-brand font-medium"> · {job.matchScore}% match</span>
                    )}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {job.skills.map((s) => (
                      <span key={s} className="text-xs bg-ink/5 text-muted px-2.5 py-1 rounded-full font-mono">
                        {s}
                      </span>
                    ))}
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ml-auto ${CATEGORY_STYLES[job.category]}`}>
                      {job.category}
                    </span>
                  </div>
                </div>
                <ArrowRight size={16} className="shrink-0 text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}

            {filtered.length === 0 && (
              <p className="text-sm text-muted text-center py-12">No jobs match your search.</p>
            )}
          </div>

          {visibleCount < filtered.length && (
            <button
              onClick={() => setVisibleCount((v) => v + 4)}
              className="w-full mt-5 h-11 rounded-lg border border-line hover:border-strong text-sm font-medium transition-colors bg-white"
            >
              Show more
            </button>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card p-5">
            <p className="text-xs font-medium text-muted mb-3">Profile strength</p>
            <div className="h-1.5 bg-line rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-brand rounded-full" style={{ width: "60%" }} />
            </div>
            <p className="text-xs text-muted mb-3">60% complete</p>
            <Link to="/profile" className="text-xs font-medium text-brand hover:underline">
              Complete your profile →
            </Link>
          </div>

          <div className="card p-5">
            <p className="text-xs font-medium text-muted mb-3">Your top skills</p>
            <div className="space-y-2">
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
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";

const CATEGORIES = ["All", "Assignment", "Project", "Internship", "Gig"];
const SORTS = ["Newest", "Highest pay"];

const CATEGORY_STYLES = {
  Assignment: "text-cat-assignment bg-cat-assignment-bg",
  Project: "text-violet bg-lilac",
  Internship: "text-cat-internship bg-cat-internship-bg",
  Gig: "text-cat-gig bg-cat-gig-bg",
};

const MOCK_JOBS = [
  { id: 1, title: "Build a landing page in React", poster: "Aisha R.", posterType: "student", category: "Project", pricingType: "hourly", rate: 150, skills: ["React", "Tailwind"], postedAgo: "2h ago" },
  { id: 2, title: "Solve 10 DSA assignment problems", poster: "Rohan K.", posterType: "student", category: "Assignment", pricingType: "fixed", rate: 500, skills: ["DSA", "C++"], postedAgo: "5h ago" },
  { id: 3, title: "Frontend Intern — 3 months", poster: "Nimbus Labs", posterType: "company", category: "Internship", pricingType: "stipend", rate: 8000, skills: ["React", "CSS"], postedAgo: "1d ago" },
  { id: 4, title: "Data entry + Excel cleanup", poster: "Sneha P.", posterType: "student", category: "Gig", pricingType: "hourly", rate: 80, skills: ["Excel"], postedAgo: "1d ago" },
  { id: 5, title: "ML model for sales prediction", poster: "Vertex AI", posterType: "company", category: "Internship", pricingType: "stipend", rate: 12000, skills: ["Python", "ML"], postedAgo: "2d ago" },
  { id: 6, title: "Redesign portfolio site in Figma", poster: "Kabir S.", posterType: "student", category: "Project", pricingType: "fixed", rate: 1200, skills: ["Figma", "UI design"], postedAgo: "2d ago" },
  { id: 7, title: "Write 5 blog posts on fintech", poster: "PayCircle", posterType: "company", category: "Gig", pricingType: "fixed", rate: 2000, skills: ["Writing"], postedAgo: "3d ago" },
];

function priceLabel(job) {
  if (job.pricingType === "hourly") return `₹${job.rate}/hr`;
  if (job.pricingType === "fixed") return `₹${job.rate} fixed`;
  return `₹${job.rate}/mo`;
}

function initials(name) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export default function BrowseJobs() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");

  const filtered = useMemo(() => {
    let result = MOCK_JOBS.filter((job) => {
      const matchesCategory = category === "All" || job.category === category;
      const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    if (sort === "Highest pay") result = [...result].sort((a, b) => b.rate - a.rate);
    return result;
  }, [category, search, sort]);

  return (
    <div className="min-h-screen bg-lilac">
      <Navbar />

      <section className="px-6 sm:px-10 xl:px-16 py-8 max-w-[1560px] mx-auto relative overflow-hidden">
        <div className="blob w-[280px] h-[280px] -top-20 right-10 -z-10" style={{ background: "var(--color-sky)" }} />

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-[var(--font-display-bold)] text-2xl font-bold text-violet-ink mb-1"
        >
          Browse work
        </motion.h1>
        <p className="text-muted text-sm mb-6">
          Search and filter every open assignment, project, internship, and gig yourself.
        </p>

        <div className="relative mb-5">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs, e.g. React landing page"
            className="w-full h-12 chip-pop border border-transparent bg-white pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet/30 shadow-[0_1px_2px_rgba(36,31,82,0.06)]"
          />
        </div>

        {/* Top filter bar, Derrida-style pill row instead of a sidebar */}
        <div className="flex flex-wrap items-center gap-2 mb-7">
          {CATEGORIES.map((c) => (
            <motion.button
              key={c}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCategory(c)}
              className={`text-xs font-semibold chip-pop px-4 py-2 transition-colors ${
                category === c ? "bg-violet text-white" : "bg-white text-muted hover:text-violet-ink"
              }`}
            >
              {c}
            </motion.button>
          ))}
          <span className="w-px h-5 bg-violet/15 mx-1 hidden sm:block" />
          {SORTS.map((s) => (
            <motion.button
              key={s}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSort(s)}
              className={`text-xs font-semibold chip-pop px-4 py-2 transition-colors ${
                sort === s ? "bg-violet-ink text-white" : "bg-white text-muted hover:text-violet-ink"
              }`}
            >
              {s}
            </motion.button>
          ))}
        </div>

        <p className="text-xs text-muted mb-4">{filtered.length} open roles</p>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((job, i) => (
              <motion.div
                layout
                key={job.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={`/jobs/${job.id}`} className="card-pop group p-5 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-lilac text-violet-ink flex items-center justify-center text-sm font-bold font-[var(--font-display-bold)]">
                      {initials(job.poster)}
                    </div>
                    <ArrowUpRight size={16} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
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
            <p className="text-sm text-muted text-center py-12 sm:col-span-2 lg:col-span-3 xl:col-span-4">
              No jobs match your search.
            </p>
          )}
        </motion.div>
      </section>
    </div>
  );
}
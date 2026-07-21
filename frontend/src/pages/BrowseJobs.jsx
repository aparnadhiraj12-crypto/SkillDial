import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";

const CATEGORIES = ["All", "Assignment", "Project", "Internship", "Gig"];

const CATEGORY_STYLES = {
  Assignment: "bg-amber-50 text-amber-700",
  Project: "bg-brand/10 text-brand",
  Internship: "bg-teal-50 text-teal-700",
  Gig: "bg-fuchsia-50 text-fuchsia-700",
};

const MOCK_JOBS = [
  {
    id: 1,
    title: "Build a landing page in React",
    poster: "Aisha R.",
    posterType: "student",
    category: "Project",
    pricingType: "hourly",
    rate: 150,
    skills: ["React", "Tailwind"],
    postedAgo: "2h ago",
  },
  {
    id: 2,
    title: "Solve 10 DSA assignment problems",
    poster: "Rohan K.",
    posterType: "student",
    category: "Assignment",
    pricingType: "fixed",
    rate: 500,
    skills: ["DSA", "C++"],
    postedAgo: "5h ago",
  },
  {
    id: 3,
    title: "Frontend Intern — 3 months",
    poster: "Nimbus Labs",
    posterType: "company",
    category: "Internship",
    pricingType: "stipend",
    rate: 8000,
    skills: ["React", "CSS"],
    postedAgo: "1d ago",
  },
  {
    id: 4,
    title: "Data entry + Excel cleanup",
    poster: "Sneha P.",
    posterType: "student",
    category: "Gig",
    pricingType: "hourly",
    rate: 80,
    skills: ["Excel"],
    postedAgo: "1d ago",
  },
  {
    id: 5,
    title: "ML model for sales prediction",
    poster: "Vertex AI",
    posterType: "company",
    category: "Internship",
    pricingType: "stipend",
    rate: 12000,
    skills: ["Python", "ML"],
    postedAgo: "2d ago",
  },
];

function priceLabel(job) {
  if (job.pricingType === "hourly") return `₹${job.rate}/hr`;
  if (job.pricingType === "fixed") return `₹${job.rate} fixed`;
  return `₹${job.rate}/mo`;
}

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function BrowseJobs() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = MOCK_JOBS.filter((job) => {
    const matchesCategory = category === "All" || job.category === category;
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="px-6 sm:px-12 py-10 max-w-5xl mx-auto">
        <h1 className="font-display text-2xl font-semibold mb-1">Browse work</h1>
        <p className="text-muted text-sm mb-6">
          Matched to your skills — assignments, projects, internships, and gigs.
        </p>

        <div className="relative mb-6">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs, e.g. React landing page"
            className="w-full h-12 rounded-xl border border-line bg-white pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand shadow-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`text-xs font-medium px-4 py-2 rounded-full border transition-all ${
                category === c
                  ? "bg-brand text-white border-brand shadow-sm"
                  : "border-line text-muted hover:border-strong bg-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((job) => (
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
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  {job.skills.map((s) => (
                    <span key={s} className="text-xs bg-ink/5 text-muted px-2.5 py-1 rounded-full font-mono">
                      {s}
                    </span>
                  ))}
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ml-auto ${CATEGORY_STYLES[job.category]}`}
                  >
                    {job.category}
                  </span>
                </div>
              </div>

              <ArrowRight
                size={16}
                className="shrink-0 text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
              />
            </Link>
          ))}

          {filtered.length === 0 && (
            <p className="text-sm text-muted text-center py-12">No jobs match your search.</p>
          )}
        </div>
      </section>
    </div>
  );
}
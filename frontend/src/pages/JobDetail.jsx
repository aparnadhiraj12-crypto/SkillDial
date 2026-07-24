import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";

const CATEGORY_STYLES = {
  Assignment: "text-cat-assignment bg-cat-assignment-bg",
  Project: "text-violet bg-lilac",
  Internship: "text-cat-internship bg-cat-internship-bg",
  Gig: "text-cat-gig bg-cat-gig-bg",
};

// Same mock set used across Feed / BrowseJobs, kept here until a shared data
// layer / API exists.
const MOCK_JOBS = {
  1: { title: "Build a landing page in React", poster: "Aisha R.", posterType: "student", category: "Project", pricingType: "hourly", rate: 150, skills: ["React", "Tailwind"], postedAgo: "2h ago", matchScore: 92, description: "Looking for someone to build a single-page marketing site for a college fest. Should be responsive, fast, and match a Figma design I'll share. Roughly 15-20 hours of work over the next week." },
  2: { title: "Solve 10 DSA assignment problems", poster: "Rohan K.", posterType: "student", category: "Assignment", pricingType: "fixed", rate: 500, skills: ["DSA", "C++"], postedAgo: "5h ago", matchScore: 71, description: "Need well-commented C++ solutions with time/space complexity notes for 10 problems (arrays, trees, DP). Deadline is this weekend." },
  3: { title: "Frontend Intern — 3 months", poster: "Nimbus Labs", posterType: "company", category: "Internship", pricingType: "stipend", rate: 8000, skills: ["React", "CSS"], postedAgo: "1d ago", matchScore: 88, description: "3-month remote internship building internal dashboards in React. 15 hrs/week, mentored by a senior engineer, certificate on completion." },
  4: { title: "Data entry + Excel cleanup", poster: "Sneha P.", posterType: "student", category: "Gig", pricingType: "hourly", rate: 80, skills: ["Excel"], postedAgo: "1d ago", matchScore: 40, description: "A few hundred rows of survey data need cleaning, deduplication, and basic pivot tables. Should take 4-6 hours total." },
  5: { title: "ML model for sales prediction", poster: "Vertex AI", posterType: "company", category: "Internship", pricingType: "stipend", rate: 12000, skills: ["Python", "ML"], postedAgo: "2d ago", matchScore: 65, description: "Build and evaluate a regression model on historical sales data, then write up findings. Good fit for someone comfortable with pandas and scikit-learn." },
  6: { title: "Redesign portfolio site in Figma", poster: "Kabir S.", posterType: "student", category: "Project", pricingType: "fixed", rate: 1200, skills: ["Figma", "UI design"], postedAgo: "2d ago", matchScore: 84, description: "My current portfolio looks dated. Want a cleaner visual direction and 4-5 key screens designed in Figma, ready to hand off for development." },
  7: { title: "Write 5 blog posts on fintech", poster: "PayCircle", posterType: "company", category: "Gig", pricingType: "fixed", rate: 2000, skills: ["Writing"], postedAgo: "3d ago", matchScore: 35, description: "5 articles, ~800 words each, on topics like UPI, digital lending, and neobanks. SEO-aware writing preferred." },
};

function priceLabel(job) {
  if (job.pricingType === "hourly") return `₹${job.rate}/hr`;
  if (job.pricingType === "fixed") return `₹${job.rate} fixed`;
  return `₹${job.rate}/mo`;
}

function initials(name) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export default function JobDetail() {
  const { id } = useParams();
  const job = MOCK_JOBS[id];

  if (!job) {
    return (
      <div className="min-h-screen bg-lilac">
        <Navbar />
        <div className="px-6 sm:px-8 py-24 max-w-lg mx-auto text-center">
          <h1 className="font-[var(--font-display-bold)] text-xl font-bold text-violet-ink mb-2">Job not found</h1>
          <p className="text-sm text-muted mb-6">This listing may have been filled or removed.</p>
          <Link to="/jobs" className="text-sm font-bold text-violet hover:underline">
            ← Back to browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lilac">
      <Navbar />

      <section className="px-6 sm:px-8 py-10 max-w-3xl mx-auto relative overflow-hidden">
        <div className="blob w-72 h-72 -top-24 right-0 -z-10" style={{ background: "var(--color-violet)" }} />

        <Link to="/jobs" className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-violet-ink mb-6">
          <ArrowLeft size={13} /> Back to browse
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card-pop glossy p-6 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 shrink-0 rounded-full bg-lilac text-violet-ink flex items-center justify-center text-sm font-bold font-[var(--font-display-bold)]">
                {initials(job.poster)}
              </div>
              <div>
                <p className="text-sm font-bold">{job.poster}</p>
                <p className="text-xs text-muted flex items-center gap-1">
                  {job.posterType === "company" ? "Company" : "Student"} · <Clock size={11} /> {job.postedAgo}
                </p>
              </div>
            </div>
            <span className={`text-xs px-2.5 py-1 chip-pop whitespace-nowrap ${CATEGORY_STYLES[job.category]}`}>
              {job.category}
            </span>
          </div>

          <h1 className="font-[var(--font-display-bold)] text-2xl font-bold text-violet-ink tracking-tight mb-2">{job.title}</h1>

          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <p className="text-xl font-extrabold">{priceLabel(job)}</p>
            {job.matchScore && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-mint bg-mint-soft chip-pop px-2.5 py-1">
                <ShieldCheck size={12} /> {job.matchScore}% match to your skills
              </span>
            )}
          </div>

          <p className="text-sm text-ink/80 leading-relaxed mb-6">{job.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-8">
            {job.skills.map((s) => (
              <span key={s} className="text-xs bg-lilac text-violet-ink px-2.5 py-1 chip-pop font-mono font-medium">
                {s}
              </span>
            ))}
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto h-12 px-8 chip-pop bg-violet hover:bg-violet-dark text-white text-sm font-bold transition-colors shadow-[0_10px_24px_-8px_rgba(109,93,246,0.5)]"
          >
            Apply now
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
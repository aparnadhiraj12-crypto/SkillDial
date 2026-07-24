import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";

const CATEGORIES = ["assignment", "project", "internship", "gig"];
const PRICING_TYPES = [
  { value: "hourly", label: "Hourly rate" },
  { value: "fixed", label: "Fixed price" },
  { value: "stipend", label: "Monthly stipend" },
];

const inputClass =
  "w-full h-11 chip-pop border border-violet/10 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/25 transition-shadow bg-white";

export default function PostJob() {
  const [posterType, setPosterType] = useState("student");
  const [category, setCategory] = useState("project");
  const [pricingType, setPricingType] = useState("hourly");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-lilac">
        <Navbar />
        <div className="px-6 sm:px-8 py-24 max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
            className="w-14 h-14 rounded-full bg-mint-soft flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle2 size={24} className="text-mint" />
          </motion.div>
          <h1 className="font-[var(--font-display-bold)] text-2xl font-bold text-violet-ink mb-2">Listing created</h1>
          <p className="text-muted text-sm leading-relaxed">
            This is a UI preview only — nothing was saved yet. Once this form is wired to the
            backend, it will create a real job posting and start matching it to students.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lilac">
      <Navbar />

      <section className="px-6 sm:px-8 py-10 max-w-2xl mx-auto relative overflow-hidden">
        <div className="blob w-64 h-64 -top-20 -right-20 -z-10" style={{ background: "var(--color-sky)" }} />

        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-[var(--font-display-bold)] text-2xl font-bold text-violet-ink mb-1"
        >
          Post a job
        </motion.h1>
        <p className="text-muted text-sm mb-8">Reach verified student freelancers only.</p>

        {/* Poster type toggle */}
        <div className="grid grid-cols-2 gap-2 mb-8" role="radiogroup" aria-label="Posting as">
          <button
            type="button"
            role="radio"
            aria-checked={posterType === "student"}
            onClick={() => setPosterType("student")}
            className={`text-left chip-pop border-2 px-4 py-3 transition-all ${
              posterType === "student" ? "border-violet bg-white shadow-[0_6px_16px_-6px_rgba(109,93,246,0.3)]" : "border-transparent bg-white/60 hover:bg-white"
            }`}
            style={{ borderRadius: "16px" }}
          >
            <p className="text-sm font-bold">Student</p>
            <p className="text-xs text-muted mt-0.5">Posting an assignment or project</p>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={posterType === "company"}
            onClick={() => setPosterType("company")}
            className={`text-left chip-pop border-2 px-4 py-3 transition-all ${
              posterType === "company" ? "border-violet bg-white shadow-[0_6px_16px_-6px_rgba(109,93,246,0.3)]" : "border-transparent bg-white/60 hover:bg-white"
            }`}
            style={{ borderRadius: "16px" }}
          >
            <p className="text-sm font-bold">Company</p>
            <p className="text-xs text-muted mt-0.5">Posting an internship or gig</p>
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {posterType === "company" && (
            <div>
              <label htmlFor="companyName" className="text-xs font-bold text-muted block mb-1.5">
                Company name
              </label>
              <input id="companyName" type="text" placeholder="Nimbus Labs" className={inputClass} />
            </div>
          )}

          <div>
            <label htmlFor="title" className="text-xs font-bold text-muted block mb-1.5">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              placeholder="e.g. Build a landing page in React"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="description" className="text-xs font-bold text-muted block mb-1.5">
              Description
            </label>
            <textarea
              id="description"
              required
              rows={4}
              placeholder="What needs to get done, and what skills matter most..."
              className="w-full border border-violet/10 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/25 transition-shadow resize-none bg-white"
              style={{ borderRadius: "14px" }}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-muted block mb-1.5">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`text-xs font-bold chip-pop px-3.5 py-2 capitalize transition-colors ${
                    category === c ? "bg-violet text-white" : "text-muted hover:text-violet-ink bg-white border border-violet/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="skills" className="text-xs font-bold text-muted block mb-1.5">
              Required skills (comma separated)
            </label>
            <input id="skills" type="text" placeholder="React, Tailwind, Figma" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted block mb-1.5">Pricing type</label>
              <select
                value={pricingType}
                onChange={(e) => setPricingType(e.target.value)}
                className={inputClass}
              >
                {PRICING_TYPES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="rate" className="text-xs font-bold text-muted block mb-1.5">
                Amount (₹)
              </label>
              <input
                id="rate"
                type="number"
                min="0"
                required
                placeholder={pricingType === "hourly" ? "150" : pricingType === "fixed" ? "500" : "8000"}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="deadline" className="text-xs font-bold text-muted block mb-1.5">
              Deadline
            </label>
            <input id="deadline" type="date" className={inputClass} />
          </div>

          <button
            type="submit"
            className="w-full h-12 chip-pop bg-violet hover:bg-violet-dark text-white text-sm font-bold transition-all active:scale-[0.98] mt-2 shadow-[0_10px_24px_-8px_rgba(109,93,246,0.5)] hover:-translate-y-0.5"
          >
            Post job
          </button>
        </form>
      </section>
    </div>
  );
}
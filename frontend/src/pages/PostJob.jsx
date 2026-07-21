import { useState } from "react";
import Navbar from "../components/Navbar";

const CATEGORIES = ["assignment", "project", "internship", "gig"];
const PRICING_TYPES = [
  { value: "hourly", label: "Hourly rate" },
  { value: "fixed", label: "Fixed price" },
  { value: "stipend", label: "Monthly stipend" },
];

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
      <div className="min-h-screen">
        <Navbar />
        <div className="px-6 sm:px-12 py-24 max-w-lg mx-auto text-center">
          <h1 className="font-display text-2xl font-semibold mb-2">
            Listing created
          </h1>
          <p className="text-muted text-sm">
            This is a UI preview only — nothing was saved yet. Once we connect this form to the
            backend, it'll create a real job posting.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="px-6 sm:px-12 py-10 max-w-2xl mx-auto">
        <h1 className="font-display text-2xl font-semibold mb-1">
          Post a job
        </h1>
        <p className="text-muted text-sm mb-8">
          Reach verified student freelancers only.
        </p>

        {/* Poster type toggle */}
        <div className="grid grid-cols-2 gap-2 mb-8" role="radiogroup" aria-label="Posting as">
          <button
            type="button"
            role="radio"
            aria-checked={posterType === "student"}
            onClick={() => setPosterType("student")}
            className={`text-left rounded-lg border px-4 py-3 transition-colors ${
              posterType === "student" ? "border-indigo bg-indigo/5" : "border-line hover:border-strong"
            }`}
          >
            <p className="text-sm font-medium">Student</p>
            <p className="text-xs text-muted mt-0.5">Posting an assignment or project</p>
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={posterType === "company"}
            onClick={() => setPosterType("company")}
            className={`text-left rounded-lg border px-4 py-3 transition-colors ${
              posterType === "company" ? "border-indigo bg-indigo/5" : "border-line hover:border-strong"
            }`}
          >
            <p className="text-sm font-medium">Company</p>
            <p className="text-xs text-muted mt-0.5">Posting an internship or gig</p>
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {posterType === "company" && (
            <div>
              <label htmlFor="companyName" className="text-xs font-medium text-muted block mb-1.5">
                Company name
              </label>
              <input
                id="companyName"
                type="text"
                placeholder="Nimbus Labs"
                className="w-full h-11 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo"
              />
            </div>
          )}

          <div>
            <label htmlFor="title" className="text-xs font-medium text-muted block mb-1.5">
              Title
            </label>
            <input
              id="title"
              type="text"
              required
              placeholder="e.g. Build a landing page in React"
              className="w-full h-11 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo"
            />
          </div>

          <div>
            <label htmlFor="description" className="text-xs font-medium text-muted block mb-1.5">
              Description
            </label>
            <textarea
              id="description"
              required
              rows={4}
              placeholder="What needs to get done, and what skills matter most..."
              className="w-full rounded-lg border border-line px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted block mb-1.5">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`text-xs font-medium px-3.5 py-2 rounded-full border capitalize transition-colors ${
                    category === c
                      ? "bg-indigo text-white border-indigo"
                      : "border-line text-muted hover:border-strong"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="skills" className="text-xs font-medium text-muted block mb-1.5">
              Required skills (comma separated)
            </label>
            <input
              id="skills"
              type="text"
              placeholder="React, Tailwind, Figma"
              className="w-full h-11 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted block mb-1.5">Pricing type</label>
              <select
                value={pricingType}
                onChange={(e) => setPricingType(e.target.value)}
                className="w-full h-11 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo bg-paper"
              >
                {PRICING_TYPES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="rate" className="text-xs font-medium text-muted block mb-1.5">
                Amount (₹)
              </label>
              <input
                id="rate"
                type="number"
                min="0"
                required
                placeholder={pricingType === "hourly" ? "150" : pricingType === "fixed" ? "500" : "8000"}
                className="w-full h-11 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo"
              />
            </div>
          </div>

          <div>
            <label htmlFor="deadline" className="text-xs font-medium text-muted block mb-1.5">
              Deadline
            </label>
            <input
              id="deadline"
              type="date"
              className="w-full h-11 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo/30 focus:border-indigo"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-lg bg-indigo hover:bg-indigo-dark text-white text-sm font-medium transition-all duration-150 active:scale-[0.98] mt-2"
          >
            Post job
          </button>
        </form>
      </section>
    </div>
  );
}
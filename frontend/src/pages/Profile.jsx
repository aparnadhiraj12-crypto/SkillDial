import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import SkillDial from "../components/SkillDial";
import Reveal from "../components/Reveal";
import { ShieldCheck, Clock, ExternalLink, X } from "lucide-react";

const INITIAL_SKILLS = [
  { name: "React", level: 4 },
  { name: "Tailwind CSS", level: 5 },
  { name: "Python", level: 3 },
];

const INITIAL_PORTFOLIO = [
  {
    title: "E-commerce landing page",
    description: "Built with React + Tailwind for a college fest project.",
    url: "https://github.com/example/landing",
  },
];

const COURSES = ["BTech", "BSc", "BCA", "MTech", "MSc", "MCA", "Other"];

const fieldClass =
  "w-full h-11 chip-pop border border-violet/10 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/25 bg-white";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [portfolio, setPortfolio] = useState(INITIAL_PORTFOLIO);
  const [newSkill, setNewSkill] = useState("");
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [draft, setDraft] = useState({ title: "", description: "", url: "" });

  const [idFile, setIdFile] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("unverified");

  const [about, setAbout] = useState({ bio: "", college: "", course: "BTech", year: "", graduationYear: "" });
  const [editingAbout, setEditingAbout] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  function updateSkillLevel(index, level) {
    setSkills((prev) => prev.map((s, i) => (i === index ? { ...s, level } : s)));
  }

  function addSkill(e) {
    e.preventDefault();
    if (!newSkill.trim()) return;
    setSkills((prev) => [...prev, { name: newSkill.trim(), level: 3 }]);
    setNewSkill("");
  }

  function removeSkill(index) {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  }

  function addPortfolioItem(e) {
    e.preventDefault();
    if (!draft.title.trim()) return;
    setPortfolio((prev) => [...prev, draft]);
    setDraft({ title: "", description: "", url: "" });
    setShowPortfolioForm(false);
  }

  function handleIdUpload(e) {
    const file = e.target.files[0];
    if (file) setIdFile(file);
  }

  function submitVerification(e) {
    e.preventDefault();
    setVerificationStatus("pending");
  }

  function saveAbout(e) {
    e.preventDefault();
    setEditingAbout(false);
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-lilac">
        <Navbar />
        <div className="px-6 sm:px-8 py-24 text-center text-sm text-muted">
          You need to sign in to view your profile.
        </div>
      </div>
    );
  }

  const initials = user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  const hasAboutDetails = about.college || about.bio;
  const PORTFOLIO_ACCENTS = ["bg-violet", "bg-coral", "bg-mint"];

  return (
    <div className="min-h-screen bg-lilac">
      <Navbar />

      {/* Hero banner */}
      <section className="banner-pop relative overflow-hidden">
        <div className="blob w-56 h-56 -right-10 -top-16 bg-white/20" style={{ filter: "blur(24px)" }} />
        <div className="blob w-40 h-40 left-1/3 -bottom-24 bg-white/20" style={{ filter: "blur(24px)", animationDelay: "3s" }} />
        <div className="max-w-3xl mx-auto px-6 sm:px-8 pt-10 pb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <motion.div
              initial={{ scale: 0.7, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
              className="w-20 h-20 rounded-full bg-white text-violet-ink flex items-center justify-center text-2xl font-bold font-[var(--font-display-bold)] shadow-lg shrink-0"
            >
              {initials}
            </motion.div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-[var(--font-display-bold)] text-xl sm:text-2xl font-bold text-white">{user.name}</h1>
                {verificationStatus === "verified" && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-white text-mint chip-pop px-2.5 py-1">
                    <ShieldCheck size={12} /> Verified
                  </span>
                )}
                {verificationStatus === "pending" && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-white/20 text-white chip-pop px-2.5 py-1">
                    <Clock size={12} /> Pending review
                  </span>
                )}
                {verificationStatus === "unverified" && (
                  <span className="text-xs font-bold bg-white/15 text-white chip-pop px-2.5 py-1">Not verified</span>
                )}
              </div>
              <p className="text-sm text-white/75 mt-0.5">{user.email}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 sm:px-8 max-w-3xl mx-auto -mt-8 pb-16 relative space-y-5">
        {/* About */}
        <Reveal className="card-pop p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-bold text-violet-ink">About</h2>
            <button
              type="button"
              onClick={() => setEditingAbout((v) => !v)}
              className="text-xs font-bold text-violet hover:underline"
            >
              {editingAbout ? "Cancel" : hasAboutDetails ? "Edit" : "+ Add details"}
            </button>
          </div>

          {!editingAbout && !hasAboutDetails && (
            <p className="text-xs text-muted mt-2">
              Add a short bio and your college details so posters know who they're hiring.
            </p>
          )}

          {!editingAbout && hasAboutDetails && (
            <div className="mt-3 space-y-2">
              {about.bio && <p className="text-sm text-ink/80 leading-relaxed">{about.bio}</p>}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted pt-1">
                {about.college && <span>{about.college}</span>}
                {about.course && <span>{about.course}</span>}
                {about.year && <span>Year {about.year}</span>}
                {about.graduationYear && <span>Class of {about.graduationYear}</span>}
              </div>
            </div>
          )}

          {editingAbout && (
            <form onSubmit={saveAbout} className="mt-4 space-y-4">
              <div>
                <label htmlFor="bio" className="text-xs font-semibold text-muted block mb-1.5">Bio</label>
                <textarea
                  id="bio"
                  rows={3}
                  value={about.bio}
                  onChange={(e) => setAbout({ ...about, bio: e.target.value })}
                  placeholder="A couple lines about what you do and what you're looking for..."
                  className="w-full chip-pop border border-violet/10 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/25 resize-none bg-white"
                  style={{ borderRadius: "14px" }}
                />
              </div>

              <div>
                <label htmlFor="college" className="text-xs font-semibold text-muted block mb-1.5">College name</label>
                <input
                  id="college"
                  type="text"
                  value={about.college}
                  onChange={(e) => setAbout({ ...about, college: e.target.value })}
                  placeholder="e.g. IIT Hyderabad"
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="course" className="text-xs font-semibold text-muted block mb-1.5">Course</label>
                  <select
                    id="course"
                    value={about.course}
                    onChange={(e) => setAbout({ ...about, course: e.target.value })}
                    className={fieldClass}
                  >
                    {COURSES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="year" className="text-xs font-semibold text-muted block mb-1.5">Current year</label>
                  <input
                    id="year"
                    type="number"
                    min="1"
                    max="6"
                    value={about.year}
                    onChange={(e) => setAbout({ ...about, year: e.target.value })}
                    placeholder="3"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="gradYear" className="text-xs font-semibold text-muted block mb-1.5">Passing out</label>
                  <input
                    id="gradYear"
                    type="number"
                    min="2026"
                    max="2035"
                    value={about.graduationYear}
                    onChange={(e) => setAbout({ ...about, graduationYear: e.target.value })}
                    placeholder="2027"
                    className={fieldClass}
                  />
                </div>
              </div>

              <button type="submit" className="h-10 px-5 chip-pop bg-violet hover:bg-violet-dark text-white text-sm font-bold transition-colors">
                Save
              </button>
            </form>
          )}
        </Reveal>

        {/* Verification */}
        {verificationStatus !== "verified" && (
          <Reveal delay={0.05} className="card-pop p-5">
            <h2 className="text-sm font-bold text-violet-ink mb-1">Verify you're a student</h2>
            <p className="text-xs text-muted mb-4">
              Upload a photo of your college ID card. Your college email ({user.email}) plus your ID
              helps posters trust you're currently enrolled.
            </p>

            {verificationStatus === "pending" ? (
              <p className="text-xs font-medium text-coral bg-coral-soft chip-pop px-3.5 py-2.5">
                Your ID has been submitted and is awaiting review. This usually takes 1-2 days.
              </p>
            ) : (
              <form onSubmit={submitVerification} className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIdUpload}
                  required
                  className="block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:chip-pop file:border file:border-violet/15 file:text-sm file:font-semibold file:bg-white hover:file:bg-lilac file:cursor-pointer cursor-pointer"
                />
                {idFile && <p className="text-xs text-muted">Selected: {idFile.name}</p>}
                <button type="submit" className="h-10 px-5 chip-pop bg-violet hover:bg-violet-dark text-white text-sm font-bold transition-colors">
                  Submit for verification
                </button>
              </form>
            )}
          </Reveal>
        )}

        {/* Skills */}
        <Reveal delay={0.1} className="card-pop p-5">
          <h2 className="text-sm font-bold text-violet-ink mb-4">Skills</h2>
          <div className="grid sm:grid-cols-2 gap-2.5 mb-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between bg-lilac chip-pop px-4 py-3"
              >
                <span className="text-sm font-mono">{skill.name}</span>
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => updateSkillLevel(i, n)}
                        aria-label={`Set ${skill.name} to level ${n}`}
                        className="p-0.5"
                      >
                        <span
                          className={`block w-1.5 rounded-sm transition-colors ${n <= skill.level ? "bg-violet" : "bg-white"}`}
                          style={{ height: `${6 + n * 3}px` }}
                        />
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSkill(i)}
                    className="text-muted hover:text-coral"
                    aria-label={`Remove ${skill.name}`}
                  >
                    <X size={13} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <form onSubmit={addSkill} className="flex gap-2">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill, e.g. Figma"
              className="flex-1 h-11 chip-pop border border-violet/10 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/25 bg-white"
            />
            <button type="submit" className="h-11 px-5 chip-pop border border-violet/15 text-sm font-bold text-violet-ink hover:bg-lilac transition-colors bg-white">
              Add
            </button>
          </form>
        </Reveal>

        {/* Portfolio */}
        <Reveal delay={0.15} className="card-pop p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-violet-ink">Portfolio</h2>
            <button
              type="button"
              onClick={() => setShowPortfolioForm((v) => !v)}
              className="text-xs font-bold text-violet hover:underline"
            >
              {showPortfolioForm ? "Cancel" : "+ Add work"}
            </button>
          </div>

          {showPortfolioForm && (
            <form onSubmit={addPortfolioItem} className="bg-lilac chip-pop p-4 mb-4 space-y-3" style={{ borderRadius: "16px" }}>
              <input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="Project title"
                required
                className="w-full h-10 chip-pop border border-violet/10 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/25 bg-white"
              />
              <textarea
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                placeholder="Short description"
                rows={2}
                className="w-full border border-violet/10 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/25 resize-none bg-white"
                style={{ borderRadius: "14px" }}
              />
              <input
                value={draft.url}
                onChange={(e) => setDraft({ ...draft, url: e.target.value })}
                placeholder="Link (GitHub, Behance, etc.)"
                className="w-full h-10 chip-pop border border-violet/10 px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet/25 bg-white"
              />
              <button type="submit" className="h-10 px-5 chip-pop bg-violet hover:bg-violet-dark text-white text-sm font-bold transition-colors">
                Save
              </button>
            </form>
          )}

          <div className="grid sm:grid-cols-2 gap-3">
            {portfolio.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3, scale: 1.01 }}
                className="bg-lilac p-4 relative overflow-hidden"
                style={{ borderRadius: "16px" }}
              >
                <div className={`absolute top-0 left-0 w-full h-1.5 ${PORTFOLIO_ACCENTS[i % PORTFOLIO_ACCENTS.length]}`} />
                <p className="text-sm font-bold mb-1 mt-1">{item.title}</p>
                {item.description && <p className="text-xs text-muted mb-2 leading-relaxed">{item.description}</p>}
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-violet font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    View work <ExternalLink size={11} />
                  </a>
                )}
              </motion.div>
            ))}
            {portfolio.length === 0 && <p className="text-sm text-muted sm:col-span-2">No work added yet.</p>}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
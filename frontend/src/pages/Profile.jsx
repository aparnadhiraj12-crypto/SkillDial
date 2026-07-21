import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SkillDial from "../components/SkillDial";

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

export default function Profile() {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [portfolio, setPortfolio] = useState(INITIAL_PORTFOLIO);
  const [newSkill, setNewSkill] = useState("");
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [draft, setDraft] = useState({ title: "", description: "", url: "" });

  const [idFile, setIdFile] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("unverified");

  const [about, setAbout] = useState({
    bio: "",
    college: "",
    course: "BTech",
    year: "",
    graduationYear: "",
  });
  const [editingAbout, setEditingAbout] = useState(false);
  const [aboutSaved, setAboutSaved] = useState(false);

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
    setAboutSaved(true);
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="px-6 sm:px-12 py-24 text-center text-sm text-muted">
          You need to sign in to view your profile.
        </div>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const hasAboutDetails = about.college || about.bio;

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="px-6 sm:px-12 py-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xl font-medium font-display">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl font-semibold">{user.name}</h1>
              {verificationStatus === "verified" && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  ✓ Verified
                </span>
              )}
              {verificationStatus === "pending" && (
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                  Pending review
                </span>
              )}
              {verificationStatus === "unverified" && (
                <span className="text-xs bg-ink/5 text-muted px-2 py-0.5 rounded-full font-medium">
                  Not verified
                </span>
              )}
            </div>
            <p className="text-sm text-muted">{user.email}</p>
          </div>
        </div>

        {/* About */}
        <div className="card p-5 mb-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-medium">About</h2>
            <button
              type="button"
              onClick={() => setEditingAbout((v) => !v)}
              className="text-xs font-medium text-brand hover:underline"
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
                <label htmlFor="bio" className="text-xs font-medium text-muted block mb-1.5">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={3}
                  value={about.bio}
                  onChange={(e) => setAbout({ ...about, bio: e.target.value })}
                  placeholder="A couple lines about what you do and what you're looking for..."
                  className="w-full rounded-lg border border-line px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none"
                />
              </div>

              <div>
                <label htmlFor="college" className="text-xs font-medium text-muted block mb-1.5">
                  College name
                </label>
                <input
                  id="college"
                  type="text"
                  value={about.college}
                  onChange={(e) => setAbout({ ...about, college: e.target.value })}
                  placeholder="e.g. IIT Hyderabad"
                  className="w-full h-11 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="course" className="text-xs font-medium text-muted block mb-1.5">
                    Course
                  </label>
                  <select
                    id="course"
                    value={about.course}
                    onChange={(e) => setAbout({ ...about, course: e.target.value })}
                    className="w-full h-11 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white"
                  >
                    {COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="year" className="text-xs font-medium text-muted block mb-1.5">
                    Current year
                  </label>
                  <input
                    id="year"
                    type="number"
                    min="1"
                    max="6"
                    value={about.year}
                    onChange={(e) => setAbout({ ...about, year: e.target.value })}
                    placeholder="3"
                    className="w-full h-11 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  />
                </div>
                <div>
                  <label htmlFor="gradYear" className="text-xs font-medium text-muted block mb-1.5">
                    Passing out
                  </label>
                  <input
                    id="gradYear"
                    type="number"
                    min="2026"
                    max="2035"
                    value={about.graduationYear}
                    onChange={(e) => setAbout({ ...about, graduationYear: e.target.value })}
                    placeholder="2027"
                    className="w-full h-11 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="h-10 px-4 rounded-lg bg-brand hover:bg-brand-dark text-white text-sm font-medium transition-colors"
              >
                Save
              </button>
            </form>
          )}
        </div>

        {/* Verification */}
        {verificationStatus !== "verified" && (
          <div className="card p-5 mb-6">
            <h2 className="text-sm font-medium mb-1">Verify you're a student</h2>
            <p className="text-xs text-muted mb-4">
              Upload a photo of your college ID card. Your college email ({user.email}) plus your ID
              helps posters trust you're currently enrolled.
            </p>

            {verificationStatus === "pending" ? (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3.5 py-2.5">
                Your ID has been submitted and is awaiting review. This usually takes 1-2 days.
              </p>
            ) : (
              <form onSubmit={submitVerification} className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIdUpload}
                  required
                  className="block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-line file:text-sm file:font-medium file:bg-white hover:file:border-strong file:cursor-pointer cursor-pointer"
                />
                {idFile && <p className="text-xs text-muted">Selected: {idFile.name}</p>}
                <button
                  type="submit"
                  className="h-10 px-4 rounded-lg bg-brand hover:bg-brand-dark text-white text-sm font-medium transition-colors"
                >
                  Submit for verification
                </button>
              </form>
            )}
          </div>
        )}

        {/* Skills */}
        <div className="card p-5 mb-6">
          <h2 className="text-sm font-medium mb-4">Skills</h2>
          <div className="space-y-3 mb-4">
            {skills.map((skill, i) => (
              <div
                key={skill.name}
                className="flex items-center justify-between border border-line rounded-lg px-4 py-3"
              >
                <span className="text-sm font-mono">{skill.name}</span>
                <div className="flex items-center gap-3">
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
                          className={`block w-1.5 rounded-sm transition-colors ${
                            n <= skill.level ? "bg-brand" : "bg-line"
                          }`}
                          style={{ height: `${6 + n * 3}px` }}
                        />
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSkill(i)}
                    className="text-xs text-muted hover:text-ink"
                    aria-label={`Remove ${skill.name}`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={addSkill} className="flex gap-2">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill, e.g. Figma"
              className="flex-1 h-10 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-lg border border-line text-sm font-medium hover:border-strong transition-colors bg-white"
            >
              Add
            </button>
          </form>
        </div>

        {/* Portfolio */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium">Portfolio</h2>
            <button
              type="button"
              onClick={() => setShowPortfolioForm((v) => !v)}
              className="text-xs font-medium text-brand hover:underline"
            >
              {showPortfolioForm ? "Cancel" : "+ Add work"}
            </button>
          </div>

          {showPortfolioForm && (
            <form onSubmit={addPortfolioItem} className="border border-line rounded-lg p-4 mb-4 space-y-3">
              <input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="Project title"
                required
                className="w-full h-10 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
              <textarea
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                placeholder="Short description"
                rows={2}
                className="w-full rounded-lg border border-line px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand resize-none"
              />
              <input
                value={draft.url}
                onChange={(e) => setDraft({ ...draft, url: e.target.value })}
                placeholder="Link (GitHub, Behance, etc.)"
                className="w-full h-10 rounded-lg border border-line px-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
              <button
                type="submit"
                className="h-10 px-4 rounded-lg bg-brand hover:bg-brand-dark text-white text-sm font-medium transition-colors"
              >
                Save
              </button>
            </form>
          )}

          <div className="space-y-3">
            {portfolio.map((item, i) => (
              <div key={i} className="border border-line rounded-lg p-4">
                <p className="text-sm font-medium mb-1">{item.title}</p>
                {item.description && <p className="text-xs text-muted mb-2">{item.description}</p>}
                {item.url && (
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-brand hover:underline">
                    {item.url}
                  </a>
                )}
              </div>
            ))}
            {portfolio.length === 0 && <p className="text-sm text-muted">No work added yet.</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
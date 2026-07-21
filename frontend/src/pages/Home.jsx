import { Link } from "react-router-dom";
import { FileText, Layers, Briefcase, Wallet, ArrowRight, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import SkillDial from "../components/SkillDial";

const categories = [
  { title: "Assignments", sub: "from ₹50/hr", icon: FileText, accent: "bg-amber-50 text-amber-700" },
  { title: "Projects", sub: "peer-to-peer", icon: Layers, accent: "bg-brand/10 text-brand" },
  { title: "Internships", sub: "from companies", icon: Briefcase, accent: "bg-teal-50 text-teal-700" },
  { title: "Low-cost gigs", sub: "company posted", icon: Wallet, accent: "bg-fuchsia-50 text-fuchsia-700" },
];

const stats = [
  { value: "2,400+", label: "verified students" },
  { value: "₹18L+", label: "paid out" },
  { value: "4.7★", label: "avg. rating" },
];

const freelancers = [
  { initials: "AR", name: "Aisha R.", course: "BTech CSE, 3rd yr", skills: [{ name: "UI design", level: 5 }, { name: "Figma", level: 4 }], rating: 4.8, jobs: 12, rate: 200, accent: "from-brand to-violet-500" },
  { initials: "RK", name: "Rohan K.", course: "MTech Data Sci, 1st yr", skills: [{ name: "Python", level: 5 }, { name: "ML", level: 3 }], rating: 4.9, jobs: 8, rate: 150, accent: "from-teal-500 to-emerald-500" },
  { initials: "SP", name: "Sneha P.", course: "BSc Stats, 2nd yr", skills: [{ name: "Excel", level: 4 }, { name: "Writing", level: 5 }], rating: 4.7, jobs: 20, rate: 80, accent: "from-fuchsia-500 to-pink-500" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_20%_0%,black,transparent)]" />
        <div className="relative px-6 sm:px-12 py-16 sm:py-24 max-w-4xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white border border-line rounded-full px-3 py-1.5 mb-6 shadow-sm">
            <ShieldCheck size={13} className="text-brand" />
            Verified students only
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight mb-5">
            Freelance work,
            <br />
            only for students.
          </h1>
          <p className="text-muted text-lg max-w-xl mb-8">
            Post a task, hire a student, or find paid internships — verified BTech, BSc, MTech and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/signin"
              className="h-12 px-6 rounded-lg bg-brand hover:bg-brand-dark text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              Find work <ArrowRight size={15} />
            </Link>
            <Link
              to="/signin"
              className="h-12 px-6 rounded-lg border border-line hover:border-strong bg-white text-sm font-medium flex items-center justify-center transition-colors"
            >
              Post a job
            </Link>
          </div>
        </div>
      </section>

      {/* Bento: stats + categories */}
      <section className="px-6 sm:px-12 pb-20">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Stats — spans 2 cols on large screens */}
          <div className="col-span-2 lg:col-span-2 card p-6 bg-ink text-paper flex flex-col justify-between">
            <p className="text-xs text-white/50 font-medium mb-4">Trusted by students across India</p>
            <div className="space-y-3">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline justify-between">
                  <span className="font-display text-2xl font-semibold">{s.value}</span>
                  <span className="text-xs text-white/50">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="card p-5 col-span-1 lg:col-span-1 flex flex-col justify-between">
                <div className={`w-9 h-9 rounded-lg ${c.accent} flex items-center justify-center mb-6`}>
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div>
                  <p className="font-medium text-sm">{c.title}</p>
                  <p className="text-xs text-muted mt-0.5">{c.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured freelancers */}
      <section className="px-6 sm:px-12 pb-24">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-medium">Featured student freelancers</p>
          <Link to="/signin" className="text-xs font-medium text-brand hover:underline flex items-center gap-1">
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {freelancers.map((f) => (
            <div key={f.name} className="card overflow-hidden">
              <div className={`h-1.5 bg-gradient-to-r ${f.accent}`} />
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${f.accent} text-white flex items-center justify-center text-sm font-medium font-display`}>
                    {f.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{f.name}</p>
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
                <p className="text-xs text-muted">
                  ★ {f.rating} · {f.jobs} projects · ₹{f.rate}/hr
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
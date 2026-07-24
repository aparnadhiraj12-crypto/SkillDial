import { Link, useNavigate, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/feed", label: "For you" },
  { to: "/jobs", label: "Browse work" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  function handleSignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  }

  return (
    <nav className="navbar-blur sticky top-0 z-20 border-b border-line">
      <div className="max-w-[1560px] mx-auto flex items-center justify-between px-6 sm:px-10 xl:px-16 h-16">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-[15px] tracking-tight">
          <span className="w-6 h-6 rounded-[6px] bg-violet text-white flex items-center justify-center text-[10px] font-bold">
            SD
          </span>
          SkillDial
        </Link>

        {user ? (
          <div className="flex items-center gap-1">
            <div className="hidden sm:flex items-center gap-1 mr-3">
              {LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                    location.pathname === l.to
                      ? "text-violet bg-lilac font-bold"
                      : "text-muted hover:text-ink hover:bg-ink/[0.03]"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3 pl-3 border-l border-line">
              <div className="hidden sm:flex w-7 h-7 rounded-full bg-ink/5 items-center justify-center text-xs font-medium">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <span className="hidden md:inline text-sm font-medium">{user.name}</span>
              <button
                onClick={handleSignOut}
                className="text-xs font-medium text-muted hover:text-ink transition-colors border border-line rounded-md px-3 py-1.5 hover:border-strong"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/signin"
              className="text-sm font-medium text-muted hover:text-ink transition-colors px-3 py-2"
            >
              Sign in
            </Link>
            <Link
              to="/signin"
              className="text-sm font-medium bg-violet hover:bg-violet-dark text-white transition-colors px-4 py-2 chip-pop shadow-[0_6px_16px_-6px_rgba(109,93,246,0.5)]"
            >
              Get started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
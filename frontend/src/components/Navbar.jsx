import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  function handleSignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  }

  return (
    <nav className="navbar-glass sticky top-0 z-20 flex items-center justify-between px-6 sm:px-12 py-4 border-b border-line">
      <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg">
        <span className="w-2.5 h-2.5 bg-brand rounded-sm" />
        SkillDial
      </Link>

      {user ? (
        <div className="flex items-center gap-4">
          <Link to="/feed" className="text-sm font-medium text-muted hover:text-ink transition-colors">
            Home
          </Link>
          <Link to="/jobs" className="text-sm font-medium text-muted hover:text-ink transition-colors">
            Browse jobs
          </Link>
          <Link to="/profile" className="text-sm font-medium text-muted hover:text-ink transition-colors">
            Profile
          </Link>
          <div className="flex items-center gap-2 pl-2">
            <span className="text-sm font-medium">{user.name}</span>
            <button
              onClick={handleSignOut}
              className="text-xs text-muted hover:text-ink transition-colors border border-line rounded-lg px-3 py-1.5"
            >
              Sign out
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/signin"
            className="text-sm font-medium text-muted hover:text-ink transition-colors px-3 py-2"
          >
            Sign in
          </Link>
          <Link
            to="/signin"
            className="text-sm font-medium bg-brand hover:bg-brand-dark text-white transition-colors px-4 py-2 rounded-lg"
          >
            Get started
          </Link>
        </div>
      )}
    </nav>
  );
}
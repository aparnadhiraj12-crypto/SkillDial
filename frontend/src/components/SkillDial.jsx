export default function SkillDial({ level = 0, max = 5, size = "sm" }) {
  const notches = Array.from({ length: max }, (_, i) => i < level);
  const dims = size === "lg" ? "w-3 h-6" : "w-1.5 h-4";
  const gap = size === "lg" ? "gap-1.5" : "gap-1";

  return (
    <div className={`inline-flex items-end ${gap}`} role="img" aria-label={`Skill level ${level} out of ${max}`}>
      {notches.map((filled, i) => (
        <span
          key={i}
          className={`${dims} rounded-sm ${filled ? "bg-indigo" : "bg-line"}`}
          style={{ height: `${(size === "lg" ? 10 : 6) + i * (size === "lg" ? 5 : 3)}px` }}
        />
      ))}
    </div>
  );
}
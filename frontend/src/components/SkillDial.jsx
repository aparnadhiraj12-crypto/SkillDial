// The signature element of SkillDial: a compact step-meter that shows a
// verified skill level (1-5) at a glance, in place of a generic star rating.
export default function SkillDial({ level = 0, max = 5, size = "sm", showLabel = false }) {
  const bars = Array.from({ length: max }, (_, i) => i < level);
  const isLg = size === "lg";
  const barWidth = isLg ? "w-2" : "w-1";
  const gap = isLg ? "gap-1" : "gap-0.5";
  const baseHeight = isLg ? 7 : 4;
  const step = isLg ? 4 : 2.5;

  return (
    <span className={`inline-flex items-center ${gap}`} role="img" aria-label={`Skill level ${level} out of ${max}`}>
      <span className={`inline-flex items-end ${gap}`}>
        {bars.map((filled, i) => (
          <span
            key={i}
            className={`${barWidth} rounded-[1.5px] ${filled ? "bg-brand" : "bg-line"}`}
            style={{ height: `${baseHeight + i * step}px` }}
          />
        ))}
      </span>
      {showLabel && <span className="text-xs font-mono text-muted ml-1.5">{level}/{max}</span>}
    </span>
  );
}
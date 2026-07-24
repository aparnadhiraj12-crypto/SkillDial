import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

// Counts up to `value` once it scrolls into view. `format` lets callers
// prefix/suffix currency symbols, "+", "/5" etc.
export default function AnimatedNumber({ value, format = (n) => n, duration = 1.2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  useEffect(() => spring.on("change", (v) => setDisplay(v)), [spring]);

  return <span ref={ref}>{format(Math.round(display))}</span>;
}
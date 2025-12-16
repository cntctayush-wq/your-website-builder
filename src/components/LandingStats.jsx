import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { FadeInUp } from "./AnimatedSection";

function AnimatedCounter({ value, suffix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      onUpdate: (v) => setDisplayValue(Math.floor(v))
    });
    return () => controls.stop();
  }, [value]);

  return (
    <span>{displayValue.toLocaleString()}{suffix}</span>
  );
}

const stats = [
  { value: 99, suffix: "%", label: "Detection Accuracy" },
  { value: 500, suffix: "K+", label: "Documents Analyzed" },
  { value: 50, suffix: "M+", label: "Pages Scanned" },
  { value: 10, suffix: "K+", label: "Happy Users" }
];

export function LandingStats() {
  return (
    <section className="py-16 border-y bg-gradient-to-r from-primary/5 via-chart-2/5 to-primary/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <FadeInUp key={stat.label} delay={index * 0.1}>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

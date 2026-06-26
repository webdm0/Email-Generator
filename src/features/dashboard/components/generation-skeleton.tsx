"use client";

import { motion } from "framer-motion";

export function GenerationSkeleton() {
  return (
    <div className="space-y-4">
      <motion.div
        className="h-5 w-40 rounded-full bg-white/10"
        animate={{ opacity: [0.35, 0.8, 0.35] }}
        transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      {[0, 1, 2, 3, 4].map((item) => (
        <motion.div
          key={item}
          className="h-4 rounded-full bg-white/8"
          style={{ width: item === 4 ? "72%" : "100%" }}
          animate={{ opacity: [0.25, 0.7, 0.25], x: [0, 2, 0] }}
          transition={{
            duration: 1.4,
            delay: item * 0.08,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

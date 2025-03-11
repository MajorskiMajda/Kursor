"use client";

import { useState } from "react";
import { motion } from "motion/react" // Ensure you're using the correct import

// MotionDiv for h1, can use any tag for different elements
export const MotionDiv = motion.div;

interface MotionCProps {
  children: React.ReactNode;
  custom?: number;
  className?: string;
  initial?: string;
  animate?: string;
  variants?: any;
}

const MotionC: React.FC<MotionCProps> = ({
  children,
  custom = 0,
  className = "",
  initial = "hidden",
  animate = "visible",
  variants,
}) => {
  const [isHovered, setIsHovered] = useState(false); // Manage hover state

  // Default animation variants (can be overridden via props)
  const defaultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.3 },
    }),
  };

  return (
    <motion.div
      custom={custom}
      className={`${className} ${isHovered ? 'scale-105' : ''} transition-transform`} // Add hover scale manually
      initial={initial}
      animate={animate}
      variants={variants || defaultVariants}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true when mouse enters
      onMouseLeave={() => setIsHovered(false)} // Set hover state to false when mouse leaves
    >
      {children}
    </motion.div>
  );
};

export default MotionC;

"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

type ScrollPathAnimationProps = {
  className?: string; // className is optional
};

gsap.registerPlugin(ScrollTrigger);

const ScrollPathAnimation: React.FC<ScrollPathAnimationProps> = ({ className }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const targetElementRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const progress = progressRef.current;

    if (path) {
      const strokeLength = path.getTotalLength();

      // Set up the stroke properties for path visibility
      gsap.set(path, {
        strokeDasharray: strokeLength,
        strokeDashoffset: strokeLength,
      });

      // Create the animation for the stroke
      const anim = gsap.fromTo(
        path,
        { strokeDashoffset: strokeLength },
        {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power2.out",
        }
      );

      // Attach ScrollTrigger to animate the stroke on scroll
      const scrollTrigger = ScrollTrigger.create({
        trigger: "#tr", // Ensure this ID matches your target element in the DOM
        animation: anim,
        start: "top center",
        once: true,
        scrub: 0.5, // Smoother scrubbing,
        onEnterBack: () => {
          // Ensure the stroke stays completed when scrolling back
          gsap.set(path, { strokeDashoffset: 0 });
        },
      });
      return () => {
        scrollTrigger.kill();
        anim.kill();
      ;}
    }
  }, []);

  return (
    <div className={className} suppressHydrationWarning={true}>
      <div id="tr" ref={targetElementRef} className="scroll-path">
        <svg
          className="svgput bg-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0.5 0.5 388 268"
        >
          {/* Gradient for the stroke */}
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00b4db" />
              <stop offset="100%" stopColor="#0083b0" />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            className="put"
            d="M3.80794 172.045C7.88519 173.145 16.0845 167.811 19.0919 166.154C30.5373 159.847 38.2306 151.097 45.4751 141.115C57.8452 124.071 72.0119 107.37 81.5017 88.8273C88.9352 74.3027 96.9019 59.7379 98.8781 43.7407C99.9646 34.9457 110.457 13.9901 100.971 7.16407C51.8631 -28.171 28.439 128.69 23.5498 148.479C18.9033 167.286 18.6223 186.658 14.907 205.594C11.3683 223.63 7.63036 241.765 3.80794 259.764C1.41313 271.04 2.04066 267.951 2.17036 258.618C2.38112 243.453 6.47705 227.9 10.7221 213.286C14.9794 198.63 23.4659 181.83 34.9218 170.572C38.8685 166.694 53.2205 145.393 60.7591 149.134C66.0287 151.749 66.827 164.636 67.3094 169.1C68.4784 179.914 64.6036 192.185 63.1245 202.976C61.8921 211.966 57.2393 222.559 58.8486 231.533C59.6855 236.2 62.5594 246.83 68.4921 248.472C80.9621 251.923 97.3174 232.385 102.881 224.987C115.458 208.266 128.263 183.473 128.263 163.208C128.263 157.047 127.811 149.576 119.348 148.561C111.665 147.64 109.754 158.326 107.794 163.208C98.9417 185.256 92.9041 202.697 98.7872 226.215C100.276 232.165 102.163 244.528 110.978 245.362C125.435 246.731 138.769 230.646 146.641 221.796C193.739 168.844 244.689 96.5675 223.243 25.0842C215.825 0.35799 190.557 56.8655 188.854 62.3972C176.812 101.507 166.11 142.902 166.11 183.747C166.11 203.526 172.476 233.793 196.314 241.925C208.761 246.172 218.945 236.738 228.064 230.224C242.216 220.116 251.48 204.656 262.453 191.929C276.933 175.135 283.122 153.04 290.383 133.096C298.126 111.827 309.306 86.2393 309.306 63.7065C309.306 56.2857 304.44 49.9562 302.028 43.0861C301.204 40.7373 300.418 29.3535 297.843 28.0299C289.712 23.851 278.221 43.5698 275.645 47.5047C255.12 78.854 249.505 114.454 246.533 150.279C244.352 176.558 236.095 203.659 247.806 229.16C250.532 235.097 258.537 238.307 264.91 240.371C273.231 243.065 281.292 232.045 286.198 227.278C299.157 214.69 315.982 192.548 318.131 175.155C318.542 171.83 323.161 157.059 320.587 166.317C317.839 176.205 313.951 186.132 310.034 195.693C304.467 209.285 307.293 237.028 330.504 231.615C350.555 226.94 366.681 203.916 370.624 186.774C373.999 172.102 364.066 156.863 348.062 151.425C337.931 147.982 318.9 164.367 332.96 172.045C355.811 184.524 376.053 163.796 387 148.479"
            stroke="blue" // Apply gradient to the stroke
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Glow effect */}
        </svg>
      </div>
    </div>
  );
};

export default ScrollPathAnimation;
"use client";

import { useState, useEffect } from "react";
import MotionC from "../../ui/motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface PricingProps {
  name: string;
  price: string;
  features: string[];
  buttonLabel?: string;
}

interface SectionProps {
  sectionId: string;
  title: string;
  description: string;
  items: (FeatureProps | PricingProps)[];
  type: "features" | "pricing";
  lgGridCols: string; // Add this prop to control grid columns
}

const SectionLayout = ({
  sectionId,
  title,
  description,
  items,
  type,
  lgGridCols, // Destructure the new prop
}: SectionProps) => {
  const [showSection, setShowSection] = useState(false);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSection(true);
        }
      },
      { threshold: 0.6 }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, [sectionId]);

  return (
    <section id={sectionId} className="py-6 px-8">
      <MotionC
        initial="hidden"
        animate={showSection ? "visible" : "hidden"}
        className="lg:px-8 lg:pb-16 mx-auto"
      >
        <h2 className="lg:text-5xl text-3xl font-bold text-neutral-300-900 text-center lg:p-8 pb-8">{title}</h2>
        <p className=" lg:text-xl text-lg text-neutral-300-600 text-left">{description}</p>

        {/* Use lgGridCols prop here to dynamically set the grid columns */}
        <div className={`mt-12 grid grid-cols-1 sm:grid-cols-2 ${lgGridCols} gap-8 justify-center mx-auto`}>
          {items.map((item, index) => {
            if ("icon" in item) {
              // Handle FeatureProps
              return (
                <MotionC
                  key={index}
                  className={`bg-white ${lgGridCols}  sh border-solid border-color border-2 border rounded-md p-6 text-left transform transition hover:scale-105`}
                  custom={index}
                  initial="hidden"
                  animate={showSection ? "visible" : "hidden"}
                >
                  <item.icon className="h-12 w-12 ib" />
                  <h3 className="mt-4 lg:text-2xl text-xl font-semibold text-neutral-300-900">{item.title}</h3>
                  <p className="mt-2 lg:text-xl text-lg text-neutral-300-600">{item.description}</p>
                </MotionC>
              );
            } else if ("features" in item) {
              // Handle PricingProps and display the features
              return (
                <MotionC
                  key={index}
                  className="bg-white sh border-solid border-color border-2 border rounded-md p-6 text-left transform transition hover:scale-105"
                  custom={index}
                  initial="hidden"
                  animate={showSection ? "visible" : "hidden"}
                >
                  <h3 className="mt-4 lg:text-3xl text-2xl font-bold text-neutral-300-900">{item.name}</h3>
                  <h3 className="mt-2 lg:text-2xl text-xl font-semibold">{item.price}</h3>
                  <ul className="mt-4 space-y-4 lg:text-xl text-lg text-neutral-300-600">
                    {item.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <CheckCircleIcon className="h-8 w-8 " />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {item.buttonLabel && (
                    <button className="mt-6 px-6 py-2 bgc download font-semibold rounded-md">
                      {item.buttonLabel}
                    </button>
                  )}
                </MotionC>
              );
            }
            return null;
          })}
        </div>
      </MotionC>
    </section>
  );
};

export default SectionLayout;

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MotionC from "../../ui/motion";

const HowItWorks = () => {
  // Steps data for reuse and maintainability
  const steps = [
    {
      step: "Prvi Korak: Prijavite se",
      description: "Create an account to access all of our features and start your journey.",
    },
    {
      step: "Drugi Korak: Podesite svoj profil",
      description: "Personalize your profile to reflect your preferences and goals.",
    },
    {
      step: "Treći Korak: Započnite sa učenjem",
      description: "Begin exploring the features and taking full advantage of our services.",
    },
    {
      step: "Četvrti Korak: Uživajte u benefitima",
      description: "Experience the full range of benefits and features designed for your success.",
    },
  ];

  return (
    <>
      <section className="px-8 mt-12">
        <MotionC>
          <h2 className="lg:text-5xl text-3xl font-bold text-neutral-300-900 text-center lg:p-8 pb-5">Kako funkcioniše naša platforma</h2>
          <p className=" lg:text-xl text-lg text-neutral-300-600 text-left lg:px-8">
            U narednih nekoliko koraka objasnićemo Vam kako da započnete svoj put ka usvrsavanju svojih ciljeva.
          </p>

          <div className="mt-12 flex flex-col items-center justify-evenly md:flex-row space-y-12 md:space-y-0 md:space-x-12">
            {/* Left Side: Steps */}
            <div className="w-full lg:w-2/4 md:w-3/4 space-y-12 lg:px-24">
              {steps.map((step, index) => (
                <MotionC key={index}>
                  <div className="flex items-top">
                    {/* Number to the left */}
                    <div className="flex-shrink-0 border-solid border-black sh border-2 lg:w-14 lg:h-14 w-14 h-14 bg-white flex items-center justify-center rounded-full mr-8">
                      <span className="lg:text-2xl text-xl font-semibold text-black">{index + 1}</span>
                    </div>
                    {/* Step description */}
                    <div>
                      <h3 className="lg:text-2xl text-2xl font-semibold text-neutral-300-900">{step.step}</h3>
                      <p className="mt-2 lg:text-xl text-lg text-neutral-300-600">{step.description}</p>
                    </div>
                  </div>
                </MotionC>
              ))}
            </div>

            {/* Right Side: Image */}
            <div className="w-full md:w-2/4 lg:w-2/4 flex justify-center mt-12 md:mt-0">
              <Image
                className="rounded-md"
                src="/man.jpg"
                width={800}
                height={600}
                objectFit="contain"
                alt="Screenshots of the dashboard project showing desktop version"
              />
            </div>
          </div>
        </MotionC>
      </section>
      <div id="feature-section"></div>
    </>
  );
};

export default HowItWorks;

import React, { useState } from "react";
import BorderGlow from "../components/BorderGlow";
import { motion } from "motion/react";
import { education, experience } from "@/data/content";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const heading = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export default function Resume() {
  const [hoveredExperience, setHoveredExperience] = useState(null);
  const [hoveredEducation, setHoveredEducation] = useState(null);
  const [hoveredCertification, setHoveredCertification] = useState(null);

  return (
    <section id="resume">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between mt-16 w-full px-6 md:px-8 lg:px-12 py-6 text-white">
        <div className="w-full p-6">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={heading}
            className="text-2xl mb-6 md:mb-8 lg:mb-12 md:text-4xl lg:text-6xl text-center aclonica-regular font-bold"
          >
            My Experience
          </motion.h1>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="flex flex-col gap-6"
          >
            {experience.map((exp, i) => (
              <motion.div key={i} variants={item}>
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#120F17"
                  borderRadius={28}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={["#c084fc", "#f472b6", "#38bdf8"]}
                >
                  <div
                    onMouseEnter={() => setHoveredExperience(i)}
                    onMouseLeave={() => setHoveredExperience(null)}
                    className="relative overflow-hidden flex flex-col gap-8 md:flex-row justify-center items-start p-[2em] min-h-45"
                  >
                    {/* Overlay */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: hoveredExperience === i ? 1 : 0,
                        y: hoveredExperience === i ? 0 : 30,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-x-0 bottom-0 bg-amber-400 aclonica-regular text-sm text-[#0b0f14] p-4 rounded-3xl z-10 will-change-transform"
                    >
                      <p>{exp.description}</p>
                    </motion.div>

                    {/* Normal content */}
                    <div className="flex-1">
                      <h2 className="font-bold text-xl text-amber-400">
                        {exp.year}
                      </h2>

                      <h3 className="text-sm font-light mb-4">{exp.title}</h3>

                      <h1 className="text-sm aclonica-regular">
                        {exp.subtitle}
                      </h1>
                    </div>

                    {/* Image */}
                    {exp.image && (
                      <img
                        className="w-28 m-auto object-contain"
                        src={exp.image}
                        alt={exp.subtitle || "Experience"}
                      />
                    )}
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="w-full p-6">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={heading}
            className="text-2xl md:text-4xl mb-6 md:mb-8 lg:mb-12 lg:text-6xl text-center aclonica-regular font-bold"
          >
            My Education
          </motion.h1>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container}
            className="flex flex-col gap-6"
          >
            {education.degrees.map((d, i) => (
              <motion.div key={i} variants={item}>
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#120F17"
                  borderRadius={28}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={["#c084fc", "#f472b6", "#38bdf8"]}
                >
                  <div
                    onMouseEnter={() => setHoveredEducation(i)}
                    onMouseLeave={() => setHoveredEducation(null)}
                    className="relative overflow-hidden flex flex-col gap-4 md:flex-row md:justify-between items-start p-[2em] min-h-45"
                  >
                    {/* Overlay */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: hoveredEducation === i ? 1 : 0,
                        y: hoveredEducation === i ? 0 : 30,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-x-0 bottom-0 bg-amber-400 aclonica-regular text-sm text-[#0b0f14] p-4 rounded-3xl z-10 will-change-transform"
                    >
                      <p>{d.description}</p>
                    </motion.div>

                    {/* Normal content */}
                    <div>
                      <h2 className="font-bold text-xl text-amber-400">
                        {d.year}
                      </h2>

                      <h3 className="text-sm font-light">{d.title}</h3>
                    </div>

                    <h1 className="text-sm aclonica-regular">
                      {d.org} | {d.subtitle}
                    </h1>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={heading}
        className="text-white text-2xl mb-6 md:mb-8 lg:mb-12 md:text-4xl lg:text-6xl text-center aclonica-regular font-bold"
      >
        My Certifications
      </motion.h1>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        className="flex flex-wrap justify-center gap-6 px-6 md:px-12 lg:px-20"
      >
        {education.certifications.map((d, i) => (
          <motion.div
            key={i}
            variants={item}
            className="w-[75vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <BorderGlow
              edgeSensitivity={30}
              glowColor="40 80 80"
              backgroundColor="#120F17"
              borderRadius={28}
              glowRadius={40}
              glowIntensity={1}
              coneSpread={25}
              animated={false}
              colors={["#c084fc", "#f472b6", "#38bdf8"]}
            >
              <div
                onMouseEnter={() => setHoveredCertification(i)}
                onMouseLeave={() => setHoveredCertification(null)}
                className="relative overflow-hidden flex flex-col gap-4 p-[2em] min-h-45 w-full"
              >
                {/* Overlay */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: hoveredCertification === i ? 1 : 0,
                    y: hoveredCertification === i ? 0 : 30,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-x-0 bottom-0 bg-amber-400 aclonica-regular text-sm text-[#0b0f14] p-4 rounded-3xl z-10 will-change-transform"
                >
                  <p>{d.description}</p>
                </motion.div>

                {/* Content */}
                <div>
                  <h2 className="font-bold text-xl text-amber-400">{d.year}</h2>

                  <h3 className="text-sm font-light text-white">{d.title}</h3>
                </div>

                <h1 className="text-sm aclonica-regular text-white">
                  {d.org} | {d.subtitle}
                </h1>
              </div>
            </BorderGlow>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

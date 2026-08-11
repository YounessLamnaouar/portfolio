import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { hero, profile } from "@/data/content";
import FoldText from "../components/FoldText";
import LogoLoop from "../components/LogoLoop";
import TextType from "../components/TextType";
import { Cursor } from "motion-plus/react";
import { motion, useScroll } from "motion/react";
import DotField from "../components/DotField";

import {
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiLaravel,
  SiPhp,
  SiHtml5,
  SiCss,
  SiPython,
  SiWordpress,
  SiLinux,
  SiMysql,
  SiMongodb,
} from "react-icons/si";

export default function Hero() {
  const [fontSize, setFontSize] = useState(64);

  // Scroll progress
  const { scrollYProgress } = useScroll();

  const techLogos = [
    {
      node: <SiReact />,
      title: "React",
      href: "https://react.dev",
    },
    {
      node: <SiJavascript />,
      title: "JavaScript",
      href: "https://javascript.com",
    },
    {
      node: <SiLaravel />,
      title: "Laravel",
      href: "https://laravel.com",
    },
    {
      node: <SiPython />,
      title: "Python",
      href: "https://python.org",
    },
    {
      node: <SiWordpress />,
      title: "WordPress",
      href: "https://wordpress.org",
    },
    {
      node: <SiLinux />,
      title: "Linux",
      href: "https://linux.org",
    },
    {
      node: <SiMysql />,
      title: "MySQL",
      href: "https://mysql.com",
    },
    {
      node: <SiMongodb />,
      title: "MongoDB",
      href: "https://mongodb.com",
    },
    {
      node: <SiPhp />,
      title: "PHP",
      href: "https://www.php.net",
    },
    {
      node: <SiHtml5 />,
      title: "HTML",
      href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      node: <SiCss />,
      title: "CSS",
      href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
      node: <SiTailwindcss />,
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
  ];

  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth < 640) {
        setFontSize(32);
      } else if (window.innerWidth < 1024) {
        setFontSize(36);
      } else {
        setFontSize(64);
      }
    };

    updateFontSize();

    window.addEventListener("resize", updateFontSize);

    return () => {
      window.removeEventListener("resize", updateFontSize);
    };
  }, []);

  // motion variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      rotate: 8,
      x: 80,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      x: 0,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* SCROLL PROGRESS BAR */}
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          originX: 0,
          backgroundColor: "#FFD700",
          zIndex: 9999,
        }}
      />

      {/* HERO */}
      <section id="profile" className="bgApp container relative overflow-x-hidden mx-auto pt-28 min-w-screen min-h-screen">
        {/* BACKGROUND */}
        <div className="absolute h-full inset-0 z-0">
          <DotField
            dotRadius={1.5}
            dotSpacing={14}
            bulgeStrength={67}
            glowRadius={160}
            sparkle={false}
            waveAmplitude={0}
            cursorRadius={500}
            cursorForce={0.1}
            bulgeOnly
            gradientFrom="#0b0f14"
            gradientTo="#ffffff"
            glowColor="#ffffff"
          />
        </div>

        {/* CONTENT */}
        <motion.div
          className="relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* <Nav /> */}
          <Cursor />

          <section className="px-6 md:px-8 lg:px-16 py-6">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* TEXT */}
              <div>
                <motion.h3
                  variants={itemVariants}
                  className="text-xl md:text-2xl lg:text-4xl mb-2 text-gray-400 aclonica-regular"
                >
                  {hero.greeting}
                </motion.h3>
                
                <motion.h1 variants={itemVariants}>
                <FoldText
                  text={profile.name}
                  splitBy="char"
                  hinge="top"
                  trigger="mount"
                  duration={0.65}
                  stagger={0.045}
                  ease="power3.out"
                  perspective={700}
                  creaseShading={0.55}
                  fontSize={fontSize}
                  fontWeight={800}
                  color="#f7f2e8"
                />                    
                </motion.h1>


                <motion.h2
                  variants={itemVariants}
                  className="text-xl md:text-2xl lg:text-4xl mb-2 text-amber-400 aclonica-regular"
                >
                  {profile.role}
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="h-15 text-xs md:text-sm mb-6 md:w-xl w-75 text-gray-400 aclonica-regular"
                >
                  <TextType
                    text={[
                      profile.description,
                      profile.description,
                      profile.description,
                    ]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor
                    cursorCharacter="_"
                    deletingSpeed={50}
                    variableSpeedEnabled={false}
                    variableSpeedMin={60}
                    variableSpeedMax={120}
                    cursorBlinkDuration={0.5}
                  />
                </motion.p>

                {/* BUTTONS */}
                <motion.div
                  variants={containerVariants}
                  className="flex gap-2 aclonica-regular"
                >
                  <motion.a
                    variants={buttonVariants}
                    href={hero.primaryBtn.href}
                    className="cursor-pointer text-xs md:text-sm lg:text-xl bg-amber-400 text-black border border-amber-400 rounded-full px-4 py-2 hover:scale-105 transition-transform duration-200"
                  >
                    {hero.primaryBtn.label}
                  </motion.a>

                  <motion.a
                    variants={buttonVariants}
                    href={hero.secondaryBtn.href}
                    className="cursor-pointer text-xs md:text-sm lg:text-xl text-amber-400 border border-amber-400 rounded-full px-4 py-2 hover:scale-105 transition-transform duration-200"
                  >
                    {hero.secondaryBtn.label}
                  </motion.a>
                </motion.div>
              </div>

              {/* PROFILE IMAGE */}
              <motion.div variants={imageVariants} className="relative">
                <motion.img
                  src={profile.image}
                  alt={profile.name}
                  whileHover={{
                    scale: 1.05,
                    rotate: -2,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="w-[70vw] md:w-[30vw] rounded-full shadow-amber-200 hover:shadow-amber-400 border-3 border-white shadow-2xl"
                />
              </motion.div>
            </div>

            {/* TECHNOLOGIES */}
            <motion.div variants={itemVariants} className="h-5">
              <div className="flex justify-end items-center relative mt-12 overflow-hidden text-white">
                <LogoLoop
                  logos={techLogos}
                  speed={60}
                  direction="left"
                  logoHeight={20}
                  gap={60}
                  hoverSpeed={0}
                  scaleOnHover
                  fadeOut
                  fadeOutColor=""
                  ariaLabel="Technology partners"
                />
              </div>
            </motion.div>
          </section>
        </motion.div>
      </section>
    </>
  );
}

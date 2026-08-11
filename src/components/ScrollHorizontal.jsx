"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CountUp from './CountUp'

import {
  SiReact,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTailwindcss,
  SiPhp,
  SiLaravel,
  SiPython,
  SiMysql,
  SiMongodb,
} from "react-icons/si";

export default function ScrollHorizontal() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  //items
  const items = [
    {
      id: 1,
      name: "React",
      percentage: 90,
      icon: SiReact,
    },
    {
      id: 2,
      name: "JavaScript",
      percentage: 85,
      icon: SiJavascript,
    },
    {
      id: 3,
      name: "HTML",
      percentage: 95,
      icon: SiHtml5,
    },
    {
      id: 4,
      name: "CSS",
      percentage: 90,
      icon: SiCss,
    },
    {
      id: 5,
      name: "Tailwind CSS",
      percentage: 90,
      icon: SiTailwindcss,
    },
    {
      id: 6,
      name: "PHP",
      percentage: 85,
      icon: SiPhp,
    },
    {
      id: 7,
      name: "Laravel",
      percentage: 90,
      icon: SiLaravel,
    },
    {
      id: 8,
      name: "Python",
      percentage: 75,
      icon: SiPython,
    },
    {
      id: 9,
      name: "MySQL",
      percentage: 88,
      icon: SiMysql,
    },
    {
      id: 10,
      name: "MongoDB",
      percentage: 95,
      icon: SiMongodb,
    },
  ];

  const totalDistance = (items.length - 3) * (ITEM_WIDTH + GAP);
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  return (
    <div id="example">
      <p className="text-sm text-center uppercase tracking-[0.4em] text-gray-500 mt-3">
        What I know
      </p>

      <div ref={containerRef} className="scroll-container -ms-28">
        <div className="sticky-wrapper">
          <motion.div className="gallery" style={{ x }}>
            {items.map((skill) => {
              const Icon = skill.icon;

              return <SkillCard key={skill.id} skill={skill} Icon={Icon} />;
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}


const items = [
  {
    id: 1,
    color: "var(--hue-1)",
    label: "Night One",
    image: "/photos/tokyo-shinjuku-2/image-1.jpg",
  },
  {
    id: 2,
    color: "var(--hue-2)",
    label: "Night Two",
    image: "/photos/tokyo-shinjuku-2/image-2.jpg",
  },
  {
    id: 3,
    color: "var(--hue-3)",
    label: "Night Three",
    image: "/photos/tokyo-shinjuku-2/image-3.jpg",
  },
  {
    id: 4,
    color: "var(--hue-4)",
    label: "Night Four",
    image: "/photos/tokyo-shinjuku-2/image-4.jpg",
  },
  {
    id: 5,
    color: "var(--hue-5)",
    label: "Night Five",
    image: "/photos/tokyo-shinjuku-2/image-8.jpg",
  },
];

const ITEM_WIDTH = 400;
const GAP = 30;

function SkillCard({ skill, Icon }) {
  return (
    <div
      className="
        shrink-0
        w-75
        h-[50vh]
        rounded-4xl
        ms-6
        bg-[#0b0f14]
        text-white
        p-8
        flex
        flex-col
        justify-between
        shadow-2xl
      "
    >
      {/* Top */}
      <div className="flex justify-between items-start">
        <span className="text-sm text-gray-500 font-mono">0{skill.id}</span>

        <Icon className="text-5xl text-amber-400" />
      </div>

      {/* Center */}
      <div>
        <h2 className="text-4xl font-bold mb-8">{skill.name}</h2>

        <div className="flex items-end gap-2 mb-3">
          <span className="text-6xl font-bold text-amber-400">
            <CountUp
              from={0}
              to={skill.percentage}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
              delay={0}
            />
          </span>

          <span className="text-2xl text-gray-400 mb-2">%</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{
              width: `${skill.percentage}%`,
            }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full bg-amber-400 rounded-full"
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
        <span>Proficiency</span>
        <span>{skill.percentage}%</span>
      </div>
    </div>
  );
}

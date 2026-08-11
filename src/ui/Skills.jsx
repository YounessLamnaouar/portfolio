import ScrollHorizontal from "@/components/ScrollHorizontal";
import React from "react";

export default function Skills() {
  return (
    <section id="skills" className="w-full min-h-screen bg-white rounded-[3rem] md:rounded-[4rem] px-4 md:px-8 lg:px-12 py-6">
      <h1 className="text-black font-bold text-5xl md:text-6xl lg:text-8xl lg:mt-20 tracking-tighter text-center mt-4 aclonica-regular">Skills</h1>
      <ScrollHorizontal />
    </section>
  );
}

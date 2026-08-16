import React, { useEffect } from 'react'
import Nav from './ui/Nav';
import Hero from './ui/Hero';
import Skills from './ui/Skills';
import Projects from './ui/Projects';
import Contact from './ui/Contact';
import Resume from './ui/Resume';

import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {

    useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div>
      <Nav />
      <Hero />
      <Skills />
      <Resume />
      <Projects />
      <Contact />
    </div>
  )
}

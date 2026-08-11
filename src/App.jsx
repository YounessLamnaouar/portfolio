import React from 'react'
import Nav from './ui/Nav';
import Hero from './ui/Hero';
import Skills from './ui/Skills';
import Projects from './ui/Projects';
import Contact from './ui/Contact';
import Resume from './ui/Resume';

export default function App() {
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

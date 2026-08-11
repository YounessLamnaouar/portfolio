import { Menu, X, ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { navLinks } from "../data/content";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Profile");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const isClickScrolling = useRef(false);
  const clickScrollTimeout = useRef(null);

  const { scrollY } = useScroll();

  // SCROLL DETECTION

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Show scroll-top button after scrolling down
    setShowScrollTop(current > 400);

    // Hide navbar when scrolling down
    if (current > previous && current > 150) {
      setHidden(true);
      setIsMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  // SCROLL TO TOP

  const scrollToTop = () => {
    setActiveLink("Profile");
    setIsMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // DETECT CURRENT SECTION

  useEffect(() => {
    const sections = navLinks
      .map((link) =>
        document.getElementById(link.label.toLowerCase())
      )
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        // Don't change active link while clicking a nav link
        if (isClickScrolling.current) return;

        const visible = entries.find(
          (entry) => entry.isIntersecting
        );

        if (visible) {
          const activeSection = visible.target.id;

          const match = navLinks.find(
            (link) =>
              link.label.toLowerCase() === activeSection
          );

          if (match) {
            setActiveLink(match.label);
          }
        }
      },
      {
        threshold: 0,
        rootMargin: "-40% 0px -55% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    // DETECT BOTTOM OF PAGE

    const handleScrollEnd = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (
        scrolledToBottom &&
        !isClickScrolling.current
      ) {
        setActiveLink(
          navLinks[navLinks.length - 1].label
        );
      }
    };

    window.addEventListener("scroll", handleScrollEnd, {
      passive: true,
    });

    return () => {
      observer.disconnect();

      window.removeEventListener(
        "scroll",
        handleScrollEnd
      );
    };
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link.label);
    setIsMenuOpen(false);

    isClickScrolling.current = true;

    clearTimeout(clickScrollTimeout.current);

    clickScrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 900);
  };

  useEffect(() => {
    return () => {
      clearTimeout(clickScrollTimeout.current);
    };
  }, []);

  return (
    <>
      {/* Nav */}

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: hidden ? -120 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="fixed top-0 left-0 w-full z-50 bg-[#0b0f14]/90 backdrop-blur-xl"
      >
        <div className="w-full py-6 px-4 md:px-8 lg:px-16 border-b border-white/10">
          <div className="flex flex-row justify-between items-center">

            {/* LOGO */}

            <a
              href="#profile"
              onClick={() => setActiveLink("Profile")}
            >
              <h1 className="text-3xl md:text-4xl text-white font-bold select-none">
                YL.
                <span className="text-xl md:text-2xl text-amber-400 font-medium">
                  dev
                </span>
              </h1>
            </a>

            {/* DESKTOP NAV */}

            <div className="hidden md:flex backdrop-blur-2xl items-center justify-center flex-row bg-white/10 px-0.5 py-0.5 rounded-full border border-white/20 transition-all duration-300">
              {navLinks.map((link) => {
                const isActive =
                  activeLink === link.label;

                const isHovered =
                  hoveredLink === link.label;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() =>
                      handleLinkClick(link)
                    }
                    onMouseEnter={() =>
                      setHoveredLink(link.label)
                    }
                    onMouseLeave={() =>
                      setHoveredLink(null)
                    }
                    className={`
                      transition-all
                      text-xs
                      duration-200
                      ease-in-out
                      cursor-pointer
                      px-4
                      py-2
                      rounded-full

                      ${
                        isActive || isHovered
                          ? "bg-amber-400 text-black"
                          : "text-white"
                      }
                    `}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* RIGHT SIDE */}

            <div className="flex justify-center items-center gap-6">

              {/* HIRE ME */}

              <a
                href="#contact"
                className="
                  bg-white/45
                  backdrop-blur-lg
                  border border-white/20
                  hover:bg-white/60
                  transition-all
                  duration-200
                  shadow-lg
                  hover:scale-110
                  text-sm
                  text-white
                  aclonica-regular
                  px-4
                  md:px-6
                  py-2
                  lg:px-12
                  rounded-full
                  font-bold
                  cursor-pointer
                "
              >
                Hire me!
              </a>

              {/* MOBILE BUTTON */}

              <button
                onClick={() =>
                  setIsMenuOpen((prev) => !prev)
                }
                className="
                  md:hidden
                  hover:opacity-70
                  transition-opacity
                "
              >
                {isMenuOpen ? (
                  <X
                    className="text-white cursor-pointer"
                    size={20}
                  />
                ) : (
                  <Menu
                    className="text-white cursor-pointer"
                    size={20}
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              className="
                w-full
                flex
                flex-col
                gap-2
                justify-center
                items-center
                px-4
                py-4
                border-b
                border-white/10
                bg-[#0b0f14]/95
                overflow-hidden
              "
            >
              {navLinks.map((link) => {
                const isActive =
                  activeLink === link.label;

                const isHovered =
                  hoveredLink === link.label;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onMouseEnter={() =>
                      setHoveredLink(link.label)
                    }
                    onMouseLeave={() =>
                      setHoveredLink(null)
                    }
                    onClick={() =>
                      handleLinkClick(link)
                    }
                    className={`
                      transition-all
                      duration-300
                      ease-in-out

                      ${
                        isActive || isHovered
                          ? "text-amber-400"
                          : "text-white"
                      }
                    `}
                  >
                    {link.label}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

          {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{
              opacity: 0,
              scale: 0.5,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              y: 20,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="
              fixed
              bottom-6
              right-6
              md:bottom-8
              md:right-8
              z-50

              w-11
              h-11
              md:w-12
              md:h-12

              flex
              items-center
              justify-center

              rounded-full

              bg-amber-400
              text-[#0b0f14]

              border
              border-amber-300/50

              shadow-[0_8px_30px_rgba(251,191,36,0.25)]

              hover:bg-white
              hover:scale-110

              transition-all
              duration-300
            "
          >
            <ArrowUp
              size={20}
              strokeWidth={2.5}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
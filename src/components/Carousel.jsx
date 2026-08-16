// import { useEffect, useMemo, useRef, useState } from 'react';
// import { motion, useMotionValue, useTransform } from 'motion/react';
// // replace icons with your own if needed
// import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from 'react-icons/fi';

// const DEFAULT_ITEMS = [
//   {
//     title: 'Text Animations',
//     description: 'Cool text animations for your projects.',
//     id: 1,
//     icon: <FiFileText className="h-[16px] w-[16px] text-white" />
//   },
//   {
//     title: 'Animations',
//     description: 'Smooth animations for your projects.',
//     id: 2,
//     icon: <FiCircle className="h-[16px] w-[16px] text-white" />
//   },
//   {
//     title: 'Components',
//     description: 'Reusable components for your projects.',
//     id: 3,
//     icon: <FiLayers className="h-[16px] w-[16px] text-white" />
//   },
//   {
//     title: 'Backgrounds',
//     description: 'Beautiful backgrounds and patterns for your projects.',
//     id: 4,
//     icon: <FiLayout className="h-[16px] w-[16px] text-white" />
//   },
//   {
//     title: 'Common UI',
//     description: 'Common UI components are coming soon!',
//     id: 5,
//     icon: <FiCode className="h-[16px] w-[16px] text-white" />
//   }
// ];

// const DRAG_BUFFER = 0;
// const VELOCITY_THRESHOLD = 500;
// const GAP = 16;
// const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

// function CarouselItem({ item, index, itemWidth, round, trackItemOffset, x, transition }) {
//   const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
//   const outputRange = [90, 0, -90];
//   const rotateY = useTransform(x, range, outputRange, { clamp: false });

//   return (
//     <motion.div
//       key={`${item?.id ?? index}-${index}`}
//       className={`relative shrink-0 flex flex-col ${
//         round
//           ? 'items-center justify-center text-center bg-[#120F17] border-0'
//           : 'items-start justify-between bg-[#222] border border-[#222] rounded-[12px]'
//       } overflow-hidden cursor-grab active:cursor-grabbing`}
//       style={{
//         width: itemWidth,
//         height: round ? itemWidth : '100%',
//         rotateY: rotateY,
//         ...(round && { borderRadius: '50%' })
//       }}
//       transition={transition}>
//       <div className={`${round ? 'p-0 m-0' : 'mb-4 p-5'}`}>
//         <span
//           className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#120F17]">
//           {item.icon}
//         </span>
//       </div>
//       <div className="p-5">
//         <div className="mb-1 font-black text-lg text-white">{item.title}</div>
//         <p className="text-sm text-white">{item.description}</p>
//       </div>
//     </motion.div>
//   );
// }

// export default function Carousel({
//   items = DEFAULT_ITEMS,
//   baseWidth = 300,
//   autoplay = false,
//   autoplayDelay = 3000,
//   pauseOnHover = false,
//   loop = false,
//   round = false
// }) {
//   const containerPadding = 16;
//   const itemWidth = baseWidth - containerPadding * 2;
//   const trackItemOffset = itemWidth + GAP;
//   const itemsForRender = useMemo(() => {
//     if (!loop) return items;
//     if (items.length === 0) return [];
//     return [items[items.length - 1], ...items, items[0]];
//   }, [items, loop]);

//   const [position, setPosition] = useState(loop ? 1 : 0);
//   const x = useMotionValue(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isJumping, setIsJumping] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const containerRef = useRef(null);
//   useEffect(() => {
//     if (pauseOnHover && containerRef.current) {
//       const container = containerRef.current;
//       const handleMouseEnter = () => setIsHovered(true);
//       const handleMouseLeave = () => setIsHovered(false);
//       container.addEventListener('mouseenter', handleMouseEnter);
//       container.addEventListener('mouseleave', handleMouseLeave);
//       return () => {
//         container.removeEventListener('mouseenter', handleMouseEnter);
//         container.removeEventListener('mouseleave', handleMouseLeave);
//       };
//     }
//   }, [pauseOnHover]);

//   useEffect(() => {
//     if (!autoplay || itemsForRender.length <= 1) return undefined;
//     if (pauseOnHover && isHovered) return undefined;

//     const timer = setInterval(() => {
//       setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
//     }, autoplayDelay);

//     return () => clearInterval(timer);
//   }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

//   useEffect(() => {
//     const startingPosition = loop ? 1 : 0;
//     setPosition(startingPosition);
//     x.set(-startingPosition * trackItemOffset);
//   }, [items.length, loop, trackItemOffset, x]);

//   useEffect(() => {
//     if (!loop && position > itemsForRender.length - 1) {
//       setPosition(Math.max(0, itemsForRender.length - 1));
//     }
//   }, [itemsForRender.length, loop, position]);

//   const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

//   const handleAnimationStart = () => {
//     setIsAnimating(true);
//   };

//   const handleAnimationComplete = () => {
//     if (!loop || itemsForRender.length <= 1) {
//       setIsAnimating(false);
//       return;
//     }
//     const lastCloneIndex = itemsForRender.length - 1;

//     if (position === lastCloneIndex) {
//       setIsJumping(true);
//       const target = 1;
//       setPosition(target);
//       x.set(-target * trackItemOffset);
//       requestAnimationFrame(() => {
//         setIsJumping(false);
//         setIsAnimating(false);
//       });
//       return;
//     }

//     if (position === 0) {
//       setIsJumping(true);
//       const target = items.length;
//       setPosition(target);
//       x.set(-target * trackItemOffset);
//       requestAnimationFrame(() => {
//         setIsJumping(false);
//         setIsAnimating(false);
//       });
//       return;
//     }

//     setIsAnimating(false);
//   };

//   const handleDragEnd = (_, info) => {
//     const { offset, velocity } = info;
//     const direction =
//       offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
//         ? 1
//         : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
//           ? -1
//           : 0;

//     if (direction === 0) return;

//     setPosition(prev => {
//       const next = prev + direction;
//       const max = itemsForRender.length - 1;
//       return Math.max(0, Math.min(next, max));
//     });
//   };

//   const dragProps = loop
//     ? {}
//     : {
//         dragConstraints: {
//           left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
//           right: 0
//         }
//       };

//   const activeIndex =
//     items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

//   return (
//     <div
//       ref={containerRef}
//       className={`relative overflow-hidden p-4 ${
//         round ? 'rounded-full border border-white' : 'rounded-[24px] border border-[#222]'
//       }`}
//       style={{
//         width: `${baseWidth}px`,
//         ...(round && { height: `${baseWidth}px` })
//       }}>
//       <motion.div
//         className="flex"
//         drag={isAnimating ? false : 'x'}
//         {...dragProps}
//         style={{
//           width: itemWidth,
//           gap: `${GAP}px`,
//           perspective: 1000,
//           perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
//           x
//         }}
//         onDragEnd={handleDragEnd}
//         animate={{ x: -(position * trackItemOffset) }}
//         transition={effectiveTransition}
//         onAnimationStart={handleAnimationStart}
//         onAnimationComplete={handleAnimationComplete}>
//         {itemsForRender.map((item, index) => (
//           <CarouselItem
//             key={`${item?.id ?? index}-${index}`}
//             item={item}
//             index={index}
//             itemWidth={itemWidth}
//             round={round}
//             trackItemOffset={trackItemOffset}
//             x={x}
//             transition={effectiveTransition} />
//         ))}
//       </motion.div>
//       <div
//         className={`flex w-full justify-center ${round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : ''}`}>
//         <div className="mt-4 flex w-[150px] justify-between px-8">
//           {items.map((_, index) => (
//             <motion.button
//               type="button"
//               key={index}
//               aria-label={`Go to slide ${index + 1}`}
//               aria-current={activeIndex === index}
//               className={`h-2 w-2 rounded-full cursor-pointer border-0 p-0 appearance-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
//                 activeIndex === index
//                   ? round
//                     ? 'bg-white'
//                     : 'bg-[#333333]'
//                   : round
//                     ? 'bg-[#555]'
//                     : 'bg-[rgba(51,51,51,0.4)]'
//               }`}
//               animate={{
//                 scale: activeIndex === index ? 1.2 : 1
//               }}
//               onClick={() => setPosition(loop ? index + 1 : index)}
//               transition={{ duration: 0.15 }} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from 'react-icons/fi';

const DEFAULT_ITEMS = [ /* ...unchanged... */ ];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, itemHeight, round, trackItemOffset, x, transition }) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  if (item.content) {
    return (
      <motion.div
        key={`${item?.id ?? index}-${index}`}
        className="relative shrink-0 overflow-hidden rounded-[12px] cursor-grab active:cursor-grabbing"
        style={{
          width: itemWidth,
          height: round ? itemWidth : itemHeight,
          rotateY,
          ...(round && { borderRadius: '50%' })
        }}
        transition={transition}
      >
        {item.content}
      </motion.div>
    );
  }

  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className={`relative shrink-0 flex flex-col ${
        round
          ? 'items-center justify-center text-center bg-[#120F17] border-0'
          : 'items-start justify-between bg-[#222] border border-[#222] rounded-[12px]'
      } overflow-hidden cursor-grab active:cursor-grabbing`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : itemHeight,
        rotateY,
        ...(round && { borderRadius: '50%' })
      }}
      transition={transition}>
      <div className={`${round ? 'p-0 m-0' : 'mb-4 p-5'}`}>
        <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#120F17]">
          {item.icon}
        </span>
      </div>
      <div className="p-5">
        <div className="mb-1 font-black text-lg text-white">{item.title}</div>
        <p className="text-sm text-white">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth,               // now OPTIONAL: acts as a max-width cap, not the actual width
  baseHeight = 480,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}) {
  const containerPadding = 16;

  // --- responsive width measurement ---
  const wrapperRef = useRef(null);
  const [measuredWidth, setMeasuredWidth] = useState(baseWidth || 300);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const update = () => {
      const w = el.offsetWidth;
      if (w > 0) setMeasuredWidth(w);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const effectiveBaseWidth = baseWidth ? Math.min(baseWidth, measuredWidth) : measuredWidth;
  const itemWidth = effectiveBaseWidth - containerPadding * 2;
  const itemHeight = baseHeight - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, loop]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  // keep the track aligned when the width changes (resize/orientation change)
  useEffect(() => {
    x.set(-position * trackItemOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackItemOffset]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => setIsAnimating(true);

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition(prev => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0
        }
      };

  const activeIndex =
    items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

  const goTo = (index) => setPosition(loop ? index + 1 : index);
  const goPrev = () => setPosition(prev => Math.max(0, prev - 1));
  const goNext = () => setPosition(prev => Math.min(itemsForRender.length - 1, prev + 1));

  return (
    <div
      ref={node => {
        wrapperRef.current = node;
        containerRef.current = node;
      }}
      className={`relative overflow-hidden p-4 w-full ${
        round ? 'rounded-full border border-white' : 'rounded-[24px] border border-[#222]'
      }`}
      style={{
        maxWidth: baseWidth ? `${baseWidth}px` : '100%',
        height: `${baseHeight}px`
      }}>
      <motion.div
        className="flex"
        drag={isAnimating ? false : 'x'}
        {...dragProps}
        style={{
          width: itemWidth,
          height: itemHeight,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}>
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition} />
        ))}
      </motion.div>

      {/* dot navigation — small circular links between slides */}
      <div
        className={`flex w-full justify-center ${round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : 'absolute z-20 bottom-4 left-1/2 -translate-x-1/2'}`}>
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm">
          {items.map((_, index) => (
            <motion.button
              type="button"
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index}
              className={`h-2.5 w-2.5 rounded-full cursor-pointer border-0 p-0 appearance-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                activeIndex === index ? 'bg-amber-400' : 'bg-white/40 hover:bg-white/70'
              }`}
              animate={{ scale: activeIndex === index ? 1.3 : 1 }}
              onClick={() => goTo(index)}
              transition={{ duration: 0.15 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
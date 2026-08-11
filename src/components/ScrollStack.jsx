import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

/**
 * ScrollStackItem - Card wrapper component
 * Fixed at 400px height for consistent project card sizing
 */
export const ScrollStackItem = ({ children, itemClassName = '', style = {} }) => (
  <div
    className={`scroll-stack-card relative w-full h-100 my-8 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform overflow-hidden bg-white ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
      ...style
    }}
  >
    {children}
  </div>
);

/**
 * ScrollStack - Optimized scroll-driven card stacking animation
 */
const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const offsetsRef = useRef({
    cards: [],
    endElement: 0,
    containerHeight: 0
  });
  const endElementRef = useRef(null);

  const propsRef = useRef({
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete
  });

  useLayoutEffect(() => {
    propsRef.current = {
      itemDistance,
      itemScale,
      itemStackDistance,
      stackPosition,
      scaleEndPosition,
      baseScale,
      rotationAmount,
      blurAmount,
      useWindowScroll,
      onStackComplete
    };
  });

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const getScrollData = useCallback(() => {
    if (propsRef.current.useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    }
    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller.scrollTop,
      containerHeight: scroller.clientHeight,
      scrollContainer: scroller
    };
  }, []);

  const recalculateOffsets = useCallback(() => {
    const { useWindowScroll } = propsRef.current;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const containerHeight = useWindowScroll ? window.innerHeight : scroller.clientHeight;
    offsetsRef.current.containerHeight = containerHeight;

    const endSelector = '.scroll-stack-end';
    endElementRef.current = useWindowScroll
      ? document.querySelector(endSelector)
      : scroller.querySelector(endSelector);

    const cards = cardsRef.current;
    offsetsRef.current.cards = cards.map(card => {
      if (!card) return 0;
      if (useWindowScroll) {
        const rect = card.getBoundingClientRect();
        return rect.top + window.scrollY;
      }
      return card.offsetTop;
    });

    if (endElementRef.current) {
      if (useWindowScroll) {
        const rect = endElementRef.current.getBoundingClientRect();
        offsetsRef.current.endElement = rect.top + window.scrollY;
      } else {
        offsetsRef.current.endElement = endElementRef.current.offsetTop;
      }
    }
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const props = propsRef.current;
    const { scrollTop, containerHeight } = getScrollData();
    const offsets = offsetsRef.current;

    if (containerHeight !== offsets.containerHeight) {
      recalculateOffsets();
    }

    const stackPositionPx = parsePercentage(props.stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(props.scaleEndPosition, containerHeight);
    const endElementTop = offsets.endElement;

    const cards = cardsRef.current;
    const cardOffsets = offsets.cards;
    const totalCards = cards.length;

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardOffsets[i];
      if (cardTop === undefined) return;

      const triggerStart = cardTop - stackPositionPx - props.itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = props.baseScale + i * props.itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = props.rotationAmount ? i * props.rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (props.blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < totalCards; j++) {
          const jCardTop = cardOffsets[j];
          if (jCardTop === undefined) continue;
          const jTriggerStart = jCardTop - stackPositionPx - props.itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }
        if (i < topCardIndex) {
          blur = Math.max(0, (topCardIndex - i) * props.blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + props.itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + props.itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === totalCards - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          props.onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [getScrollData, parsePercentage, calculateProgress, recalculateOffsets]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const props = propsRef.current;

    const lenisOptions = {
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075
    };

    let lenis;

    if (props.useWindowScroll) {
      lenis = new Lenis(lenisOptions);
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return null;

      lenis = new Lenis({
        ...lenisOptions,
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner')
      });
    }

    lenis.on('scroll', handleScroll);

    const raf = time => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      propsRef.current.useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );

    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${propsRef.current.itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    recalculateOffsets();
    setupLenis();
    updateCardTransforms();

    const handleResize = () => {
      recalculateOffsets();
      updateCardTransforms();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [setupLenis, updateCardTransforms, recalculateOffsets]);

  const containerStyles = useWindowScroll
    ? {
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)'
      }
    : {
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      };

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div className={containerClassName} ref={scrollerRef} style={containerStyles}>
      <div className="scroll-stack-inner pt-[20vh] px-4 sm:px-8 lg:px-20 pb-200 min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
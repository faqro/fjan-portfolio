import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  X,
} from "lucide-react";
import { photographyList } from "@/data/portfolioData";
import SectionHeader from "./SectionHeader";

export default function PhotoCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );
  const [stageWidth, setStageWidth] = useState(1000);
  const stageRef = useRef(null);
  const touchStateRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    lastDx: 0,
    lockedAxis: null,
  });
  const touchActiveRef = useRef(false);
  const suppressTapRef = useRef(false);

  const total = photographyList.length;
  const safeIndex = total > 0 ? index % total : 0;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const updateWidth = () => {
      if (el.offsetWidth > 0) setStageWidth(el.offsetWidth);
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const paginate = useCallback(
    (newDirection) => {
      if (total <= 1) return;
      setDirection(newDirection);
      setIndex((prev) => (prev + newDirection + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const el = stageRef.current;
    if (!el || total <= 1) return;

    let accum = 0;
    let locked = false;
    let resetTimer = null;
    let lockTimer = null;

    const handleWheel = (e) => {
      const horizontalDelta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY)
          ? e.deltaX
          : e.shiftKey && e.deltaY !== 0
            ? e.deltaY
            : 0;

      if (horizontalDelta === 0) return;

      e.preventDefault();
      if (locked) return;

      accum += horizontalDelta;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        accum = 0;
      }, 120);

      if (Math.abs(accum) >= 24) {
        const dir = accum > 0 ? 1 : -1;
        accum = 0;
        locked = true;
        paginate(dir);
        lockTimer = setTimeout(() => {
          locked = false;
        }, 90);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      clearTimeout(resetTimer);
      clearTimeout(lockTimer);
    };
  }, [total, paginate]);

  const goToIndex = (targetIdx) => {
    if (targetIdx === safeIndex || total <= 1) return;
    setDirection(targetIdx > safeIndex ? 1 : -1);
    setIndex(targetIdx);
  };

  const handleTouchStart = (e) => {
    if (total <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    touchActiveRef.current = true;
    suppressTapRef.current = false;
    touchStateRef.current = {
      active: true,
      startX: touch.clientX,
      startY: touch.clientY,
      lastDx: 0,
      lockedAxis: null,
    };
  };

  const handleTouchMove = (e) => {
    const state = touchStateRef.current;
    if (!state.active || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - state.startX;
    const dy = touch.clientY - state.startY;

    if (!state.lockedAxis && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      state.lockedAxis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }

    if (state.lockedAxis === "x") {
      state.lastDx = dx;
      if (Math.abs(dx) > 10) {
        suppressTapRef.current = true;
      }
    }
  };

  const finishTouch = () => {
    const state = touchStateRef.current;
    if (!state.active) return;

    if (state.lockedAxis === "x" && Math.abs(state.lastDx) > 45) {
      suppressTapRef.current = true;
      paginate(state.lastDx < 0 ? 1 : -1);
    }

    touchStateRef.current = {
      active: false,
      startX: 0,
      startY: 0,
      lastDx: 0,
      lockedAxis: null,
    };

    setTimeout(() => {
      touchActiveRef.current = false;
      suppressTapRef.current = false;
    }, 100);
  };

  const currentPhoto = total > 0 ? photographyList[safeIndex] : null;
  const getPhotoAt = (offset) =>
    photographyList[(safeIndex + offset + total * 2) % total];

  const visibleSlides = (() => {
    if (total === 0) return [];
    if (total === 1) return [{ photo: currentPhoto, offset: 0 }];
    if (total === 2) {
      return [
        { photo: currentPhoto, offset: 0 },
        { photo: getPhotoAt(1), offset: 1 },
      ];
    }
    if (total === 3) {
      return [
        { photo: getPhotoAt(-1), offset: -1 },
        { photo: currentPhoto, offset: 0 },
        { photo: getPhotoAt(1), offset: 1 },
      ];
    }
    return [
      { photo: getPhotoAt(-2), offset: -2 },
      { photo: getPhotoAt(-1), offset: -1 },
      { photo: currentPhoto, offset: 0 },
      { photo: getPhotoAt(1), offset: 1 },
      { photo: getPhotoAt(2), offset: 2 },
    ];
  })();

  const slideTransition = {
    type: "spring",
    stiffness: 340,
    damping: 30,
    mass: 0.75,
  };

  const slideVariants = {
    initial: ({ dir, desktop, width }) => ({
      x: dir > 0 ? width * 0.65 : -width * 0.65,
      scale: desktop ? 0.18 : 0.92,
      opacity: 0,
      filter: desktop ? "blur(2px)" : "blur(0px)",
      zIndex: 0,
    }),
    prev2: ({ desktop, width }) =>
      desktop
        ? {
            x: -width * 0.45,
            scale: 0.28,
            opacity: 0.3,
            filter: "blur(1.5px)",
            zIndex: 10,
            transition: slideTransition,
          }
        : {
            x: -width * 1.15,
            scale: 0.85,
            opacity: 0,
            filter: "blur(0px)",
            zIndex: 5,
            transition: slideTransition,
          },
    prev1: ({ desktop, width }) =>
      desktop
        ? {
            x: -width * 0.27,
            scale: 0.4,
            opacity: 0.7,
            filter: "blur(0.5px)",
            zIndex: 20,
            transition: slideTransition,
          }
        : {
            x: -width * 1.05,
            scale: 0.92,
            opacity: 0,
            filter: "blur(0px)",
            zIndex: 10,
            transition: slideTransition,
          },
    center: () => ({
      x: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      zIndex: 30,
      transition: slideTransition,
    }),
    next1: ({ desktop, width }) =>
      desktop
        ? {
            x: width * 0.27,
            scale: 0.4,
            opacity: 0.7,
            filter: "blur(0.5px)",
            zIndex: 20,
            transition: slideTransition,
          }
        : {
            x: width * 1.05,
            scale: 0.92,
            opacity: 0,
            filter: "blur(0px)",
            zIndex: 10,
            transition: slideTransition,
          },
    next2: ({ desktop, width }) =>
      desktop
        ? {
            x: width * 0.45,
            scale: 0.28,
            opacity: 0.3,
            filter: "blur(1.5px)",
            zIndex: 10,
            transition: slideTransition,
          }
        : {
            x: width * 1.15,
            scale: 0.85,
            opacity: 0,
            filter: "blur(0px)",
            zIndex: 5,
            transition: slideTransition,
          },
    exit: ({ dir, desktop, width }) => ({
      x: dir > 0 ? -width * 0.65 : width * 0.65,
      scale: desktop ? 0.18 : 0.92,
      opacity: 0,
      filter: desktop ? "blur(2px)" : "blur(0px)",
      zIndex: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    }),
  };

  return (
    <section id="gallery" className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto overflow-x-clip">
      <SectionHeader
        eyebrow="Photography"
        title="Through the Lens"
        subtitle="Some pictures I've taken. Drag, swipe, or click any frame to expand."
        pillColor="bg-amber-100/80 text-amber-800"
      />

      {/* Carousel Stage */}
      <div className="relative">
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={finishTouch}
          onTouchCancel={finishTouch}
          className="relative left-1/2 -translate-x-1/2 w-screen touch-pan-y"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div
              ref={stageRef}
              className="relative flex items-center justify-center h-[280px] sm:h-[400px] lg:h-[460px]"
            >
          <AnimatePresence
            initial={false}
            custom={{ dir: direction, desktop: isDesktop, width: stageWidth }}
          >
            {visibleSlides.map(({ photo, offset }) => {
              const isCenter = offset === 0;
              const isMirror =
                total === 4 && offset === (direction > 0 ? -2 : 2);
              const slideKey = isMirror ? `${photo.id}-mirror` : photo.id;
              const slotName =
                offset === 0
                  ? "center"
                  : offset === -2
                    ? "prev2"
                    : offset === -1
                      ? "prev1"
                      : offset === 1
                        ? "next1"
                        : "next2";
              return (
                <motion.div
                  key={slideKey}
                  custom={{ dir: direction, desktop: isDesktop, width: stageWidth }}
                  variants={slideVariants}
                  initial="initial"
                  animate={slotName}
                  exit="exit"
                  whileHover={
                    !isCenter && isDesktop
                      ? Math.abs(offset) === 1
                        ? { scale: 0.43, opacity: 0.85 }
                        : { scale: 0.31, opacity: 0.6 }
                      : undefined
                  }
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={
                    isCenter
                      ? (_, info) => {
                          if (touchActiveRef.current) return;
                          if (info.offset.x < -60) paginate(1);
                          else if (info.offset.x > 60) paginate(-1);
                        }
                      : undefined
                  }
                  onTap={() => {
                    if (suppressTapRef.current) return;
                    if (isCenter) {
                      setLightboxOpen(true);
                    } else {
                      paginate(offset);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={
                    isCenter
                      ? "Expand photo"
                      : offset < 0
                        ? "Previous photo"
                        : "Next photo"
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (isCenter) setLightboxOpen(true);
                      else paginate(offset);
                    }
                  }}
                  className={`absolute max-w-full lg:max-w-[52%] overflow-hidden rounded-[1.75rem] ${
                    isCenter
                      ? "ring-2 ring-white/90 shadow-[0_24px_60px_rgba(15,23,42,0.6)] cursor-zoom-in active:cursor-grabbing"
                      : "ring-1 ring-white/80 shadow-[0_14px_32px_rgba(15,23,42,0.5)] cursor-pointer"
                  }`}
                >
                  <img
                    src={photo.image}
                    alt={photo.alt}
                    className="block w-auto h-auto max-w-full max-h-[260px] sm:max-h-[380px] lg:max-h-[440px] select-none pointer-events-none"
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

          {total === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-slate-500">
              <ImageIcon className="w-10 h-10 mb-2 text-slate-400" />
              <p className="text-sm font-medium">
                Add photos to <code className="font-mono text-xs">src/assets/carousel/</code> to display them here.
              </p>
            </div>
          )}
            </div>
          </div>
        </div>

        {/* Thumbnail Strip */}
        {total > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2.5 sm:gap-3 overflow-x-auto py-1 px-2">
            {photographyList.map((photo, idx) => {
              const isActive = idx === safeIndex;
              return (
                <button
                  key={photo.id}
                  onClick={() => goToIndex(idx)}
                  className="relative group focus:outline-none shrink-0"
                  aria-label={`View ${photo.alt}`}
                >
                  <div
                    className={`w-14 h-10 sm:w-20 sm:h-12 rounded-xl overflow-hidden transition-all ${
                      isActive
                        ? "scale-105 opacity-100"
                        : "opacity-55 hover:opacity-85"
                    }`}
                  >
                    <img
                      src={photo.image}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isActive && (
                    <motion.span
                      layoutId="activeThumb"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      className="absolute -inset-1 rounded-2xl border-2 border-violet-400 pointer-events-none"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full glass-panel-strong rounded-3xl p-3 sm:p-4"
            >
              <button
                onClick={() => setLightboxOpen(false)}
                aria-label="Close lightbox"
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={currentPhoto.image}
                alt={currentPhoto.alt}
                className="w-full max-h-[80vh] object-contain rounded-2xl bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

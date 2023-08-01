import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  Ref,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from "react";
import { gsap } from "gsap";

interface HamburgerProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const assignRefs = <T extends unknown>(...refs: Ref<T | null>[]) => {
  return (node: T | null) => {
    refs.forEach((r) => {
      if (typeof r === "function") {
        r(node);
      } else if (r) {
        (r as MutableRefObject<T | null>).current = node;
      }
    });
  };
};

const Hamburger = forwardRef<HTMLButtonElement, HamburgerProps>(
  function Hamburger({ isMenuOpen, setIsMenuOpen }, menuButtonRef) {
    const menuHoverRef = useRef<HTMLDivElement | null>(null);
    const menuTopRef = useRef<SVGRectElement | null>(null);
    const menuMidRef = useRef<SVGRectElement | null>(null);
    const menuBottomRef = useRef<SVGRectElement | null>(null);
    const localButtonRef = useRef<HTMLButtonElement | null>(null);

    const tl = useRef<GSAPTimeline>();

    const [isHover, setIsHover] = useState<boolean>(false);

    const isTouchDevice = () => {
      return window.matchMedia("(hover: none)").matches;
    };

    const handleMouseEnterBurg = () => {
      if (isTouchDevice()) return;

      setIsHover(true);
      if (!isMenuOpen) {
        gsap.to(menuHoverRef.current, {
          scale: 1,
          opacity: 0.6,
          duration: 0.75,
          ease: "elastic.out(1, 0.75)",
        });
      }
    };

    const handleMouseLeaveBurg = () => {
      if (isTouchDevice()) return;

      setIsHover(false);
      if (!isMenuOpen) {
        gsap.to(menuHoverRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
        });
      }

      gsap.to(localButtonRef.current, {
        x: 0,
        y: 0,
        duration: 0.3,
      });
    };

    const handleMouseMoveBurg = (event: MouseEvent) => {
      if (isTouchDevice()) return;

      const { clientX, clientY } = event;
      const scaleFactor = 0.3;

      if (!localButtonRef?.current) return;

      const rect = localButtonRef.current.getBoundingClientRect();
      gsap.to(localButtonRef.current, {
        x: (clientX - rect.x - 5) * scaleFactor,
        y: (clientY - rect.y - 5) * scaleFactor,
        duration: 0.3,
      });
    };

    useEffect(() => {
      isMenuOpen ? tl.current?.play() : tl.current?.reverse();
    }, [isMenuOpen]);

    // Handle hover animation when menu toggles
    useEffect(() => {
      if (!isMenuOpen && !isHover && menuHoverRef.current) {
        gsap.to(menuHoverRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
        });
      }

      if (isMenuOpen && !isHover && menuHoverRef.current) {
        gsap.to(menuHoverRef.current, {
          scale: 1,
          opacity: 0.6,
          duration: 0.75,
          ease: "elastic.out(1, 0.75)",
        });
      }
    }, [isMenuOpen, isHover]);

    useEffect(() => {
      // timeline for menu button animation
      tl.current = gsap.timeline({ paused: true });
      tl.current
        .to(menuTopRef.current, { y: "-2px", duration: 0.2 }, "initial")
        .to(menuBottomRef.current, { y: "2px", duration: 0.2 }, "initial")
        .to(
          menuMidRef.current,
          { scale: 0.1, transformOrigin: "50% 50%", duration: 0.2 },
          "initial"
        )
        .to(menuTopRef.current, { y: 7, duration: 0.2 }, "rotate")
        .to(menuBottomRef.current, { y: -7, duration: 0.2 }, "rotate")
        .to(
          menuTopRef.current,
          {
            rotationZ: 45,
            transformOrigin: "50% 50%",
            scale: 0.8,
            duration: 0.2,
          },
          "rotate"
        )
        .to(
          menuBottomRef.current,
          {
            rotationZ: -45,
            transformOrigin: "50% 50%",
            scale: 0.8,
            duration: 0.2,
          },
          "rotate"
        );
    }, []);

    return (
      <button
        className="relative z-50 flex h-16 w-16 items-center justify-center rounded-md bg-transparent p-2 focus:outline-none"
        type="button"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
        onMouseEnter={handleMouseEnterBurg}
        onMouseLeave={handleMouseLeaveBurg}
        onMouseMove={handleMouseMoveBurg}
        ref={assignRefs(
          localButtonRef,
          menuButtonRef as Ref<HTMLButtonElement>
        )}
      >
        {" "}
        <div
          ref={menuHoverRef}
          className="absolute left-1/2 top-1/2 -z-10 h-[150%] w-[150%] -translate-x-1/2 
              -translate-y-1/2 scale-0 transform rounded-full bg-red-500 opacity-60"
        />
        <svg
          width="80"
          height="50"
          viewBox="0 0 56 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            ref={menuTopRef}
            width="54.8962"
            height="4.01994"
            rx="2.00997"
            transform="matrix(-1 0 0 1 55.7715 0.469971)"
            fill="#E74451"
          />
          <rect
            ref={menuMidRef}
            width="45.5334"
            height="4.01994"
            rx="2.00997"
            transform="matrix(-1 0 0 1 55.7715 14.49)"
            fill="#E74451"
          />
          <rect
            ref={menuBottomRef}
            width="33.4182"
            height="4.01994"
            rx="2.00997"
            transform="matrix(-1 0 0 1 55.7715 28.51)"
            fill="#E74451"
          />
        </svg>
      </button>
    );
  }
);

export default Hamburger;

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
        .to(menuTopRef.current, { y: "10px", duration: 0.4 }, "initial")
        .to(menuBottomRef.current, { y: "10px", duration: 0.4 }, "initial")
        .to(
          menuMidRef.current,
          { scale: 0.01, transformOrigin: "50% 50%", duration: 0.3 },
          0
        )
        .to(
          menuBottomRef.current,
          { attr: { width: 54.8962 }, duration: 0.2 },
          "initial"
        )
        .to(
          menuTopRef.current,
          {
            rotationZ: 45,
            transformOrigin: "50% 50%",
            scale: 1,
            duration: 0.5,
          },
          "rotate"
        )
        .to(
          menuBottomRef.current,
          {
            rotationZ: -45,
            transformOrigin: "50% 50%",
            scale: 1,
            duration: 0.5,
          },
          "rotate"
        )
        .to(menuTopRef.current, { fill: "white", duration: 1 }, 0)
        .to(menuBottomRef.current, { fill: "white", duration: 1 }, 0);
    }, []);

    return (
      <button
        className="relative z-50 flex h-16 w-16 items-center justify-center rounded-md bg-transparent p-2 focus:outline-none"
        type="button"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
        ref={assignRefs(
          localButtonRef,
          menuButtonRef as Ref<HTMLButtonElement>
        )}
      >
        <div />
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

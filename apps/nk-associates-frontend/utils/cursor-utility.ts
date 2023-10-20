import MouseFollower from "mouse-follower";
import { gsap } from "gsap";
class CursorUtility {
  private cursor: MouseFollower | null = null;
  private mainElement: HTMLDivElement | null = null;
  private innerElement: HTMLDivElement | null = null;
  private mediaElement: HTMLDivElement | null = null;
  private mediaBox: HTMLDivElement | null = null;
  private imageElement: HTMLImageElement | null = null;
  private minSkew: number = 0.009;
  private maxSkew: number = 0.004;
  private isCursorVisible: boolean = false;
  private containerClass: HTMLElement | null = null;
  private pointerMoveListener: (e: MouseEvent) => void;

  private followerAnim: gsap.core.Timeline;
  constructor(containerClass: HTMLElement) {
    MouseFollower.registerGSAP(gsap);
    this.followerAnim = gsap.timeline({ paused: true, overwrite: "auto" });
    this.containerClass = containerClass;

    this.mainElement = document.createElement("div");
    this.mainElement.className = "mf-cursor";

    /* COMMENTED CODE WILL BE USED LATER */

    // this.innerElement = document.createElement("div");
    // this.innerElement.className = "inner-elem";

    this.mediaElement = document.createElement("div");
    this.mediaElement.className = "mf-cursor-media";

    // this.mediaBox = document.createElement("div");
    // this.mediaBox.className = "mf-cursor-media-box";

    // this.imageElement = document.createElement("img");
    // this.imageElement.src = "/assets/icons/cursor-icon.svg";

    // this.innerElement.appendChild(this.mediaElement);
    // this.mediaElement.appendChild(this.imageElement);
    // this.mainElement.appendChild(this.innerElement);

    // this.mediaElement.appendChild(this.imageElement);
    this.mainElement.appendChild(this.mediaElement);

    containerClass.appendChild(this.mainElement);
    gsap.set(".mf-cursor", { xPercent: -50, yPercent: -50 });

    // Initialize skewing factors

    let xTo = gsap.quickTo(".mf-cursor", "x", {
      duration: 0.4,
      ease: "power3",
    });
    let yTo = gsap.quickTo(".mf-cursor", "y", {
      duration: 0.4,
      ease: "power3",
    });

    // containerClass.addEventListener("pointermove", (e) => {
    //   if (this.isCursorVisible) {
    //     const vel = {
    //       x: e.clientX - -window.innerWidth,
    //       y: e.clientY - -window.innerHeight,
    //     };

    //     const distance = Math.sqrt(Math.pow(vel.x, 2) + Math.pow(vel.y, 2));
    //     const scale = Math.min(distance * this.minSkew, this.maxSkew) * 2;
    //     const angle = (Math.atan2(vel.y, vel.x) * 180) / Math.PI;

    //     xTo(e.clientX);
    //     yTo(e.clientY);
    //   }
    // });
    this.pointerMoveListener = (e) => {
      if (this.isCursorVisible) {
        const vel = {
          x: e.clientX - -window.innerWidth,
          y: e.clientY - -window.innerHeight,
        };

        const distance = Math.sqrt(Math.pow(vel.x, 2) + Math.pow(vel.y, 2));
        const angle = (Math.atan2(vel.y, vel.x) * 180) / Math.PI;
        const scale = Math.min(distance * this.minSkew, this.maxSkew);
        console.log(distance, 1 + scale, 1 - scale, angle);

        // Apply skew and rotation to the cursor
        gsap.to(".mf-cursor-media", {
          duration: 0.3,
          // scale: scale,
          // skewX: angle + 10,
          // rotate: angle,
          scaleX: 1 + scale,
          scaleY: 1 - scale,
          // skewY: -skew,
          // rotation: angle,
          ease: "power3.out",
        });

        // Implement the xTo and yTo functions as needed
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };
    this.containerClass.addEventListener(
      "pointermove",
      this.pointerMoveListener,
    );
  }
  showCursor() {
    if (this.mainElement && !this.isCursorVisible) {
      this.isCursorVisible = true;
      gsap.fromTo(
        this.mainElement,
        {
          scale: 0,
          transformOrigin: "center center",
        },
        {
          duration: 0.3,
          scale: 1,
          ease: "power3.inOut",
        },
      );
    }
  }

  hideCursor() {
    if (this.mainElement && this.isCursorVisible) {
      // gsap.to(this.mainElement, {
      //   duration: 0.3,
      //   scale: 0,
      //   ease: "power3.inOut",
      // });
    }
    this.isCursorVisible = false;
  }

  destroy() {
    if (this.pointerMoveListener && this.containerClass) {
      this.containerClass.removeEventListener(
        "pointermove",
        this.pointerMoveListener,
      );
    }
  }
}
export default CursorUtility;

// import MouseFollower from "mouse-follower";
// import { gsap } from "gsap";
// import { Container } from "postcss";
// class CursorUtility {
//   private cursor: MouseFollower | null = null;
//   private followerAnim: gsap.core.Timeline;
//   constructor(containerClass: string | HTMLElement) {
//     MouseFollower.registerGSAP(gsap);
//     if (window.matchMedia("(pointer:fine)").matches) {
//       this.cursor = new MouseFollower({
//         el: null,
//         container: containerClass,
//         className: "mf-cursor",
//         visible: false,
//       });
//     }
//   }
//   showCursor() {
//     if (this.cursor) {
//       this.cursor.show();
//       this.cursor.setImg("/assets/icons/cursor-icon.svg");
//       this.cursor.setSkewing(3);
//     }
//   }
//   hideCursor() {
//     if (this.cursor) {
//       this.cursor.hide();
//       this.cursor.removeImg();
//     }
//   }
//   destroy() {
//     if (this.cursor) {
//       this.cursor.destroy();
//     }
//   }
// }
// export default CursorUtility;

import MouseFollower from "mouse-follower";
import { gsap } from "gsap";
class CursorUtility {
  private cursor: MouseFollower | null = null;
  private mainElement: HTMLDivElement | null = null;
  private innerElement: HTMLDivElement | null = null;
  private mediaElement: HTMLDivElement | null = null;
  private mediaBox: HTMLDivElement | null = null;
  private imageElement: HTMLImageElement | null = null;
  private minSkew: number = 0.0005;
  private maxSkew: number = 0.004;

  private followerAnim: gsap.core.Timeline;
  constructor(containerClass: HTMLElement) {
    MouseFollower.registerGSAP(gsap);
    this.followerAnim = gsap.timeline({ paused: true, overwrite: "auto" });

    this.mainElement = document.createElement("div");
    this.mainElement.className = "mf-cursor";

    this.innerElement = document.createElement("div");
    this.innerElement.className = "inner-elem";

    this.mediaElement = document.createElement("div");
    this.mediaElement.className = "mf-cursor-media";

    this.mediaBox = document.createElement("div");
    this.mediaBox.className = "mf-cursor-media-box";

    this.imageElement = document.createElement("img");
    // this.imageElement.className = "mf-cursor-media-box";
    this.imageElement.src = "/assets/icons/cursor-icon.svg";
    // this.media.appendChild(this.mediaBox);
    // this.inner.appendChild(this.media);
    this.innerElement.appendChild(this.mediaElement);
    this.mediaElement.appendChild(this.imageElement);
    this.mainElement.appendChild(this.innerElement);
    containerClass.appendChild(this.mainElement);

    // gsap.set(".mf-cursor", { xPercent: -50, yPercent: -50 });
    // let xTo = gsap.quickTo(".mf-cursor", "x", {
    //     duration: 0.5,
    //     ease: "power3",
    //   }),
    //   yTo = gsap.quickTo(".mf-cursor", "y", { duration: 0.5, ease: "power3" });

    // containerClass.addEventListener("pointermove", (e) => {
    //   xTo(e.clientX);
    //   yTo(e.clientY);
    // });

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

    containerClass.addEventListener("pointermove", (e) => {
      // const skewX = (e.clientX - window.innerWidth / 2) * this.skewFactor;
      // const skewY = (e.clientY - window.innerHeight / 2) * this.skewFactor;

      // this.mainElement!.style.transform = `translate(${e.clientX}px, ${e.clientY}px) skew(${skewX}deg, ${skewY}deg)`;
      // this.innerElement!.style.transform = `rotate(-${skewX}deg)`;
      const vel = {
        x: e.clientX - -window.innerWidth,
        y: e.clientY - -window.innerHeight,
      };

      const distance = Math.sqrt(Math.pow(vel.x, 2) + Math.pow(vel.y, 2));
      const scale = Math.min(distance * this.minSkew, this.maxSkew) * 2;
      const angle = (Math.atan2(vel.y, vel.x) * 180) / Math.PI;

      xTo(e.clientX);
      yTo(e.clientY);
    });
  }
  showCursor() {
    console.log("show cursor");
    if (this.mainElement) {
      // this.mainElement.style.visibility = "visible";

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
    console.log("hide cursor");
    if (this.mainElement) {
      gsap.to(this.mainElement, {
        duration: 0.3,
        scale: 0,
        ease: "power3.inOut",
        onComplete: () => {
          // this.mainElement.style.display = "none";
        },
      });
    }
  }
  destroy() {
    if (this.cursor) {
      this.cursor.destroy();
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

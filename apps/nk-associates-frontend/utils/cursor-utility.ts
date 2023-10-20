import MouseFollower from "mouse-follower";
import { gsap } from "gsap";
class CursorUtility {
  // private cursorContainer: HTMLDivElement | null = null;
  private cursorContainer: HTMLDivElement | null = null;
  private mediaElement: HTMLDivElement | null = null;
  private imageElement: HTMLImageElement | null = null;
  private isCursorVisible: boolean = false;

  private containerClass: HTMLElement | null = null;
  private pos: { x: number; y: number } = { x: 0, y: 0 };
  private vel: { x: number; y: number } = { x: 0, y: 0 };
  private set: {
    x: (value: any) => any;
    y: (value: any) => any;
    r: (value: any) => any;
    sx: (value: any) => any;
    sy: (value: any) => any;
    rt: (value: any) => any;
  };

  constructor(containerClass: HTMLElement) {
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };

    this.set = {
      x: () => {},
      y: () => {},
      r: () => {},
      sx: () => {},
      sy: () => {},
      rt: () => {},
    };

    this.cursorContainer = document.createElement("div");
    this.cursorContainer.className = "mfs_cursor";

    this.mediaElement = document.createElement("div");
    this.mediaElement.className = "media-element";

    this.imageElement = document.createElement("img");
    this.imageElement.src = "/assets/icons/cursor-icon.svg";

    this.mediaElement.appendChild(this.imageElement);

    this.cursorContainer.appendChild(this.mediaElement);

    containerClass.appendChild(this.cursorContainer);
    this.containerClass = containerClass;

    this.initialize();
  }

  private getScale = (diffX: number, diffY: number): number => {
    const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    return Math.min(distance / 735, 0.35);
  };

  private getAngle = (diffX: number, diffY: number): number => {
    return (Math.atan2(diffY, diffX) * 180) / Math.PI;
  };

  private loop = (): void => {
    const rotation = this.getAngle(this.vel.x, this.vel.y);
    const scale = this.getScale(this.vel.x, this.vel.y);

    this.set.x(this.pos.x);
    this.set.y(this.pos.y);
    this.set.r(rotation);
    this.set.sx(1 + scale);
    this.set.sy(1 - scale);
    this.set.rt(-rotation);
  };

  private setFromEvent = (e: MouseEvent): void => {
    if (this.isCursorVisible) {
      const x = e.clientX;
      const y = e.clientY;
      gsap.to(this.pos, {
        x: x,
        y: y,
        duration: 0.35,
        ease: "none",
        onUpdate: () => {
          this.vel.x = x - this.pos.x;
          this.vel.y = y - this.pos.y;
        },
      });

      this.loop();
    }
  };

  public initialize = (): void => {
    this.set.x = gsap.quickSetter(this.cursorContainer, "x", "px");
    this.set.y = gsap.quickSetter(this.cursorContainer, "y", "px");
    this.set.r = gsap.quickSetter(this.cursorContainer, "rotate", "deg");
    this.set.sx = gsap.quickSetter(this.cursorContainer, "scaleX");
    this.set.sy = gsap.quickSetter(this.cursorContainer, "scaleY");
    this.set.rt = gsap.quickSetter(this.mediaElement, "rotate", "deg");

    this.containerClass.addEventListener("pointermove", this.setFromEvent);
    gsap.ticker.add(this.loop);
  };

  public destroy = (): void => {
    window.removeEventListener("pointermove", this.setFromEvent);
    gsap.ticker.remove(this.loop);
  };

  showCursor() {
    if (this.cursorContainer && !this.isCursorVisible) {
      this.isCursorVisible = true;
      gsap.to(
        this.mediaElement,
        {
          scale: 1,
          transformOrigin: "center center",
        },
        // {
        //   duration: 0.3,
        //   scale: 1,
        //   ease: "power3.inOut",
        // },
      );
    }
  }

  hideCursor() {
    if (this.cursorContainer && this.isCursorVisible) {
      gsap.to(this.mediaElement, {
        duration: 0.3,
        scale: 0,
        ease: "power3.inOut",
      });
    }
    this.isCursorVisible = false;
  }

  // destroy() {
  //   if (this.pointerMoveListener && this.containerClass) {
  //     this.containerClass.removeEventListener(
  //       "pointermove",
  //       this.pointerMoveListener,
  //     );
  //   }
  // }
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

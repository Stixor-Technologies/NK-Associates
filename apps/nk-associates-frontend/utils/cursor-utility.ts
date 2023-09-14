import MouseFollower from "mouse-follower";
import { gsap } from "gsap";
import { Container } from "postcss";

class CursorUtility {
  private cursor: MouseFollower | null = null;
  private followerAnim: gsap.core.Timeline;

  constructor(containerClass: string | HTMLElement) {
    MouseFollower.registerGSAP(gsap);
    // if (window.matchMedia("(pointer:fine)").matches) {
    //   this.cursor = new MouseFollower({
    //     el: null,
    //     container: containerClass,
    //     className: "mf-cursor",
    //     visible: false,
    //   });
    // }
    gsap.set(".follower", { xPercent: -50, yPercent: -50 });

    let xTo = gsap.quickTo(".follower", "x", { duration: 0.6, ease: "power3" }),
      yTo = gsap.quickTo(".follower", "y", { duration: 0.6, ease: "power3" });

    window.addEventListener("mousemove", (e) => {
      console.log("mouse event");
      xTo(e.clientX);
      yTo(e.clientY);
    });

    //animate when passing over relevant objects
    var followerText = document.querySelector(".follower__content");
    this.followerAnim = gsap.timeline({ paused: true, overwrite: "auto" });

    this.followerAnim.to(
      ".follower__inner__bottom",
      {
        scale: 4,
        backgroundColor: "#F6EFEB",
        duration: 0.15,
      },
      0,
    );
  }

  showCursor() {
    // if (this.cursor) {
    //   this.cursor.show();
    //   this.cursor.setImg("/assets/icons/cursor-icon.svg");
    //   this.cursor.setSkewing(3);
    // }
    this.followerAnim.invalidate();
    this.followerAnim.restart().timeScale(1);
  }

  hideCursor() {
    // if (this.cursor) {
    //   this.cursor.hide();
    //   this.cursor.removeImg();
    // }

    this.followerAnim.timeScale(-2);
  }

  destroy() {
    if (this.cursor) {
      this.cursor.destroy();
    }
  }
}

export default CursorUtility;

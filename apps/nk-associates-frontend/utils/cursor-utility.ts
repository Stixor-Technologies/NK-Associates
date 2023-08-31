import MouseFollower from "mouse-follower";
import { gsap } from "gsap";
import { Container } from "postcss";

class CursorUtility {
  private cursor: MouseFollower | null = null;

  constructor(containerClass: string | HTMLElement) {
    MouseFollower.registerGSAP(gsap);
    if (window.matchMedia("(pointer:fine)").matches) {
      this.cursor = new MouseFollower({
        el: null,
        container: containerClass,
        className: "mf-cursor",
        visible: false,
      });
    }
  }

  showCursor() {
    if (this.cursor) {
      this.cursor.show();
      this.cursor.setImg("/assets/icons/cursor-icon.svg");
      this.cursor.setSkewing(3);
    }
  }

  hideCursor() {
    if (this.cursor) {
      this.cursor.hide();
      this.cursor.removeImg();
    }
  }

  destroy() {
    if (this.cursor) {
      this.cursor.destroy();
    }
  }
}

export default CursorUtility;

import MouseFollower from "mouse-follower";
import { gsap } from "gsap";

class CursorUtility {
  private cursor: MouseFollower | null = null;

  constructor(containerClass: string) {
    MouseFollower.registerGSAP(gsap);
    this.cursor = new MouseFollower({
      el: null,
      container: containerClass,
      className: "mf-cursor",
      visible: false,
    });
  }

  showCursor() {
    if (this.cursor) {
      this.cursor.show();
    }
  }

  hideCursor() {
    if (this.cursor) {
      this.cursor.hide();
    }
  }

  setImage(imageUrl: string) {
    if (this.cursor) {
      this.cursor.setImg(imageUrl);
    }
  }

  removeImage() {
    if (this.cursor) {
      this.cursor.removeImg();
    }
  }
}

export default CursorUtility;

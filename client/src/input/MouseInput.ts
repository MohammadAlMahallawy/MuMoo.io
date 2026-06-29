export class MouseInput {
  private mouseX = 0;
  private mouseY = 0;
  private isPressed = false;

  constructor() {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mousedown", this.handleMouseDown);
    window.addEventListener("mouseup", this.handleMouseUp);
    window.addEventListener("blur", this.clear);
  }

  getMousePosition(): { x: number; y: number } {
    return { x: this.mouseX, y: this.mouseY };
  }

  isMouseDown(): boolean {
    return this.isPressed;
  }

  private readonly handleMouseMove = (event: MouseEvent): void => {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };

  private readonly handleMouseDown = (event: MouseEvent): void => {
    if (event.button === 0) { // Left click
      this.isPressed = true;
    }
  };

  private readonly handleMouseUp = (event: MouseEvent): void => {
    if (event.button === 0) { // Left click
      this.isPressed = false;
    }
  };

  private readonly clear = (): void => {
    this.isPressed = false;
  };

  destroy(): void {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mousedown", this.handleMouseDown);
    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("blur", this.clear);
  }
}


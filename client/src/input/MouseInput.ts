export class MouseInput {
  private mouseX = 0;
  private mouseY = 0;

  constructor() {
    window.addEventListener("mousemove", this.handleMouseMove);
  }

  getMousePosition(): { x: number; y: number } {
    return { x: this.mouseX, y: this.mouseY };
  }

  private readonly handleMouseMove = (event: MouseEvent): void => {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };

  destroy(): void {
    window.removeEventListener("mousemove", this.handleMouseMove);
  }
}

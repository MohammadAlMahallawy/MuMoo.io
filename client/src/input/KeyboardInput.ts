const MOVEMENT_KEYS = new Set(["KeyW", "KeyA", "KeyS", "KeyD"]);

export type MovementVector = {
  x: number;
  y: number;
};

export class KeyboardInput {
  private readonly pressedKeys = new Set<string>();

  constructor() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("blur", this.clear);
  }

  getMovementVector(): MovementVector {
    let x = 0;
    let y = 0;

    if (this.pressedKeys.has("KeyW")) {
      y -= 1;
    }

    if (this.pressedKeys.has("KeyS")) {
      y += 1;
    }

    if (this.pressedKeys.has("KeyA")) {
      x -= 1;
    }

    if (this.pressedKeys.has("KeyD")) {
      x += 1;
    }

    if (x === 0 && y === 0) {
      return { x, y };
    }

    const length = Math.hypot(x, y);

    return {
      x: x / length,
      y: y / length
    };
  }

  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (!MOVEMENT_KEYS.has(event.code)) {
      return;
    }

    this.pressedKeys.add(event.code);
  };

  private readonly handleKeyUp = (event: KeyboardEvent): void => {
    this.pressedKeys.delete(event.code);
  };

  private readonly clear = (): void => {
    this.pressedKeys.clear();
  };
}

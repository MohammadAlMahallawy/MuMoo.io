import { Container, Graphics } from "pixi.js";

const GRID_SIZE = 64;
const BACKGROUND_EXTENT = 4096;

export class BackgroundLayer {
  readonly container = new Container();

  private readonly graphics = new Graphics();

  constructor() {
    this.container.addChild(this.graphics);
  }

  resize(_width: number, _height: number): void {
    this.graphics.clear();

    this.graphics
      .rect(
        -BACKGROUND_EXTENT,
        -BACKGROUND_EXTENT,
        BACKGROUND_EXTENT * 2,
        BACKGROUND_EXTENT * 2
      )
      .fill("#236f46");

    // This is a rendering-engine background only. Real world tiles belong to the world milestone.
    for (let x = -BACKGROUND_EXTENT; x <= BACKGROUND_EXTENT; x += GRID_SIZE) {
      this.graphics.moveTo(x, -BACKGROUND_EXTENT).lineTo(x, BACKGROUND_EXTENT);
    }

    for (let y = -BACKGROUND_EXTENT; y <= BACKGROUND_EXTENT; y += GRID_SIZE) {
      this.graphics.moveTo(-BACKGROUND_EXTENT, y).lineTo(BACKGROUND_EXTENT, y);
    }

    this.graphics.stroke({
      width: 1,
      color: "#2f8055",
      alpha: 0.45
    });
  }
}

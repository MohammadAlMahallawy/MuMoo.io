import { Container, Text } from "pixi.js";
import { PROJECT_NAME } from "@mumoo/shared";

const SAMPLE_INTERVAL_MS = 250;

export class FrameStats {
  readonly view = new Container();

  private readonly text = new Text({
    text: `${PROJECT_NAME}\nFPS: --\nDelta: -- ms`,
    style: {
      fill: "#f7fff9",
      fontFamily: "Arial, Helvetica, sans-serif",
      fontSize: 14,
      lineHeight: 19
    }
  });

  private elapsedMs = 0;
  private frames = 0;

  constructor() {
    this.view.addChild(this.text);
  }

  position(x: number, y: number): void {
    this.view.position.set(x, y);
  }

  update(deltaMs: number): void {
    this.elapsedMs += deltaMs;
    this.frames += 1;

    if (this.elapsedMs < SAMPLE_INTERVAL_MS) {
      return;
    }

    const fps = Math.round((this.frames * 1000) / this.elapsedMs);

    this.text.text = `${PROJECT_NAME}\nFPS: ${fps}\nDelta: ${deltaMs.toFixed(2)} ms`;
    this.elapsedMs = 0;
    this.frames = 0;
  }
}

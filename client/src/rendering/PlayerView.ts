import { Container, Graphics } from "pixi.js";
import type { Player } from "../gameplay/Player";

export class PlayerView {
  readonly container = new Container();
  private readonly bodyGraphic = new Graphics();
  private readonly handGraphic = new Graphics();

  constructor(private readonly player: Player) {
    // Main Body
    this.bodyGraphic.circle(0, 0, 24)
      .fill("#f6d365")
      .stroke({ width: 3, color: "#3b2411" });

    // Punching Fist
    this.handGraphic.circle(0, 0, 7)
      .fill("#8b5a2b")
      .stroke({ width: 2, color: "#3b2411" });
    this.handGraphic.position.set(18, 0);

    this.container.addChild(this.bodyGraphic, this.handGraphic);
    this.sync();
  }

  sync(): void {
    this.container.position.set(this.player.x, this.player.y);
    this.container.rotation = this.player.rotation;

    // Animate the fist forward based on swing progress (using sine wave for ease-in-out movement)
    if (this.player.swingProgress > 0) {
      const punchOffset = Math.sin(this.player.swingProgress * Math.PI) * 16;
      this.handGraphic.position.set(18 + punchOffset, 0);
    } else {
      this.handGraphic.position.set(18, 0);
    }
  }
}


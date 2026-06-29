import { Container, Graphics } from "pixi.js";
import type { Player } from "../gameplay/Player";

export class PlayerView {
  readonly container = new Container();

  private readonly body = new Graphics();

  constructor(private readonly player: Player) {
    this.body.circle(0, 0, 24).fill("#f6d365");
    this.body.circle(12, 0, 7).fill("#8b5a2b");
    this.body.stroke({
      width: 3,
      color: "#3b2411"
    });

    this.container.addChild(this.body);
    this.sync();
  }

  sync(): void {
    this.container.position.set(this.player.x, this.player.y);
    this.container.rotation = this.player.rotation;
  }
}

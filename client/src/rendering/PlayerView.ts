import { Container, Graphics } from "pixi.js";
import type { Player } from "../gameplay/Player";

export class PlayerView {
  readonly container = new Container();
  private readonly bodyGraphic = new Graphics();
  private readonly handGraphicR = new Graphics();
  private readonly handGraphicL = new Graphics();


  constructor(private readonly player: Player) {
    // Main Body
    this.bodyGraphic.circle(0, 0, 24)
      .fill("#f6d365")
      .stroke({ width: 3, color: "#3b2411" });

    // Punching Right Fist
    this.handGraphicR.circle(0, 0, 7)
      .fill("#8b5a2b")
      .stroke({ width: 2, color: "#3b2411" });
    this.handGraphicR.position.set(18, 0);


    this.sync();

    // Punching Left Fist 
    this.handGraphicL.circle(0, 0, 7)
      .fill("#8b5a2b")
      .stroke({ width: 2, color: "#3b2411" });
    this.handGraphicL.position.set(18, 0);

    this.sync();
    this.container.addChild(this.handGraphicL, this.handGraphicR,this.bodyGraphic);

  }

  sync(): void {
    this.container.position.set(this.player.x, this.player.y);
    this.container.rotation = this.player.rotation;

    // Animate the fist forward based on swing progress (using sine wave for ease-in-out movement)
    if (this.player.swingProgress > 0) {
      const punchOffset = Math.sin(this.player.swingProgress * Math.PI) * 16;
      this.handGraphicR.position.set(18 + punchOffset, 14);
      this.handGraphicL.position.set(18 + punchOffset, -14);
    } else {
      this.handGraphicR.position.set(18, 14);
      this.handGraphicL.position.set(18, -14);
    }
  }
}


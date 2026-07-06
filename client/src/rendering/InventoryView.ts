import { Container, Graphics, Text } from "pixi.js";
import type { Player } from "../gameplay/Player";

export class InventoryView {
  readonly view = new Container();
  private readonly background = new Graphics();
  private readonly text = new Text({
    text: "Wood: 0\nStone: 0\nFood: 0\ngold: 0",
    style: {
      fill: "#f7fff9",
      fontFamily: "Arial, Helvetica, sans-serif",
      fontSize: 16,
      fontWeight: "bold",
      lineHeight: 22
    }
  });

  constructor(private readonly player: Player) {
    // Semi-transparent dark background card for HUD styling
    this.background.roundRect(0, 0, 150, 105, 8)
      .fill({ color: "#000000", alpha: 0.8 })
      .stroke({ width: 2, color: "#444444" });

    this.text.position.set(15, 10);
    this.view.addChild(this.background, this.text);
  }

  position(x: number, y: number): void {
    this.view.position.set(x, y);
  }

  update(): void {
    const inv = this.player.inventory;
    this.text.text = `Wood: ${inv.wood}\nStone: ${inv.stone}\nFood: ${inv.food}\ngold: ${inv.gold}`;
  }
}

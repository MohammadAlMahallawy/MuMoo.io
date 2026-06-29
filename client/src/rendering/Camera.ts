import type { Container } from "pixi.js";
import type { Player } from "../gameplay/Player";

export class Camera {
  constructor(private readonly world: Container) {}

  follow(target: Player, screenWidth: number, screenHeight: number): void {
    this.world.pivot.set(target.x, target.y);
    this.world.position.set(screenWidth / 2, screenHeight / 2);
  }
}

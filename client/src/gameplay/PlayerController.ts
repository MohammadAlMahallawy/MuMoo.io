import { KeyboardInput } from "../input/KeyboardInput";
import { Player } from "./Player";

const PLAYER_MOVE_SPEED = 260;

export class PlayerController {
  constructor(
    private readonly player: Player,
    private readonly input: KeyboardInput
  ) {}

  update(deltaSeconds: number): void {
    const movement = this.input.getMovementVector();

    if (movement.x === 0 && movement.y === 0) {
      return;
    }

    this.player.x += movement.x * PLAYER_MOVE_SPEED * deltaSeconds;
    this.player.y += movement.y * PLAYER_MOVE_SPEED * deltaSeconds;
    this.player.rotation = Math.atan2(movement.y, movement.x);
  }
}

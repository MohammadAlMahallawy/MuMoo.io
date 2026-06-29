import { MAP_HALF_SIZE, PLAYER_MOVE_SPEED, PLAYER_RADIUS, WorldEntity } from "@mumoo/shared";
import { KeyboardInput } from "../input/KeyboardInput";
import { Player } from "./Player";

export class PlayerController {
  constructor(
    private readonly player: Player,
    private readonly input: KeyboardInput
  ) {}

  update(
    deltaSeconds: number,
    mousePos: { x: number; y: number } | null,
    screenWidth: number,
    screenHeight: number,
    entities: WorldEntity[]
  ): void {
    // 1. Update player rotation to face the mouse cursor
    if (mousePos) {
      const dx = mousePos.x - screenWidth / 2;
      const dy = mousePos.y - screenHeight / 2;

      // Only update rotation if the mouse is not exactly at the center to avoid division/precision issues
      if (dx !== 0 || dy !== 0) {
        this.player.rotation = Math.atan2(dy, dx);
      }
    }

    // 2. Process WASD movement vector
    const movement = this.input.getMovementVector();
    if (movement.x !== 0 || movement.y !== 0) {
      this.player.x += movement.x * PLAYER_MOVE_SPEED * deltaSeconds;
      this.player.y += movement.y * PLAYER_MOVE_SPEED * deltaSeconds;
    }

    // 3. Resolve collisions with world entities (circle-to-circle collision pushing)
    for (const entity of entities) {
      const dx = this.player.x - entity.x;
      const dy = this.player.y - entity.y;
      const distance = Math.hypot(dx, dy);
      const minDistance = PLAYER_RADIUS + entity.radius;

      if (distance < minDistance) {
        const overlap = minDistance - distance;
        // Normal vector pointing from entity center to player center
        const nx = distance > 0 ? dx / distance : 1;
        const ny = distance > 0 ? dy / distance : 0;

        // Push the player out along the normal vector
        this.player.x += nx * overlap;
        this.player.y += ny * overlap;
      }
    }

    // 4. Clamp the player position within the world boundaries
    const boundaryLimit = MAP_HALF_SIZE - PLAYER_RADIUS;
    this.player.x = Math.max(-boundaryLimit, Math.min(boundaryLimit, this.player.x));
    this.player.y = Math.max(-boundaryLimit, Math.min(boundaryLimit, this.player.y));
  }
}


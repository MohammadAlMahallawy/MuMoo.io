import { MAP_HALF_SIZE, PLAYER_MOVE_SPEED, PLAYER_RADIUS, EntityType } from "@mumoo/shared";
import { KeyboardInput } from "../input/KeyboardInput";
import { Player } from "./Player";
import { WorldManager } from "./WorldManager";

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
    worldManager: WorldManager,
    isMouseDown: boolean,
    isSpacePressed: boolean
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

    // 3. Process Attack Logic
    if (this.player.attackCooldownRemaining > 0) {
      this.player.attackCooldownRemaining = Math.max(0, this.player.attackCooldownRemaining - deltaSeconds);
    }

    if (this.player.swingTimeRemaining > 0) {
      this.player.swingTimeRemaining = Math.max(0, this.player.swingTimeRemaining - deltaSeconds);
      const swingDuration = 0.15;
      this.player.swingProgress = (swingDuration - this.player.swingTimeRemaining) / swingDuration;
    } else {
      this.player.swingProgress = 0;
    }

    const wantsToAttack = isMouseDown || isSpacePressed;
    if (wantsToAttack && this.player.attackCooldownRemaining <= 0) {
      this.player.attackCooldownRemaining = 0.3; // 300ms cooldown
      this.player.swingTimeRemaining = 0.15; // 150ms animation duration

      // Hit detection: attack area is circle of radius 40, offset 54px in facing direction
      const reachDistance = PLAYER_RADIUS + 30; // 54px
      const attackRadius = 40;
      const attackX = this.player.x + Math.cos(this.player.rotation) * reachDistance;
      const attackY = this.player.y + Math.sin(this.player.rotation) * reachDistance;

      for (const entity of worldManager.entities) {
        const dist = Math.hypot(entity.x - attackX, entity.y - attackY);
        if (dist < entity.radius + attackRadius) {
          // Hit! Damage the resource and award a flat amount of the matching resource.
          const resourceType = worldManager.damageEntity(entity.id, 25);
          if (resourceType === EntityType.Tree) {
            this.player.inventory.wood += 10;
          } else if (resourceType === EntityType.Rock) {
            this.player.inventory.stone += 10;
          } else if (resourceType === EntityType.Bush) {
            this.player.inventory.food += 10;
          } else if (resourceType === EntityType.gold) {
            this.player.inventory.gold += 1;
          }
        }
      }

    }

    // 4. Resolve collisions with world entities (circle-to-circle collision pushing), player can be slightly inside another intity
    for (const entity of worldManager.entities) {
      const dx = this.player.x - entity.x;
      const dy = this.player.y - entity.y;
      const distance = Math.hypot(dx, dy);
      const minDistance = (PLAYER_RADIUS + entity.radius) * 0.8;

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

    // 5. Clamp the player position within the world boundaries
    const boundaryLimit = MAP_HALF_SIZE - PLAYER_RADIUS;
    this.player.x = Math.max(-boundaryLimit, Math.min(boundaryLimit, this.player.x));
    this.player.y = Math.max(-boundaryLimit, Math.min(boundaryLimit, this.player.y));
  }
}



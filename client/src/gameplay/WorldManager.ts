import { MAP_HALF_SIZE, WorldEntity, EntityType } from "@mumoo/shared";

const ENTITY_CONFIGS = {
  [EntityType.Tree]: { minRadius: 50, maxRadius: 70 },
  [EntityType.Rock]: { minRadius: 40, maxRadius: 50 },
  [EntityType.Bush]: { minRadius: 35, maxRadius: 45 },
};

export class WorldManager {
  readonly entities: WorldEntity[] = [];

  generateWorld(): void {
    this.entities.length = 0;

    // Spawn entities across the map
    this.spawnEntities(EntityType.Tree, 150);
    this.spawnEntities(EntityType.Rock, 75);
    this.spawnEntities(EntityType.Bush, 75);
  }

  // Reduce the entity's health but never destroy it — resources are permanent.
  damageEntity(id: string, amount: number): EntityType | null {
    const entity = this.entities.find(e => e.id === id);
    if (!entity) return null;

    entity.health = Math.max(0, entity.health - amount);
    return entity.type;
  }

  private spawnEntities(type: EntityType, count: number): void {
    let spawned = 0;
    let attempts = 0;

    while (spawned < count && attempts < 2000) {
      attempts++;
      if (this.spawnSingleEntityInternal(type, spawned)) {
        spawned++;
      }
    }
  }

  private spawnSingleEntityInternal(type: EntityType, idNumber: number): boolean {
    const margin = 120; // Margin from the map borders
    const config = ENTITY_CONFIGS[type];

    // Generate random coordinates within map boundary
    const x = Math.random() * (MAP_HALF_SIZE * 2 - margin * 2) - MAP_HALF_SIZE + margin;
    const y = Math.random() * (MAP_HALF_SIZE * 2 - margin * 2) - MAP_HALF_SIZE + margin;

    // Keep spawn point (center) clear of entities (radius 300px)
    if (Math.hypot(x, y) < 300) {
      return false;
    }

    const scale = 0.85 + Math.random() * 0.3; // Scale variant between 0.85 and 1.15
    const baseRadius = (config.minRadius + config.maxRadius) / 2;
    const radius = baseRadius * scale;

    // Check distance against already spawned entities to prevent overlapping
    let overlap = false;
    for (const entity of this.entities) {
      const distance = Math.hypot(x - entity.x, y - entity.y);
      if (distance < radius + entity.radius + 30) { // Keep 30px buffer space
        overlap = true;
        break;
      }
    }

    if (!overlap) {
      this.entities.push({
        id: `${type}-${idNumber}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        type,
        x,
        y,
        radius,
        scale,
        health: 100,
        maxHealth: 100,
      });
      return true;
    }

    return false;
  }
}


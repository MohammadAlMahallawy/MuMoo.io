import { MAP_HALF_SIZE, WorldEntity, EntityType } from "@mumoo/shared";

const ENTITY_CONFIGS = {
  [EntityType.Tree]: { minRadius: 65, maxRadius: 85 },
  [EntityType.Rock]: { minRadius: 50, maxRadius: 70 },
  [EntityType.Bush]: { minRadius: 35, maxRadius: 45 },
  [EntityType.Gold]: { minRadius: 55, maxRadius: 65 },
};

const WORLD_DENSITY = 0.8; // Ratios multiplier for spawning density
const SIZE_VARIATION = 0.05; // Customizable scale variation range (e.g. 0.15 means scales between 0.85 and 1.15)

export class WorldManager {
  readonly entities: WorldEntity[] = [];

  generateWorld(): void {
    this.entities.length = 0;

    // Spawn entities across the map using density ratios
    this.spawnEntities(EntityType.Tree, Math.floor(120 * WORLD_DENSITY));
    this.spawnEntities(EntityType.Rock, Math.floor(50 * WORLD_DENSITY));
    this.spawnEntities(EntityType.Bush, Math.floor(60 * WORLD_DENSITY));
    this.spawnEntities(EntityType.Gold, Math.floor(30 * WORLD_DENSITY));
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

    while (spawned < count && attempts < 4000) {
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

    const scale = (1 - SIZE_VARIATION) + Math.random() * (SIZE_VARIATION * 2);
    const baseRadius = (config.minRadius + config.maxRadius) / 2;
    const radius = baseRadius * scale;

    // Check distance against already spawned entities to prevent overlapping
    let overlap = false;
    for (const entity of this.entities) {
      const distance = Math.hypot(x - entity.x, y - entity.y);
      if (distance < radius + entity.radius + 15) { // Keep 30px buffer space
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
        rotation: Math.random() * Math.PI * 2,
        health: 100,
        maxHealth: 100,
      });
      return true;
    }

    return false;
  }
}


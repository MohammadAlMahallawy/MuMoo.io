import { MAP_HALF_SIZE, WorldEntity, EntityType } from "@mumoo/shared";

export class WorldManager {
  readonly entities: WorldEntity[] = [];

  generateWorld(): void {
    this.entities.length = 0;

    // Spawn entities across the map
    this.spawnEntities(EntityType.Tree, 150, 50, 70);
    this.spawnEntities(EntityType.Rock, 75, 40, 50);
    this.spawnEntities(EntityType.Bush, 75, 35, 45);
  }

  private spawnEntities(
    type: EntityType,
    count: number,
    minRadius: number,
    maxRadius: number
  ): void {
    const margin = 120; // Margin from the map borders
    let spawned = 0;
    let attempts = 0;

    while (spawned < count && attempts < 2000) {
      attempts++;

      // Generate random coordinates within map boundary
      const x = Math.random() * (MAP_HALF_SIZE * 2 - margin * 2) - MAP_HALF_SIZE + margin;
      const y = Math.random() * (MAP_HALF_SIZE * 2 - margin * 2) - MAP_HALF_SIZE + margin;

      // Keep spawn point (center) clear of entities (radius 300px)
      if (Math.hypot(x, y) < 300) {
        continue;
      }

      const scale = 0.85 + Math.random() * 0.3; // Scale variant between 0.85 and 1.15
      const baseRadius = (minRadius + maxRadius) / 2;
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
          id: `${type}-${spawned}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          type,
          x,
          y,
          radius,
          scale,
        });
        spawned++;
      }
    }
  }
}

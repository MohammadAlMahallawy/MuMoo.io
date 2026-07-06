import { Container, Graphics } from "pixi.js";
import { WorldEntity, EntityType } from "@mumoo/shared";

export class WorldView {
  readonly container = new Container();
  private readonly entityVisuals = new Map<string, Container>();

  constructor(entities: WorldEntity[]) {
    this.sync(entities);
  }

  sync(entities: WorldEntity[]): void {
    const activeIds = new Set<string>();

    for (const entity of entities) {
      activeIds.add(entity.id);

      if (!this.entityVisuals.has(entity.id)) {
        const visual = this.renderEntity(entity);
        visual.position.set(entity.x, entity.y);
        this.container.addChild(visual);
        this.entityVisuals.set(entity.id, visual);
      }
    }

    // Remove visuals for entities that are no longer active
    for (const [id, visual] of this.entityVisuals.entries()) {
      if (!activeIds.has(id)) {
        this.container.removeChild(visual);
        this.entityVisuals.delete(id);
      }
    }
  }


  private renderEntity(entity: WorldEntity): Container {
    const container = new Container();

    switch (entity.type) {
      case EntityType.Tree:
        container.addChild(this.drawTree(entity.radius));
        break;
      case EntityType.Rock:
        container.addChild(this.drawRock(entity.radius));
        break;
      case EntityType.Bush:
        container.addChild(this.drawBush(entity.radius));
        break;
      case EntityType.gold:
        container.addChild(this.drawGold(entity.radius));
        break;
    }

    if (entity.rotation !== undefined) {
      container.rotation = entity.rotation;
    }

    return container;
  }

  private drawTree(radius: number): Graphics {
    const g = new Graphics();
    const outlineColor = "#152d1c";

    // 1. Draw Root Flairs/Trunk shadow
    g.circle(0, radius * 0.1, radius * 0.35)
      .fill("#2a1708");

    // 2. Draw Trunk (exactly 2 shades: base and inner highlight)
    g.circle(0, 0, radius * 0.3)
      .fill("#6d401b")
      .stroke({ width: 3, color: "#301905" });
    
    g.circle(-radius * 0.05, -radius * 0.05, radius * 0.18)
      .fill("#875328");

    // 3. Draw Main Foliage Circle (Base)
    g.circle(0, 0, radius)
      .fill("#1b5c37")
      .stroke({ width: 4.5, color: outlineColor });

    // 4. Draw Highlight (1 highlight shade, top-left offset circle)
    g.circle(-radius * 0.12, -radius * 0.12, radius * 0.78)
      .fill("#257c4c");

    // 5. Add Apples/Fruits (2 shades: base and highlight)
    const fruits = [
      { x: -radius * 0.45, y: radius * 0.2, r: 0.15 },
      { x: radius * 0.35, y: -radius * 0.4, r: 0.14 },
      { x: radius * 0.15, y: radius * 0.5, r: 0.16 },
      { x: -radius * 0.1, y: -radius * 0.45, r: 0.13 },
    ];

    for (const fruit of fruits) {
      const fr = radius * fruit.r;
      g.circle(fruit.x, fruit.y, fr)
        .fill("#ad2b2b")
        .stroke({ width: 2, color: "#4c0b0b" });
      g.circle(fruit.x - fr * 0.25, fruit.y - fr * 0.25, fr * 0.55).fill("#e55c5c");
    }

    return g;
  }

  private drawRock(radius: number): Graphics {
    const g = new Graphics();
    const outlineColor = "#262626";

    // 1. Draw Main Rock Body (Base shade)
    g.circle(0, 0, radius)
      .fill("#6b7077")
      .stroke({ width: 4.5, color: outlineColor });

    // 2. Draw Highlight (1 highlight shade, top-left offset circle)
    g.circle(-radius * 0.12, -radius * 0.12, radius * 0.78)
      .fill("#808691");

    return g;
  }

  private drawBush(radius: number): Graphics {
    const g = new Graphics();
    const outlineColor = "#162f11";

    // 1. Draw Outer Foliage Circles (Base shade)
    const leafCount = 6;
    const outerCircles: {x: number, y: number, r: number}[] = [];
    for (let i = 0; i < leafCount; i++) {
      const angle = (i * Math.PI * 2) / leafCount;
      const offsetDistance = radius * 0.45;
      const lx = Math.cos(angle) * offsetDistance;
      const ly = Math.sin(angle) * offsetDistance;
      const r = radius * 0.65;
      outerCircles.push({ x: lx, y: ly, r });
    }

    // Draw main outer circles
    for (const c of outerCircles) {
      g.circle(c.x, c.y, c.r)
        .fill("#357224")
        .stroke({ width: 4.5, color: outlineColor });
    }

    // 2. Draw Central Foliage Circle (Highlight shade)
    g.circle(-radius * 0.08, -radius * 0.08, radius * 0.75).fill("#4ea535");

    // Redraw outlying outer stroke
    g.circle(0, 0, radius).stroke({ width: 4.5, color: outlineColor });

    // 3. Add Berries (2 shades: base and highlight)
    const berries = [
      { x: -radius * 0.45, y: -radius * 0.35, r: 0.12 },
      { x: radius * 0.4, y: radius * 0.4, r: 0.14 },
      { x: -radius * 0.35, y: radius * 0.35, r: 0.11 },
      { x: radius * 0.45, y: -radius * 0.3, r: 0.13 },
      { x: -radius * 0.05, y: radius * 0.5, r: 0.12 },
      { x: radius * 0.1, y: -radius * 0.5, r: 0.14 },
    ];

    for (const berry of berries) {
      const br = radius * berry.r;
      g.circle(berry.x, berry.y, br)
        .fill("#991a1a")
        .stroke({ width: 2, color: "#4f0707" });
      g.circle(berry.x - br * 0.25, berry.y - br * 0.25, br * 0.55).fill("#e04343");
    }

    return g;
  }

  private drawGold(radius: number): Graphics {
    const g = new Graphics();
    const outlineColor = "#262626";

    // 1. Draw Dark Grey Rock Base (Base shade)
    g.circle(0, 0, radius)
      .fill("#5c6066")
      .stroke({ width: 4.5, color: outlineColor });
    
    // 2. Draw Rock Base Highlight (Highlight shade)
    g.circle(-radius * 0.12, -radius * 0.12, radius * 0.78)
      .fill("#737880");

    // Redraw outlying base stroke
    g.circle(0, 0, radius).stroke({ width: 4.5, color: outlineColor });

    // 3. Draw distributed circular golden nuggets (like apples on a tree)
    const nuggets = [
      { x: -radius * 0.45, y: radius * 0.2, r: 0.16 },
      { x: radius * 0.35, y: -radius * 0.4, r: 0.15 },
      { x: radius * 0.15, y: radius * 0.5, r: 0.17 },
      { x: -radius * 0.15, y: -radius * 0.45, r: 0.14 },
      { x: 0, y: 0, r: 0.20 },
    ];

    for (const nug of nuggets) {
      const nr = radius * nug.r;
      // Nugget body (base gold shade)
      g.circle(nug.x, nug.y, nr)
        .fill("#d8a50c")
        .stroke({ width: 3, color: "#3a2a02" });

      // Nugget highlight (1 highlight shade)
      g.circle(nug.x - nr * 0.25, nug.y - nr * 0.25, nr * 0.55)
        .fill("#fcd856");
    }

    return g;
  }
}

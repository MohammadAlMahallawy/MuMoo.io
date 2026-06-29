import { Container, Graphics } from "pixi.js";
import { WorldEntity, EntityType } from "@mumoo/shared";

export class WorldView {
  readonly container = new Container();

  constructor(entities: WorldEntity[]) {
    for (const entity of entities) {
      const visual = this.renderEntity(entity);
      visual.position.set(entity.x, entity.y);
      this.container.addChild(visual);
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
    }

    return container;
  }

  private drawTree(radius: number): Graphics {
    const g = new Graphics();
    const outlineColor = "#1b3724";

    // 1. Draw Trunk (small offset circle below leaves)
    g.circle(0, 0, radius * 0.3)
      .fill("#8b5a2b")
      .stroke({ width: 3, color: "#3b2411" });

    // 2. Draw Main Foliage Circle
    g.circle(0, 0, radius)
      .fill("#236f46")
      .stroke({ width: 4, color: outlineColor });

    // 3. Draw Foliage Highlight (inner slightly brighter circle, offset slightly to top-left)
    g.circle(-radius * 0.12, -radius * 0.12, radius * 0.76)
      .fill("#2f8055");

    // 4. Add Apples/Fruits (red spheres with outline, typical of MooMoo.io trees)
    const fruits = [
      { x: -radius * 0.45, y: radius * 0.2 },
      { x: radius * 0.35, y: -radius * 0.4 },
      { x: radius * 0.15, y: radius * 0.5 },
    ];

    for (const fruit of fruits) {
      g.circle(fruit.x, fruit.y, radius * 0.15)
        .fill("#d13b3b")
        .stroke({ width: 2, color: "#541212" });
    }

    return g;
  }

  private drawRock(radius: number): Graphics {
    const g = new Graphics();
    const outlineColor = "#2d2d2d";

    // 1. Draw Main Rock Body
    g.circle(0, 0, radius)
      .fill("#686868")
      .stroke({ width: 4, color: outlineColor });

    // 2. Draw Highlight
    g.circle(-radius * 0.12, -radius * 0.12, radius * 0.76)
      .fill("#808080");

    // 3. Draw Inner Shadow/Detail
    g.circle(radius * 0.2, radius * 0.2, radius * 0.4)
      .fill("#545454");

    return g;
  }

  private drawBush(radius: number): Graphics {
    const g = new Graphics();
    const outlineColor = "#1c3c13";

    // 1. Draw Outer Foliage Circles to form a cloud/bush shape
    const leafCount = 5;
    for (let i = 0; i < leafCount; i++) {
      const angle = (i * Math.PI * 2) / leafCount;
      const offsetDistance = radius * 0.35;
      const lx = Math.cos(angle) * offsetDistance;
      const ly = Math.sin(angle) * offsetDistance;
      g.circle(lx, ly, radius * 0.7).fill("#3b7e28");
    }

    // 2. Draw Central Foliage Circle
    g.circle(0, 0, radius * 0.75).fill("#489b31");

    // 3. Draw Main Outlying Stroke
    g.circle(0, 0, radius).stroke({ width: 4, color: outlineColor });

    // 4. Add Berries (small red circles with outline)
    const berries = [
      { x: -radius * 0.4, y: -radius * 0.3 },
      { x: radius * 0.35, y: radius * 0.15 },
      { x: -radius * 0.1, y: radius * 0.45 },
    ];

    for (const berry of berries) {
      g.circle(berry.x, berry.y, radius * 0.16)
        .fill("#e02424")
        .stroke({ width: 2, color: "#541212" });
    }

    return g;
  }
}

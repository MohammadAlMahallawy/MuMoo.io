export enum EntityType {
  Tree = "tree",
  Rock = "rock",
  Bush = "bush",
}

export interface WorldEntity {
  id: string;
  type: EntityType;
  x: number;
  y: number;
  radius: number;
  scale: number;
  health: number;
  maxHealth: number;
}


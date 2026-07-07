export enum EntityType {
  Tree = "tree",
  Rock = "rock",
  Bush = "bush",
  Gold = "gold",
}

export interface WorldEntity {
  id: string;
  type: EntityType;
  x: number;
  y: number;
  radius: number;
  scale: number;
  rotation?: number;
  health: number;
  maxHealth: number;
}


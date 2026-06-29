export interface PlayerInventory {
  wood: number;
  stone: number;
  food: number;
}

export class Player {
  x = 0;
  y = 0;
  rotation = 0;
  swingProgress = 0; // 0 to 1 for visual animation
  swingTimeRemaining = 0; // in seconds
  attackCooldownRemaining = 0; // in seconds

  readonly inventory: PlayerInventory = {
    wood: 0,
    stone: 0,
    food: 0,
  };
}


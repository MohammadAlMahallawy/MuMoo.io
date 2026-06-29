import type { Application, Ticker } from "pixi.js";

type TickHandler = (deltaSeconds: number, deltaMs: number) => void;

export class GameLoop {
  private readonly tick = (ticker: Ticker): void => {
    this.onTick(ticker.deltaMS / 1000, ticker.deltaMS);
  };

  constructor(
    private readonly app: Application,
    private readonly onTick: TickHandler
  ) {}

  start(): void {
    this.app.ticker.add(this.tick);
    this.app.ticker.start();
  }
}

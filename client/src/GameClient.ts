import { Container } from "pixi.js";
import { Player } from "./gameplay/Player";
import { PlayerController } from "./gameplay/PlayerController";
import { WorldManager } from "./gameplay/WorldManager";
import { KeyboardInput } from "./input/KeyboardInput";
import { MouseInput } from "./input/MouseInput";
import { BackgroundLayer } from "./rendering/BackgroundLayer";
import { Camera } from "./rendering/Camera";
import { createPixiApp } from "./rendering/createPixiApp";
import { FrameStats } from "./rendering/FrameStats";
import { GameLoop } from "./rendering/GameLoop";
import { PlayerView } from "./rendering/PlayerView";
import { WorldView } from "./rendering/WorldView";

export class GameClient {
  private readonly world = new Container();
  private readonly background = new BackgroundLayer();
  private readonly keyboardInput = new KeyboardInput();
  private readonly mouseInput = new MouseInput();
  private readonly player = new Player();
  private readonly playerController = new PlayerController(this.player, this.keyboardInput);
  private readonly playerView = new PlayerView(this.player);
  private readonly worldManager = new WorldManager();
  private readonly worldView: WorldView;
  private readonly camera = new Camera(this.world);
  private readonly frameStats = new FrameStats();
  private readonly loop: GameLoop;

  private constructor(
    private readonly root: HTMLDivElement,
    private readonly app: Awaited<ReturnType<typeof createPixiApp>>
  ) {
    this.worldManager.generateWorld();
    this.worldView = new WorldView(this.worldManager.entities);

    this.loop = new GameLoop(app, (deltaSeconds, deltaMs) => {
      this.update(deltaSeconds, deltaMs);
    });
  }

  static async create(root: HTMLDivElement): Promise<GameClient> {
    const app = await createPixiApp();
    const client = new GameClient(root, app);

    client.mount();

    return client;
  }

  start(): void {
    this.loop.start();
  }

  private mount(): void {
    this.root.appendChild(this.app.canvas);

    this.world.addChild(this.background.container);
    this.world.addChild(this.worldView.container);
    this.world.addChild(this.playerView.container);
    this.app.stage.addChild(this.world, this.frameStats.view);

    this.resize();
    window.addEventListener("resize", this.resize);
  }

  private readonly resize = (): void => {
    this.background.resize(this.app.screen.width, this.app.screen.height);
    this.camera.follow(this.player, this.app.screen.width, this.app.screen.height);
    this.frameStats.position(16, 16);
  };

  private update(deltaSeconds: number, deltaMs: number): void {
    this.playerController.update(
      deltaSeconds,
      this.mouseInput.getMousePosition(),
      this.app.screen.width,
      this.app.screen.height,
      this.worldManager.entities
    );
    this.playerView.sync();
    this.camera.follow(this.player, this.app.screen.width, this.app.screen.height);
    this.frameStats.update(deltaMs);
  }
}


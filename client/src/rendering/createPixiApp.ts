import { Application } from "pixi.js";

export async function createPixiApp(): Promise<Application> {
  const app = new Application();

  await app.init({
    background: "#15351f",
    resizeTo: window,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    antialias: true
  });

  app.canvas.setAttribute("aria-label", "MuMoo.io game canvas");

  return app;
}

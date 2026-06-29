import { Application } from "pixi.js";
import { PROJECT_NAME } from "@mumoo/shared";
import "./styles.css";

const root = document.querySelector<HTMLDivElement>("#app");

if (!root) {
  throw new Error("Missing #app root element.");
}

const app = new Application();

await app.init({
  background: "#1f7a4d",
  resizeTo: window
});

root.appendChild(app.canvas);

const status = document.createElement("div");
status.className = "status";
status.textContent = `${PROJECT_NAME} client is running`;
root.appendChild(status);

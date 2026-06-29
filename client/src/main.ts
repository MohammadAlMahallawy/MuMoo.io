import { PROJECT_NAME } from "@mumoo/shared";
import { GameClient } from "./GameClient";
import "./styles.css";

const root = document.querySelector<HTMLDivElement>("#app");

if (!root) {
  throw new Error("Missing #app root element.");
}

const game = await GameClient.create(root);

game.start();

console.info(`${PROJECT_NAME} client started.`);

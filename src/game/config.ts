import { Types } from "phaser";

import {MainScene} from "./scenes/main.scene";

const gameConfig: Types.Core.GameConfig = {
  width: "100%",
  height: "100%",
  type: Phaser.AUTO,

  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true
  },
  scene: MainScene
};

export default gameConfig;

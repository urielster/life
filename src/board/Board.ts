import config from "../config/Config";
import farm from "../ant/Farm";
import Ant from "../ant/Ant";
import {AntColor} from "../ant/AntColor";

export class Board {

  private maxWidth = config.boardWidth;
  private maxHeight = config.boardHeight;
  private randomAnts = config.randomAnts;

  constructor() {
    this.restart();
  }

  getWidth() {
    return this.maxWidth;
  }

  getHeight() {
    return this.maxHeight;
  }

  getStatus(): Ant[] {
    return farm.getAnts();
  }

  nextMove() {
    farm.runRules();
  }

  restart(){
    farm.clearAllAnts();
    for (let i = 0; i < this.randomAnts; i += 1) {
      this.addRandomAnt();
    }
  }

  addRandomAnt() {
    let posX = Math.floor(Math.random() * this.maxWidth);
    let posY = Math.floor(Math.random() * this.maxHeight);
    const color = (Math.floor(Math.random()*2) === 1) ? AntColor.Red :AntColor.Black;
    try {
      farm.addAntToAnts(new Ant(posX, posY, color));
    }catch (ex){
      console.log('taken but do nothing')
    }

  }
}

const board = new Board();
export default board;

import Ant from "./Ant";
import ruleRunner from "../rules/RuleRunner";
import {AntStatus} from "./AntStatue";
import config from "../config/Config";

export class Farm {
  fastFarm: { [key: string]: Ant | null } = {};
  _surrounding = [
    {x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1},
    {x: -1, y: 0}, {x: 1, y: 0},
    {x: -1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}];

  constructor() {
  }

  clearAllAnts() {
    this.fastFarm = {};
  }

  /***
   * like add Ant just better, more testable
   * @param ant
   * @param ants
   */
  addAntToAnts(ant: Ant): void {
    if (this.isNoAntHere(ant.posX, ant.posY)) {
      this.addFastFarmAntByPos(ant);
    } else {
      throw new Error('Already taken Error');
    }
  }


  getAnts(): Ant[] {
    return (<Ant[]>Object.values(this.fastFarm));
  }

  isNoAntHere( posX: number, posY: number): boolean {
    return (!(this.getFastFarmAntByPos(posX, posY)))
  }


  runRules() {
    this.runRulesOnAnts();
    this.runPostRulesProcedures();
  }

  runRulesOnAnts() {
    console.log('run rules!');
    const ants = this.getAnts();
    console.log(ants.length)
    for (let i = 0; i < ants.length; i += 1) {//"for" to cancel async
      const antNeighbors = this.getCurrentAntNeighbors(ants[i]);
      ruleRunner.runRules(ants[i], antNeighbors);
    }
    return ants;
  }


  /***
   * improve the speed of fetching neighbors by using dictionary
   * @param x
   * @param y
   * @param fastFarm
   */
  getFastFarmAntByPos(x: number, y: number,fastFarm = this.fastFarm): Ant | null {
    const posStr = 'a' + '-' + x + '-' + y;
    const cell = fastFarm[posStr];
    if (cell) {
      return (cell);
    }
    return null
  }

  removeFastFarmAntByPos(x: number, y: number): void {
    const posStr = 'a' + '-' + x + '-' + y;
    delete this.fastFarm[posStr];
  }

  addFastFarmAntByPos(ant:Ant): void {
    const posStr = 'a' + '-' + ant.posX + '-' + ant.posY;
    this.fastFarm[posStr] = ant;
  }

  getCurrentAntNeighbors(ant: Ant, fastFarm = this.fastFarm): Ant[] {
    const neighborArr:Ant[] = [];
    //run over 9 is better than all the board
    this._surrounding.forEach((p => {
      const cell: Ant | null = this.getFastFarmAntByPos(ant.posX + p.x, ant.posY + p.y,fastFarm);
      if (cell) {
        neighborArr.push(cell);
      }
    }));

    //allAnts.filter(testedAnt => this.isNeighbor(ant, testedAnt));
    return neighborArr;
  }

  isNeighbor(myAnt: Ant, neighborAnt: Ant): boolean {
    return (
      (neighborAnt.posX === myAnt.posX || neighborAnt.posX + 1 === myAnt.posX || neighborAnt.posX - 1 === myAnt.posX) && //check X
      (neighborAnt.posY === myAnt.posY || neighborAnt.posY + 1 === myAnt.posY || neighborAnt.posY - 1 === myAnt.posY) && // checkY
      (!(neighborAnt.posX === myAnt.posX && neighborAnt.posY === myAnt.posY))); //check not the same ant
  }

  runPostRulesProcedures() {

    const ants = this.getAnts();
    const arr: Ant[] = [];

    ants.forEach(ant => {
      if (ant.status === AntStatus.dead) {
        this.removeFastFarmAntByPos(ant.posX, ant.posY);
      }
    })

    //run over ants and when split add new
    ants.filter(ant => {
        const s = (ant.status == AntStatus.split);
        return s;
      })
      .forEach(ant => {
        const newAnt = this.reBirthSplitAnt(ant);
        if (newAnt) {
          this.addFastFarmAntByPos(newAnt);
        }
      });
  }

  /***
   * The Split action
   * @param ant
   */
  reBirthSplitAnt(ant: Ant): Ant | null {
    ant.status = AntStatus.live;
    const neighbors = this.getCurrentAntNeighbors(ant);

    const firstFreeSpace = this.getFirstFreeSpaceForRebirth(ant, neighbors);

    if (firstFreeSpace) {
      return new Ant(ant.posX + firstFreeSpace.x, ant.posY + firstFreeSpace.y, ant.color, AntStatus.birth);//new ant in free place with same color
    }
    return null;
  }

  shuffleArray(arr: any): any {
    let m = arr.length;
    let t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = arr[m];
      arr[m] = arr[i];
      arr[i] = t;
    }

    return arr;
  }

  getFirstFreeSpaceForRebirth(ant: Ant, neighbors: Ant[]): any {
    const result = this.shuffleArray(this._surrounding).find((pos:any) => { // run over all 8 positions around you
      const x = pos.x + ant.posX;
      const y = pos.y + ant.posY;
      //Position inside the board
      if (x >= 0 && y >= 0 && x < config.boardWidth && y < config.boardHeight) {
        if (!(neighbors.find(a => a.posX === x && a.posY === y))) {
          return true;
        }
      }
      return false;
    })
    return (typeof (result) !== 'undefined' && result) ? result : null;//null or {x:,y:}
  }
}

const farm = new Farm();
export default farm;



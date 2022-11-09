import {AntStatus} from "../ant/AntStatue";
import {IRules} from "./Rules";
import Ant from "../ant/Ant";
import {SDK} from "./SDK";

export const defaultRules = (): IRules => {
  return {
    onManyEnemy: (sdk: SDK, ant: Ant): void => {
     ant.damage =  ant.damage + 10;
    },
    onNoEnemy: (sdk: SDK, ant: Ant): void => {
    },
    onOneEnemy: (sdk: SDK, ant: Ant): void => {
      ant.damage =  ant.damage + 5;
    },
    onTwoEnemy: (sdk: SDK, ant: Ant): void => {
     // ant.damage =  ant.damage - 3;
    },
    onManySibling: (sdk: SDK, ant: Ant): void => {
      ant.status = AntStatus.live;
    },
    onOneSibling: (sdk: SDK, ant: Ant): void => {
      ant.status = AntStatus.split;
    },
    onThreeSibling: (sdk: SDK, ant: Ant): void => {
      ant.status = AntStatus.split;
    },
    onTwoSibling: (sdk: SDK, ant: Ant): void => {
      ant.status = AntStatus.split;
    },
    onNoSibling: (sdk: SDK, ant: Ant): void => {
      ant.status = AntStatus.live;
    }
  }
}

/*

export class DefaultRules implements IRules {
  onManySibling(): AntStatus {
    return AntStatus.die;
  }

  onOneSibling(): AntStatus {
    return AntStatus.die;
  }

  onThreeSibling(): AntStatus {
    return AntStatus.split;
  }

  onTwoSibling(): AntStatus {
    return AntStatus.split;
  }

  onNoSibling(): AntStatus {
    return AntStatus.die;
  }
}*/

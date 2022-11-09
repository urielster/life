import Ant from "../ant/Ant";
import {AntStatus} from "../ant/AntStatue";
import {rules} from "./Rules";
import sdk from "./SDK";

export class RuleRunner {

  runRules(ant: Ant, surroundingAnts: Ant[]):Ant {
    const rulez = rules.getRules(ant.color)
    let myAntNewStatus:AntStatus = AntStatus.live;//init

    if (ant.status === AntStatus.die){
      //console.log('kill:',new Date().getTime(), ant.posX,ant.posY,ant.status);
      ant.status = AntStatus.dead;
      return ant;
    }

    if (ant.status === AntStatus.birth){//one round to live
      //console.log('Birth:',new Date().getTime(), ant.posX,ant.posY,ant.status);

      ant.status = AntStatus.live;
      return ant;
    }

    const sameColor = surroundingAnts.filter(a=>(a.color === ant.color));

    switch(sameColor.length) {
      case 0:
        rulez.onNoSibling(sdk,ant);
        break;
      case 1:
        rulez.onOneSibling(sdk,ant);
        break;
      case 2:
        rulez.onTwoSibling(sdk,ant);
        break;
      case 3:
        rulez.onThreeSibling(sdk,ant);
        break;
      default:
        rulez.onManySibling(sdk,ant);
    }

    // Now the other Ants
    switch(surroundingAnts.length - sameColor.length) {
      case 0:
        rulez.onNoEnemy(sdk,ant);
        break;
      case 1:
        rulez.onOneEnemy(sdk,ant);
        break;
      case 2:
        rulez.onTwoEnemy(sdk,ant);
        break;
      default:
        rulez.onManyEnemy(sdk,ant);
    }

    if (ant.damage >= 100 ){
      ant.status = AntStatus.die;
    }
    return ant;
  }
}

const ruleRunner = new RuleRunner();
export default ruleRunner;

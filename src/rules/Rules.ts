import {AntStatus} from "../ant/AntStatue";
import {AntColor} from "../ant/AntColor";
import {defaultRules} from "./DefaultRules";
import Ant from "../ant/Ant";
import {SDK} from "./SDK";

export interface IRules {
  onManyEnemy: (sdk: SDK, ant: Ant) => void,
  onTwoEnemy: (sdk: SDK, ant: Ant) => void,
  onOneEnemy: (sdk: SDK, ant: Ant) => void,
  onNoEnemy: (sdk: SDK, ant: Ant) => void,
  onNoSibling: (sdk: SDK, ant: Ant) => void,
  onOneSibling: (sdk: SDK, ant: Ant) => void,
  onTwoSibling: (sdk: SDK, ant: Ant) => void,
  onThreeSibling: (sdk: SDK, ant: Ant) => void,
  onManySibling: (sdk: SDK, ant: Ant) => void
}


/**
 * Can be expended to different Rules base which implement IRules
 */
export class Rules {
  rulesObjByColor: { [key in AntColor]: IRules };

  constructor() {
    this.rulesObjByColor = { //any ant color gets a different set of rules
      [AntColor.Red]: defaultRules(),
      [AntColor.Black]: defaultRules()
    }
  }


  getRules(color: AntColor = AntColor.Red): IRules {
    return (this.rulesObjByColor[color]) ? this.rulesObjByColor[color] : defaultRules();
  }

  setRules(rules: IRules, color: AntColor = AntColor.Red) {
    this.rulesObjByColor[color] = rules;
  }
}

export const rules = new Rules();

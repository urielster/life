import {assert, describe, expect, test} from 'vitest'
import Ant from "../ant/Ant";
import {AntColor} from "../ant/AntColor";
import {Farm} from "../ant/Farm";


import {it} from 'vitest'
import {RuleRunner} from "./RuleRunner";
import {Rules} from "./Rules";
import {AntStatus} from "../ant/AntStatue";


const getDemo0Ants = (): Ant[] => {
  return [];
}
const getDemo1Ants = (): Ant[] => {
  const arr = [];
  arr.push(new Ant(3, 3, AntColor.Red));

  return arr;
}

const getDemo2Ants = (): Ant[] => {
  const arr = [];
  arr.push(new Ant(0, 0, AntColor.Red));
  arr.push(new Ant(3, 3, AntColor.Red));

  return arr;
}
const getDemo3Ants = (): Ant[] => {
  const arr = [];
  arr.push(new Ant(0, 0, AntColor.Red));
  arr.push(new Ant(1, 1, AntColor.Red));
  arr.push(new Ant(2, 2, AntColor.Red));

  return arr;
}
const getDemo4Ants = (): Ant[] => {
  const arr = [];
  arr.push(new Ant(0, 0, AntColor.Red));
  arr.push(new Ant(1, 1, AntColor.Red));
  arr.push(new Ant(2, 2, AntColor.Red));
  arr.push(new Ant(3, 3, AntColor.Red));

  return arr;
}

describe("Testing RuleRunner", () => {
  it('Default should work for 0 ants', () => {

    const myAnt = new Ant(3, 3, AntColor.Red);
    const allOtherAnts = getDemo0Ants();

    const rules = (new Rules()).getRules();
    const ruleRunner = new RuleRunner();
    const returnedAnt = ruleRunner.runRules(myAnt, allOtherAnts);

    expect(returnedAnt.status).toBe(AntStatus.die);
  });
  it('Default should work for 1 ants', () => {

    const myAnt = new Ant(3, 3, AntColor.Red);
    const allOtherAnts = getDemo1Ants();

    const rules = (new Rules()).getRules();
    const ruleRunner = new RuleRunner();
    const returnedAnt = ruleRunner.runRules(myAnt, allOtherAnts);

    expect(returnedAnt.status).toBe(AntStatus.die);
  });
  it('Default should work for 2 ants', () => {

    const myAnt = new Ant(3, 3, AntColor.Red);
    const allOtherAnts = getDemo2Ants();

    const rules = (new Rules()).getRules();
    const ruleRunner = new RuleRunner();
    const returnedAnt = ruleRunner.runRules(myAnt, allOtherAnts);

    expect(returnedAnt.status).toBe(AntStatus.split);
  });
  it('Default should work for 3 ants', () => {

    const myAnt = new Ant(3, 3, AntColor.Red);
    const allOtherAnts = getDemo3Ants();

    const rules = (new Rules()).getRules();
    const ruleRunner = new RuleRunner();
    const returnedAnt = ruleRunner.runRules(myAnt, allOtherAnts);

    expect(returnedAnt.status).toBe(AntStatus.split);
  });

  it('Default should work for 4 ants', () => {

    const myAnt = new Ant(3, 3, AntColor.Red);
    const allOtherAnts = getDemo4Ants();

    const rules = (new Rules()).getRules();
    const ruleRunner = new RuleRunner();
    const returnedAnt = ruleRunner.runRules(myAnt, allOtherAnts);

    expect(returnedAnt.status).toBe(AntStatus.die);
  });
})

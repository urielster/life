import {Farm} from "./Farm";
import Ant from "./Ant";
import {AntColor} from "./AntColor";
import {test, expect, it, describe} from "vitest";


const newTestFarm = () => {
  const farm = new Farm();

  farm.addAntToAnts(new Ant(0, 0, AntColor.Red));
  farm.addAntToAnts(new Ant(1, 1, AntColor.Red));
  farm.addAntToAnts(new Ant(2, 2, AntColor.Red));
  farm.addAntToAnts(new Ant(3, 3, AntColor.Red));

  return farm;
}

test("If Adding Ant works", () => {
  const farm = newTestFarm();
  expect(farm.getAnts().length === 4);
  farm.addAntToAnts(new Ant(4, 4, AntColor.Red));
  expect(farm.getAnts().length === 5);
});
test("If new position with exist Ant should fail", () => {
  const farm = newTestFarm();
  expect(farm.getAnts().length === 4);

  expect(() => {
    farm.addAntToAnts(new Ant(3, 3, AntColor.Red))
  }).toThrowError();

  farm.addAntToAnts(new Ant(3, 4, AntColor.Red))
  expect(farm.getAnts().length === 5);//due to bug
});


describe("Nighebor testing", () => {
  it("should find a nighebor", () => {
    const farm = newTestFarm();
    const ant = new Ant(1, 1, AntColor.Red);
    const ant2 = new Ant(0, 1, AntColor.Red);
    const ant3 = new Ant(1, 0, AntColor.Red);
    const ant4 = new Ant(1, 3, AntColor.Red);
    expect(farm.isNeighbor(ant, ant2)).toBeTruthy();
    expect(farm.isNeighbor(ant, ant3)).toBeTruthy();
    expect(farm.isNeighbor(ant2, ant3)).toBeTruthy();
    expect(farm.isNeighbor(ant, ant4)).toBeFalsy();
    expect(farm.isNeighbor(ant, ant4)).toBeFalsy();

  });
  it('should failed for same ant position', () => {
    const farm = newTestFarm();
    const ant = new Ant(1, 1, AntColor.Red);
    const ant2 = new Ant(1, 1, AntColor.Red);

    expect(farm.isNeighbor(ant, ant2)).toBeFalsy();
  });
});

describe("Run over ants", () => {
  it("should find an ants neighbors", () => {
    const farm = newTestFarm();
    const ant = new Ant(0, 0, AntColor.Red);
    const ant2 = new Ant(0, 1, AntColor.Red);
    const ant3 = new Ant(1, 0, AntColor.Red);
    const ant4 = new Ant(1, 3, AntColor.Red);
    const ant5 = new Ant(3, 3, AntColor.Red);
    const ant6 = new Ant(4, 4, AntColor.Red);
    const tempFast = {
      'a-0-1':ant2,
      'a-1-0':ant3,
      'a-1-3':ant4,
      'a-3-3':ant5,
      'a-4-4':ant6

    }
    const result = farm.getCurrentAntNeighbors(ant, tempFast);
    expect(result.length).toBe(2);
  });
});


describe("Find Place for rebirth", () => {
  it("should find a pleace when empty around", () => {
    const farm = newTestFarm();
    const ant = new Ant(1, 1, AntColor.Black);
    const hood: Ant[] = [];
    const result = farm.getFirstFreeSpaceForRebirth(ant, hood);
  });

  it("should not find a pleace when all places are occupied around", () => {
    const farm = newTestFarm();
    const ant = new Ant(1, 1, AntColor.Black);

    const ant1 = new Ant(0, 0, AntColor.Red);
    const ant2 = new Ant(1, 0, AntColor.Red);
    const ant3 = new Ant(2, 0, AntColor.Red);
    const ant4 = new Ant(0, 1, AntColor.Red);
    const ant5 = new Ant(2, 1, AntColor.Red);
    const ant6 = new Ant(0, 2, AntColor.Red);
    const ant7 = new Ant(1, 2, AntColor.Red);
    const ant8 = new Ant(2, 2, AntColor.Red);
    const allAnts = [ant1, ant2, ant3, ant4, ant5, ant6, ant7, ant8];

    const result = farm.getFirstFreeSpaceForRebirth(ant, allAnts);
    expect(result).toEqual(null);
  });

  it("should find a pleace when 1 places is not occupied ", () => {
    const farm = newTestFarm();
    const ant = new Ant(1, 1, AntColor.Black);

    const ant1 = new Ant(0, 0, AntColor.Red);
    const ant2 = new Ant(1, 0, AntColor.Red);
    const ant3 = new Ant(2, 0, AntColor.Red);
    const ant4 = new Ant(0, 1, AntColor.Red);
    const ant5 = new Ant(2, 1, AntColor.Red);
    const ant6 = new Ant(0, 2, AntColor.Red);
    const ant7 = new Ant(1, 2, AntColor.Red);
    const allAnts = [ant1, ant2, ant3, ant4, ant5, ant6, ant7];

    const result = farm.getFirstFreeSpaceForRebirth(ant, allAnts);
    expect(result).toEqual({x:1,y:1});
  });

 it("should not find a pleace when place is out of board ", () => {
    const farm = newTestFarm();
    const ant = new Ant(0, 0, AntColor.Black);

    const ant2 = new Ant(1, 0, AntColor.Red);
    const ant4 = new Ant(0, 1, AntColor.Red);
    const ant5 = new Ant(1, 1, AntColor.Red);
    const allAnts = [ ant2, ant4, ant5];

    const result = farm.getFirstFreeSpaceForRebirth(ant, allAnts);
   expect(result).toEqual(null);
  });

  it("should find a pleace when 1 place is in while other is out of board ", () => {
    const farm = newTestFarm();
    const ant = new Ant(0, 0, AntColor.Black);

    const ant2 = new Ant(1, 0, AntColor.Red);
    const ant4 = new Ant(0, 1, AntColor.Red);
    const allAnts = [ ant2, ant4];

    const result = farm.getFirstFreeSpaceForRebirth(ant, allAnts);
    expect(result).toEqual({x:1,y:1});
  });

});
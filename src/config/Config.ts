export class Config {
  get speed(): number {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
  }

  private _boardWidth: number = 30;
  private _boardHeight: number = 14;
  private _randomAnts = 100;
  private _speed = 200;


  get boardHeight(): number {
    return this._boardHeight;
  }

  set boardHeight(value: number) {
    this._boardHeight = value;
  }

  get boardWidth(): number {
    return this._boardWidth;
  }

  set boardWidth(value: number) {
    this._boardWidth = value;
  }

  get randomAnts(): number {
    return this._randomAnts;
  }

  set randomAnts(value: number) {
    this._randomAnts = value;
  }

}

const config = new Config();
export default config;


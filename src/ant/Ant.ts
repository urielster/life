import {AntColor} from "./AntColor";
import {AntStatus} from "./AntStatue";

export default class Ant {

  private _posX: number;
  private _posY: number;
  private _color: AntColor;
  private _status: AntStatus;
  private _damage: number;

  constructor(initPosX: number, initPosY: number, initColor: AntColor, initStatus: AntStatus = AntStatus.live, initDamage = 0) {
    this._posX = initPosX;
    this._posY = initPosY;
    this._color = initColor
    this._status = initStatus;
    this._damage = initDamage;

  }

  get damage(): number {
    return this._damage;
  }

  set damage(value: number) {
    if (value >= 0 && value <= 100 ){
      this._damage = value;
    }
  }

  stringStatus(): string {
    return AntStatus[this._status];
  }

  get status(): AntStatus {
    return this._status;
  }

  set status(value: AntStatus) {
    this._status = value;
  }

  get color(): AntColor {
    return this._color;
  }

  set color(value: AntColor) {
    this._color = value;
  }

  get posY(): number {
    return this._posY;
  }

  set posY(value: number) {
    this._posY = value;
  }

  get posX(): number {
    return this._posX;
  }

  set posX(value: number) {
    this._posX = value;
  }

  toString() {
    return `X: ${this._posX}, Y: ${this._posY},color: ${this._color} ,status: ${this._status} `;
  }
}

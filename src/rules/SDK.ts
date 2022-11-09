import {AntStatus} from "../ant/AntStatue";

export class SDK {
  public setStatus(status:string):AntStatus{
    if (status.toLowerCase() === 'die'){
      return AntStatus.die;
    }
    if (status.toLowerCase() === 'split'){
      return AntStatus.split;
    }
    if (status.toLowerCase() === 'live'){
      return AntStatus.live;
    }

    return AntStatus.live;
  }
}

const sdk = new SDK();
export default sdk;
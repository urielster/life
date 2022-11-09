import {useEffect, useState} from 'react'
import "./Controls.less"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faStop, faPlay, faPause, faFastForward, faFastBackward} from "@fortawesome/free-solid-svg-icons";

library.add(faStop,faPlay,faPause,faFastBackward,faFastForward);
export enum EPlayState{
 run,
 stop,
 zero
}

interface IControlsProp {
  setPlayState: (key:EPlayState)=>void ;
  playState:EPlayState;
  setPlaySpeed: (speed:number)=>void ;
  playSpeed:number;
}

const Controls = (props:IControlsProp) => {
  return (
  <div id={'playerControls'}>
    <button onClick={()=>{props.setPlayState(EPlayState.run)}}><FontAwesomeIcon icon={['fas', 'play']} /></button>
    <button onClick={()=>{props.setPlaySpeed((props.playSpeed + 50) <= 2000 ? props.playSpeed + 50 : props.playSpeed)}}><FontAwesomeIcon icon={['fas', 'fast-backward']} /></button>
    <button onClick={()=>{props.setPlaySpeed((props.playSpeed) -  50 >= 50 ? props.playSpeed - 50 : props.playSpeed)}}><FontAwesomeIcon icon={['fas', 'fast-forward']} /></button>
    <button onClick={()=>{props.setPlayState(EPlayState.stop)}}><FontAwesomeIcon icon={['fas', 'pause']} /></button>
    <button onClick={()=>{props.setPlayState(EPlayState.zero)}}><FontAwesomeIcon icon={['fas', 'stop']} /></button>
  </div>


  )
}

export default Controls

import {useEffect, useState} from 'react'
import board from "./Board";
import "./Board.less"
import Ant from "../ant/Ant";
import {EPlayState} from "../controls/Controls";
import config from "../config/Config";


interface IBoarderUiProp {
  playState: EPlayState;
  playSpeed: number;
}

const BoardUi = (props: IBoarderUiProp) => {

  const [ants, setAnts] = useState(board.getStatus());

  function getAntsUi(ants: Ant[]) {
    const antsUi: any = [];//clean
    ants.forEach((ant: Ant) => {
      antsUi.push(<div className={'ant-' + ant.color.toLowerCase() + '-' + ant.status}
                       style={{gridArea: `${ant.posY + 1} / ${ant.posX + 1} / ${ant.posY + 2} / ${ant.posX + 2}`}}></div>)
    });
    return antsUi;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (props.playState === EPlayState.run) {
        board.nextMove();
        setAnts(board.getStatus());
      }
    }, props.playSpeed);
    return () => clearInterval(interval);//Very important
  }, [props.playState, props.playSpeed]);

  useEffect(() => {
      if (props.playState === EPlayState.zero) {
        board.restart();
        setAnts(board.getStatus());
      }
  }, [props.playState]);

  const boardCss = {
    gridTemplateColumns: `repeat(${board.getWidth()}, 1fr)`,
    gridTemplateRows: `repeat(${board.getHeight()}, 1fr)`
  };
  return (
    <div className={'board'} style={boardCss}>
      {getAntsUi(ants)}
    </div>
  )
}

export default BoardUi

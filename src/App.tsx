import {useRef, useState} from 'react'
import './App.css'
import BoardUi from "./board/BoardUi";
import Controls, {EPlayState} from "./controls/Controls";
import StatsPanel from "./controls/StatsPanel";
import config from "./config/Config";
import {RulesEditor} from "./controls/RulesEditor";
import Phaser from 'phaser'
import {useGame} from "./game/useGame";
import gameConfig from "./game/config";

function App() {
  const [playState, setPlayState] = useState(EPlayState.zero);
  const [playSpeed, setPlaySpeed] = useState(config.speed);

  const parentEl = useRef<HTMLDivElement>(null);
  useGame(gameConfig, parentEl);

  return (
    <div className="App">
      <div ref={parentEl} className="gameContainer" />
    </div>
  )
}

export default App
//      <BoardUi playState={playState} playSpeed={playSpeed}/>
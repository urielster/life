import {useEffect} from 'react'
import "./StatsPanel.less"
import farm from "../ant/Farm";


interface IStatsPanel {
  playSpeed:number;
}

const StatsPanel = (props:IStatsPanel) => {

  useEffect(() => {
    return () => {
    };
  }, []);

  return (
    <div id={'statsPanel'}>
      <span>fps:{ (1000 / props.playSpeed).toFixed(2) }</span>
    </div>
  )
}

export default StatsPanel;

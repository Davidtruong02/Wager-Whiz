import { useEffect, useState } from "react";
import Axios from "axios";
import BasicCard from "../Cards/BasicCard";
import "../../App.css";

function CardPanel({ selectedSport }) {
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    if (selectedSport) {
      Axios.get(`/api/playerDatas/${selectedSport}`)
        .then((response) => {
          setPlayerData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching player data:", error);
        });
    }
  }, [selectedSport]);

  return (
    <div className="playerCards">
      {playerData.map((player) => (
        <BasicCard
          key={player._id}
          playerName={player.playerName}
          sport={player.sport}
          category={player.category}
          line={player.line}
          typeOfLine={player.typeOfLine}
          position={player.position}
          team={player.team}
          opponent={player.opponent}
          usagePercent={player.usagePercent}
          minutes={player.minutes}
          minutesPercentage={player.minutesPercentage}
          projection={player.projection}
          dvaPositionDefense={player.dvaPositionDefense}
          imageUrl={player.imageUrl}
        />
      ))}
    </div>
  );
}

export default CardPanel;

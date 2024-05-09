import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./BasicCard.css";


function BasicCard({
  _id,
  playerName,
  sport,
  category,
  line,
  typeOfLine,
  position,
  team,
  opponent,
  usagePercent,
  minutes,
  minutesPercentage,
  projection,
  dvaPositionDefense,
  imageUrl,
  source,
}) {
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    axios
      .get(`/api/team/${sport}/${team}`)
      .then((response) => {
        setLogoUrl(response.data.logoUrl);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [sport, team]);

  const calculateScore = () => {
    if (line) {
      return ((projection / line) * 100 - 100).toFixed(2);
    }
    return 0;
  };

  const score = calculateScore();
  const handleClick = (e) => {
    console.log(e.target.id)
  };


  return (
    <div
    data-playerid ={_id}
      className="card-container"
      style={{ marginBottom: "-175px", minHeight: "100%" }}
    >
      <div className="card-body">
        <Card
        
          className= "card-front"
          style={{
            width: "18rem",
            maxHeight: "60%",
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(https://a.espncdn.com/i/teamlogos/${sport}/500/${team}.png)`,
            backgroundSize: "contain",
          }}
        >
          {imageUrl && <Card.Img variant="top" src={imageUrl} />}
          <Card.Body>
            <Card.Title>{playerName}</Card.Title>
            {team && <p className="mb-2">Team: {team}</p>}
            {opponent && <p className="mb-2">Opponent: {opponent}</p>}
          </Card.Body>
        </Card>
        <Card className="card-back" style={{ width: "18rem" }}>
          <Card.Body>
            {sport && <p className="mb-2">Sport: {sport}</p>}
            {category && <p className="mb-2">Category: {category}</p>}
            {line && <p className="mb-2">Line: {line}</p>}
            {typeOfLine && <p className="mb-2">Type of Line: {typeOfLine}</p>}
            {position && <p className="mb-2">Position: {position}</p>}
            {usagePercent && (
              <p className="mb-2">Usage Percent: {usagePercent}</p>
            )}
            {minutes && <p className="mb-2">Minutes: {minutes}</p>}
            {minutesPercentage && (
              <p className="mb-2">Minutes Percentage: {minutesPercentage}</p>
            )}
            {projection && <p className="mb-2">Projection: {projection}</p>}
            {dvaPositionDefense && (
              <p className="mb-2">DVA Position Defense: {dvaPositionDefense}</p>
            )}
            <Button id={_id} onClick={handleClick} className="cardButton" variant="primary">
              Add to picks
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default BasicCard;

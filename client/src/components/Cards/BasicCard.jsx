import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./BasicCard.css";

function BasicCard({
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
}) {
  return (
    <div className="card-container">
      <div className="card-body">
        <Card className="card-front" style={{ width: "18rem" }}>
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
            <Button variant="primary">Add to picks</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default BasicCard;

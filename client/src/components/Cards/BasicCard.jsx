import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
  console.log(
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
    imageUrl
  );

  return (
    <Card style={{ width: "18rem" }}>
      {imageUrl && <Card.Img variant="top" src={imageUrl} />}
      <Card.Body>
        <Card.Title>{playerName}</Card.Title>
        <Card.Text>
          {sport && `Sport: ${sport}`}
          {category && `Category: ${category}`}
          {line && `Line: ${line}`}
          {typeOfLine && `Type of Line: ${typeOfLine}`}
          {position && `Position: ${position}`}
          {team && `Team: ${team}`}
          {opponent && `Opponent: ${opponent}`}
          {usagePercent && `Usage Percent: ${usagePercent}`}
          {minutes && `Minutes: ${minutes}`}
          {minutesPercentage && `Minutes Percentage: ${minutesPercentage}`}
          {projection && `Projection: ${projection}`}
          {dvaPositionDefense && `DVA Position Defense: ${dvaPositionDefense}`}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicCard;

import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
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
  source,
}) {
  const calculateScore = () => {
    if (line) {
      return ((projection / line) * 100 - 100).toFixed(2);
    }
    return 0;
  };

  const score = calculateScore();

  const handleCardButtonClick = () => {
    console.log("handleCardButtonClick called");
    const player = {
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
    };

    // Get the id_token from local storage
    const idToken = localStorage.getItem("id_token");

    // Decrypt the id_token to get the username
    console.log("===============================");
    console.log(idToken);
    console.log("===============================");
    const decodedToken = jwt_decode(idToken);
    const username = decodedToken.authenticatedPerson.username;
    console.log("===============================");
    console.log(decodedToken);
    console.log("===============================");
    console.log("===============================");
    console.log(username);
    console.log("===============================");

    axios
      .post("/api/myPicks", {
        ...player,
        username: username,
      })
      .then((response) => {
        console.log("Player data added to my picks:", response);
      })
      .catch((error) => {
        console.error("Error adding player data to my picks:", error);
      });
  };

  return (
    <div
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
          {imageUrl && (
            <Card.Img
              style={{
                maxHeight: "40%",
                maxWidth: "40%",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              variant="top"
              src={imageUrl}
            />
          )}
          <Card.Body>
            <Card.Title style={{ fontSize: "15px", fontWeight: "bold" }}>
              {team && `${team} - `}
              {position}
            </Card.Title>
            {playerName}
            {opponent && <p className="mb-2">Opponent: {opponent}</p>}
            {projection && line && (
              <p
                style={{
                  color: score < 0 ? "red" : "green",
                  fontWeight: "bolder",
                  // textShadow: "2px 2px #000",
                }}
                className="mb-2"
              >
                Proj: {projection} [{score}%]
              </p>
            )}
            {category && line && (
              <p className="mb-2">
                Prop: {line} {category}
              </p>
            )}
            {/* {line && <p className="mb-2">Line: {line}</p>} */}
          </Card.Body>
        </Card>
        <Card
          className="card-back"
          style={{
            width: "18rem",
            maxHeight: "60%",
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(https://a.espncdn.com/i/teamlogos/nba/500/${team}.png)`,
            backgroundSize: "contain",
          }}
        >
          <Card.Body>
            {usagePercent && (
              <p className="mb-2">Usage Percent: {usagePercent}%</p>
            )}

            {typeOfLine && <p className="mb-2">Type of Line: {typeOfLine}</p>}

            {minutes && minutesPercentage && (
              <p className="mb-2">
                Minutes: {minutes} ({minutesPercentage})
              </p>
            )}

            {dvaPositionDefense && (
              <p className="mb-2">Up against: {dvaPositionDefense}</p>
            )}

            <Button onClick={handleCardButtonClick} className="cardButton" variant="primary">

              Add to picks
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}


export default BasicCard;

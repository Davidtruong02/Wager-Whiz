import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./BasicCard.css";
import CountdownTimer from "./CountdownTimer";
import demonImage from "../../images/demon.jpg";
import goblinImage from "../../images/goblin.jpg";

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
  start_time,
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
      start_time,
    };

    // Get the id_token from local storage
    const idToken = localStorage.getItem("id_token");

    // Decrypt the id_token to get the username
    const decodedToken = jwt_decode(idToken);
    const username = decodedToken.authenticatedPerson.username;

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
          className="card-front"
          style={{
            width: "18rem",
            maxHeight: "60%",
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(https://a.espncdn.com/i/teamlogos/${sport}/500/${team}.png)`,
            backgroundSize: "contain",
            position: "relative", // Add this to position the demon image
          }}
        >
          {typeOfLine === "demon" && (
            <img
              src={demonImage}
              alt="Demon"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                width: "25px",
                height: "25px",
                transform: "rotate(15deg)",
              }}
            />
          )}
          {typeOfLine === "goblin" && (
            <img
              src={goblinImage}
              alt="Goblin"
              style={{
                position: "fixed", // or "absolute"
                top: 10,
                right: 10,
                width: "25px",
                height: "25px",
                transform: "rotate(15deg)",
              }}
            />
          )}
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
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
              {playerName}
            </div>
            {opponent && start_time && (
              <p className="mb-2">
                {opponent}{" at "}
                {new Date(start_time).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            )}
            {projection && line && (
              <p
                style={{
                  color: score < 0 ? "red" : "green",
                  fontWeight: "bolder",
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
              <div className="mb-2 start-time">
                <CountdownTimer startTime={start_time} /> {/* Include the CountdownTimer component */}
              </div>
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

            <Button
              onClick={handleCardButtonClick}
              className="cardButton"
              variant="primary"
            >
              Add to picks
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default BasicCard;

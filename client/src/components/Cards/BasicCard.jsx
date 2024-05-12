import axios from "axios";
import { useMediaQuery } from "react-responsive";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./BasicCard.css";
import CountdownTimer from "./CountdownTimer";
import demonImage from "../../images/demon.jpg";
import goblinImage from "../../images/goblin.jpg";

function BasicCard({
  isMyPicksPage,
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
  start_time,
  playerId,
  onDelete, // Add this prop
}) {
  const [isCardAdded, setIsCardAdded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  const calculateScore = () => {
    if (line) {
      return ((projection / line) * 100 - 100).toFixed(2);
    }
    return 0;
  };

  const score = calculateScore();

  const handleCardButtonClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsCardAdded(true);
    }, 1000);

    const player = {
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
      start_time,
      playerId,
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

  const handleCardDeleteClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsCardAdded(true);
      // Get the myPicksId from state or props
      axios
        .delete(`/api/mypicks/${_id}`)
        .then((response) => {
          console.log("Player data deleted from my picks:", response);
          // Call the onDelete callback function passed in through props
          if (onDelete) {
            onDelete(_id);
          }
        })
        .catch((error) => {
          console.error("Error deleting player data from my picks:", error);
        });
    }, 1000); // Adjust this delay to match the duration of your animation
  };

  if (isCardAdded) {
    return null;
  }

  return (
    <div className="cards-wrapper">
      <div
        className={`card-container ${isMobile ? "mobile" : ""} ${
          isAnimating ? "card-disappear" : ""
        }`}
        style={{
          marginBottom: isMobile ? "-210px" : "-175px",
          minHeight: "100%",
          alignItems: isMobile ? "center" : [],
        }}
      >
        <div className="card-body">
          <Card
            className="card-front"
            style={{
              width: "18rem",
              maxHeight: "60%",
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(https://a.espncdn.com/i/teamlogos/${sport}/500/${team}.png)`,
              backgroundPosition: "center center",
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
                  {opponent}
                  {" at "}
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
                <CountdownTimer startTime={start_time} />{" "}
                {/* Include the CountdownTimer component */}
              </div>
            </Card.Body>
          </Card>
          <Card
            className="card-back"
            style={{
              width: "18rem",
              maxHeight: "60%",
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(https://a.espncdn.com/i/teamlogos/${sport}/500/${team}.png)`,
              backgroundPosition: "center center",
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
            </Card.Body>
          </Card>
          <Card
            className="card-back"
            style={{
              width: "18rem",
              maxHeight: "60%",
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(https://a.espncdn.com/i/teamlogos/${sport}/500/${team}.png)`,
              backgroundPosition: "center center",
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

              {isMyPicksPage ? (
                <Button
                  onClick={handleCardButtonClick}
                  className="cardButton"
                  variant="primary"
                >
                  Add to picks
                </Button>
              ) : (
                <Button
                  onClick={handleCardDeleteClick}
                  className="cardButton"
                  variant="primary"
                >
                  Delete Pick
                </Button>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div> // Add this line
  );
}

export default BasicCard;

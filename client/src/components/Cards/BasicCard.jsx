// Inside BasicCard.jsx

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

  const getTeamColor = (team, sport) => {
    const teamColors = {
      NBA: {
        IND: "rgba(0,0,128, 0.5), rgba(255, 215, 0, 0.5)",
        MIN: "rgba(25, 25, 112, 0.5), rgba(194,197,204, 0.5)",
        ATL: "rgba(0,0,0, 0.5), rgba(163, 13, 45, 0.5)",
        BOS: "rgba(0, 122, 51, 0.5), rgba(139,111,78, 0.5)",
        BKN: "rgba(0, 0, 0, 0.5), rgba(255,255,255, 0.5)",
        CHA: "rgba(29, 17, 96, 0.5), rgba(0,120,140, 0.5)",
        CHI: "rgba(0,43,92, 0.5), rgba(206, 17, 65, 0.5)",
        CLE: "rgba(0,45,98, 0.5), rgba(111, 38, 61, 0.5)",
        DAL: "rgba(0, 43, 92, 0.5), rgba(0, 83, 188, 0.5)",
        DEN: "rgba(13, 34, 64, 0.5), rgba(255,198,39, 0.5)",
        DET: "rgba(29,66,138, 0.5), rgba(200, 16, 46, 0.5)",
        GSW: "rgba(0, 107, 182, 0.5), rgba(253,185,39, 0.5)",
        HOU: "rgba(0,45,98, 0.5), rgba(206, 17, 65, 0.5)",
        LAC: "rgba(29,66,138, 0.5), rgba(200, 16, 46, 0.5)",
        LAL: "rgba(85, 37, 130, 0.5), rgba(253,185,39, 0.5)",
        MEM: "rgba(18,77,153, 0.5), rgba(93, 118, 169, 0.5)",
        MIA: "rgba(152, 0, 46, 0.5), rgba(249,160,27, 0.5)",
        MIL: "rgba(0, 71, 27, 0.5), rgba(240,235,210, 0.5)",
        NOP: "rgba(0, 43, 92, 0.5), rgba(227,24,55, 0.5)",
        NYK: "rgba(0, 107, 182, 0.5), rgba(245,132,38, 0.5)",
        OKC: "rgba(0, 125, 195, 0.5), rgba(239,59,36, 0.5)",
        ORL: "rgba(0, 125, 197, 0.5), rgba(196,206,211, 0.5)",
        PHI: "rgba(0, 107, 182, 0.5), rgba(237,23,76, 0.5)",
        PHX: "rgba(29, 17, 96, 0.5), rgba(229,95,32, 0.5)",
        POR: "rgba(0,0,0, 0.5), rgba(224, 58, 62, 0.5)",
        SAC: "rgba(0,0,0, 0.5), rgba(91, 43, 130, 0.5)",
        SAS: "rgba(6, 25, 34, 0.5), rgba(196,206,211, 0.5)",
        TOR: "rgba(6,25,34, 0.5), rgba(206, 17, 65, 0.5)",
        UTA: "rgba(0, 43, 92, 0.5), rgba(249,160,27, 0.5)",
        WAS: "rgba(0, 43, 92, 0.5), rgba(227,24,55, 0.5)",
      },
      MLB: {
        ARI: "rgba(111,38,61, 0.5), rgba(167, 25, 48, 0.5)",
        ATL: "rgba(29,66,138, 0.5), rgba(206, 17, 65, 0.5)",
        BAL: "rgba(0,0,0, 0.5), rgba(223, 70, 1, 0.5)",
        BOS: "rgba(0,37,84, 0.5), rgba(189, 48, 57, 0.5)",
        CHC: "rgba(0, 47, 108, 0.5), rgba(200,16,46, 0.5)",
        CWS: "rgba(0, 47, 108, 0.5), rgba(200,16,46, 0.5)",
        CIN: "rgba(0,0,0, 0.5), rgba(198, 1, 31, 0.5)",
        CLE: "rgba(12, 35, 64, 0.5), rgba(213,0,50, 0.5)",
        COL: "rgba(0,0,0, 0.5), rgba(51, 0, 111, 0.5)",
        DET: "rgba(12,35,64, 0.5), rgba(250, 70, 22, 0.5)",
        HOU: "rgba(0, 45, 98, 0.5), rgba(255,255,255, 0.5)",
        KC: "rgba(0, 70, 135, 0.5), rgba(198,146,20, 0.5)",
        LAA: "rgba(0,50,132, 0.5), rgba(186, 12, 47, 0.5)",
        LAD: "rgba(0,90,156, 0.5), rgba(162, 170, 173, 0.5)",
        MIA: "rgba(0, 144, 81, 0.5), rgba(132,132,132, 0.5)",
        MIL: "rgba(19, 41, 75, 0.5), rgba(255,200,46, 0.5)",
        MIN: "rgba(0, 43, 92, 0.5), rgba(229,95,32, 0.5)",
        NYM: "rgba(0, 45, 114, 0.5), rgba(252,76,2, 0.5)",
        NYY: "rgba(0,0,0, 0.5), rgba(12, 35, 64, 0.5)",
        OAK: "rgba(0, 56, 49, 0.5), rgba(239,178,61, 0.5)",
        PHI: "rgba(0,45,98, 0.5), rgba(239, 51, 64, 0.5)",
        PIT: "rgba(39,37,31, 0.5), rgba(253, 184, 39, 0.5)",
        SD: "rgba(0, 45, 98, 0.5), rgba(255,255,255, 0.5)",
        SEA: "rgba(0, 92, 92, 0.5), rgba(12,35,64, 0.5)",
        SF: "rgba(0, 0, 0, 0.5), rgba(255,255,255, 0.5)",
        STL: "rgba(196, 30, 58, 0.5), rgba(255,255,255, 0.5)",
        TB: "rgba(9, 44, 92, 0.5), rgba(143,188,230, 0.5)",
        TEX: "rgba(0, 50, 132, 0.5), rgba(192,192,192, 0.5)",
        TOR: "rgba(19, 74, 142, 0.5), rgba(255,255,255, 0.5)",
        WSH: "rgba(0,30,105, 0.5), rgba(171, 0, 3, 0.5)",
      },
    };
    return (
      (teamColors[sport] && teamColors[sport][team]) ||
      "transparent, transparent"
    );
  };

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

  const handleTimerComplete = () => {
    // Automatically delete the card when timer expires
    handleCardDeleteClick();
  };

  if (isCardAdded) {
    return null;
  }

  return (
    <div
      className={`card-container ${isAnimating ? "card-disappear" : ""}`}
      style={{ marginBottom: "-175px", minHeight: "100%" }}
    >
      <div className="card-body">
        <Card
          className="card-front"
          style={{
            width: "18rem",
            maxHeight: "60%",
            backgroundImage: `    
            linear-gradient(${getTeamColor(team, sport)}),         
            linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(https://a.espncdn.com/i/teamlogos/${sport}/500/${team}.png)
            `,
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
              <CountdownTimer
                startTime={start_time}
                onTimerComplete={handleTimerComplete}
              />{" "}
              {/* Include the CountdownTimer component */}
            </div>
          </Card.Body>
        </Card>
        <Card
          className="card-back"
          style={{
            width: "18rem",
            maxHeight: "60%",
            backgroundImage: `    
            linear-gradient(${getTeamColor(team, sport)}),         
            linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(https://a.espncdn.com/i/teamlogos/${sport}/500/${team}.png)
            `,
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
  );
}

export default BasicCard;

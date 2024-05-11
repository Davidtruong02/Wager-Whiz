import React, { useState, useEffect } from "react";
import Axios from "axios";
import BasicCard from "../Cards/BasicCard";
import { Row, Col } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import "../../App.css";
import "../Cards/BasicCard.css";

function MyPicks() {
  const [pickData, setPickData] = useState([]);

  // Get the id_token from local storage
  const idToken = localStorage.getItem("id_token");

  // Decrypt the id_token to get the username
  const decodedToken = jwt_decode(idToken);
  const username = decodedToken.authenticatedPerson.username;

  useEffect(() => {
    Axios.get(`/api/mypicks/${username}`)
      .then((response) => setPickData(response.data))
      .catch((error) => console.error("Error fetching player data:", error));
  }, [username]);

  return (
    <>
      <div style={{ marginTop: "15px", textAlign: "center", color: "white" }}>
        <h1 className="myPicksTitle">My Picks</h1>
      </div>
      <Row>
        <Col sm={12}>
          <div className="playerCards">
            {pickData.map((pick) => (
              <BasicCard
                _id={pick._id}
                key={pick._id}
                playerName={pick.playerName}
                sport={pick.sport}
                category={pick.category}
                line={pick.line}
                typeOfLine={pick.typeOfLine}
                position={pick.position}
                team={pick.team}
                opponent={pick.opponent}
                usagePercent={pick.usagePercent}
                minutes={pick.minutes}
                minutesPercentage={pick.minutesPercentage}
                projection={pick.projection}
                dvaPositionDefense={pick.dvaPositionDefense}
                imageUrl={pick.imageUrl}
                source={pick.source}
                start_time={pick.start_time}
                score={pick.score}
              />
            ))}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default MyPicks;

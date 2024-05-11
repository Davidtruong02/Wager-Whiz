import React, { useState, useEffect } from "react";
import Axios from "axios";
import BasicCard from "../Cards/BasicCard";
import { Row, Col, Tab, Nav } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import "../../App.css";
import "../Cards/BasicCard.css";

function MyPicks() {
  const [pickData, setPickData] = useState([]);
  const [activeTab, setActiveTab] = useState("first");

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

  const filterPicks = (source) => {
    return pickData.filter((pick) => pick.source === source);
  };

  return (
    <>
      <div style={{ marginTop: "10%" }}>
        <div style={{ textAlign: "center", color: "white" }}>
          <h1>My Picks</h1>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={12}>
              <Nav
                variant="pills"
                activeKey={activeTab}
                onSelect={(selectedKey) => setActiveTab(selectedKey)}
              >
                <Nav.Item>
                  <Nav.Link eventKey="first">Prize Picks</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">UnderDog</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div className="playerCards">
                    {filterPicks("PrizePicks").map((pick) => (
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
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div className="playerCards">
                    {filterPicks("UnderDog").map((pick) => (
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
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}

export default MyPicks;

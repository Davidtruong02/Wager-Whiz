import React, { useState, useEffect } from "react";
import Axios from "axios";
import BasicCard from "../Cards/BasicCard";
import { Tab, Nav, Row, Col } from "react-bootstrap";

function CardPanel({ selectedSport }) {
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    if (selectedSport) {
      Axios.get(`/api/players/playerDatas/${selectedSport}`)
        .then((response) => {
          setPlayerData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching player data:", error);
        });
    }
  }, [selectedSport]);

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={12}>
          <Nav variant="pills" className="flex-row">
            <Nav.Item>
              <Nav.Link eventKey="first">Prize Picks</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Underdog</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div className="playerCards">
                {playerData.slice(0, playerData.length / 2).map((player) => (
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
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div className="playerCards">
                {playerData.slice(playerData.length / 2).map((player) => (
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
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default CardPanel;

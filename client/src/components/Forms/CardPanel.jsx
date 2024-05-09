import React, { useState, useEffect } from "react";
import prizePicksIcon from "../../images/PrizePicks.png";
import underDogIcon from "../../images/underDog.png";
import Axios from "axios";
import BasicCard from "../Cards/BasicCard";
import { Tab, Nav, Row, Col } from "react-bootstrap";

function CardPanel({ selectedSport }) {
  const [playerData, setPlayerData] = useState([]);
  const [activeTab, setActiveTab] = useState("first");

  useEffect(() => {
    if (selectedSport) {
      Axios.get(`/api/players/playerDatas/${selectedSport}`)
        .then((response) => {
          const playersWithScores = response.data.map((player) => ({
            ...player,
            score: player.line
              ? (player.projection / player.line) * 100 - 100
              : 0,
          }));
          const sortedPlayers = playersWithScores.sort(
            (a, b) => b.score - a.score
          );
          setPlayerData(sortedPlayers);
        })
        .catch((error) => {
          console.error("Error fetching player data:", error);
        });
    }
  }, [selectedSport]);

  return (
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey="first"
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <Col sm={12}>
          <Nav
            variant="pills"
            className="flex-row"
            activeKey={activeTab} // Add this prop
            onSelect={(selectedKey) => setActiveTab(selectedKey)} // Add this prop
          >
            <Nav.Item style={{ marginRight: "10px" }}>
              <Nav.Link eventKey="first">
                <img
                  src={prizePicksIcon}
                  alt="Prize Picks Icon"
                  style={{ marginRight: "10px" }}
                />
                Prize Picks
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">
                <img
                  src={underDogIcon}
                  alt="underDog Icon"
                  style={{ marginRight: "10px" }}
                />
                Underdog
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div className="playerCards">
                {playerData
                  .filter((data) => data.source === "PrizePicks")
                  .map((player) => (
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
                      source={player.source}
                      score={player.score}
                    />
                  ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div className="playerCards">
                {playerData
                  .filter((data) => data.source === "UnderDog")
                  .map((player) => (
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
                      source={player.source}
                      score={player.score}
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

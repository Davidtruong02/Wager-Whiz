import React, { useState, useEffect } from "react";
import prizePicksIcon from "../../images/PrizePicks.png";
import underDogIcon from "../../images/underdog.png";
import Axios from "axios";
import BasicCard from "../Cards/BasicCard";
import Button from "react-bootstrap/Button";
import { Tab, Nav, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import NBALogo from "../../images/NBA.png";
import MLBLogo from "../../images/MLB2.png";

function CardPanel({ selectedSport }) {
  const [playerData, setPlayerData] = useState([]);
  const [activeTab, setActiveTab] = useState("first");
  const [searchInput, setSearchInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("Sort by...");

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    if (selectedSport) {
      // Determine the API endpoint based on the selected sport
      const apiEndpoint = `/api/playerRoutes${selectedSport}`;

      Axios.get(apiEndpoint)
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

  let sortedAndFilteredPlayers = playerData;

  return (
    <Tab.Container
      id="left-tabs-example"
      defaultActiveKey="first"
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <Col sm={12}>
          <div className="d-flex justify-content-center">
            <img
              style={{ height: "25%", width: "25%" }}
              src={selectedSport === "mlb" ? MLBLogo : NBALogo}
              alt={selectedSport}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Nav
              variant="pills"
              className="flex-row"
              activeKey={activeTab}
              onSelect={(selectedKey) => setActiveTab(selectedKey)}
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
            <div className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search for player or team name"
                className="mr-2"
                value={searchInput}
                onChange={handleInputChange}
                style={{ width: "300px" }}
              />
              {/* <Button className="searchButton" variant="primary">
                Search
              </Button> */}
              <Form.Select
                // as="select"
                className="ml-2 mr-2"
                value={selectedOption}
                onChange={handleOptionChange}
                style={{ width: "200px" }}
              >
                <option>Sort by...</option>
                <option>Projection asc</option>
                <option>Projection desc</option>
                <option>Team</option>
                <option>Prop</option>
                <option>Type of line</option>
                // Add more options as needed
              </Form.Select>
              {/* <Button variant="primary">Sort</Button> */}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div className="playerCards">
                {(() => {
                  let sortedAndFilteredPlayers = playerData.filter(
                    (data) =>
                      data.source === "PrizePicks" &&
                      (data.playerName
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()) ||
                        data.team
                          .toLowerCase()
                          .includes(searchInput.toLowerCase()))
                  );

                  switch (selectedOption) {
                    case "Projection asc":
                      sortedAndFilteredPlayers = sortedAndFilteredPlayers.sort(
                        (a, b) => a.score - b.score
                      );
                      break;
                    case "Projection desc":
                      sortedAndFilteredPlayers = sortedAndFilteredPlayers.sort(
                        (a, b) => b.score - a.score
                      );
                      break;
                    case "Team":
                      sortedAndFilteredPlayers = sortedAndFilteredPlayers.sort(
                        (a, b) => a.team.localeCompare(b.team)
                      );
                      break;
                    case "Prop":
                      sortedAndFilteredPlayers = sortedAndFilteredPlayers.sort(
                        (a, b) => a.category.localeCompare(b.category)
                      );
                      break;
                    case "Type of line":
                      const order = ["goblin", "demon", "standard", "none"];
                      sortedAndFilteredPlayers = sortedAndFilteredPlayers.sort(
                        (a, b) =>
                          order.indexOf(a.typeOfLine.trim().toLowerCase()) -
                          order.indexOf(b.typeOfLine.trim().toLowerCase())
                      );
                      break;
                    default:
                      break;
                  }

                  return sortedAndFilteredPlayers.map((player) => (
                    <BasicCard
                      _id={player._id}
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
                  ));
                })()}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div className="playerCards">
                {(() => {
                  let sortedAndFilteredPlayers = playerData.filter(
                    (data) =>
                      data.source === "UnderDog" &&
                      (data.playerName
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()) ||
                        data.team
                          .toLowerCase()
                          .includes(searchInput.toLowerCase()))
                  );

                  switch (selectedOption) {
                    case "Projection asc":
                      sortedAndFilteredPlayers = sortedAndFilteredPlayers.sort(
                        (a, b) => a.score - b.score
                      );
                      break;
                    case "Projection desc":
                      sortedAndFilteredPlayers = sortedAndFilteredPlayers.sort(
                        (a, b) => b.score - a.score
                      );
                      break;
                    case "Team":
                      sortedAndFilteredPlayers = sortedAndFilteredPlayers.sort(
                        (a, b) => a.team.localeCompare(b.team)
                      );
                      break;
                    case "Prop":
                      sortedAndFilteredPlayers = sortedAndFilteredPlayers.sort(
                        (a, b) => a.category.localeCompare(b.category)
                      );
                      break;
                    case "Type of line":
                      const order = ["goblin", "demon", "standard", "none"];
                      sortedAndFilteredPlayers = sortedAndFilteredPlayers.sort(
                        (a, b) =>
                          order.indexOf(a.typeOfLine.trim().toLowerCase()) -
                          order.indexOf(b.typeOfLine.trim().toLowerCase())
                      );
                      break;
                    default:
                      break;
                  }

                  return sortedAndFilteredPlayers.map((player) => (
                    <BasicCard
                      _id={player._id}
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
                  ));
                })()}
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default CardPanel;

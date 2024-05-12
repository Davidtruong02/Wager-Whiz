import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import prizePicksIcon from "../../images/PrizePicks.png";
import underDogIcon from "../../images/underdog.png";
import Axios from "axios";
import BasicCard from "../Cards/BasicCard";
import { Tab, Nav, Row, Col, Button, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import NBALogo from "../../images/NBA.png";
import MLBLogo from "../../images/MLB2.png";

function CardPanel({ selectedSport }) {
  const isMobile = useMediaQuery({ query: "(max-width: 690px)" });
  const [playerData, setPlayerData] = useState([]);
  const [activeTab, setActiveTab] = useState("first");
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeNavLink, setActiveNavLink] = useState("first");

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    if (selectedSport) {
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

          const uniqueCategories = [
            ...new Set(sortedPlayers.map((player) => player.category)),
          ];
          setCategories(uniqueCategories);
          setSelectedCategory(uniqueCategories[0]); // Set default selected category
        })
        .catch((error) => {
          console.error("Error fetching player data:", error);
        });
    }
  }, [selectedSport]);

  useEffect(() => {
    if (playerData.length > 0) {
      const filteredCategories = playerData
        .filter((player) => player.source === selectedTab())
        .map((player) => player.category);
      setCategories([...new Set(filteredCategories)]);
      setSelectedCategory(filteredCategories[0]); // Set default selected category
    }
  }, [playerData, activeTab]);

  const filterPlayers = (players) => {
    const now = new Date();
    return players.filter(
      (data) =>
        data.source === selectedTab() &&
        (data.playerName.toLowerCase().includes(searchInput.toLowerCase()) ||
          data.team.toLowerCase().includes(searchInput.toLowerCase())) &&
        data.category === selectedCategory &&
        new Date(data.start_time) > now // Filter out cards with start_time in the past
    );
  };

  const selectedTab = () => {
    return activeTab === "first" ? "PrizePicks" : "UnderDog";
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update selected category
  };

  const handleMobileCategoryClick = (category) => {
    setSelectedCategory(category); // Update selected category
    const categorySource = playerData.find(
      (player) => player.category === category
    )?.source;
    console.log(`Category source for ${category}:`, categorySource); // Add this line
    if (categorySource) {
      const tab = categorySource === "PrizePicks" ? "first" : "second";
      setActiveTab(tab); // Update activeTab state
      setActiveNavLink(tab); // Update activeNavLink state
    } else {
      setActiveTab("first"); // Set activeTab state to default value
      setActiveNavLink("first"); // Set activeNavLink state to default value
    }
  };

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
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Nav
              variant="pills"
              className="flex-row"
              activeKey={activeTab}
              onSelect={(selectedKey) => setActiveTab(selectedKey)}
            >
              <Nav.Item style={{ marginRight: "10px" }}>
                <Nav.Link
                  eventKey="first"
                  active={activeNavLink === "first"}
                  onClick={() => setActiveNavLink("first")}
                >
                  <img
                    src={prizePicksIcon}
                    alt="Prize Picks Icon"
                    style={{ marginRight: "10px" }}
                  />
                  {!isMobile && "Prize Picks"}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="second"
                  active={activeNavLink === "second"}
                  onClick={() => setActiveNavLink("second")}
                >
                  <img
                    src={underDogIcon}
                    alt="underDog Icon"
                    style={{ marginRight: "10px" }}
                  />
                  {!isMobile && "Underdog"}
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
                style={{ width: isMobile ? "150px" : "300px" }}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          {isMobile ? (
            <Dropdown onSelect={handleMobileCategoryClick}>
              <Dropdown.Toggle
                variant="primary"
                align="end"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                {selectedCategory || "Select Category"}
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{
                  width: "100%",
                  backgroundColor: "#1d1e22",
                }}
              >
                {categories.map((category) => (
                  <Dropdown.Item
                    eventKey={category}
                    key={category}
                    style={{ color: "white" }}
                  >
                    {category}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div
              className="d-flex flex-wrap mb-3"
              style={{ marginLeft: "5px" }}
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="mr-2 mb-2"
                  variant={
                    category === selectedCategory ? "primary" : "secondary"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <div className="playerCards">
                {filterPlayers(playerData).map((player) => (
                  <BasicCard
                    isCardPanel={true}
                    isMyPicksPage={true}
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
                    start_time={player.start_time}
                    score={player.score}
                  />
                ))}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <div className="playerCards">
                {filterPlayers(playerData).map((player) => (
                  <BasicCard
                    isCardPanel={true}
                    isMyPicksPage={true}
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
                    start_time={player.start_time}
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

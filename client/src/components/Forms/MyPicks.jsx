import React, { useState, useEffect } from "react";
import Axios from "axios";
import BasicCard from "../Cards/BasicCard";
import { Row, Col, Tab, Nav, Button } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import "../../App.css";
import "../Cards/BasicCard.css";
import prizePicksIcon from "../../images/PrizePicks.png";
import underDogIcon from "../../images/underdog.png";
import { useMediaQuery } from "react-responsive";

function MyPicks() {
  const [cards, setCards] = useState([]);
  const [pickData, setPickData] = useState([]);
  const [activeTab, setActiveTab] = useState("first");
  const [selectedSport, setSelectedSport] = useState(null);
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

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
    return pickData.filter(
      (pick) =>
        pick.source === source &&
        selectedSport && // Add this line
        (!selectedSport || pick.sport === selectedSport)
    );
  };

  const handleDelete = (id) => {
    Axios.delete(`/api/mypicks/${id}`)
      .then((response) => {
        console.log("Player data deleted from my picks:", response);
        // Fetch the updated data from the server
        Axios.get(`/api/mypicks/${username}`)
          .then((response) => setPickData(response.data))
          .catch((error) =>
            console.error("Error fetching player data:", error)
          );
      })
      .catch((error) => {
        console.error("Error deleting player data from my picks:", error);
      });
  };

  const hasSportData = (sport) => {
    return pickData.some((pick) => pick.sport === sport);
  };

  const hasMLBData = () => hasSportData("MLB");
  const hasNBAData = () => hasSportData("NBA");

  useEffect(() => {
    const mlbPicks = pickData.some((pick) => pick.sport === "MLB");
    const nbaPicks = pickData.some((pick) => pick.sport === "NBA");

    if (mlbPicks) {
      setSelectedSport("MLB");
    } else if (nbaPicks) {
      setSelectedSport("NBA");
    } else {
      setSelectedSport(null);
    }
  }, [pickData]);

  return (
    <>
      <div style={{ marginTop: "10%" }}>
        <div style={{ textAlign: "center", color: "white" }}>
          <h1>My Picks</h1>
        </div>
        {pickData.length === 0 ? (
          <div
            style={{ textAlign: "center", color: "white", marginTop: "20px" }}
          >
            <h2>
              You haven't selected any picks from the current board. Please
              select a sport and begin adding your picks.
            </h2>
          </div>
        ) : (
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={12}>
                <Nav
                  variant="pills"
                  activeKey={activeTab}
                  onSelect={(selectedKey) => setActiveTab(selectedKey)}
                >
                  <Nav.Item>
                    <Nav.Link eventKey="first">
                      <img
                        src={prizePicksIcon}
                        alt="Prize Picks"
                        style={{ width: "20px", marginRight: "5px" }}
                      />
                      {!isMobile && "Prize Picks"}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">
                      <img
                        src={underDogIcon}
                        alt="Under Dog"
                        style={{ width: "20px", marginRight: "5px" }}
                      />
                      {!isMobile && "Underdog"}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <div style={{ marginTop: "15px" }}>
                  <Button
                    style={{
                      marginRight: "10px",
                      backgroundColor:
                        selectedSport === "MLB" ? "#007bff" : "darkblue",
                    }}
                    onClick={() => setSelectedSport("MLB")}
                    disabled={!hasMLBData()}
                  >
                    MLB
                  </Button>
                  <Button
                    style={{
                      backgroundColor:
                        selectedSport === "NBA" ? "#007bff" : "darkblue",
                    }}
                    onClick={() => setSelectedSport("NBA")}
                    disabled={!hasNBAData()}
                  >
                    NBA
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="playerCards">
                      {filterPicks("PrizePicks").map((pick) => (
                        <BasicCard
                          key={pick._id}
                          {...pick}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <div className="playerCards">
                      {filterPicks("UnderDog").map((pick) => (
                        <BasicCard
                          key={pick._id}
                          {...pick}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        )}
      </div>
    </>
  );
}

export default MyPicks;

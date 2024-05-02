import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Icon from "../../images/wager.jpg";
import Button from "react-bootstrap/Button";

function Header() {
  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

  return (
    <Navbar
      className="justify-content-between mx-3"
      style={{ backgroundColor: "#1d1e22" }}
    >
      <Navbar.Brand href="#home">
        <Image
          src={Icon}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />{" "}
        <span className="text-white">WagerWhiz</span>
      </Navbar.Brand>
      <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
        <Nav.Item>
          <Nav.Link eventKey="2" title="Item" style={{ color: "white" }}>
            NavLink 2 content
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" style={{ color: "white" }}>
            NavLink 3 content
          </Nav.Link>
        </Nav.Item>
        <NavDropdown
          title={<span style={{ color: "white" }}>Sports</span>}
          id="nav-dropdown"
          style={{ color: "white" }}
        >
          <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">
            Something else here
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
        <Button variant="primary" className="mr-2">
          Login
        </Button>
        <Button variant="secondary">Sign Up</Button>
      </Nav>
    </Navbar>
  );
}

export default Header;

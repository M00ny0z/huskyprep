/**
 * Renders the Navbar for the site
 */

import { ListGroupItem } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

// Makes a request to get the current SQL dump file
const getBackup = async () => {
  const apiKey = window.localStorage.getItem("MY-API-KEY");
  if (apiKey) {
    const bodyData = new FormData();
    bodyData.append("key", apiKey);
    const res = await fetch("/admin/api/dump", {
      method: "POST",
      body: bodyData,
    });
    const fileBlob = await res.blob();
    const href = window.URL.createObjectURL(fileBlob);
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", "dump.sql"); // or any other extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

function Nav() {
  return (
    <Navbar className="navbar">
      <Container>
        <ListGroup horizontal className="border border-2 navgroup">
          <Link to="/" className="mr-2 fw-bold selected navbar-item">
            <ListGroupItem>Add Question</ListGroupItem>
          </Link>

          <Link to="/questions" className="mr-2 fw-bold navbar-item">
            <ListGroupItem>View Questions in-progress</ListGroupItem>
          </Link>
        </ListGroup>
      </Container>
      <Button variant="dark" className="me-3" onClick={getBackup}>
        Download Backup
      </Button>
    </Navbar>
  );
}

export default Nav;

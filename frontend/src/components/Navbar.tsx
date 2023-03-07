/**
 * Renders the Navbar for the site
 */

import { useState } from "react";

import { ListGroupItem } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";

function Nav() {
  const [pageName, setPageName] = useState(window.location.hash.split("/")[1]);

  /**
   * Checks whether a given tab is currently selected or not
   * @param {string} name - The name of the tab to check for
   * @return {boolean} - TRUE if name is of the current page of the use
   *                     FALSE otherwise
   */
  const isSelected = (name: string) => {
    return name === pageName ? "selected" : "";
  };

  return (
    <Navbar className="navbar">
      <Container>
        <ListGroup
          horizontal
          variant="husky"
          className="border border-2 navbar-item bg-husky">
          <Link
            to="/"
            className={`mr-2 fw-bold ${isSelected(
              ""
            )} navbar-item text-decoration-none`}
            onClick={() => setPageName("")}>
            <ListGroupItem className="navbar-item">Practice Mode</ListGroupItem>
          </Link>

          <Link
            to="/statistics"
            className={`mr-2 ${isSelected(
              "statistics"
            )} fw-bold navbar-item text-decoration-none`}
            onClick={() => setPageName("statistics")}>
            <ListGroupItem className="navbar-item">Statistics</ListGroupItem>
          </Link>
        </ListGroup>
      </Container>
    </Navbar>
  );
}

export default Nav;

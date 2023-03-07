/**
 * Renders a subject-selection card
 */

import Card from "react-bootstrap/Card";
import { BsCheckCircleFill } from "react-icons/bs";
import { useState } from "react";

interface SubCardProps {
  // the name of the subject
  name: string;
  // the color to show for the subject
  color: string;
  // the chapter label for the subject
  chapter: string;
  // callback for when selecting this subject
  onClick: () => void;
}

// takes color as prop
function SubCard({ name, color, chapter, onClick }: SubCardProps) {
  const [selected, setSelected] = useState(false);
  const textColor = !selected || color === "light" ? "dark" : "white";
  // if (!selected) {
  // }
  // const textColor = (() => {
  //   if (!selected) {
  //     return "dark";
  //   }
  //   if (color === "light") {
  //     return "dark";
  //   }
  //   return "white";
  // })();
  // const textColor = !selected ? "dark" : color == "light" ? "dark" : "white";

  // renders check signifying subject has been selected ONLY IF selected
  const renderSelectionCheck = () => {
    return selected ? <BsCheckCircleFill /> : "";
  };

  // Updates selection property and calls given onClick callback
  const handleClick = () => {
    onClick();
    setSelected(!selected);
  };

  return (
    <Card
      onClick={handleClick}
      className="m-3 sub-card"
      key={name}
      bg={selected ? color : "light"}
      text={textColor}
      style={{ width: "17rem" }}>
      <Card.Header className="d-flex justify-content-between">
        <span>{name}</span>
        {renderSelectionCheck()}
      </Card.Header>
      <Card.Body>
        <Card.Title>{chapter} </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default SubCard;

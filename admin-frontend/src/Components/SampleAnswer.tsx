/**
 * Possible Answer for a problem inside of problem-creator-page
 * Can be selected to mark this possible answer as the correct answer
 */

import ListGroupItem from "react-bootstrap/ListGroupItem";
import Form from "react-bootstrap/Form";
import Markdown from "./Markdown";

interface SampleAnswerProps {
  // key prop for React
  key: string;
  // The index of this answer
  idx: number;
  // Text to display for this answer
  text: string;
  //
}

function SampleAnswer({ text, idx, key }: SampleAnswerProps) {
  return (
    <ListGroupItem className="p-3 option d-flex flex-row" key={key}>
      <Markdown>{`${String.fromCharCode(idx + 65)}) ${text}`}</Markdown>
      <Form.Check
        type="radio"
        name="ans"
        value={idx}
        id={`ans-${idx}`}
        label="correct answer"
      />
    </ListGroupItem>
  );
}

export default SampleAnswer;

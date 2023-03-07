/**
 * Renders an answer choice for a given problem
 * Upon click:
 *    Will mark this answer as the user-selected answer
 *    Will change styling to show answer as correct or incorrect
 */

import ListGroupItem from "react-bootstrap/ListGroupItem";
import Markdown from "./Markdown";

interface AnswerProps {
  // key prop for React
  key: number;
  // The text to show for this answer
  text: string;
  // The index of this answer
  idx: number;
  // The index of the correct answer
  // Used to render the answer as correct or incorrect
  // once an answer has been chosen
  answerIdx: number;
  // The index of the answer the user has chosen
  option: number | null;
  // Callback for when user has clicked on this answer
  makeChoice: (idx: number) => void;
}

function Answer({
  key,
  text,
  idx,
  answerIdx,
  option,
  makeChoice,
}: AnswerProps) {
  /**
   * Gets the display class to use for the answer
   * @return {string} - The display class to use for rendering the answer
   */
  const getDisplayClass = (): string => {
    if (option !== null && idx === answerIdx) {
      return "correct-option";
    }
    if (option !== null && idx === option) {
      return "incorrect-option";
    }
    if (option !== null) {
      return "neutral-option";
    }
    return "option";
  };

  /**
   * Upon user click, marks this answer as the user selected one for the problem
   */
  const makeSelection = () => {
    if (option === null) {
      makeChoice(idx);
    }
  };

  return (
    <ListGroupItem
      key={key}
      className={`p-3 ${getDisplayClass()}`}
      onClick={makeSelection}>
      <b>{`${String.fromCharCode(idx + 65)})`}</b>
      <Markdown>{text}</Markdown>
    </ListGroupItem>
  );
}

export default Answer;

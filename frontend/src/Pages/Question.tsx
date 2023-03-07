/**
 * Renders a specific question and its possible answers for student to practice
 * Will show the correct answer upon user selection
 * Updates the Dexie db with a new practice Report upon user selection
 */

import { useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { SUBJECT_LABELS } from "../assets/constants";
import { db } from "../db";
import useQuestion from "../Hooks/useQuestion";

import Markdown from "../Components/Markdown";
import Answer from "../Components/Answer";

// TAKES subjects PROP which is list of subjects
function Question({ selectedSubjects }: { selectedSubjects: number[] }) {
  const [option, setOption] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>({} as number);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [question, getNewQuestion] = useQuestion(selectedSubjects, () => {
    setStartTime(Date.now());
    setOption(null);
    setTimeTaken(null);
  });
  // let len = 0;
  // let timer = question !== null ? setInterval(() => { len = len + 1}, 1000) : null;

  /**
   * Marks a choice as the selected answer from the user
   * Saves the time taken to choose
   * @param {number} idx - The index of the selected answer
   *                     - Ex. 0 for the first choice
   * Updates the Dexie db with a new practice Report upon user selection
   */
  const makeSelection = (idx: number): void => {
    // Only this case necessary since by this point, we should have a question
    if (question) {
      const time = (Date.now() - startTime) / (10 * 10 * 10);
      // clearInterval(timer);
      setTimeTaken(time);
      setOption(idx);
      const newReport = {
        qid: question.id,
        correct: idx === question.correctIdx,
        subject_id: question.subjectId,
        time,
      };
      db.reports.add(newReport);
    }
  };

  /**
   * Renders a given possible answer choice
   * Saves the time taken to choose
   * @param {number} idx - The index of the selected answer
   *                     - Ex. 0 for the first choice
   * Updates the Dexie db with a new practice Report upon user selections
   * @return {JSX}
   */
  const renderAns = () => {
    if (question) {
      return question.answers.map((ans, idx) => (
        <Answer
          text={ans.text}
          key={ans.id}
          idx={idx}
          answerIdx={question.correctIdx}
          option={option}
          makeChoice={makeSelection}
        />
      ));
    }
    return null;
  };

  /**
   * Renders how long the user took for the problem
   * Renders only if the user has selected an answer
   * @return {JSX}
   */
  const renderTimeTaken = () => {
    return option !== null && timeTaken !== null ? (
      <h3>{`Time Taken: ${(timeTaken / 60).toPrecision(4)} minutes`}</h3>
    ) : null;
  };

  /**
   * Renders the button for the user to start the next problem
   * Renders only if the user has selected an answer for the current problem
   * Upon click, starts request for a new question
   * @return {JSX}
   */
  const renderNextBtn = () => {
    return option !== null ? (
      <Button size="lg" className="next-button" onClick={getNewQuestion}>
        Next Question
      </Button>
    ) : null;
  };

  /**
   * Renders a badge for each selected subject for practice
   * Returns list of badges
   * @return {JSX[]}
   */
  const renderSubjects = () => {
    return selectedSubjects.map((subIdx) => (
      <Badge bg="info" className="me-2" key={SUBJECT_LABELS[subIdx]}>
        {SUBJECT_LABELS[subIdx]}
      </Badge>
    ));
  };

  return question !== null ? (
    <div>
      <Container className="d-flex flex-column align-items-center border rounded border-3 p-4 m-3 problem-output">
        {renderTimeTaken()}
        <div className="d-flex flex-row justify-content-start">
          {" "}
          <b>Currently Selected Chapters:</b> {renderSubjects()}
        </div>
        <h4 className="text-center bg-dark text-white border rounded w-100 p-3">{`${
          SUBJECT_LABELS[question.subjectId]
        }:`}</h4>
        <Markdown>{question.text}</Markdown>
      </Container>
      <Container>
        <ListGroup>{renderAns()}</ListGroup>
      </Container>
      <div className="d-flex flex-row justify-content-center mt-2">
        {renderNextBtn()}
      </div>
    </div>
  ) : null;
}

export default Question;

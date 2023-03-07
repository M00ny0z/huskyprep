/**
 * Renders the practice page
 * First renders the selection screen for users to select what chapters/subjects
 *    they want to practice
 * Then renders the question screen once the users select 'Begin'
 */

import { useState } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {
  SUBJECTS,
  COLORS,
  QUESTION_MODE,
  CARDS_MODE,
} from "../assets/constants";
import SubCard from "../Components/SubCard";
import Question from "../Pages/Question";

type Mode = typeof QUESTION_MODE | typeof CARDS_MODE;

function Practice() {
  const [mode, setMode] = useState<Mode>(CARDS_MODE);
  const [subjects, setSubjects] = useState<number[]>([]);
  // const question = useQuestion([1,2,3]);

  /**
   * Updates the currently selected list of subjects
   * Checks if the subject to update has already been selected
   *  If subject is not selected, adds it to the list of subject selections
   *  Else, removes it from list of subject selections
   */
  const updateSubjectSelection = (selection: number): void => {
    const newSelection = subjects.includes(selection)
      ? subjects.filter((sub) => sub !== selection)
      : [...subjects, selection];
    setSubjects(newSelection);
  };

  /**
   * Renders all of the subject selection cards
   */
  const renderCards = () => {
    return Object.entries(SUBJECTS).map(([, sub], idx) => {
      const color = sub.color.toLowerCase();
      return (
        <SubCard
          key={sub.title}
          name={sub.title}
          color={color}
          chapter={sub.chapter}
          onClick={() => updateSubjectSelection(idx)}
        />
      );
    });
  };

  /**
   * Conditionally renders the next button on the page
   * Renders only if user has selected at least 1 subject
   */
  const renderNextButton = () => {
    return subjects.length > 0 ? (
      <Button
        size="lg"
        className="next-button"
        onClick={() => setMode(QUESTION_MODE)}>
        Begin Practicing!
      </Button>
    ) : null;
  };

  /**
   * Renders the question-practice mode
   * Where the user is practicing a question from a pool of selected subjects
   */
  const renderQuestionMode = () => {
    return <Question selectedSubjects={subjects} />;
  };

  /**
   * Renders the subject cards mode
   *  Where user is selecting which subjects to practice
   */
  const renderCardsMode = () => {
    return (
      <div className="d-flex flex-column justify-content-center">
        <h1 className="text-center">
          Click on each chapter you would like to practice
        </h1>
        <Container className="d-flex flex-row flex-wrap justify-content-center">
          {renderCards()}
        </Container>
        <Container className="d-flex flex-row justify-content-center">
          {renderNextButton()}
        </Container>
      </div>
    );
  };

  return mode === CARDS_MODE ? renderCardsMode() : renderQuestionMode();
}

export default Practice;

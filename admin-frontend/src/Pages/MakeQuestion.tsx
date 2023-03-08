/**
 * Renders the page for creating new WIP Questions
 * Upon completion, Question is stored locally for review
 */

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { Editor, EditorState } from "draft-js";
import { db } from "../db";
import Markdown from "../Components/Markdown";
import { SUBJECT_LABELS, RADIX } from "../assets/constants";
import { TempQuestion, TempAnswer, getLetterFromIdx } from "../assets/util";

function MakeQuestion() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [chosenSubject, setChosenSubject] = useState(0);
  const [answers, setAnswers] = useState<TempAnswer[]>([]);

  // const renderAns = () => {
  //   return answers.map((ans, idx) => (
  //     <SampleAnswer key={`${ans}-${idx + 1}`} idx={idx} text={ans.text} />
  //   ));
  // };

  /**
   * Renders all of the possible subject choices to assign to a new problem
   * Renders as Dropdown.Item
   */
  const renderSubjectChoices = (): React.ReactNode[] => {
    return SUBJECT_LABELS.map((subject, idx) => {
      return (
        <Dropdown.Item onClick={() => setChosenSubject(idx)} key={subject}>
          {SUBJECT_LABELS[idx]}
        </Dropdown.Item>
      );
    });
  };

  const removeAnswer = (idx: number) => {
    const filteredAnswers = answers.filter((_, currIdx) => currIdx !== idx);
    setAnswers([...filteredAnswers]);
  };

  /**
   * Adds a new potential answer to a problem
   */
  const addAnswer = (): void => {
    setAnswers([...answers, { text: "" }]);
  };

  /**
   * Updates the text for a specified answer
   */
  const changeAnswer = (text: string, idx: number): void => {
    // Necessary to make a copy of the current list of answers
    const newAns = [...answers];
    newAns[idx] = { text };
    setAnswers(newAns);
  };

  /**
   * Clears the main-text-body of problem
   * Clears the list of current possible answers for the problem
   */
  const reset = (): void => {
    setEditorState(EditorState.createEmpty());
    setAnswers([]);
  };

  /**
   * Clears the main-text-body of problem
   * Clears the list of current possible answers for the problem
   */
  const renderAnswerOptions = (): React.ReactNode[] => {
    return answers.map((ans, idx) => {
      return (
        <Container className="border border-5 mb-3" key={`${ans}-${idx + 1}`}>
          <h4>Answer:</h4>
          <Form.Check
            type="radio"
            name="ans"
            value={idx}
            id={`ans-${getLetterFromIdx(idx)}`}
            label="correct answer"
          />
          <textarea onChange={(e) => changeAnswer(e.target.value, idx)} />
          <Button onClick={() => removeAnswer(idx)} variant="danger">
            Remove Answer
          </Button>
          <Markdown>{answers[idx].text}</Markdown>
        </Container>
      );
    });
  };

  /**
   * Submits the WIP Question to the Dexie DB
   * Doesnt clear the WIP Question state so you can create related questions
   */
  const submitQuestion = () => {
    const text = editorState.getCurrentContent().getPlainText();
    const validAns = answers.filter((ans) => ans.text.length > 0).length;
    const isAnsValid = answers.length > 0 && validAns === answers.length;
    const checkedAnswer: HTMLInputElement | null = document.querySelector(
      'input[name="ans"]:checked'
    );
    // console.log("submit btn clicked");
    // console.log(`answers: ${answers.length}, desc: ${desc.length}`);
    if (isAnsValid && text.length > 0 && checkedAnswer) {
      // console.log("submitting question");
      const ansIdx = parseInt(checkedAnswer.value, RADIX);
      const questionObj: TempQuestion = {
        text,
        answers,
        correct_idx: ansIdx,
        subject_id: chosenSubject,
      };
      db.questions.add(questionObj);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center w-100 h-100">
      <Container className="d-flex flex-column p-2 align-items-center w-100">
        <DropdownButton title={SUBJECT_LABELS[chosenSubject]} className="mb-2">
          {renderSubjectChoices()}
        </DropdownButton>
        <div className="d-flex flex-row">
          <Button
            size="lg"
            onClick={submitQuestion}
            variant="dark"
            className="me-2">
            Submit Question
          </Button>
          <Button size="lg" variant="danger" onClick={reset}>
            Reset Question
          </Button>
        </div>
        <h1 className="text-start w-100">Question Main-Body Editor:</h1>
      </Container>
      <Container className="border p-2 mb-2">
        <Editor editorState={editorState} onChange={setEditorState} />
      </Container>
      <Container className="problem-output">
        <h1 className="text-start w-100">Question Main-Body Output:</h1>
        <Markdown>{editorState.getCurrentContent().getPlainText()}</Markdown>
      </Container>
      <Container>{renderAnswerOptions()}</Container>
      <Container>
        <Button size="lg" onClick={addAnswer}>
          Add Answer
        </Button>
      </Container>
    </div>
  );
}

export default MakeQuestion;

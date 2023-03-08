/**
 * Renders the page for reviewing current WIP Questions
 * Once review is done, can be sent to server for adoption or delete
 */

import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { db } from "../db";
import Question from "./Question";
import { TempAnswer, TempQuestion } from "../assets/util";

// MY-API-KEY IS THE KEY

function Questions() {
  const questions = useLiveQuery(() => db.questions.toArray());
  const [questionMode, setQuestionMode] = useState(false);
  const [desc, setDesc] = useState("");
  const [answers, setAnswers] = useState<TempAnswer[]>([]);
  const [answerIdx, setAnswerIdx] = useState<number | null>(null);
  const [subjectIdx, setSubjectIdx] = useState<number | null>(null);

  /**
   * Sets the question state to demo the selected question
   * @param {TempQuestion} - The WIP Question to use
   */
  const setQuestion = (question: TempQuestion): void => {
    setDesc(question.text);
    setAnswers(question.answers);
    setAnswerIdx(question.correct_idx);
    setSubjectIdx(question.subject_id);
    setQuestionMode(true);
  };

  /**
   * Removes the question state to end the demo of the prev selected question
   */
  const resetQuestion = () => {
    setDesc("");
    setAnswers([]);
    setAnswerIdx(null);
    setSubjectIdx(null);
    setQuestionMode(false);
  };

  /**
   * Removes a potential question from the list of saved potential questions
   */
  const removeQuestion = async (idx: number) => {
    await db.questions.delete(idx);
  };

  /**
   * Makes a POST request to the server to submit a new question
   * @param {TempQuestion} question - The question to add
   */
  const submitQuestion = (question: TempQuestion) => {
    // console.log(JSON.stringify(question.answers));
    // console.log(JSON.parse(JSON.stringify(question.answers)));
    const apiKey = window.localStorage.getItem("MY-API-KEY");
    if (apiKey) {
      const bodyData = new FormData();
      bodyData.append("answer_idx", question.correct_idx.toString());
      bodyData.append("subject_id", question.subject_id.toString());
      bodyData.append("text", question.text);
      bodyData.append("answers", JSON.stringify(question.answers));
      bodyData.append("key", apiKey);
      // fetch("api/question", { method: 'POST', body: bodyData });
      fetch("http://localhost:3001/admin/api/question", {
        method: "POST",
        body: bodyData,
      });
    }
  };

  /**
   * Renders all of the WIP Questions, each as a row
   */
  const renderRows = () => {
    if (questions) {
      return questions.map((question) => {
        // At this point, each question WILL have an ID since it is auto given
        // By Dexie
        return (
          <tr key={question.id}>
            <td>{question.id}</td>
            <td>
              <Button variant="primary" onClick={() => setQuestion(question)}>
                Try Question
              </Button>
            </td>
            <td>
              <Button
                variant="danger"
                onClick={() =>
                  removeQuestion(question.id !== undefined ? question.id : -1)
                }>
                Delete
              </Button>
            </td>
            <td>
              <Button
                variant="success"
                onClick={() => submitQuestion(question)}>
                Submit
              </Button>
            </td>
          </tr>
        );
      });
    }
    return null;
  };

  /**
   * Renders the table containing all of the WIP Questions as rows
   */
  const renderTable = () => {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Try Question</th>
            <th>Delete</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </Table>
    );
  };

  const renderQuestionMode = () => {
    return subjectIdx !== null && answerIdx !== null ? (
      <Question
        subIdx={subjectIdx}
        ansIdx={answerIdx}
        possibleAns={answers}
        content={desc}
        endDemo={resetQuestion}
      />
    ) : null;
  };

  return !questionMode ? renderTable() : renderQuestionMode();
}

export default Questions;

/**
 * Handles the logic for requesting a question to back-end
 * Once request is completed, starts question-timer for student
 */

import { useState, useEffect } from "react";
import { Answer, Question } from "../assets/util";

const useQuestion = (selectedSubjects: number[], reset: () => void) => {
  const [question, setQuestion] = useState<Question | null>(null);

  // Makes request for a new question
  const makeRequest = async () => {
    // Creates the query parameters using user-selected-subjects
    const chaptersQuery = selectedSubjects.reduce(
      (accu, curr, idx) =>
        `${accu}${curr}${
          idx !== selectedSubjects.length - 1 ? "&sub_id=" : ""
        }`,
      "?sub_id="
    );
    const URL = `http://localhost:3001/client/api/question${chaptersQuery}`;
    const res = await fetch(URL);
    const data = await res.json();
    const answers: Answer[] = data.answers.map(
      ({
        AnswerId,
        qid,
        answer_text,
      }: {
        AnswerId: number;
        qid: number;
        answer_text: string;
      }) => {
        return { aid: AnswerId, qid, text: answer_text };
      }
    );
    setQuestion({
      id: data.QuestionID,
      text: data.question_text,
      correctIdx: data.correct_idx,
      subjectId: data.subject_id,
      answers,
    });
    reset();
  };

  useEffect(() => {
    makeRequest();
  }, []);

  return [question, makeRequest] as const;
};

export default useQuestion;

/**
 * File for reused interfaces
 */

// interface for Answer objects
export interface Answer {
  // unique ID
  id: number;
  // the text for the answer-choice
  text: string;
}

// interface for Question objects
export interface Question {
  // the unique ID of the question
  id: number;
  // the text of the question
  text: string;
  // the index of the correct answer
  correctIdx: number;
  // the ID of the subject the question belongs to
  subjectId: number;
  // the list of answer-choices for the question, only 1 of them is correct
  answers: Answer[];
}

// interface for Report objects
// Report is the result of instance when user was practicing a problem
export interface Report {
  // the unique ID of the report
  id?: number;
  // the ID of the question that was practiced
  qid?: number;
  // TRUE if user got the question correct, FALSE otherwise
  correct: boolean;
  // the ID of the subject the question the user practiced belongs to
  subject_id: number;
  // the length of time the user took to answer the question
  time: number;
}

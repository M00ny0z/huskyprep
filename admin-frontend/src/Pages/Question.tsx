import { useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { SUBJECT_LABELS } from "../assets/constants";
import Markdown from "../Components/Markdown";
import Answer from "../Components/Answer";
import { TempAnswer, getLetterFromIdx } from "../assets/util";

// PROPS:
//    subIdx
//    ansIdx
//    possibleAns
//    content
interface QuestionProps {
  // The index of the subject the question belongs to
  subIdx: number;
  // The index of the correct answer for the question
  ansIdx: number;
  // The list of possible answers for the question
  possibleAns: TempAnswer[];
  // The main-body-text
  content: string;
  // Callback for ending question demo
  endDemo: () => void;
}

function Question({
  subIdx,
  ansIdx,
  possibleAns,
  content,
  endDemo,
}: QuestionProps) {
  // let len = 0;
  // let timer = setInterval(() => {
  //   len += 1;
  // }, 1000);
  const [option, setOption] = useState<number | null>(null);

  const makeSelection = (idx: number) => {
    // clearInterval(timer);
    setOption(idx);
    //  const newReport = {
    //    correct: idx === ansIdx,
    //    subject_id: subIdx,
    //    time: len,
    //  };
    //  console.log(newReport);
    //  console.log(idx);
    // db.reports.add(newReport);
  };

  const renderAns = () => {
    return possibleAns.map((ans, idx) => (
      <Answer
        text={ans.text}
        key={`${ans}-${idx + 1}`}
        idx={idx}
        answerIdx={ansIdx}
        option={option}
        makeChoice={makeSelection}
      />
    ));
  };

  const reset = () => {
    setOption(null);
    endDemo();
  };

  return (
    <div>
      <Container className="d-flex flex-column align-items-center border rounded border-3 p-4 m-3 problem-output">
        <h4 className="text-center bg-dark text-white border rounded w-100 p-3">{`${SUBJECT_LABELS[subIdx]}:`}</h4>
        <Markdown>{content}</Markdown>
      </Container>
      <Container>
        <ListGroup>{renderAns()}</ListGroup>
      </Container>
      <div className="d-flex flex-row justify-content-center mt-2">
        <Button size="lg" className="next-button" onClick={reset}>
          Return
        </Button>
      </div>
    </div>
  );
}

export default Question;

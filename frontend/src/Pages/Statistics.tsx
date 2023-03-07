/**
 * Renders the practice statistics page
 * Data is retrieved from local Dexie DB
 */

import { useLiveQuery } from "dexie-react-hooks";
import Container from "react-bootstrap/Container";
import BarChart from "../Components/BarChart";
import PieChart from "../Components/PieChart";
import { SUBJECT_LABELS, Subject } from "../assets/constants";
import { db } from "../db";

interface SubjectStatistics {
  num: number;
  time_sum: number;
  time_list: number[];
  num_correct: number;
  num_wrong: number;
  percent: number;
  average_time: number;
}

function Statistics() {
  const allReports = useLiveQuery(() => db.reports.toArray());
  //   const [subjectChoice, setSubjectChoice] = useState(SUBJECTS_IDX[0]);
  // console.log(allReports);

  // renders the subject dropdown choice button to see the stats of other subjects
  //   const renderSubjectDropdown = () => {
  //     const subjectChoices = SUBJECTS_IDX.map((subject, idx) => (
  //       <Dropdown.Item
  //         href={`#/action-${idx}`}
  //         onClick={() => setSubjectChoice(subject)}
  //         key={subject}>
  //         {subject}
  //       </Dropdown.Item>
  //     ));
  //     const tooltip = (
  //       <Tooltip>
  //         <strong>Change me to see the stats of other chapters</strong>
  //       </Tooltip>
  //     );
  //     return (
  //       <OverlayTrigger placement="left" overlay={tooltip}>
  //         <DropdownButton title={subjectChoice} variant="danger">
  //           {subjectChoices}
  //         </DropdownButton>
  //       </OverlayTrigger>
  //     );
  //   };

  const createReportsMap = () => {
    // console.log("calculating reports");
    //  const subjects = Object.keys(SUBJECTS);
    // Creates a map of
    const reportMap: Record<string, SubjectStatistics> = SUBJECT_LABELS.reduce(
      (accu, subject: string) => {
        return {
          ...accu,
          [subject]: {
            num: 0,
            time_sum: 0,
            time_list: [],
            num_correct: 0,
            num_wrong: 0,
            percent: 0,
            average_time: 0,
          },
        };
        // accu[subject] = {
        //   num: 0,
        //   time_sum: 0,
        //   time_list: [],
        //   num_correct: 0,
        //   num_wrong: 0,
        // };
        // return accu;
      },
      {}
    ) as Record<Subject, SubjectStatistics>;

    if (allReports === undefined) {
      return [[], [], [], []];
      // return [reportMap, [], [], [], []];
    }

    allReports.forEach((report) => {
      const name = SUBJECT_LABELS[report.subject_id];
      reportMap[name].num += 1;
      reportMap[name].time_sum += report.time;
      reportMap[name].num_correct = report.correct
        ? reportMap[name].num_correct + 1
        : reportMap[name].num_correct;
    });

    SUBJECT_LABELS.forEach((subject) => {
      reportMap[subject].num_wrong =
        reportMap[subject].num - reportMap[subject].num_correct;
      reportMap[subject].percent =
        (reportMap[subject].num_correct / reportMap[subject].num) * 100;
      reportMap[subject].average_time =
        reportMap[subject].time_sum / 60 / reportMap[subject].num;
    });

    // for (const report of allReports) {
    //   const name = SUBJECT_LABELS[parseInt(report.subject_id)];
    //   reportMap[name].num = reportMap[name].num + 1;
    //   reportMap[name].time_sum = reportMap[name].time_sum + report.time;
    //   reportMap[name].num_correct = report.correct
    //     ? reportMap[name].num_correct + 1
    //     : reportMap[name].num_correct;
    // }
    // for (const subject of SUBJECTS_IDX) {
    //   reportMap[subject].num_wrong =
    //     reportMap[subject].num - reportMap[subject].num_correct;
    //   reportMap[subject].percent =
    //     (reportMap[subject].num_correct / reportMap[subject].num) * 100;
    //   reportMap[subject].average_time =
    //     reportMap[subject].time_sum / 60 / reportMap[subject].num;
    // }
    const piePercentPracticed: number[] = [];
    const barTimeSpent: number[] = [];
    const barPercent: number[] = [];
    const barAvgTimeSpent: number[] = [];

    SUBJECT_LABELS.forEach((subject) => {
      piePercentPracticed.push(reportMap[subject].num);
      barTimeSpent.push(reportMap[subject].time_sum / 60);
      barPercent.push(reportMap[subject].percent);
      barAvgTimeSpent.push(reportMap[subject].average_time);
    });
    // for (const subject of SUBJECTS_IDX) {
    //   piePercentPracticed.push(reportMap[subject].num);
    //   barTimeSpent.push(reportMap[subject].time_sum / 60);
    //   barPercent.push(reportMap[subject].percent);
    //   barAvgTimeSpent.push(reportMap[subject].average_time);
    // }

    // return [
    //   reportMap,
    //   piePercentPracticed,
    //   barTimeSpent,
    //   barPercent,
    //   barAvgTimeSpent,
    // ];

    return [piePercentPracticed, barTimeSpent, barPercent, barAvgTimeSpent];
  };

  const [piePercentPracticed, barTimeSpent, barPercent, barAvgTimeSpent] =
    createReportsMap();

  if (allReports === undefined || allReports.length === 0) {
    return (
      <div className="d-flex flex-column justify-content-center">
        <h1 className="text-center">
          Your usage statistics will show up here once you start practicing!
        </h1>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column justify-content-center">
      <h1 className="text-center">Practice Statistics</h1>
      <hr />
      <h4 className="text-center">Overall Stats</h4>
      <Container className="w-50">
        <PieChart data={piePercentPracticed} />
        <hr />
      </Container>
      <Container>
        <BarChart
          data={barTimeSpent}
          bottomLabel="Time Spent (min)"
          topLabel="Time Spent per Chapter"
        />
        <hr />
      </Container>
      <Container>
        <BarChart
          data={barPercent}
          bottomLabel="Percentage"
          topLabel="Percent Correct per Chapter"
        />
        <hr />
      </Container>
      <Container>
        <BarChart
          data={barAvgTimeSpent}
          bottomLabel="Avg. Time Spent (min)"
          topLabel="Average Time Spent on a Question per Chapter"
        />
      </Container>
    </div>
  );
}

export default Statistics;

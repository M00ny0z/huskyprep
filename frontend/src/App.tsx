/**
 * App component for overall project
 * Can render all possible routes and always renders navbar
 */

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styling/App.scss";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { db } from "./db";
import "draft-js/dist/Draft.css";

import Nav from "./Components/Navbar";

import Practice from "./Pages/Practice";
import Statistics from "./Pages/Statistics";

// Used for initializing local dexie DB with fake data
function initFakeData() {
  const CHAPTERS = 7;
  const MAX_LEN = 300;
  const getRandomInt = (min: number, max: number) => {
    const minCeil: number = Math.ceil(min);
    const maxFloor: number = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil);
  };

  if (window.localStorage.getItem("FINISHED") == null) {
    for (let i = 0; i < 500; i += 1) {
      const result = Math.random() < 0.5;
      const chapter: number = Math.floor(Math.random() * CHAPTERS);
      const len: number = getRandomInt(120, MAX_LEN);
      const newReport = {
        correct: result,
        subject_id: chapter,
        time: len,
      } as const;
      db.reports.add(newReport);
      console.log(db.reports);
    }
    window.localStorage.setItem("FINISHED", "true");
  }
}

function App() {
  return (
    <main className="h-100">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Practice />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;

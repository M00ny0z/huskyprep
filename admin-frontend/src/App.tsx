/**
 * App component for overall project
 * Conditionally renders all possible routes and always renders navbar
 */

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "draft-js/dist/Draft.css";
import "./assets/styling/App.scss";

import Nav from "./Components/Navbar";

import MakeQuestion from "./Pages/MakeQuestion";
import Questions from "./Pages/Questions";

function App() {
  return (
    <main className="h-100">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<MakeQuestion />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;

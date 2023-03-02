import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./assets/css/App.css";
import { ExampleObj, Example } from "./components/Example";

function App() {
  const [count, setCount] = useState(0);
  const names: string[] = ["Manny", "Jasper", "Alex"];
  const makeNewCount = (input: number) => {
    return input + 1;
  };

  const renderNames = () => {
    return names.map((name) => <div>{name.toLowerCase()}</div>);
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={() => setCount(makeNewCount(count))}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Example />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>{renderNames()}</div>
    </div>
  );
}

export default App;

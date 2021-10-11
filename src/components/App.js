import Main from "../layout/Main";
import {BrowserRouter} from 'react-router-dom';
import styles from '../App.css';

import socket from "./Socket";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </div>
  );
}

export default App;

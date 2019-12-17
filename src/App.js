import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChegTrin from './ChegTrin';
import Classes from "./classes/Classes";
import Questions from "./questions/Questions";
import { BrowserRouter, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <Route exact path="/" component={Classes}/>
        <Route exact path="/classes" component={Classes}/>
        <Route path="/classes/:classId" component={Questions}/>
    </BrowserRouter>
  );
}

export default App;

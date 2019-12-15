import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChegTrin from './ChegTrin';
import Classes from "./classes/Classes";
import { BrowserRouter, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Classes}/>
    </BrowserRouter>
  );
}

export default App;

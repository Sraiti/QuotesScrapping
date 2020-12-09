import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import "./App.css";
import Quotes from "./components/Quotes";
import Author from "./components/author";
function App() {
  return (
    <React.Fragment>
      <div className="navbar">
        <div className="container">
          <h1>Daily Dose of Wisdom</h1>
        </div>
      </div>
      <Switch>
        <Route path="/Quotes" exact component={Quotes} />
        <Route path="/author/:author" exact component={Author} />
        <Redirect from="/" to="/Quotes" exact />
      </Switch>
    </React.Fragment>
  );
}

export default App;

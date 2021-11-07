import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TestPage from "./TestPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <TestPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

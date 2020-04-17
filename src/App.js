import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Landing from "./containers/LandingPage/index";
import ProfilePage from "./containers/ProfilePage";
import BrowsePage from "./containers/BrowsePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboards" component={BrowsePage} />
        <Route exact path="/dashboards/:id/:page" component={ProfilePage} />
      </Switch>
    </Router>
  );
}

export default App;

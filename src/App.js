import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Landing from "./containers/LandingPage/index";
import DashboardPage from "./containers/DashboardPage";
import BrowsePage from "./containers/BrowsePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/browse/:search" component={BrowsePage} />
        <Route exact path="/dashboards/:id/:page" component={DashboardPage} />
        <Route
          exact
          path="/dashboards/:id/:page/:subpage"
          component={DashboardPage}
        />
      </Switch>
    </Router>
  );
}

export default App;

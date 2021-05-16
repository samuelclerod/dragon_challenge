import { Route, Switch } from "react-router";
import { Dashboard } from "../pages/Dashboard";
import { DragonDetails } from "../pages/DragonDetails";
import { Login } from "../pages/Login";

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/dragon/details" component={DragonDetails} />
  </Switch>
);
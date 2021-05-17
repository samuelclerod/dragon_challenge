import { Switch } from "react-router";
import { Dashboard } from "../pages/Dashboard";
import { DragonDetails } from "../pages/DragonDetails";
import { Login } from "../pages/Login";

import { Route } from './Route';

export const Routes = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/dragons" component={Dashboard} isPrivate />
    <Route path="/dragon/details" component={DragonDetails} isPrivate />
  </Switch>
);
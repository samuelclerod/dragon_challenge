import { Switch } from "react-router";
import { Dragons } from "../pages/Dragons";
import { DragonDetails } from "../pages/DragonDetails";
import { Login } from "../pages/Login";

import { Route } from './Route';

export const Routes = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/dragons" exact component={Dragons} isPrivate />
    <Route path="/dragons/:id" exact component={DragonDetails} isPrivate />
  </Switch>
);
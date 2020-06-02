import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import DashBoard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";



const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
          <PrivateRoute path="/user/dashboard" exact component={DashBoard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Routes;

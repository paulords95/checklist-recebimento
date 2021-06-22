import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoginPage from "./pages/login/Login";
import Checklist from "./pages/checklist/checklist";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await fetch("http://192.168.2.69:1106/auth/is-verify", {
        method: "GET",
        headers: {
          Token: localStorage.token.toString(),
        },
      });
      const parseRes = await response.json();
      console.log(parseRes);
      parseRes ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    console.log(localStorage.token);
    isAuth();
  }, []);

  return (
    <Fragment>
      <Router>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) =>
                !isAuthenticated ? (
                  <LoginPage {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/checklist" />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <LoginPage {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/checklist" />
                )
              }
            />
            <Route
              exact
              path="/checklist"
              render={(props) =>
                isAuthenticated ? (
                  <Checklist {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;

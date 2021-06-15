import React, { Fragment, useState, useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoginPage from "./pages/login/Login";
import Checklist from "./pages/checklist/checklist";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await fetch("http://192.168.2.39:1106/auth/is-verify", {
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
          <Backdrop
            className={classes.backdrop}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
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

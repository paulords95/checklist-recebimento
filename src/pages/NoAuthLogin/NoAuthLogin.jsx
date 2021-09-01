import React, { Fragment, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import "./noauthlogin.css";

import ENDPOINT from "../../utils/endpoint";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Quimtia Brasil - {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function LoginPage({ setAuth }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState([]);
  const [curentUser, setCurrentUser] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setCurrentUser(e.target.value);
  };

  const HandleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${ENDPOINT.ENDPOINT}/simple-auth/login-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(setCurrentUser),
      }
    );

    const parseRes = await response.json();
    if (parseRes.token) {
      localStorage.setItem("nomUsu", curentUser);
      localStorage.setItem("token", parseRes.token);
      setAuth(true);
    }
  };

  const fetchUsers = () => {
    fetch(`${ENDPOINT.ENDPOINT}/simple-auth/get-users`)
      .then(async (res) => {
        setUsers(await res.json());
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchUsers();
    return () => {
      setUsers([]);
    };
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Fragment>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Usuário</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className="name-select"
              value={curentUser}
              onChange={onChange}
            >
              {users.map((user) => {
                return (
                  <MenuItem key={user.USU_CODERP} value={user.USU_NOMUSU}>
                    {user.USU_NOMUSU}
                  </MenuItem>
                );
              })}
            </Select>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={(e) => {
                if (curentUser.length > 1) {
                  HandleLogin(e);
                } else {
                  toast.error("Selecione um usuário");
                }
              }}
              className={classes.submit}
            >
              Entrar
            </Button>
          </FormControl>
        </Fragment>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

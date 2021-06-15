import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { LocalConvenienceStoreOutlined } from "@material-ui/icons";

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
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    user: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState({
    show: false,
    msg: "",
  });

  const { user, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const HandleLogin = async (e) => {
    e.preventDefault();
    if (inputs.user === "" || inputs.passsword === "") {
      setShowAlert({
        show: true,
        msg: "Usuário ou senha não informados",
      });
      return;
    } else {
      setShowAlert({
        show: false,
        msg: "",
      });
    }
    try {
      const body = { user, password };
      const response = await fetch("http://192.168.2.39:1106/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes == "Credenciais inválidas") {
        setShowAlert({
          show: true,
          msg: "Credenciais inválidas",
        });
      }
      if (parseRes.token) {
        localStorage.setItem("codUsu", parseRes.codUsu);
        localStorage.setItem("nomCom", parseRes.nomCom);
        localStorage.setItem("nomUsu", parseRes.nomUsu);
        localStorage.setItem("token", parseRes.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="outlined-required"
            label="Usuário"
            name="user"
            autoFocus
            onChange={(e) => onChange(e)}
            onInput={(e) => onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            onChange={(e) => onChange(e)}
            onInput={(e) => onChange(e)}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={HandleLogin}
            className={classes.submit}
          >
            Entrar
          </Button>
        </form>
        {showAlert.show ? (
          <Alert variant="filled" severity="error">
            {showAlert.msg}
          </Alert>
        ) : (
          ""
        )}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

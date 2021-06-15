import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import FormQuestion from "../components/question";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

import Checklist from "../checklist/checklist";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    paddingBottom: 35,
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    paddingBottom: 35,
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const DialogComponent = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [question4, setQuestion4] = useState("");
  const [question5, setQuestion5] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    title: "",
    msg: "",
    strong: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (e) => {
    if (question1 === "") {
      setShowErr(true);
      setErrorMsg({
        strong: "1",
      });
    } else if (question2 === "") {
      setShowErr(true);
      setErrorMsg({
        strong: "2",
      });
    } else if (question3 === "") {
      setShowErr(true);
      setErrorMsg({
        strong: "3",
      });
    } else if (question4 === "") {
      setShowErr(true);
      setErrorMsg({
        strong: "4",
      });
    } else if (question5 === "") {
      setShowErr(true);
      setErrorMsg({
        strong: "5",
      });
    } else {
      setShowErr(false);
      setOpen(false);
      setErrorMsg({
        strong: "",
      });
      console.log(
        question1 +
          "\n" +
          question2 +
          "\n" +
          question3 +
          "\n" +
          question4 +
          "\n" +
          question5
      );
    }
  };

  return (
    <div
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "auto",
      }}
    >
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => {
            setOpen(false);
          }}
        >
          Conferência geral do produto recebido e das condições do veículo
          transportador
        </DialogTitle>
        <div style={{ paddingBottom: 30, height: 20 }}>
          {showErr ? (
            <Alert severity="error">
              A pergunta <strong>{errorMsg.strong}</strong> não foi respondida
            </Alert>
          ) : (
            ""
          )}
        </div>
        <DialogContent dividers>
          <div style={{}}>
            <FormQuestion
              question=" 1. Os lacres se encontram íntegros, sem evidências de violações e
        correspondem ao informado na Nota Fiscal?"
              handleChange={(e) => setQuestion1(e.target.value)}
              value={question1}
            />
            <FormQuestion
              question=" 2. Existem evidências de focos de umidade e presença de sujeira na corroceria do veículo ou interior do container?"
              handleChange={(e) => setQuestion2(e.target.value)}
              value={question2}
            />
            <FormQuestion
              question=" 3. Existem evidências que o veículo transportou animais, dejetos de animais ou de sub-produtos de origem animal?"
              handleChange={(e) => setQuestion3(e.target.value)}
              value={question3}
            />
            <FormQuestion
              question=" 4. Existem evidências que o veículo transportou pesticidas. herbicidas, inseticidas ou outras substâncias químicas?"
              handleChange={(e) => setQuestion4(e.target.value)}
              value={question4}
            />
            <FormQuestion
              question=" 5. Chovia no momento do descarregamento?"
              handleChange={(e) => setQuestion5(e.target.value)}
              value={question5}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogComponent;

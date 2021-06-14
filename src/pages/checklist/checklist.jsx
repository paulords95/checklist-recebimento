import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FormQuestion from "../components/question";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

import "./checklist.css";

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

const CheckList = () => {
  const classes = useStyles();
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

  return (
    <div className="checklist-wrap">
      <div className={classes.root}>
        Conferência geral do produto recebido e das condições do veículo
        transportador
      </div>
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
      <div style={{ paddingBottom: 30, height: 70 }}>
        {showErr ? (
          <Alert severity="error">
            A pergunta <strong>{errorMsg.strong}</strong> não foi respondida
          </Alert>
        ) : (
          ""
        )}
      </div>
      <Button
        type="submit"
        width="50px"
        variant="contained"
        color="primary"
        onClick={(e) => {
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
        }}
      >
        Salvar
      </Button>
    </div>
  );
};

export default CheckList;

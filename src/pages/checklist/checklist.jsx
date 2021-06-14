import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FormQuestion from "../components/question";

import "./checklist.css";

const CheckList = () => {
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [question4, setQuestion4] = useState("");
  const [question5, setQuestion5] = useState("");

  return (
    <div className="checklist-wrap">
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={(e) => {
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
        }}
      >
        Salvar
      </Button>
    </div>
  );
};

export default CheckList;

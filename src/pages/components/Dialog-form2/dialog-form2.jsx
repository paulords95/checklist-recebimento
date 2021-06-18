import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import "./dialog-form2.css";

import RadioBtn from "../RadioBtn/RadioBtn";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function DialogForm2(props) {
  const classes = useStyles();
  const [answers1, setAnswers1] = useState();
  const [answers2, setAnswers2] = useState();
  const [answers3, setAnswers3] = useState();
  const [answers4, setAnswers4] = useState();
  const [answers5, setAnswers5] = useState();
  const [enableForm, setEnableForm] = useState(true);
  const [post, setPost] = useState(false);
  const [item, setItem] = useState({
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    answer5: "",
  });

  useEffect(() => {
    setItem({
      answer1: props.seqRec.quesOne,
      answer2: props.seqRec.quesTwo,
      answer3: props.seqRec.quesThree,
      answer4: props.seqRec.quesFour,
      answer5: props.seqRec.quesFive,
    });
    if (
      props.seqRec.quesOne > 0 &&
      props.seqRec.quesTwo > 0 &&
      props.seqRec.quesThree > 0 &&
      props.seqRec.quesFour > 0
    ) {
      setEnableForm(false);
    }
  }, [props.seqRec]);

  const handlePost = async (seqRec, form1, form2, form3, form4, form5) => {
    try {
      const body = { seqRec, form1, form2, form3, form4, form5 };
      const response = await fetch(
        "http://192.168.2.39:1106/post/vehicle-and-product/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Token: localStorage.token.toString(),
          },
          body: JSON.stringify(body),
        }
      );
      const parseRes = await response.json();
      if (parseRes) {
        setPost(true);
      } else {
        toast.error(parseRes);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Dialog open={props.isOpen2} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Conferência geral do produto recebido e condições do veículo condutor
          | Nº Recebimento: {props.seqRec.codRec}
        </DialogTitle>
        {!enableForm ? (
          <Alert severity="warning">
            O formulário para o recebimento nº {props.seqRec.codRec} já foi
            preenchido!
          </Alert>
        ) : (
          ""
        )}
        {post ? (
          <Alert severity="warning">
            O formulário para o recebimento nº {props.seqRec.codRec} foi salvo
            com sucesso!
          </Alert>
        ) : (
          <>
            <div>
              <DialogContent>
                <DialogContentText>
                  1. Os lacres encontram-se íntegros, sem evidências de
                  violações e correspondem ao informado na nota fiscal?
                </DialogContentText>
                <RadioBtn
                  input={
                    <form className="radio-form2">
                      <div>
                        <input
                          type="radio"
                          id="Sim"
                          value="Sim"
                          disabled={item.answer1 > 0 ? true : false}
                          name="clean"
                          onChange={() => {
                            setAnswers1(1);
                          }}
                        />
                        <label htmlFor="Sim">Sim</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="Não"
                          value="Não"
                          disabled={item.answer1 > 0 ? true : false}
                          name="clean"
                          onChange={() => {
                            setAnswers1(2);
                          }}
                        />
                        <label htmlFor="Não">Não</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="Não aplicável"
                          value="Não aplicável"
                          name="clean"
                          disabled={item.answer1 > 0 ? true : false}
                          onChange={() => {
                            setAnswers1(3);
                          }}
                        />
                        <label htmlFor="Não">Não aplicável</label>
                      </div>
                    </form>
                  }
                />
              </DialogContent>
            </div>
            <div>
              <DialogContent>
                <DialogContentText>
                  2. Existem evidências de focos de umidade e presença de
                  sujeira na carroceria do veículo ou interior do container?
                </DialogContentText>
                <RadioBtn
                  input={
                    <form className="radio-form2">
                      <div>
                        <input
                          type="radio"
                          id="Sim"
                          value="Sim"
                          disabled={item.answer2 > 0 ? true : false}
                          name="clean"
                          onChange={() => {
                            setAnswers2(1);
                          }}
                        />
                        <label htmlFor="Sim">Sim</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="Não"
                          value="Não"
                          disabled={item.answer2 > 0 ? true : false}
                          name="clean"
                          onChange={() => {
                            setAnswers2(2);
                          }}
                        />
                        <label htmlFor="Não">Não</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="Não aplicável"
                          value="Não aplicável"
                          disabled={item.answer2 > 0 ? true : false}
                          name="clean"
                          onChange={() => {
                            setAnswers2(3);
                          }}
                        />
                        <label htmlFor="Não">Não aplicável</label>
                      </div>
                    </form>
                  }
                />
              </DialogContent>
            </div>
            <div>
              <DialogContent>
                <DialogContentText>
                  3. Existem evidências de que o veículo foi utilizado para
                  transporte de animais, dejetos de animais ou de subprodutos de
                  origem animal?
                </DialogContentText>
                <RadioBtn
                  input={
                    <form className="radio-form2">
                      <div>
                        <input
                          type="radio"
                          id="Sim"
                          value="Sim"
                          disabled={item.answer3 > 0 ? true : false}
                          name="clean"
                          onChange={() => {
                            setAnswers3(1);
                          }}
                        />
                        <label htmlFor="Sim">Sim</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="Não"
                          value="Não"
                          name="clean"
                          disabled={item.answer3 > 0 ? true : false}
                          onChange={() => {
                            setAnswers3(2);
                          }}
                        />
                        <label htmlFor="Não">Não</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="Não aplicável"
                          value="Não aplicável"
                          name="clean"
                          disabled={item.answer3 > 0 ? true : false}
                          onChange={() => {
                            setAnswers3(3);
                          }}
                        />
                        <label htmlFor="Não">Não aplicável</label>
                      </div>
                    </form>
                  }
                />
              </DialogContent>
            </div>

            <div>
              <DialogContent>
                <DialogContentText>
                  4. Existem evidências de que o veículo transportou pesticidas,
                  herbicidas, inseticidas ou outras substâncias químicas com
                  potencial de contaminação?
                </DialogContentText>
                <RadioBtn
                  input={
                    <form className="radio-form2">
                      <div>
                        <input
                          type="radio"
                          id="Sim"
                          value="Sim"
                          disabled={item.answer4 > 0 ? true : false}
                          name="clean"
                          onChange={() => {
                            setAnswers4(1);
                          }}
                        />
                        <label htmlFor="Sim">Sim</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="Não"
                          value="Não"
                          name="clean"
                          disabled={item.answer4 > 0 ? true : false}
                          onChange={() => {
                            setAnswers4(2);
                          }}
                        />
                        <label htmlFor="Não">Não</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="Não aplicável"
                          value="Não aplicável"
                          disabled={item.answer4 > 0 ? true : false}
                          name="clean"
                          onChange={() => {
                            setAnswers4(3);
                          }}
                        />
                        <label htmlFor="Não">Não aplicável</label>
                      </div>
                    </form>
                  }
                />
              </DialogContent>
            </div>
            <div style={{ paddingBottom: 10 }}>
              <DialogContent>
                <DialogContentText>
                  5. Estava chovendo no momento do carregamento?
                </DialogContentText>
                <RadioBtn
                  input={
                    <form className="radio-form2">
                      <div>
                        <input
                          type="radio"
                          id="Sim"
                          value="Sim"
                          disabled={item.answer5 > 0 ? true : false}
                          name="clean"
                          onChange={() => {
                            setAnswers5(1);
                          }}
                        />
                        <label htmlFor="Sim">Sim</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="Não"
                          value="Não"
                          name="clean"
                          disabled={item.answer5 > 0 ? true : false}
                          onChange={() => {
                            setAnswers5(2);
                          }}
                        />
                        <label htmlFor="Não">Não</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="Não aplicável"
                          value="Não aplicável"
                          disabled={item.answer5 > 0 ? true : false}
                          name="clean"
                          onChange={() => {
                            setAnswers5(3);
                          }}
                        />
                        <label htmlFor="Não">Não aplicável</label>
                      </div>
                    </form>
                  }
                />
              </DialogContent>
            </div>
          </>
        )}
        <div className="save-btn">
          <DialogActions>
            {post || !enableForm ? (
              ""
            ) : (
              <Button onClick={props.handleClose} color="primary">
                Cancelar
              </Button>
            )}

            <Button
              color="primary"
              onClick={() => {
                if (!enableForm || post) {
                  props.handleClose();

                  return;
                }
                console.log(item);
                if (
                  answers1 === undefined ||
                  answers2 === undefined ||
                  answers3 === undefined ||
                  answers4 === undefined ||
                  answers5 === undefined
                ) {
                  toast.error(
                    "É necessário responder todas as perguntas para finalizar o formulário!"
                  );
                  return;
                }
                handlePost(
                  props.seqRec.codRec,
                  answers1,
                  answers2,
                  answers3,
                  answers4,
                  answers5
                );
                console.log(answers1, answers2, answers3, answers4, answers5);
                toast.success("Formulário salvo com sucesso!");
              }}
            >
              {post || !enableForm ? "Sair" : "Salvar"}
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

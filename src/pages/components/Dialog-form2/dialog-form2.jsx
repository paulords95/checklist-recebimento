import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";
import Alert from "@material-ui/lab/Alert";

import "./dialog-form2.css";

import ENDPOINT from "../../../utils/endpoint";

import RadioBtn from "../RadioBtn/RadioBtn";

export default function DialogForm2(props) {
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
      answer1: props.seqRec.USU_D5,
      answer2: props.seqRec.USU_D6,
      answer3: props.seqRec.USU_D7,
      answer4: props.seqRec.USU_D8,
      answer5: props.seqRec.USU_D9,
    });
    if (
      props.seqRec.USU_D5 > 0 &&
      props.seqRec.USU_D6 > 0 &&
      props.seqRec.USU_D7 > 0 &&
      props.seqRec.USU_D8 > 0
    ) {
      setEnableForm(false);
    }
  }, [props.seqRec]);

  const handlePost = async (seqRec, form1, form2, form3, form4, form5) => {
    try {
      const body = { seqRec, form1, form2, form3, form4, form5 };
      const response = await fetch(
        `${ENDPOINT.ENDPOINT}/post/vehicle-and-product/`,
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
          Confer??ncia geral do produto recebido e condi????es do ve??culo condutor
          | N?? Recebimento: {props.seqRec.USU_CODREC}
        </DialogTitle>
        {!enableForm ? (
          <Alert severity="warning">
            O formul??rio para o recebimento n?? {props.seqRec.USU_CODREC} j?? foi
            preenchido!
          </Alert>
        ) : (
          ""
        )}
        {post ? (
          <Alert severity="warning">
            O formul??rio para o recebimento n?? {props.seqRec.USU_CODREC} foi
            salvo com sucesso!
          </Alert>
        ) : (
          <>
            <div>
              <DialogContent>
                <DialogContentText>
                  1. Os lacres encontram-se ??ntegros, sem evid??ncias de
                  viola????es e correspondem ao informado na nota fiscal?
                </DialogContentText>
                <RadioBtn
                  input={
                    <form className="radio-form2">
                      <div>
                        <input
                          type="radio"
                          id="Sim1"
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
                          id="N??o2"
                          value="N??o"
                          disabled={item.answer1 > 0 ? true : false}
                          name="clean"
                          onChange={() => {
                            setAnswers1(2);
                          }}
                        />
                        <label htmlFor="N??o">N??o</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="N??o aplic??vel3"
                          value="N??o aplic??vel"
                          name="clean"
                          disabled={item.answer1 > 0 ? true : false}
                          onChange={() => {
                            setAnswers1(3);
                          }}
                        />
                        <label htmlFor="N??o">N??o aplic??vel</label>
                      </div>
                    </form>
                  }
                />
              </DialogContent>
            </div>
            <div>
              <DialogContent>
                <DialogContentText>
                  2. Existem evid??ncias de focos de umidade e presen??a de
                  sujeira na carroceria do ve??culo ou interior do container?
                </DialogContentText>
                <RadioBtn
                  input={
                    <form className="radio-form2">
                      <div>
                        <input
                          type="radio"
                          id="Sim1"
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
                          id="N??o2"
                          value="N??o"
                          disabled={item.answer2 > 0 ? true : false}
                          name="clean"
                          onChange={() => {
                            setAnswers2(2);
                          }}
                        />
                        <label htmlFor="N??o">N??o</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="N??o aplic??vel3"
                          value="N??o aplic??vel"
                          disabled={item.answer2 > 0 ? true : false}
                          name="clean"
                          onChange={() => {
                            setAnswers2(3);
                          }}
                        />
                        <label htmlFor="N??o">N??o aplic??vel</label>
                      </div>
                    </form>
                  }
                />
              </DialogContent>
            </div>
            <div>
              <DialogContent>
                <DialogContentText>
                  3. Existem evid??ncias de que o ve??culo foi utilizado para
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
                          id="N??o"
                          value="N??o"
                          name="clean"
                          disabled={item.answer3 > 0 ? true : false}
                          onChange={() => {
                            setAnswers3(2);
                          }}
                        />
                        <label htmlFor="N??o">N??o</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="N??o aplic??vel"
                          value="N??o aplic??vel"
                          name="clean"
                          disabled={item.answer3 > 0 ? true : false}
                          onChange={() => {
                            setAnswers3(3);
                          }}
                        />
                        <label htmlFor="N??o">N??o aplic??vel</label>
                      </div>
                    </form>
                  }
                />
              </DialogContent>
            </div>

            <div>
              <DialogContent>
                <DialogContentText>
                  4. Existem evid??ncias de que o ve??culo transportou pesticidas,
                  herbicidas, inseticidas ou outras subst??ncias qu??micas com
                  potencial de contamina????o?
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
                          id="N??o"
                          value="N??o"
                          name="clean"
                          disabled={item.answer4 > 0 ? true : false}
                          onChange={() => {
                            setAnswers4(2);
                          }}
                        />
                        <label htmlFor="N??o">N??o</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="N??o aplic??vel"
                          value="N??o aplic??vel"
                          disabled={item.answer4 > 0 ? true : false}
                          name="clean"
                          onChange={() => {
                            setAnswers4(3);
                          }}
                        />
                        <label htmlFor="N??o">N??o aplic??vel</label>
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
                          id="N??o"
                          value="N??o"
                          name="clean"
                          disabled={item.answer5 > 0 ? true : false}
                          onChange={() => {
                            setAnswers5(2);
                          }}
                        />
                        <label htmlFor="N??o">N??o</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="N??o aplic??vel"
                          value="N??o aplic??vel"
                          disabled={item.answer5 > 0 ? true : false}
                          name="clean"
                          onChange={() => {
                            setAnswers5(3);
                          }}
                        />
                        <label htmlFor="N??o">N??o aplic??vel</label>
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
                if (
                  answers1 === undefined ||
                  answers2 === undefined ||
                  answers3 === undefined ||
                  answers4 === undefined ||
                  answers5 === undefined
                ) {
                  toast.error(
                    "?? necess??rio responder todas as perguntas para finalizar o formul??rio!"
                  );
                  return;
                }
                handlePost(
                  props.seqRec.USU_CODREC,
                  answers1,
                  answers2,
                  answers3,
                  answers4,
                  answers5
                );
                toast.success("Formul??rio salvo com sucesso!");
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

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
  const [item, setItem] = useState({
    tipVei: "",
    tipCar: "",
    posLac: "",
    nroLac: "",
    lpzVei: "",
  });

  useEffect(() => {
    console.log(props.seqRec);
  }, [props.seqRec]);

  return (
    <div>
      <Dialog open={props.isOpen2} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Conferência geral do produto recebido e condições do veículo condutor
          | Nº Recebimento: {props.seqRec.codRec}
        </DialogTitle>
        <div>
          <DialogContent>
            <DialogContentText>
              Os lacres encontram-se íntegros, sem evidências de violações e
              correspondem ao informado na nota fiscal?
            </DialogContentText>
            <RadioBtn
              input={
                <form className="radio-form2">
                  <div>
                    <input
                      type="radio"
                      id="Sim"
                      value="Sim"
                      name="clean"
                      onChange={() => {}}
                    />
                    <label htmlFor="Sim">Sim</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Não"
                      value="Não"
                      name="clean"
                      onChange={() => {}}
                    />
                    <label htmlFor="Não">Não</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Não aplicável"
                      value="Não aplicável"
                      name="clean"
                      onChange={() => {}}
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
              Existem evidências de focos de umidade e presença de sujeira na
              carroceria do veículo ou interior do container?
            </DialogContentText>
            <RadioBtn
              input={
                <form className="radio-form2">
                  <div>
                    <input
                      type="radio"
                      id="Sim"
                      value="Sim"
                      name="clean"
                      onChange={() => {}}
                    />
                    <label htmlFor="Sim">Sim</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Não"
                      value="Não"
                      name="clean"
                      onChange={() => {}}
                    />
                    <label htmlFor="Não">Não</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Não aplicável"
                      value="Não aplicável"
                      name="clean"
                      onChange={() => {}}
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
              Existem evidências de que o veículo foi utilizado para transporte
              de animais, dejetos de animais ou de subprodutos de origem animal?
            </DialogContentText>
            <RadioBtn
              input={
                <form className="radio-form2">
                  <div>
                    <input
                      type="radio"
                      id="Sim"
                      value="Sim"
                      name="clean"
                      onChange={() => {}}
                    />
                    <label htmlFor="Sim">Sim</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Não"
                      value="Não"
                      name="clean"
                      onChange={() => {}}
                    />
                    <label htmlFor="Não">Não</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Não aplicável"
                      value="Não aplicável"
                      name="clean"
                      onChange={() => {}}
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
              Existem evidências de que o veículo transportou pesticidas,
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
                      name="clean"
                      onChange={() => {}}
                    />
                    <label htmlFor="Sim">Sim</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Não"
                      value="Não"
                      name="clean"
                      onChange={() => {}}
                    />
                    <label htmlFor="Não">Não</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Não aplicável"
                      value="Não aplicável"
                      name="clean"
                      onChange={() => {}}
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
              Estava chovendo no momento do carregamento?
            </DialogContentText>
            <RadioBtn
              input={
                <form className="radio-form2">
                  <div>
                    <input
                      type="radio"
                      id="Sim"
                      value="Sim"
                      name="clean"
                      onChange={() => {}}
                    />
                    <label htmlFor="Sim">Sim</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Não"
                      value="Não"
                      name="clean"
                      onChange={() => {}}
                    />
                    <label htmlFor="Não">Não</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="Não aplicável"
                      value="Não aplicável"
                      name="clean"
                      onChange={() => {}}
                    />
                    <label htmlFor="Não">Não aplicável</label>
                  </div>
                </form>
              }
            />
          </DialogContent>
        </div>
        <div className="save-btn">
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancelar
            </Button>
            <Button color="primary">Salvar</Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

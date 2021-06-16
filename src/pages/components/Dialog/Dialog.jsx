import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import RadioBtn from "../RadioBtn/RadioBtn";
import "./dialog.css";

export default function DialogForm1(props) {
  return (
    <div>
      <Dialog open={props.isOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Meio de Transporte</DialogTitle>
        <DialogContent>
          <DialogContentText>Veículo</DialogContentText>
          <RadioBtn
            input={
              <form className="radio-form">
                <div>
                  <input type="radio" id="Caminhão" value="Caminhão" />
                  <label htmlFor="Caminhão">Caminhão</label>
                </div>
                <div>
                  <input type="radio" id="Van" value="Van" />
                  <label htmlFor="Van">Van</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Pickup fechada"
                    value="Pickup fechada"
                  />
                  <label htmlFor="Pickup fechada">Pickup fechada</label>
                </div>
                <div>
                  <input type="radio" id="Outro" value="Outro" />
                  <label htmlFor="Outro">Outro</label>
                </div>
              </form>
            }
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>Tipo de Carroceria</DialogContentText>
          <RadioBtn
            input={
              <form className="radio-form">
                <div>
                  <input type="radio" id="Baú/sider" value="Baú/sider" />
                  <label htmlFor="Baú/sider">Baú/sider</label>
                </div>
                <div>
                  <input type="radio" id="Enlonado" value="Enlonado" />
                  <label htmlFor="Enlonado">Enlonado</label>
                </div>
                <div>
                  <input type="radio" id="Container" value="Container" />
                  <label htmlFor="Container">Container</label>
                </div>
                <div>
                  <input type="radio" id="Outro" value="Outro" />
                  <label htmlFor="Outro">Outro</label>
                </div>
              </form>
            }
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>Lacre</DialogContentText>
          <RadioBtn
            input={
              <form className="radio-form">
                <div>
                  <input type="radio" id="Sim" value="Sim" />
                  <label htmlFor="Sim">Sim</label>
                </div>
                <div>
                  <input type="radio" id="Não" value="Não" />
                  <label htmlFor="Não">Não</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Não aplicável"
                    value="Não aplicável"
                  />
                  <label htmlFor="Não aplicável">Não aplicável</label>
                </div>
                <div>
                  <label htmlFor="Nº Lacre">Nº Lacre: </label>
                  <input
                    type="number"
                    id="Nº Lacre"
                    onChange={() => {}}
                    value=" "
                  />
                </div>
              </form>
            }
          />
        </DialogContent>
        <DialogContent>
          <DialogContentText>Condições de Limpeza</DialogContentText>
          <RadioBtn
            input={
              <form className="radio-form">
                <div>
                  <input type="radio" id="Baú/sider" value="Baú/sider" />
                  <label htmlFor="Baú/sider">Baú/sider</label>
                </div>
                <div>
                  <input type="radio" id="Enlonado" value="Enlonado" />
                  <label htmlFor="Enlonado">Enlonado</label>
                </div>
                <div>
                  <input type="radio" id="Container" value="Container" />
                  <label htmlFor="Container">Container</label>
                </div>
                <div>
                  <input type="radio" id="Outro" value="Outro" />
                  <label htmlFor="Outro">Outro</label>
                </div>
              </form>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={props.handleClose} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

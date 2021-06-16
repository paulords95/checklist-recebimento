import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import RadioBtn from "../RadioBtn/RadioBtn";
import "./dialog.css";

export default function DialogForm1(props) {
  const [vehicleValues, setVehiclesValues] = useState({
    vehicle: "",
    trailer: "",
    seal: "",
    cleaning: "",
  });

  const handleVehicleValue = (value) => {
    setVehiclesValues({
      vehicle: value,
      trailer: vehicleValues.trailer,
      seal: vehicleValues.seal,
      cleaning: vehicleValues.cleaning,
    });
  };

  const handleTrailerValue = (value) => {
    setVehiclesValues({
      vehicle: vehicleValues.vehicle,
      trailer: value,
      seal: vehicleValues.seal,
      cleaning: vehicleValues.cleaning,
    });
  };

  const handleSealValue = (value) => {
    setVehiclesValues({
      vehicle: vehicleValues.vehicle,
      trailer: vehicleValues.trailer,
      seal: value,
      cleaning: vehicleValues.cleaning,
    });
  };
  const handleCleaningValue = (value) => {
    setVehiclesValues({
      vehicle: vehicleValues.vehicle,
      trailer: vehicleValues.trailer,
      seal: vehicleValues.seal,
      cleaning: value,
    });
  };

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
                  <input
                    type="radio"
                    id="Caminhão"
                    value={vehicleValues.vehicle}
                    name="truck"
                    onChange={() => {
                      handleVehicleValue("1");
                    }}
                  />
                  <label htmlFor="Caminhão">Caminhão</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="Van"
                    value="Van"
                    name="truck"
                    onChange={() => {
                      handleVehicleValue("2");
                    }}
                  />
                  <label htmlFor="Van">Van</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Pickup fechada"
                    value="Pickup fechada"
                    name="truck"
                    onChange={() => {
                      handleVehicleValue("3");
                    }}
                  />
                  <label htmlFor="Pickup fechada">Pickup fechada</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Outro"
                    value="Outro"
                    name="truck"
                    onChange={() => {
                      handleVehicleValue("4");
                    }}
                  />
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
                  <input
                    type="radio"
                    id="Baú/sider"
                    value="Baú/sider"
                    name="trailer"
                    onChange={() => {
                      handleTrailerValue("1");
                    }}
                  />
                  <label htmlFor="Baú/sider">Baú/sider</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Enlonado"
                    value="Enlonado"
                    name="trailer"
                    onChange={() => {
                      handleTrailerValue("2");
                    }}
                  />
                  <label htmlFor="Enlonado">Enlonado</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Container"
                    value="Container"
                    name="trailer"
                    onChange={() => {
                      handleTrailerValue("3");
                    }}
                  />
                  <label htmlFor="Container">Container</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Outro"
                    value="Outro"
                    name="trailer"
                    onChange={() => {
                      handleTrailerValue("4");
                    }}
                  />
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
                  <input type="radio" id="Sim" value="Sim" name="lacre" />
                  <label htmlFor="Sim">Sim</label>
                </div>
                <div>
                  <input type="radio" id="Não" value="Não" name="lacre" />
                  <label htmlFor="Não">Não</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Não aplicável"
                    value="Não aplicável"
                    name="lacre"
                  />
                  <label htmlFor="Não aplicável">Não aplicável</label>
                </div>
                <div>
                  <input type="radio" id="text" value="text" name="lacre" />
                  <label htmlFor="Nº Lacre">Nº Lacre: </label>
                  <input
                    type="number"
                    id="Nº Lacre"
                    name="lacre"
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
                  <input
                    type="radio"
                    id="Satisfatório"
                    value="Satisfatório"
                    name="clean"
                  />
                  <label htmlFor="Satisfatório">Satisfatório</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Não satisfatório"
                    value="Não satisfatório"
                    name="clean"
                  />
                  <label htmlFor="Não satisfatório">Não satisfatório</label>
                </div>
              </form>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              console.log(vehicleValues);
            }}
            color="primary"
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

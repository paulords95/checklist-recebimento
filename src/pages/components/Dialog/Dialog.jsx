import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";

import RadioBtn from "../RadioBtn/RadioBtn";
import "./dialog.css";

export default function DialogForm1(props) {
  const [item, setItem] = useState();
  const [sealNum, setSealNum] = useState("");
  const [sealEnable, setSealEnable] = useState(true);
  const [vehicleValues, setVehiclesValues] = useState({
    vehicle: "",
    trailer: "",
    seal: "",
    numSeal: sealNum,
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

  useEffect(() => {
    console.log(props.seqRec);
    setItem(props.seqRec);
  }, []);

  return (
    <div>
      <Dialog open={props.isOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Meio de Transporte | Nº Recebimento: {"item.codRec.toString()"}
        </DialogTitle>
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
                  <input
                    type="radio"
                    id="Sim"
                    value="Sim"
                    name="lacre"
                    onChange={() => {
                      setSealEnable(false);
                      handleSealValue("1");
                    }}
                  />
                  <label htmlFor="Sim">Sim</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Não"
                    value="Não"
                    name="lacre"
                    onChange={() => {
                      setSealEnable(true);
                      setSealNum("");
                      handleSealValue("2");
                    }}
                  />
                  <label htmlFor="Não">Não</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Não aplicável"
                    value="Não aplicável"
                    name="lacre"
                    onChange={() => {
                      setSealEnable(true);
                      setSealNum("");
                      handleSealValue("3");
                    }}
                  />
                  <label htmlFor="Não aplicável">Não aplicável</label>
                </div>
                <div>
                  <label htmlFor="Nº Lacre">Nº Lacre: </label>
                  <input
                    type="text"
                    id="Nº Lacre"
                    name="lacre"
                    disabled={sealEnable}
                    onChange={(e) => {
                      setSealNum(e.target.value);
                    }}
                    value={sealNum}
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
                    onChange={() => {
                      handleCleaningValue("1");
                    }}
                  />
                  <label htmlFor="Satisfatório">Satisfatório</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Não satisfatório"
                    value="Não satisfatório"
                    name="clean"
                    onChange={() => {
                      handleCleaningValue("2");
                    }}
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
              console.log(item);
              if (vehicleValues.vehicle.length < 1) {
                toast.error("Informe o tipo de veículo");
                return;
              }
              if (vehicleValues.trailer.length < 1) {
                toast.error("Informe o tipo de carroceria");
                return;
              }
              if (vehicleValues.seal == 1 && sealNum < 1) {
                toast.error("Informe o nº do lacre");
                return;
              }
              if (vehicleValues.seal.length < 1) {
                toast.error("Informe o tipo de lacre");
                return;
              }
              if (vehicleValues.cleaning.length < 1) {
                toast.error("Informe as condições de limpeza");
                return;
              }
              toast.success("Registros salvos com sucesso");
              console.log(vehicleValues);
              console.log(sealNum);
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

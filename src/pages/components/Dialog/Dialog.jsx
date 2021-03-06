import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";
import Alert from "@material-ui/lab/Alert";

import ENDPOINT from "../../../utils/endpoint";

import RadioBtn from "../RadioBtn/RadioBtn";
import "./dialog.css";

export default function DialogForm1(props) {
  const [sealNum, setSealNum] = useState("");
  const [allowForm, setAllowForm] = useState(true);
  const [sealEnable, setSealEnable] = useState(true);
  const [vehicleValues, setVehiclesValues] = useState({
    vehicle: "",
    trailer: "",
    seal: "",
    numSeal: sealNum,
    cleaning: "",
  });
  const [post, setPost] = useState(false);

  const handleVehicleValue = (value) => {
    setVehiclesValues({
      vehicle: value,
      trailer: vehicleValues.trailer,
      seal: vehicleValues.seal,
      numSeal: sealNum,
      cleaning: vehicleValues.cleaning,
    });
  };

  const handleTrailerValue = (value) => {
    setVehiclesValues({
      vehicle: vehicleValues.vehicle,
      trailer: value,
      seal: vehicleValues.seal,
      numSeal: sealNum,
      cleaning: vehicleValues.cleaning,
    });
  };

  const handleSealValue = (value) => {
    setVehiclesValues({
      vehicle: vehicleValues.vehicle,
      trailer: vehicleValues.trailer,
      seal: value,
      numSeal: sealNum,
      cleaning: vehicleValues.cleaning,
    });
  };
  const handleCleaningValue = (value) => {
    setVehiclesValues({
      vehicle: vehicleValues.vehicle,
      trailer: vehicleValues.trailer,
      seal: vehicleValues.seal,
      numSeal: sealNum,
      cleaning: value,
    });
  };

  useEffect(() => {
    if (props.seqRec.USU_TIPVEI > 0) {
      setAllowForm(false);
      handleVehicleValue(`${props.seqRec.USU_TIPVEI}`);
      handleTrailerValue(`${props.seqRec.USU_TIPCAR}`);
      handleSealValue(`${props.seqRec.USU_POSLAC}`);
      handleCleaningValue(`${props.seqRec.USU_LPZVEI}`);
      if (props.seqRec.USU_NROLAC > 1) {
        setSealNum(props.seqRec.USU_NROLAC);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.seqRec]);

  const handlePost = async (
    recNum,
    vehicle,
    trailer,
    seal,
    sealInput,
    cleaning
  ) => {
    try {
      const body = { recNum, vehicle, trailer, seal, sealInput, cleaning };
      await fetch(`${ENDPOINT.ENDPOINT}/post/vehicle-information/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: localStorage.token.toString(),
        },
        body: JSON.stringify(body),
      });
    } catch (error) { }
  };

  return (
    <div>
      <Dialog open={props.isOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Meio de Transporte | N?? Recebimento:{" "}
          {props.seqRec.USU_CODREC ? (
            <span>{props.seqRec.USU_CODREC}</span>
          ) : (
            ""
          )}
        </DialogTitle>
        {allowForm ? (
          ""
        ) : (
          <Alert severity="warning">
            O formul??rio para o recebimento n?? {props.seqRec.USU_CODREC} j?? foi
            preenchido!
          </Alert>
        )}
        {post ? (
          <Alert severity="warning">
            O formul??rio para o recebimento n?? {props.seqRec.USU_CODREC} foi
            salvo com sucesso!
          </Alert>
        ) : (
          <>
            {" "}
            <div>
              <DialogContent>
                <DialogContentText>Ve??culo</DialogContentText>
                <RadioBtn
                  input={
                    <form className="radio-form" disabled>
                      <div>
                        <input
                          type="radio"
                          id="Caminh??o"
                          value={vehicleValues.vehicle}
                          disabled={props.seqRec.USU_TIPVEI > 0 ? true : false}
                          name="truck"
                          // checked={item.tipVei === 1 ? true : allowForm}
                          onChange={() => {
                            handleVehicleValue("1");
                          }}
                        />
                        <label htmlFor="Caminh??o">Caminh??o</label>
                      </div>

                      <div>
                        <input
                          type="radio"
                          id="Van"
                          value="Van"
                          disabled={props.seqRec.USU_TIPVEI > 0 ? true : false}
                          name="truck"
                          //checked={item.tipVei === 2 ? true : allowForm}
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
                          disabled={props.seqRec.USU_TIPVEI > 0 ? true : false}
                          value="Pickup fechada"
                          name="truck"
                          // checked={item.tipVei === 3 ? true : allowForm}
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
                          disabled={props.seqRec.USU_TIPVEI > 0 ? true : false}
                          // checked={item.tipVei === 4 ? true : allowForm}
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
            </div>
            <div>
              <DialogContent>
                <DialogContentText>Tipo de Carroceria</DialogContentText>
                <RadioBtn
                  input={
                    <form className="radio-form">
                      <div>
                        <input
                          type="radio"
                          id="Ba??/sider"
                          value="Ba??/sider"
                          name="trailer"
                          disabled={props.seqRec.USU_TIPCAR > 0 ? true : false}
                          //checked={item.tipCar === 1 ? true : allowForm}
                          onChange={() => {
                            handleTrailerValue("1");
                          }}
                        />
                        <label htmlFor="Ba??/sider">Ba??/sider</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="Enlonado"
                          disabled={props.seqRec.USU_TIPCAR > 0 ? true : false}
                          //checked={item.tipCar === 2 ? true : allowForm}
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
                          disabled={props.seqRec.USU_TIPCAR > 0 ? true : false}
                          //checked={item.tipCar === 3 ? true : allowForm}
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
                          disabled={props.seqRec.USU_TIPCAR > 0 ? true : false}
                          //checked={item.tipCar === 4 ? true : allowForm}
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
            </div>
            <div>
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
                          disabled={props.seqRec.USU_POSLAC > 0 ? true : false}
                          //checked={item.posLac === 1 ? true : allowForm}
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
                          id="N??o"
                          value="N??o"
                          disabled={props.seqRec.USU_POSLAC > 0 ? true : false}
                          //checked={item.posLac === 2 ? true : allowForm}
                          name="lacre"
                          onChange={() => {
                            setSealEnable(true);
                            setSealNum("");
                            handleSealValue("2");
                          }}
                        />
                        <label htmlFor="N??o">N??o</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="N??o aplic??vel"
                          value="N??o aplic??vel"
                          disabled={props.seqRec.USU_POSLAC > 0 ? true : false}
                          //checked={item.posLac === 3 ? true : allowForm}
                          name="lacre"
                          onChange={() => {
                            setSealEnable(true);
                            setSealNum("");
                            handleSealValue("3");
                          }}
                        />
                        <label htmlFor="N??o aplic??vel">N??o aplic??vel</label>
                      </div>
                      <div>
                        <label htmlFor="N?? Lacre">N?? Lacre: </label>
                        <input
                          type="text"
                          id="N?? Lacre"
                          name="lacre"
                          disabled={sealEnable}
                          onChange={(e) => {
                            setVehiclesValues({
                              vehicle: vehicleValues.vehicle,
                              trailer: vehicleValues.trailer,
                              seal: vehicleValues.seal,
                              numSeal: e.target.value,
                              cleaning: vehicleValues.cleaning,
                            });
                            setSealNum(e.target.value);
                          }}
                          value={sealNum}
                        />
                      </div>
                    </form>
                  }
                />
              </DialogContent>
            </div>
            <div>
              <DialogContent>
                <DialogContentText>Condi????es de Limpeza</DialogContentText>
                <RadioBtn
                  input={
                    <form className="radio-form">
                      <div>
                        <input
                          type="radio"
                          id="Satisfat??rio"
                          value="Satisfat??rio"
                          disabled={props.seqRec.USU_LPZVEI > 0 ? true : false}
                          //checked={item.lpzVei === 1 ? true : allowForm}
                          name="clean"
                          onChange={() => {
                            handleCleaningValue("1");
                          }}
                        />
                        <label htmlFor="Satisfat??rio">Satisfat??rio</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="N??o satisfat??rio"
                          disabled={props.seqRec.USU_LPZVEI > 0 ? true : false}
                          //checked={item.lpzVei === 2 ? true : allowForm}
                          value="N??o satisfat??rio"
                          name="clean"
                          onChange={() => {
                            handleCleaningValue("2");
                          }}
                        />
                        <label htmlFor="N??o satisfat??rio">
                          N??o satisfat??rio
                        </label>
                      </div>
                    </form>
                  }
                />
              </DialogContent>
            </div>
          </>
        )}
        <DialogActions>
          {post || !allowForm ? (
            ""
          ) : (
            <Button onClick={props.handleClose} color="primary">
              Cancelar
            </Button>
          )}
          <Button
            onClick={() => {
              if (!allowForm || post) {
                props.handleClose();

                return;
              }
              if (vehicleValues.vehicle < 1) {
                toast.error("Informe o tipo de ve??culo");
                return;
              }
              if (vehicleValues.trailer < 1) {
                toast.error("Informe o tipo de carroceria");
                return;
              }
              if (vehicleValues.seal < 1) {
                toast.error("Informe o tipo de lacre");
                return;
              }
              if (vehicleValues.seal === 1 && sealNum < 1) {
                toast.error("Informe o n?? do lacre");
                return;
              }
              if (vehicleValues.cleaning.length < 1) {
                toast.error("Informe as condi????es de limpeza");
                return;
              }
              toast.success("Registros salvos com sucesso");
              handlePost(
                props.seqRec.USU_CODREC,
                vehicleValues.vehicle,
                vehicleValues.trailer,
                vehicleValues.seal,
                sealNum,
                vehicleValues.cleaning
              );
              setTimeout(() => {
                setPost(true);
              }, 1000);
            }}
            color="primary"
          >
            {post || !allowForm ? "Sair" : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

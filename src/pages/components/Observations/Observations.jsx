import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

import ENDPOINT from "../../../utils/endpoint";
import { toast } from "react-toastify";

const Observations = (props) => {
  const [observation, setObservation] = useState("");
  const [result, setResult] = useState(false);
  const [allowInput, setAllowInput] = useState(true);

  const handlePost = async (USU_OBSREC, USU_CODREC) => {
    try {
      const body = { USU_OBSREC, USU_CODREC };
      const response = await fetch(`${ENDPOINT.ENDPOINT}/obs/obsrec/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: localStorage.token.toString(),
        },

        body: JSON.stringify(body),
      });
      const serverResponse = await response.json();
      if (serverResponse.rowsAffected) {
        if (serverResponse.rowsAffected > 0) {
          toast.success("Item salvo");
          setResult(true);
          setAllowInput(false);
        }
      } else {
        setResult(false);
        toast.error("Erro ao salvar item");
      }
    } catch (error) {
      toast.error("Erro ao salvar item");
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const filled = await fetch(
        `${ENDPOINT.ENDPOINT}/obs/obsrec/${props.seqRec.USU_CODREC}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Token: localStorage.token.toString(),
          },
        }
      );
      setAllowInput(await filled.json());
    })();
  }, [props.seqRec.USU_CODREC, result]);

  return (
    <div>
      <Dialog open={props.isOpen4} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Observações | Nº Recebimento:{" "}
          {props.seqRec.USU_CODREC ? (
            <span>{props.seqRec.USU_CODREC}</span>
          ) : (
            ""
          )}
        </DialogTitle>

        <div style={{ width: "100%" }}>
          <DialogContent>
            {!allowInput ? (
              <Alert severity="warning">
                O campo observações para o recebimento nº{" "}
                {props.seqRec.USU_CODREC} já foi preenchido!
              </Alert>
            ) : (
              <textarea
                id="w3review"
                name="w3review"
                rows="8"
                cols="50"
                onChange={(e) => {
                  setObservation(e.target.value);
                }}
              ></textarea>
            )}
          </DialogContent>
        </div>
        <DialogActions>
          <Button
            onClick={() => {
              props.handleClose();
            }}
            color="primary"
          >
            Cancelar
          </Button>
          {!allowInput ? (
            <Button
              onClick={() => {
                if (observation.length < 2) {
                  toast.error("Campo de texto em branco");
                  return;
                }
                handlePost(observation, props.seqRec.USU_CODREC);
              }}
              color="primary"
            >
              Salvar
            </Button>
          ) : (
            <></>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Observations;

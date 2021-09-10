import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

import ENDPOINT from "../../../utils/endpoint";
import { toast } from "react-toastify";

const Corrections = (props) => {
  const [corrention, setCorrection] = useState("");
  const [result, setResult] = useState(false);
  const [allowInput, setAllowInput] = useState(true);

  const handlePost = async (USU_ACACOR, USU_CODREC) => {
    try {
      const body = { USU_ACACOR, USU_CODREC };
      const response = await fetch(`${ENDPOINT.ENDPOINT}/obs/acacor/`, {
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
        `${ENDPOINT.ENDPOINT}/obs/acacor/${props.seqRec.USU_CODREC}`,
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
      <Dialog open={props.isOpen5} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Ações Corretivas | Nº Recebimento:{" "}
          {props.seqRec.USU_CODREC ? (
            <span>{props.seqRec.USU_CODREC}</span>
          ) : (
            ""
          )}
        </DialogTitle>

        <div style={{ width: "100%" }}>
          <DialogContent>
            {result || !allowInput ? (
              <Alert severity="warning">
                O campo Ações Corretivas para o recebimento nº{" "}
                {props.seqRec.USU_CODREC} já foi preenchido!
              </Alert>
            ) : (
              <textarea
                id="w3review"
                name="w3review"
                rows="8"
                cols="50"
                onChange={(e) => {
                  setCorrection(e.target.value);
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
          {!result ? (
            <Button
              onClick={() => {
                if (corrention.length < 2) {
                  toast.error("Campo de texto em branco");
                  return;
                }
                handlePost(corrention, props.seqRec.USU_CODREC);
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

export default Corrections;

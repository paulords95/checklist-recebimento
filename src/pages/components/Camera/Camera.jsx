import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import ENDPOINT from "../../../utils/endpoint";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center",
    margin: "0 auto",
  },
  imgBox: {
    maxWidth: "80%",
    maxHeight: "80%",
    margin: "10px",
  },
  img: {
    height: "inherit",
    maxWidth: "inherit",
  },
  input: {
    display: "none",
  },
}));

const CameraTruck = (props) => {
  const classes = useStyles();
  const [source, setSource] = useState("");
  const [file, setFile] = useState(null);

  const handleCapture = async (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        setFile(file);
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  };

  function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  const savePicture = async () => {
    blobToBase64(file)
      .then(async (data) => {
        const body = {
          res: data,
        };
        try {
          const response = await fetch(
            `${ENDPOINT.ENDPOINT}/img/save/${props.seqRec.USU_CODREC}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Token: localStorage.token.toString(),
              },

              body: JSON.stringify(body),
            }
          );
          const serverResponse = await response.json();
          console.log(serverResponse);
        } catch (error) {}
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {" "}
      <Dialog open={props.isOpen6} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          FOTO | Nº Recebimento:{" "}
          {props.seqRec.USU_CODREC ? (
            <span>{props.seqRec.USU_CODREC}</span>
          ) : (
            ""
          )}
        </DialogTitle>

        <div style={{ width: "100%" }}>
          <DialogContent>
            <div className={classes.root}>
              <Grid container>
                <Grid item xs={12}>
                  <h5>Capturar imagem</h5>

                  {source && (
                    <div
                      style={{
                        margin: "0 auto",
                        display: "flex",
                      }}
                    >
                      <img
                        src={source}
                        alt={"snap"}
                        style={{ width: "100%" }}
                        className={classes.img}
                      ></img>
                    </div>
                  )}

                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    capture="environment"
                    onChange={(e) => handleCapture(e.target)}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCameraRoundedIcon
                        fontSize="large"
                        color="primary"
                      />
                    </IconButton>
                  </label>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
        </div>
        <DialogActions>
          <Button
            onClick={async () => {
              savePicture();
            }}
            color="primary"
          >
            LOG
          </Button>
          <Button
            onClick={() => {
              props.handleClose();
            }}
            color="primary"
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CameraTruck;

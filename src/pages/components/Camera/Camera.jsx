import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    textAlign: "center",
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
  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  };
  return (
    <div>
      {" "}
      <Dialog open={props.isOpen6} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          FOTO | Nº Recebimento:{" "}
          {props.seqRec.codRec ? <span>{props.seqRec.codRec}</span> : ""}
        </DialogTitle>

        <div style={{ width: "100%" }}>
          <DialogContent>
            <div className={classes.root}>
              <Grid container>
                <Grid item xs={12}>
                  <h5>Capture your image</h5>
                  {source && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      border={1}
                      className={classes.imgBox}
                    >
                      <img
                        src={source}
                        alt={"snap"}
                        className={classes.img}
                      ></img>
                    </Box>
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

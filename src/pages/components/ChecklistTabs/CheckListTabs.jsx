import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import DialogForm1 from "../Dialog/Dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function CheckListTabs(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h4" variant="h5">
        Selecione o formulário a ser preenchido
      </Typography>
      <DialogForm1
        isOpen={open}
        handleClose={() => setOpen(false)}
        seqRec={props.seqRec}
      />
      <Button variant="contained" color="primary" id="1" onClick={() => {}}>
        Conferência geral do produto recebido e condições do veículo condutor
      </Button>
      <Button
        variant="contained"
        color="primary"
        id="2"
        onClick={() => {
          setOpen(true);
          props.onClickBtnTransVehicle();
        }}
      >
        Meio de Transporte
      </Button>
      <Button
        variant="contained"
        color="primary"
        id="3"
        onClick={props.onClickBtn}
      >
        Avaliação do Produto
      </Button>
    </div>
  );
}

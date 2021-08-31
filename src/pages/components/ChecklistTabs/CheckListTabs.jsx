import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import DialogForm1 from "../Dialog/Dialog";
import DialogForm2 from "../Dialog-form2/dialog-form2";
import Producs from "../../Products/Products";
import Observatons from '../../components/Observations/Observations'
import Corrections from '../Corrections/Corrections'
import CameraTruck from '../Camera/Camera'

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function CheckListTabs(props) {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h4" variant="h5">
        Selecione o formulário a ser preenchido
      </Typography>
      <DialogForm2
        isOpen2={open1}
        handleClose={() => setOpen1(false)}
        seqRec={props.seqRec}
      />
      <DialogForm1
        isOpen={open2}
        handleClose={() => setOpen2(false)}
        seqRec={props.seqRec}
      />
      <Producs
        isOpen3={open3}
        handleClose={() => setOpen3(false)}
        seqRec={props.seqRec}
      />
      <Observatons
        isOpen4={open4}
        handleClose={() => setOpen4(false)}
        seqRec={props.seqRec}
      />
      <Corrections
        isOpen5={open5}
        handleClose={() => setOpen5(false)}
        seqRec={props.seqRec}
      />
           <CameraTruck
        isOpen6={open6}
        handleClose={() => setOpen6(false)}
        seqRec={props.seqRec}
      />
      <Button
        variant="contained"
        color="primary"
        id="2"
        onClick={() => {
          setOpen2(true);
        }}
      >
        Meio de Transporte
      </Button>
      <Button
        variant="contained"
        color="primary"
        id="1"
        onClick={() => {
          setOpen1(true);
        }}
      >
        Conferência geral do produto recebido e condições do veículo condutor
      </Button>

      <Button
        variant="contained"
        color="primary"
        id="3"
        onClick={() => {
          setOpen3(true);
        }}
      >
        Avaliação do Produto
      </Button>
      <hr></hr>
      <Button
        variant="contained"
        color="primary"
        id="3"
        onClick={() => {
          setOpen4(true)
        }}
      >
        Observações
      </Button>
      <Button
        variant="contained"
        color="primary"
        id="3"
        onClick={() => {
          setOpen5(true)
        }}
      >
        Ações Corretivas
      </Button>
      <Button
        variant="contained"
        color="primary"
        id="3"
        onClick={() => {
          setOpen6(true)
        }}
      >
        Foto Caminhão
      </Button>
    </div>
  );
}

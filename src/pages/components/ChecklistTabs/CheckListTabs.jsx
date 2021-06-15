import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function CheckListTabs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h4" variant="h5">
        Selecine o formulário a ser preenchido
      </Typography>
      <Button variant="contained" color="primary">
        Conferência geral do produto recebido e condições do veículo condutor
      </Button>
      <Button variant="contained" color="primary">
        Meio de Transporte
      </Button>
      <Button variant="contained" color="primary">
        Avaliação do Produto
      </Button>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import DialogForm1 from "../Dialog/Dialog";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import DialogForm2 from "../Dialog-form2/dialog-form2";
import Producs from "../../Products/Products";
import Observatons from "../../components/Observations/Observations";
import Corrections from "../Corrections/Corrections";
import CameraTruck from "../Camera/Camera";
import LinearProgress from "@material-ui/core/LinearProgress";

import ENDPOINT from "../../../utils/endpoint";

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
  const [printStatus, setPrintStatus] = useState(false)
  const [picTaken, setPicTaken] = useState(false)
  const [printers, setPrinters] = useState([])
  const [printerPicked, setPrinterPicked] = useState(null)
  const classes = useStyles();

  const [formFilled1, setFormFilled1] = React.useState(false);
  const [formFilled2, setFormFilled2] = React.useState(false);
  //const [formFilled3, setFormFilled3] = React.useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${ENDPOINT.ENDPOINT}/filled-item/form/${props.seqRec.USU_CODREC}`,
          {
            headers: {
              Token: localStorage.token.toString(),
            },
          }
        );
        const parsedResponse = await response.json();

        setFormFilled1(parsedResponse);
      } catch (error) {
        console.log(error);
      }
      try {
        const response = await fetch(
          `${ENDPOINT.ENDPOINT}/filled-item/form-2/${props.seqRec.USU_CODREC}`,
          {
            headers: {
              Token: localStorage.token.toString(),
            },
          }
        );
        const parsedResponse = await response.json();

        setFormFilled2(parsedResponse);
      } catch (error) {
        console.log(error);
      }
      //try {
      //  const response = await fetch(
      //    `${ENDPOINT.ENDPOINT}/filled-item/prod/${props.seqRec.USU_CODREC}`,
      //    {
      //      headers: {
      //        Token: localStorage.token.toString(),
      //      },
      //    }
      //  );
      //  const parsedResponse = await response.json();
      //
      //  setFormFilled3(parsedResponse);
      //} catch (error) {
      //  console.log(error);
      //}

      const printers = await fetch(`${ENDPOINT.ENDPOINT}/print/getprinters`, {
        headers: {
          Token: localStorage.token.toString(),
        },
      })
      const parsedPrinters = await printers.json()
      setPrinters(parsedPrinters)
    })();


    checkPicTaken()


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.seqRec.codRec, open1, open2, open3]);


  const handlePrint = async () => {
    try {
      const response = await fetch(
        `${ENDPOINT.ENDPOINT}/print/rel`,
        {

          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Token: localStorage.token.toString(),
          },
          body: JSON.stringify({
            seqRec: props.seqRec.USU_CODREC
          }),
        }
      );
      const parsedResponse = await response.json();
      return (parsedResponse)


    } catch (error) {
      return error
    }
  }
  const checkPicTaken = async () => {
    try {
      const response = await fetch(
        `${ENDPOINT.ENDPOINT}/finish/saved/${props.seqRec.USU_CODREC}`,
        {

          headers: {
            "Content-Type": "application/json",
            Token: localStorage.token.toString(),
          },
        }
      );
      const parsedResponse = await response.json();
      setPicTaken(parsedResponse)


    } catch (error) {
      return error
    }
  }

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
        color={formFilled1 ? "primary" : "default"}
        id="1"
        onClick={() => {
          if (formFilled1) {
            setOpen1(true);
          } else {
            toast.error(
              "É necessário preencher o formulário de Meio de Transporte para prosseguir!"
            );
          }
        }}
      >
        Conferência geral do produto recebido e condições do veículo condutor
      </Button>

      <Button
        variant="contained"
        color={formFilled2 ? "primary" : "default"}
        id="3"
        onClick={() => {
          if (formFilled1 && formFilled2) {
            setOpen3(true);
          } else {
            toast.error(
              "É necessário preencher o formulário de Meio de Transporte e de Conferência Geral para prosseguir!"
            );
          }
        }}
      >
        Avaliação do Produto
      </Button>
      <hr></hr>
      <Button
        variant="contained"
        color="secondary"
        id="3"
        onClick={() => {
          setOpen4(true);
        }}
      >
        Observações
      </Button>
      <Button
        variant="contained"
        color="secondary"
        id="3"
        onClick={() => {
          setOpen5(true);
        }}
      >
        Ações Corretivas
      </Button>
      <Button
        variant="contained"
        color="secondary"
        id="3"
        onClick={() => {
          setOpen6(true);
        }}
      >
        Foto Caminhão
      </Button>
      <hr></hr>
      {printStatus ? <LinearProgress /> : ''}
      <Autocomplete
        id="combo-box-demo"
        options={printers}
        getOptionLabel={(option) => option.name}
        style={{ width: 400, margin: '0 auto' }}
        onInputChange={(e) => {
          setPrinterPicked(e.target.innerText)
        }}
        renderInput={(params) => <TextField {...params} onChange={(e) => {
          setPrinterPicked(e.target.value)
        }} label="Impressora" variant="outlined" />}
      />
      <Button
        variant="contained"
        color="primary"
        id="4"
        onClick={async () => {
          console.log(printerPicked)




          if (picTaken) {
            setPrintStatus(true)
            const printResult = await handlePrint()
            if (printResult === 'print success') {
              toast.success('Relatório impresso')
              setPrintStatus(false)
            } else {
              toast.error('Erro ao imprimir')
              setPrintStatus(false)
            }
          } else {
            toast.warn('É necessário registrar a foto do caminhão antes de imprimir')
          }
        }}
      >
        Imprimir
      </Button>
    </div>
  );
}

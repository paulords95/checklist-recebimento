import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import ProductItem from "../components/ProjectItem/ProjectItem";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Products = (props) => {
  const classes = useStyles();
  const [productsList, setProductsList] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch(
      `http://192.168.2.69:1106/post/product-conditions/seq=${props.seqRec.codRec}`,
      {
        headers: {
          Token: localStorage.token.toString(),
        },
      }
    );
    const itemData = await response.json();
    setProductsList(itemData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Dialog open={props.isOpen3} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Meio de Transporte | Nº Recebimento:{" "}
          {props.seqRec.codRec ? <span>{props.seqRec.codRec}</span> : ""}
        </DialogTitle>
        <div>
          <DialogContent>
            {productsList.map((product) => {
              return (
                <ProductItem
                  key={product.USU_CODPRO}
                  productNum={product.USU_CODPRO}
                />
              );
            })}
          </DialogContent>
        </div>

        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancelar
          </Button>

          <Button
            onClick={() => {
              console.log(productsList[0]);
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

export default Products;

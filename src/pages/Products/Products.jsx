import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";
import Alert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

import ENDPOINT from "../../utils/endpoint";

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
  const [page, setPage] = React.useState(1);
  const [currentProduct, setCurrentProduct] = useState({
    USU_CODPRO: 0,
    USU_CODLOT: "",
    USU_CODFOR: "",
    USU_LOTFOR: "",
    USU_DATVAL: "",
    USU_NUMNFC: "",
    USU_UNIMED: "",
    USU_QTDREC: "",
  });
  const handleChange = (event, value) => {
    setPage(value);
    setCurrentProduct(productsList[value - 1]);
  };

  const fetchProducts = async () => {
    const response = await fetch(
      `${ENDPOINT.ENDPOINT}/post/product-conditions/seq=${props.seqRec.codRec}`,
      {
        headers: {
          Token: localStorage.token.toString(),
        },
      }
    );
    const itemData = await response.json();
    setProductsList(itemData);
    setCurrentProduct(itemData[0]);
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
            {currentProduct ? (
              <ProductItem
                productObj={currentProduct}
                productNum={currentProduct.USU_CODPRO}
                lotCod={currentProduct.USU_CODLOT}
                forCod={currentProduct.USU_CODFOR}
                forLot={currentProduct.USU_LOTFOR}
                valid={currentProduct.USU_DATVAL}
                nf={currentProduct.USU_NUMNFC}
                measureUnit={currentProduct.USU_UNIMED}
                quantity={currentProduct.USU_QTDREC}
              />
            ) : (
              <div>Não há produtos cadastrados</div>
            )}
          </DialogContent>
        </div>
        <Pagination
          count={productsList.length}
          onChange={handleChange}
          shape="rounded"
        />

        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancelar
          </Button>

          <Button
            onClick={() => {
              toast.warning("Prod: " + currentProduct.USU_CODPRO);
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

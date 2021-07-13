import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { toast } from "react-toastify";
import Pagination from "@material-ui/lab/Pagination";

import ENDPOINT from "../../utils/endpoint";

import ProductItem from "../components/ProjectItem/ProjectItem";

const Products = (props) => {
  const [productsList, setProductsList] = useState([]);
  const [currentProduct, setCurrentProduct] = useState();
  const handleChange = (event, value) => {
    setCurrentProduct(productsList[value - 1]);
  };

  useEffect(() => {
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

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Dialog open={props.isOpen3} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Produtos | Nº Recebimento:{" "}
          {props.seqRec.codRec ? <span>{props.seqRec.codRec}</span> : ""}
        </DialogTitle>
        <div>
          <DialogContent>
            {currentProduct ? (
              <ProductItem
                codrec={props.seqRec.codRec.toString()}
                productObj={currentProduct}
                productNum={currentProduct.USU_CODPRO}
                productName={currentProduct.USU_NOMPRO}
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

import React from "react";
import Typography from "@material-ui/core/Typography";

import "./projectitem.css";

const ProductItem = (props) => {
  return (
    <div className="product-item-wrap">
      <div className="product-info">
        <div className="subtitle">
          Produto: <div className="item-info">{props.productNum}</div>
        </div>
        <div className="subtitle">
          Lote Fornecedor: <div className="item-info">{props.forLot}</div>
        </div>
        <div className="subtitle">
          Lote Interno: <div className="item-info">{props.lotCod}</div>
        </div>
        <div className="subtitle">
          Fornecedor: <div className="item-info">{props.forCod}</div>
        </div>
        <div className="subtitle">
          Validade: <div className="item-info">{props.valid}</div>
        </div>
        <div className="subtitle">
          NF: <div className="item-info">{props.nf}</div>
        </div>
        {/*<div className="subtitle">
          Unid. de Medida: <div className="item-info">{props.measureUnit}</div>
  </div>*/}
        <div className="subtitle">
          Quantidade:{" "}
          <div className="item-info">
            {props.quantity} {props.measureUnit}
          </div>
        </div>
      </div>
      <div className="form">Questions</div>
      <div className="product-identification">Identificação do Produto:</div>
      <div className="product-action">Ação Imediata:</div>
    </div>
  );
};

export default ProductItem;

import React, { useState, useEffect } from "react";

import "./projectitem.css";
import ENDPOINT from "../../../utils/endpoint";

import ProjectForm from "../ProductForm/ProductForm";

const formatDate = (date) => {
  const d = date;
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formatBr = new Date(d)
    .toLocaleDateString("pt-BR", options)
    .split("-")
    .reverse()
    .join("/");

  return formatBr;
};

const ProductItem = (props) => {
  const [productName, setProductName] = useState("");

  const fetchName = async () => {
    const nameRes = await fetch(
      `${ENDPOINT.ENDPOINT}/post/product-name/${props.productObj.USU_CODPRO}`,
      {
        headers: {
          Token: localStorage.token.toString(),
        },
      }
    );
    const parsedRes = await nameRes.json();
    if (parsedRes[0]) {
      setProductName(parsedRes[0].DESPRO);
    }
  };

  useEffect(() => {
    fetchName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.productObj]);

  return (
    <div className="product-item-wrap">
      <div className="product-info">
        <div className="subtitle">
          Produto: <div className="item-info">{productName}</div>
        </div>
        <div className="subtitle">
          Lote Fornecedor: <div className="item-info">{props.forLot}</div>
        </div>
        <div className="subtitle">
          Lote Interno: <div className="item-info">{props.lotCod}</div>
        </div>
        <div className="subtitle">
          Fornecedor:{" "}
          <div className="item-info">
            {props.forCod.toLocaleString("pt-BR")}
          </div>
        </div>
        <div className="subtitle">
          Validade: <div className="item-info">{formatDate(props.valid)}</div>
        </div>
        <div className="subtitle">
          NF:{" "}
          <div className="item-info">{props.nf.toLocaleString("pt-BR")}</div>
        </div>
        {/*<div className="subtitle">
          Unid. de Medida: <div className="item-info">{props.measureUnit}</div>
  </div>*/}
        <div className="subtitle">
          Quantidade:{" "}
          <div className="item-info">
            {props.quantity.toLocaleString("pt-BR")} {props.measureUnit}
          </div>
        </div>
      </div>
      <div className="form">
        <ProjectForm productObj={props.productObj} />
      </div>
    </div>
  );
};

export default ProductItem;

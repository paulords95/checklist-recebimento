import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

import "./productform.css";

const ProjectForm = (props) => {
  const [currentProduct, setCurrentProduct] = useState([]);
  const [answer1, setAnswer1] = useState();
  const [answer2, setAnswer2] = useState();
  const [answer3, setAnswer3] = useState();
  const [answer4, setAnswer4] = useState();
  const [answer5, setAnswer5] = useState();
  const [answer6, setAnswer6] = useState();

  useEffect(() => {
    setCurrentProduct(props.productObj);
  }, [props.productObj]);

  return (
    <div>
      <form className="radio-form-product">
        <div>
          1. É obrigatório a apresentação de laudo/certificado de análise?
        </div>
        <div className="radios">
          <div>
            <input
              type="radio"
              id="Sim"
              value="Sim"
              name="clean"
              onChange={() => {
                setAnswer1(1);
              }}
            />
            <label htmlFor="Sim">Sim</label>
          </div>
          <div>
            <input
              type="radio"
              id="Não"
              value="Não"
              name="clean"
              onChange={() => {
                setAnswer1(2);
              }}
            />
            <label htmlFor="Não">Não</label>
          </div>
          <div>
            <input
              type="radio"
              id="Não aplicável"
              value="Não aplicável"
              name="clean"
              onChange={() => {
                setAnswer1(3);
              }}
            />
            <label htmlFor="Não">Não aplicável</label>
          </div>
        </div>
      </form>
      <form className="radio-form-product">
        <div>2. O produto possui laudo/certificado de análise?</div>
        <div className="radios">
          <div>
            <input
              type="radio"
              id="Sim"
              value="Sim"
              name="clean"
              onChange={() => {
                setAnswer2(1);
              }}
            />
            <label htmlFor="Sim">Sim</label>
          </div>
          <div>
            <input
              type="radio"
              id="Não"
              value="Não"
              name="clean"
              onChange={() => {
                setAnswer2(2);
              }}
            />
            <label htmlFor="Não">Não</label>
          </div>
          <div>
            <input
              type="radio"
              id="Não aplicável"
              value="Não aplicável"
              name="clean"
              onChange={() => {
                setAnswer2(3);
              }}
            />
            <label htmlFor="Não">Não aplicável</label>
          </div>
        </div>
      </form>
      <form className="radio-form-product">
        <div>
          3. Todas as embalagens estão devidamente identificadas e o número do
          lote, datas de fabricação e validade estão de acordo com o laudo
          enviado?
        </div>
        <div className="radios">
          <div>
            <input
              type="radio"
              id="Sim"
              value="Sim"
              name="clean"
              onChange={() => {
                setAnswer3(1);
              }}
            />
            <label htmlFor="Sim">Sim</label>
          </div>
          <div>
            <input
              type="radio"
              id="Não"
              value="Não"
              name="clean"
              onChange={() => {
                setAnswer3(2);
              }}
            />
            <label htmlFor="Não">Não</label>
          </div>
          <div>
            <input
              type="radio"
              id="Não aplicável"
              value="Não aplicável"
              name="clean"
              onChange={() => {
                setAnswer3(3);
              }}
            />
            <label htmlFor="Não">Não aplicável</label>
          </div>
        </div>
      </form>
      <form className="radio-form-product">
        <div>
          4. Existe a presença de embalagens furadas, rasgadas, molhadas ou
          sujas?
        </div>
        <div className="radios">
          <div>
            <input
              type="radio"
              id="Sim"
              value="Sim"
              name="clean"
              onChange={() => {
                setAnswer4(1);
              }}
            />
            <label htmlFor="Sim">Sim</label>
          </div>
          <div>
            <input
              type="radio"
              id="Não"
              value="Não"
              name="clean"
              onChange={() => {
                setAnswer4(2);
              }}
            />
            <label htmlFor="Não">Não</label>
          </div>
          <div>
            <input
              type="radio"
              id="Não aplicável"
              value="Não aplicável"
              name="clean"
              onChange={() => {
                setAnswer4(3);
              }}
            />
            <label htmlFor="Não">Não aplicável</label>
          </div>
        </div>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <form className="radio-form-product">
          <div className="product-identification">
            Indentificação do Produto:
          </div>
          <div className="radios">
            <div>
              <input
                type="radio"
                id="Sim"
                value="Sim"
                name="clean"
                onChange={() => {
                  setAnswer5(1);
                }}
              />
              <label htmlFor="Sim">Produto conforme</label>
            </div>
            <div>
              <input
                type="radio"
                id="Não"
                value="Não"
                name="clean"
                onChange={() => {
                  setAnswer5(2);
                }}
              />
              <label htmlFor="Não">Produto não conforme</label>
            </div>
          </div>
        </form>
        <form className="radio-form-product">
          <div className="product-action">Ação Imediata:</div>
          <div className="radios">
            <div>
              <input
                type="radio"
                id="Sim"
                value="Sim"
                name="clean"
                onChange={() => {
                  setAnswer6(1);
                }}
              />
              <label htmlFor="Sim">Devolução parcial</label>
            </div>
            <div>
              <input
                type="radio"
                id="Não"
                value="Não"
                name="clean"
                onChange={() => {
                  setAnswer6(2);
                }}
              />
              <label htmlFor="Não">Devolução total</label>
            </div>
            <div>
              <input
                type="radio"
                id="Não aplicável"
                value="Não aplicável"
                name="clean"
                onChange={() => {
                  setAnswer6(3);
                }}
              />
              <label htmlFor="Não">Outros</label>
            </div>
          </div>
        </form>
      </div>
      <Button
        onClick={() => {
          console.log(
            currentProduct.USU_CODPRO,
            answer1,
            answer2,
            answer3,
            answer4,
            answer5,
            answer6
          );
        }}
      >
        Salvar
      </Button>
    </div>
  );
};

export default ProjectForm;

import React, { useState, useEffect } from "react";

import "./productform.css";

const ProjectForm = (props) => {
  const [currentProduct, setCurrentProduct] = useState([]);

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
                console.log(currentProduct);
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
                console.log(currentProduct);
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
                console.log(currentProduct);
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
              onChange={() => {}}
            />
            <label htmlFor="Sim">Sim</label>
          </div>
          <div>
            <input
              type="radio"
              id="Não"
              value="Não"
              name="clean"
              onChange={() => {}}
            />
            <label htmlFor="Não">Não</label>
          </div>
          <div>
            <input
              type="radio"
              id="Não aplicável"
              value="Não aplicável"
              name="clean"
              onChange={() => {}}
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
              onChange={() => {}}
            />
            <label htmlFor="Sim">Sim</label>
          </div>
          <div>
            <input
              type="radio"
              id="Não"
              value="Não"
              name="clean"
              onChange={() => {}}
            />
            <label htmlFor="Não">Não</label>
          </div>
          <div>
            <input
              type="radio"
              id="Não aplicável"
              value="Não aplicável"
              name="clean"
              onChange={() => {}}
            />
            <label htmlFor="Não">Não aplicável</label>
          </div>
        </div>
      </form>
      <form className="radio-form-product">
        <div>
          4. Existe a presença de embalagens furadas, rasgadas, molhadas ou
          sujas??
        </div>
        <div className="radios">
          <div>
            <input
              type="radio"
              id="Sim"
              value="Sim"
              name="clean"
              onChange={() => {}}
            />
            <label htmlFor="Sim">Sim</label>
          </div>
          <div>
            <input
              type="radio"
              id="Não"
              value="Não"
              name="clean"
              onChange={() => {}}
            />
            <label htmlFor="Não">Não</label>
          </div>
          <div>
            <input
              type="radio"
              id="Não aplicável"
              value="Não aplicável"
              name="clean"
              onChange={() => {}}
            />
            <label htmlFor="Não">Não aplicável</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;

import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { toast } from "react-toastify";

import "./productform.css";

const ProjectForm = (props) => {
  const [currentProduct, setCurrentProduct] = useState([]);
  const [answer1, setAnswer1] = useState(0);
  const [answer2, setAnswer2] = useState(0);
  const [answer3, setAnswer3] = useState(0);
  const [answer4, setAnswer4] = useState(0);
  const [answer5, setAnswer5] = useState(0);
  const [answer6, setAnswer6] = useState(0);
  const [post, setPost] = useState(false);

  useEffect(() => {
    setCurrentProduct(props.productObj);
    setAnswer1(0);
    setAnswer2(0);
    setAnswer3(0);
    setAnswer4(0);
    setAnswer5(0);
    setAnswer6(0);
  }, [props.productObj]);

  const handleProduct = async (
    b1,
    b2,
    b3,
    b4,
    idepro,
    acaime,
    outaim,
    codrec,
    seqpro
  ) => {
    try {
      const body = { b1, b2, b3, b4, idepro, acaime, outaim, codrec, seqpro };
      const response = await fetch(
        "http://192.168.2.69:1106/product/update-answers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Token: localStorage.token.toString(),
          },
          body: JSON.stringify(body),
        }
      );
      const parseRes = await response.json();
      if (parseRes) {
        toast.success("Registro salvo");
        setPost(true);
      } else {
        toast.error(parseRes);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = () => {
    if (answer1 < 1 && currentProduct.USU_B1 <= 0) {
      toast.error("Responda o item nº 1");
      return;
    }
    if (answer2 < 1 && currentProduct.USU_B2 <= 0 && answer1 === 1) {
      toast.error("Responda o item nº 2");
      return;
    }
    if (answer3 < 1 && currentProduct.USU_B3 <= 0) {
      toast.error("Responda o item nº 3");
      return;
    }
    if (answer4 < 1 && currentProduct.USU_B4 <= 0) {
      toast.error("Responda o item nº 4");
      return;
    }
    if (answer5 < 1 && currentProduct.USU_IDEPRO <= 0) {
      toast.error("Responda o item Identificação do Produto");
      return;
    }

    handleProduct(
      answer1,
      answer2,
      answer3,
      answer4,
      answer5,
      answer6,
      "sd",
      currentProduct.USU_CODREC,
      currentProduct.USU_SEQPRO
    );

    console.log(answer1, answer2, answer3, answer4, answer5, answer6);
  };

  return (
    <div>
      <form className="radio-form-product">
        <div>
          1. É obrigatório a apresentação de laudo/certificado de análise?
        </div>
        <div className="radios">
          <div>
            <input
              type="checkbox"
              id="Sim"
              name="clean"
              value={answer1}
              checked={answer1 === 1 ? true : false}
              disabled={currentProduct.USU_B1 > 0 ? true : false}
              onChange={() => {
                setAnswer1(1);
                if (answer1 != 2) {
                  setAnswer2(0);
                }
              }}
            />
            <label htmlFor="Sim">Sim</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="Não"
              value={answer1}
              checked={answer1 === 2 ? true : false}
              disabled={currentProduct.USU_B1 > 0 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer1(2);
                if (answer1 != 2) {
                  setAnswer2(0);
                }
              }}
            />
            <label htmlFor="Não">Não</label>
          </div>
        </div>
      </form>
      <form className="radio-form-product">
        <div>2. O produto possui laudo/certificado de análise?</div>
        <div className="radios">
          <div>
            <input
              type="checkbox"
              id="Sim"
              value={answer2}
              disabled={answer1 == 1 ? false : true}
              checked={answer2 === 1 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer2(1);
              }}
            />
            <label htmlFor="Sim">Sim</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="Não"
              value={answer2}
              disabled={answer1 == 1 ? false : true}
              checked={answer2 === 2 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer2(2);
              }}
            />
            <label htmlFor="Não">Não</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="Não aplicável"
              value={answer2}
              disabled={answer1 == 1 ? false : true}
              checked={answer2 === 3 ? true : false}
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
              type="checkbox"
              id="Sim"
              value={answer3}
              checked={answer3 === 1 ? true : false}
              disabled={currentProduct.USU_B3 > 0 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer3(1);
              }}
            />
            <label htmlFor="Sim">Sim</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="Não"
              value={answer3}
              checked={answer3 === 2 ? true : false}
              disabled={currentProduct.USU_B3 > 0 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer3(2);
              }}
            />
            <label htmlFor="Não">Não</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="Não aplicável"
              value={answer3}
              checked={answer3 === 3 ? true : false}
              disabled={currentProduct.USU_B3 > 0 ? true : false}
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
              type="checkbox"
              id="Sim"
              value={answer4}
              checked={answer4 === 1 ? true : false}
              disabled={currentProduct.USU_B4 > 0 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer4(1);
              }}
            />
            <label htmlFor="Sim">Sim</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="Não"
              value={answer4}
              checked={answer4 === 2 ? true : false}
              disabled={currentProduct.USU_B4 > 0 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer4(2);
              }}
            />
            <label htmlFor="Não">Não</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="Não aplicável"
              value={answer4}
              checked={answer4 === 3 ? true : false}
              disabled={currentProduct.USU_B4 > 0 ? true : false}
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
                type="checkbox"
                id="Sim"
                value={answer5}
                checked={answer5 === 1 ? true : false}
                disabled={currentProduct.USU_IDEPRO > 0 ? true : false}
                name="clean"
                onChange={() => {
                  setAnswer5(1);
                }}
              />
              <label htmlFor="Sim">Produto conforme</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Não"
                value={answer5}
                checked={answer5 === 2 ? true : false}
                disabled={currentProduct.USU_IDEPRO > 0 ? true : false}
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
                type="checkbox"
                id="Sim"
                value={answer6}
                checked={answer6 === 1 ? true : false}
                disabled={currentProduct.USU_IDEPRO > 0 ? true : false}
                name="clean"
                onChange={() => {
                  setAnswer6(1);
                }}
              />
              <label htmlFor="Sim">Devolução parcial</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Não"
                value={answer6}
                checked={answer6 === 2 ? true : false}
                disabled={currentProduct.USU_IDEPRO > 0 ? true : false}
                name="clean"
                onChange={() => {
                  setAnswer6(2);
                }}
              />
              <label htmlFor="Não">Devolução total</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="Não aplicável"
                value={answer6}
                checked={answer6 === 3 ? true : false}
                disabled={currentProduct.USU_IDEPRO > 0 ? true : false}
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
      <Button onClick={handleSubmit}>Salvar</Button>
    </div>
  );
};

export default ProjectForm;

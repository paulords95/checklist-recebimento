import React, { useState, useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";

import ENDPOINT from "../../../utils/endpoint";

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
  const [showAlert, setShowAlert] = useState(false);
  const [answersFromDb, setAnswersFromDb] = useState([]);

  useEffect(() => {
    setCurrentProduct(props.productObj);
    setAnswer1(0);
    setAnswer2(0);
    setAnswer3(0);
    setAnswer4(0);
    setAnswer5(0);
    setAnswer6(0);

    if (answersFromDb.USU_B1 > 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [props.productObj, answersFromDb]);

  useEffect(() => {
    (async () => {
      const { USU_CODREC, USU_SEQPRO } = currentProduct;
      try {
        const response = await fetch(
          `${ENDPOINT.ENDPOINT}/product/check-answers/rec=${USU_CODREC}&prod=${USU_SEQPRO}`,
          {
            headers: {
              Token: localStorage.token.toString(),
            },
          }
        );
        const itemData = await response.json();
        if (itemData[0]) {
          setAnswersFromDb(itemData[0]);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProduct, post]);

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
        `${ENDPOINT.ENDPOINT}/product/update-answers`,
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
      toast.error("Responda o item n?? 1");
      return;
    }
    if (answer2 < 1 && currentProduct.USU_B2 <= 0 && answer1 === 1) {
      toast.error("Responda o item n?? 2");
      return;
    }
    if (answer3 < 1 && currentProduct.USU_B3 <= 0) {
      toast.error("Responda o item n?? 3");
      return;
    }
    if (answer4 < 1 && currentProduct.USU_B4 <= 0) {
      toast.error("Responda o item n?? 4");
      return;
    }
    if (answer5 < 1 && currentProduct.USU_IDEPRO <= 0) {
      toast.error("Responda o item Identifica????o do Produto");
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
  };

  return (
    <div>
      <div>
        {showAlert ? (
          <Alert severity="warning">
            O formul??rio de produtos j?? foi preenchido!
          </Alert>
        ) : (
          ""
        )}
      </div>
      <form className="radio-form-product">
        <div>
          1. ?? obrigat??rio a apresenta????o de laudo/certificado de an??lise?
        </div>
        <div className="radios">
          <div>
            <input
              type="checkbox"
              id="Sim1"
              name="clean"
              value={answer1}
              checked={answer1 === 1 ? true : false}
              disabled={answersFromDb.USU_B1 > 0 ? true : false}
              onChange={() => {
                setAnswer1(1);
                if (answer1 !== 2) {
                  setAnswer2(0);
                }
              }}
            />
            <label htmlFor="Sim">Sim</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="N??o2"
              value={answer1}
              checked={answer1 === 2 ? true : false}
              disabled={answersFromDb.USU_B1 > 0 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer1(2);
                if (answer1 !== 2) {
                  setAnswer2(0);
                }
              }}
            />
            <label htmlFor="N??o">N??o</label>
          </div>
        </div>

        <div>2. O produto possui laudo/certificado de an??lise?</div>
        <div className="radios">
          <div>
            <input
              type="checkbox"
              id="Sim3"
              value={answer2}
              disabled={answer1 === 1 ? false : true}
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
              id="N??o4"
              value={answer2}
              disabled={answer1 === 1 ? false : true}
              checked={answer2 === 2 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer2(2);
              }}
            />
            <label htmlFor="N??o">N??o</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="N??o aplic??vel5"
              value={answer2}
              disabled={answer1 === 1 ? false : true}
              checked={answer2 === 3 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer2(3);
              }}
            />
            <label htmlFor="N??o">N??o aplic??vel</label>
          </div>
        </div>

        <div>
          3. Todas as embalagens est??o devidamente identificadas e o n??mero do
          lote, datas de fabrica????o e validade est??o de acordo com o laudo
          enviado?
        </div>
        <div className="radios">
          <div>
            <input
              type="checkbox"
              id="Sim6"
              value={answer3}
              checked={answer3 === 1 ? true : false}
              disabled={answersFromDb.USU_B3 > 0 ? true : false}
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
              id="N??o7"
              value={answer3}
              checked={answer3 === 2 ? true : false}
              disabled={answersFromDb.USU_B3 > 0 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer3(2);
              }}
            />
            <label htmlFor="N??o">N??o</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="N??o aplic??vel8"
              value={answer3}
              checked={answer3 === 3 ? true : false}
              disabled={answersFromDb.USU_B3 > 0 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer3(3);
              }}
            />
            <label htmlFor="N??o">N??o aplic??vel</label>
          </div>
        </div>

        <div>
          4. Existe a presen??a de embalagens furadas, rasgadas, molhadas ou
          sujas?
        </div>
        <div className="radios">
          <div>
            <input
              type="checkbox"
              id="Sim9"
              value={answer4}
              checked={answer4 === 1 ? true : false}
              disabled={answersFromDb.USU_B4 > 0 ? true : false}
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
              id="N??o10"
              value={answer4}
              checked={answer4 === 2 ? true : false}
              disabled={answersFromDb.USU_B4 > 0 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer4(2);
              }}
            />
            <label htmlFor="N??o">N??o</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="N??o aplic??vel11"
              value={answer4}
              checked={answer4 === 3 ? true : false}
              disabled={answersFromDb.USU_B4 > 0 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer4(3);
              }}
            />
            <label htmlFor="N??o">N??o aplic??vel</label>
          </div>
        </div>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          paddingBottom: "10px",
        }}
      >
        <div className="product-identification">Indentifica????o do Produto:</div>
        <div className="radios">
          <div>
            <input
              type="checkbox"
              id="Sim"
              value={answer5}
              checked={answer5 === 1 ? true : false}
              disabled={answersFromDb.USU_IDEPRO > 0 ? true : false}
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
              id="N??o"
              value={answer5}
              checked={answer5 === 2 ? true : false}
              disabled={answersFromDb.USU_IDEPRO > 0 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer5(2);
              }}
            />
            <label htmlFor="N??o">Produto n??o conforme</label>
          </div>
        </div>

        <div className="product-action">A????o Imediata:</div>
        <div className="radios">
          <div>
            <input
              type="checkbox"
              id="Sim"
              value={answer6}
              checked={answer6 === 1 ? true : false}
              disabled={answersFromDb.USU_IDEPRO > 0 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer6(1);
              }}
            />
            <label htmlFor="Sim">Devolu????o parcial</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="N??o"
              value={answer6}
              checked={answer6 === 2 ? true : false}
              disabled={answersFromDb.USU_IDEPRO > 0 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer6(2);
              }}
            />
            <label htmlFor="N??o">Devolu????o total</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="N??o aplic??vel"
              value={answer6}
              checked={answer6 === 3 ? true : false}
              disabled={answersFromDb.USU_IDEPRO > 0 ? true : false}
              name="clean"
              onChange={() => {
                setAnswer6(3);
              }}
            />
            <label htmlFor="N??o">Outros</label>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={showAlert}
          onClick={() => {
            if (showAlert) {
              toast.warning("O form??rio para este produto j?? foi preenchido!");
            } else {
              handleSubmit();
            }
          }}
        >
          Salvar Item
        </Button>
      </div>
    </div>
  );
};

export default ProjectForm;

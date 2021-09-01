const router = require("express").Router();
require("dotenv").config();

const { db } = require("../db");

const authorization = require("../middleware/authorization");

const formatDate = (date) => {
  const d = date;
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

  const formatBr = d
    .toLocaleDateString("pt-BR", options)
    .split("-")
    .reverse()
    .join("/");

  return formatBr;
};

router.post("/vehicle-information/", authorization, async (req, res) => {
  try {
    const { recNum, cleaning, sealInput, seal, trailer, vehicle } = req.body;

    const sql =
      "UPDATE USU_T158 SET USU_TIPVEI=:vehicle, USU_TIPCAR=:trailer, USU_POSLAC=:seal, USU_NROLAC=:sealInput, USU_LPZVEI=:cleaning WHERE USU_CODREC = :recNum";

    db(sql, vehicle, trailer, seal, sealInput, cleaning, recNum)
      .then((response) => {
        res.json(response);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    res.json(error.message);
  }
});

router.post("/vehicle-and-product/", authorization, async (req, res) => {
  try {
    const { seqRec, form1, form2, form3, form4, form5 } = req.body;

    const sql =
      "UPDATE USU_T158 SET USU_D5=:form1, USU_D6=:form2, USU_D7=:form3, USU_D8=:form4, USU_D9=:form5 WHERE USU_CODREC = :seqRec";

    db(sql, form1, form2, form3, form4, form5, seqRec)
      .then((response) => {
        res.json(response);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log(error.message);
  }
});

router.get(
  "/product-conditions/seq=:seqRec",
  authorization,
  async (req, res) => {
    try {
      const { seqRec } = req.params;

      const sql = "select * from usu_t159 where usu_codrec = :seqRec";

      db(sql, seqRec)
        .then((response) => {
          res.json(response);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error.message);
    }
  }
);

module.exports = router;

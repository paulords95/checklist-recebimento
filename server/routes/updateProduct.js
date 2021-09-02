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

router.get(
  "/check-answers/rec=:codrec&prod=:seqpro",
  authorization,
  async (req, res) => {
    const { codrec, seqpro } = req.params;
    if (codrec == "undefined" || seqpro == "undefined") {
      return;
    }
    try {
      const sql =
        "select usu_b1, usu_b2, usu_b3, usu_b4, usu_idepro,  usu_acaime ,usu_codpro from usu_t159 where usu_codrec = :codrec AND usu_seqpro = :seqpro";

      db(sql, "select", codrec, seqpro)
        .then((response) => {
          res.json(response);
        })
        .catch((e) => {
          res.json(e);
        });
    } catch (error) {
      console.log(error.message);
    }
  }
);

router.post("/update-answers/", authorization, async (req, res) => {
  try {
    const { b1, b2, b3, b4, idepro, acaime, outaim, codrec, seqpro } = req.body;
    const sql =
      "UPDATE USU_T159 SET USU_B1=:b1, USU_B2=:b2, USU_B3=:b3, USU_B4=:b4, USU_IDEPRO=:idepro, USU_ACAIME=:acaime, USU_OUTAIM=:outaim WHERE USU_CODREC=:codrec AND USU_SEQPRO=:seqpro";

    db(sql, "update", b1, b2, b3, b4, idepro, acaime, outaim, codrec, seqpro)
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

module.exports = router;

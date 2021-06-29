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

router.post("/update-answers/", authorization, async (req, res) => {
  try {
    const { b1, b2, b3, b4, idepro, acaime, outaim, codrec, seqpro } = req.body;

    const sql =
      "UPDATE USU_T159 SET USU_B1=:b1, USU_B2=:b2, USU_B3=:b3, USU_B4=:b4, USU_IDEPRO=:idepro, USU_ACAIME=:acaime, USU_OUTAIM=:outaim WHERE USU_CODREC=:codrec AND USU_SEQPRO=:seqpro";

    const updateRow = await db(
      sql,
      b1,
      b2,
      b3,
      b4,
      idepro,
      acaime,
      outaim,
      codrec,
      seqpro
    );

    res.json(updateRow);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;

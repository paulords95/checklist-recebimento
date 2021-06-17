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

    const updateRow = await db(
      sql,
      vehicle,
      trailer,
      seal,
      sealInput,
      cleaning,
      recNum
    );
    if (updateRow.rowsAffected > 0) {
      res.json(true);
    } else {
      res.json(req.body);
    }
  } catch (error) {
    res.json(error.message);
  }
});

router.post("/vehicle-and-product/", authorization, async (req, res) => {
  try {
    const { seqCheck, form1, form2, form3, form4, form5 } = req.body;

    const sql =
      "UPDATE USU_T158 SET USU_D5=:form1, USU_D6=:form2, USU_D7=:form3, USU_D8=:form4, USU_D9=:form5 WHERE USU_CODREC = :seqCheck";

    const updateRow = await db(
      sql,
      form1,
      form2,
      form3,
      form4,
      form5,
      seqCheck
    );

    console.log(updateRow);
    const sql1 = "select * from usu_t158 where usu_codrec = :seqCheck1";
    const result = await db(sql1, seqCheck);
    console.log(result);
    res.json(req.body);
  } catch (error) {}
});

module.exports = router;

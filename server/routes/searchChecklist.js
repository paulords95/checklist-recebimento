const router = require("express").Router();
require("dotenv").config();

const { db } = require("../db");

const authorization = require("../middleware/authorization");

router.get("/search/chklst=:seqChk", authorization, async (req, res) => {
  try {
    const sql = "select * from usu_t158 where usu_codrec = :seq";

    const result = await db(sql, req.params.seqChk);
    const response = [];
    if (result.rows) {
      for (let i of result.rows) {
        response.push({
          codRec: i[0],
          datRec: i[1],
          codRev: i[2],
          tipVei: i[3],
          tipCar: i[4],
          posLac: i[5],
          nroLac: i[6],
          lpzVei: i[7],
          quesOne: i[8],
          quesTwo: i[9],
          quesThree: i[10],
          quesFour: i[11],
          quesFive: i[18],
          datEmi: i[14],
        });
      }
    }

    if (response.length > 0) {
      res.json(response[0]);
    } else {
      res.json("Código de recebimento não encontrado");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});

router.post("/anwser/", authorization, async (req, res) => {
  try {
    const { seqCheck, form1, form2, form3, form4, form5 } = req.body;

    const sql =
      "UPDATE USU_T158 SET USU_D5=:form1, USU_D6=:form2, USU_D7=:form3, USU_D8=:form4, USU_D9=:form5 WHERE USU_CODREC = :seqCheck";

    const result = await db(sql, form1, form2, form3, form4, form5, seqCheck);

    console.log(result);

    res.json(req.body);
  } catch (error) {}
});

module.exports = router;

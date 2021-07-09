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
    const { seqRec, form1, form2, form3, form4, form5 } = req.body;

    const sql =
      "UPDATE USU_T158 SET USU_D5=:form1, USU_D6=:form2, USU_D7=:form3, USU_D8=:form4, USU_D9=:form5 WHERE USU_CODREC = :seqRec";

    const updateRow = await db(sql, form1, form2, form3, form4, form5, seqRec);

    if (updateRow.rowsAffected > 0) {
      res.json(true);
    } else {
      res.json(updateRow);
    }
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

      const selectRow = await db(sql, seqRec);
      const products = [];

      if (selectRow.rows) {
        if (selectRow.rows.length > 0) {
          for (let row of selectRow.rows) {
            const prodname = await db(
              `SELECT DESPRO FROM E075PRO WHERE CODPRO = ${row[2]}`
            );
            products.push({
              USU_CODREC: row[0],
              USU_SEQPRO: row[1],
              USU_CODPRO: prodname.rows[0][0],
              USU_CODDER: row[3],
              USU_LOTFOR: row[4],
              USU_CODLOT: row[5],
              USU_DATVAL: formatDate(row[6]),
              USU_NUMNFC: row[7],
              USU_CODFOR: row[8],
              USU_UNIMED: row[9],
              USU_QTDREC: row[10],
              USU_B1: row[11],
              USU_B2: row[12],
              USU_B3: row[13],
              USU_B4: row[14],
              USU_IDEPRO: row[15],
              USU_ACAIME: row[16],
              USU_OUTAIM: row[17],
            });
          }
        }
        {
          products.push(false);
        }
      }
      res.json(products);
    } catch (error) {
      console.log(error.message);
    }
  }
);

module.exports = router;

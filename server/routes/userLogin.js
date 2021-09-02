const router = require("express").Router();

const jwtGen = require("../utils/jwtGen");
const authorization = require("../middleware/authorization");
const { db } = require("../db");

router.get("/get-users", async (req, res) => {
  const sql =
    "select USU_NOMUSU, USU_CODERP from usu_t522 where usu_codccu = '831' OR usu_coderp = '17'  order by 1";
  db(sql, "select")
    .then((response) => {
      res.json(response);
    })
    .catch((e) => {
      res.json(e);
    });
});

router.post("/login-user", async (req, res) => {
  try {
    const { user } = req.body;

    const token = jwtGen(user);

    res.json({
      name: user,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(false);
  }
});

module.exports = router;

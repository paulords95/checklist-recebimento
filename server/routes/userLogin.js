const router = require("express").Router();

const jwtGen = require("../utils/jwtGen");
const authorization = require("../middleware/authorization");
const { db } = require("../db");

router.get("/get-users", async (req, res) => {
  const sql =
    "select codusu,nomusu from e099usu WHERE CODEMP=1 and usu_chkrec='S' order by 2";
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

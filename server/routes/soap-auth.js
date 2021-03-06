const router = require("express").Router();
const soap = require("soap");
require("dotenv").config();

const jwtGen = require("../utils/jwtGen");
const authorization = require("../middleware/authorization");


const {SOAP_ENDPOINT} = require('../credentials')

router.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;

    soap.createClient(SOAP_ENDPOINT, function (err, client) {
      console.log(err);
      if (client) {
        client.GetUser(
          {
            user: user,
            password: password,
            encryption: "0",
            parameters: "",
          },

          function (err, result) {
            if (err) return console.log(err);
            let response = "";
            if (result.result.erroExecucao) {
              response = ["Credenciais inválidas"];
            } else if (result.result.codUsu) {
              response = [];
              const token = jwtGen(result.result.codUsu);

              response.push({
                codUsu: result.result.codUsu,
                nomCom: result.result.nomCom,
                nomUsu: result.result.nomUsu,
                token: token,
              });
            } else {
              response = "Erro desconhecido";
            }

            res.json(response[0]);
          }
        );
      }
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

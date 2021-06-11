const router = require("express").Router();
const soap = require("soap");
require("dotenv").config();

router.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;

    soap.createClient(process.env.SOAP_ENDPOINT, function (err, client) {
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
            response = "Credenciais inválidas";
          } else if (result.result.codUsu) {
            response = result.result;
          } else {
            response = "Erro desconhecido";
          }

          res.json(response);
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

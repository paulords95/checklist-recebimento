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
          if (result.result.erroExecucao) {
            res.json("Credenciais inválidas");
          } else {
            res.json(result.result);
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

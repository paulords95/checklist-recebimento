const soap = require("soap");

const { SOAP_ENDPOINT } = require("../credentials");

try {
  const user = "paulo.silva";
  const password = "1995!Oluap";

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

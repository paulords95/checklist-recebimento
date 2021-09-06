const Service = require("node-windows").Service;
const svc = new Service({
  name: "Server - ChecklistRecebimento",
  description: "Server - ChecklistRecebimento",
  script: "C:\\local-apps\\checklist-recebimento\\server\\index.js",
  env: {
    value: process.env.USER,
  },
});

svc.on("install", function () {
  svc.start();
  console.log("Serviço instalado");
});
svc.install();

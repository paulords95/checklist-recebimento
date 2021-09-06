var Service = require("node-windows").Service;
var svc = new Service({
  name: "Server - ChecklistRecebimento",
  description: "Server - ChecklistRecebimento",
  script: "C:\\local-apps\\checklist-recebimento\\server\\index.js",
});
svc.on("uninstall", function () {
  console.log("Uninstall complete.");
});
svc.uninstall();

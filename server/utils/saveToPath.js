const path = require("path");
const mv = require("mv");
const fs = require("fs");

const currentDate = require("../date");

const savePicToPath = (name) => {
  return new Promise((resolve, reject) => {
    const currentPath = path.join(__dirname, "../", `${name}.png`);
    const destinationPath = path.join(
      `\\\\qcolweb01.quimtia.net.br\\c$\\FotosRecebimento\\${currentDate()}`,
      `${name}.jpg`
    );

    fs.access(
      `\\\\qcolweb01.quimtia.net.br\\c$\\FotosRecebimento\\${currentDate()}`,
      (error) => {
        if (!error) {
          mv(currentPath, destinationPath, function (err) {
            if (err) {
              resolve("Nenhuma foto");
            } else {
              resolve("Salvo");
            }
          });
        } else {
          fs.mkdir(
            path.join(
              "\\\\qcolweb01.quimtia.net.br\\c$\\FotosRecebimento",
              `${currentDate()}`
            ),
            (err) => {
              if (err) {
                reject(console.error(err));
              }
              mv(currentPath, destinationPath, function (err) {
                if (err) {
                  console.log(err);
                } else {
                  resolve("Salvo");
                }
              });
            }
          );
        }
      }
    );
  });
};

module.exports = savePicToPath;


const router = require("express").Router();

const fs = require("fs");

const date = () => {
    const day = () => {
        const d = new Date();
        const options = { day: "2-digit" };
        const formatBr = d.toLocaleDateString("pt-BR", options)
        return formatBr
    };

    const month = () => {
        const d = new Date();
        const options = { month: "2-digit" };
        const formatBr = d.toLocaleDateString("pt-BR", options)
        return formatBr
    };

    const year = () => {
        const d = new Date();
        const options = { year: "numeric" };
        const formatBr = d.toLocaleDateString("pt-BR", options)
        return formatBr
    };

    return (day() + month() + year())
};

const basePath = `\\\\qcolweb01.quimtia.net.br\\c$\\FotosRecebimento\\${date()}\\`;

const fileExists = async (file) => {
    try {
        await fs.promises.access(file);
        return true;
    } catch (error) {
        return false;
    }
};

router.get("/saved/:seq", async (req, res) => {
    const { seq } = req.params;
    let name = `${seq}`;
    let file = `${basePath}${name}.jpg`;
    res.json(await fileExists(file));
});

module.exports = router;
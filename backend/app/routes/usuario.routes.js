module.exports = app => {
    const usuarioController = require("../controllers/usuario.controller.js");

    //caso ja tenha cadastro
    app.post("/sigin", usuarioController.sigIn);
    //caso nao tenha cadastro
    app.post("/sigup", usuarioController.sigUp);
}
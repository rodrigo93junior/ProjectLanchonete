module.exports = app => {
    const usuarioController = require("../controllers/usuario.controller.js");
    
    //caso já tenha cadastro
    app.post("/sigin", usuarioController.sigIn);
    //caso não tenha cadastro
    app.post("/sigup", usuarioController.sigUp);
}
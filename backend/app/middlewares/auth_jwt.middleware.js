const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config.js");
const usuarioModel = require("../models/usuario.model.js");

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({
            message: "Não possui token para autenticação!"
        });
    } else {
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err){
                ReadableStream.status(401).send({
                    message: "Não autorizado!"
                })
            } else {
                console.log("Usuario logado: ");
                req.usuarioId = decoded.id;
                next(); //executa o proximo método da rota
            }
        })
    }
}
isAdmin = (req, res, next) => {
    usuarioModel.findById(req.usuarioId, (err, data) =>{
        if(data.tipo == 1){
            next();
        } else {
            res.status(403).send({
                message: "Você não possui privilégios de Administrador!"
            })
        }
    })
}
isBalcao = (req, res, next) => {
    usuarioModel.findById(req.usuarioId, (err, data) =>{
        if(data.tipo == 2){
            next();
        } else {
            res.status(403).send({
                message: "Você não possui privilégios de Balconista!"
            })
        }
    })
}
isCozinha = (req, res, next) => {
    usuarioModel.findById(req.usuarioId, (err, data) =>{
        if(data.tipo == 3){
            next();
        } else {
            res.status(403).send({
                message: "Você não possui privilégios de Cozinha!"
            })
        }
    })
}

module.exports = {
    verifyToken: verifyToken,
    isAdmin : isAdmin,
    isBalcao : isBalcao,
    isCozinha : isCozinha
}
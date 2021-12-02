const bcrypt = require("bcryptjs");
const usuarioModel = require("../models/usuario.model.js");

const config = require("../configs/auth.config");
const jwt = require("jsonwebtoken");

exports.sigUp = (req, res) => {
    if (!req.body.email || !req.body.senha || !req.body.tipo ){
        res.status(400).send({
            message: "Email, senha ou tipo não enviados."
        })
    } else {
        const usuario = new usuarioModel({
            email: req.body.email,
            senha: bcrypt.hashSync(req.body.senha, 8),
            tipo: req.body.tipo
        })

        usuarioModel.create(usuario, (err, data) =>{
            if (err) {
                res.status(500).send({
                    message: err.message || "Ocorreu um erro inesperado!"
                })
            } else {
                res.send(data);
            }
        })
    }
}

exports.sigIn = (req, res) => {
    usuarioModel.findByEmail(req.body.email, (err, data) => {
        if (err) {
            if (err == "not_found"){
                res.status(404).send({
                    message: "Não foi encontrado usuario com o email digitado"
                })
            } else {
                console.log(err);
                res.status(500).send({
                    message: "Ocorreu um erro ao buscar o email do usuario no sistema!"
                })
            }
        } else {
            let validPassword = bcrypt.compareSync(req.body.senha, data.senha);
            if (!validPassword){
                res.status(401).send({
                    accessToken : null,
                    message: "Senha inválida!"
                })
            } else {                        /// Faltou o ESSSEEEE
                let token = jwt.sign({id: data.idusuarios}, config.secret, {
                    expiresIn : 86400 //24 horas
                });

                res.status(200).send({
                    accessToken: token,
                    id: data.idusuarios, //faltou o ESSSEEEEEE
                    email: data.email,
                    tipo: data.tipo
                })
            }
        }
    })
}
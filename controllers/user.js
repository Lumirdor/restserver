const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const emailExiste = require('../helpers/db-validators');


const usuariosGet = async(req = request, res = response) => {
    //const {q,nombre, apy = "No apy"} = req.query;//req.params obtiene todos los parametros
    const {limite = 5, desde = 0} = req.query;
    // const usuarios = await Usuario.find({estado: true})
    // .skip(desde)
    // .limit(limite);

    // const total = await Usuario.countDocuments({estado: true});

    const [total, usuarios] = await Promise.all([
        Usuario.count({estado: true}),
        Usuario.find({estado: true})
            .skip(desde)
            .limit(limite)
    ])

    res.json({
        
        total,
        usuarios
        // q,
        // nombre,
        // apy,
        // msg: 'get APP - controlador'
    })
};

const usuariosPost = async (req, res) => {
    //const body = req.body;
    //cont {botActivo} = req.body// true/false.
    const{ nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    //const usuario = new Usuario(body);

    //Encriptar la contrase
    const salt = bcryptjs.genSaltSync(10);//Ver documentacion bcryptjs
    usuario.password = bcryptjs.hashSync( password, salt);
    //Guardar en BD

    await usuario.save();
    //const {nombre, pass} = req.body;
    res.json({
             usuario,
            //existeEmail
            //nombre,
            //pass
    })
};

const usuariosPut = async(req, res = response) => {
    /const {nombre, pass} = req.body;/
    const { id }= req.params;
    const {_id, password, google, correo, ...resto} = req.body;
    //const usuario = new Usuario({nombre, correo, password, rol});
    
    //TODO Validar contra base de datos

    if(password){
        //Encriptar la contra
        const salt = bcryptjs.genSaltSync(10);//Ver documentacion bcryptjs
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});
    
    res.json({
        //msg: 'put APP - controlador',
        //nombre,
        //pass,
        usuario,
        //id
    })
};

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch APP - controlador'
    })
};

const usuariosDelete = async (req, res) => {
    const { id } = req.params;

    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        //msg: 'delete APP - controlador',
        //id
        usuario
    })
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
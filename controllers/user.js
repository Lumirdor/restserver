const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const {q,nombre, apy = "No apy"} = req.query;//req.params obtiene todos los parametros
    res.json({
        q,
        nombre,
        apy,
        msg: 'get APP - controlador'
    })
};

const usuariosPost = (req, res) => {
    const {nombre, pass} = req.body;
    res.json({
        msg: 'post APP - controlador',
        nombre,
        pass
    })
};

const usuariosPut = (req, res) => {
    const {nombre, pass} = req.body;
    const { id }= req.params;
    
    res.json({
        msg: 'put APP - controlador',
        nombre,
        pass,
        id
    })
};

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch APP - controlador'
    })
};

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete APP - controlador'
    })
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
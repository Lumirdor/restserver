const { Router } = require ('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/user');
const {check} = require('express-validator');
const {validarCampos} = require('../middleweares/validar-campos');
const Role = require('../models/role');

const esRoleValido = require('../helpers/db-validators');
const emailExiste = require('../helpers/db-validators');
const existeUsuarioID = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    //check('id', 'No es un ID válido').exists({ checkNull: true }).bail().isMongoId().bail(),
    validarCampos,
    check('id').custom(existeUsuarioID),
    check('rol',async(rol = '') => {
        const existeRol = await Role.findOne({rol});
        if(existeRol != null){
            throw new Error(`El rol ${ rol } no esta registrado en la BD`);
        }
    }),//.custom(esRoleValido),
    validarCampos,
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({ min:6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo',async(correo ='') =>{
        const existeEmail = await Usuario.findOne({correo});
       if(existeEmail != null){
           throw new Error (`El correo: ${ correo},ya esta registrado`);
       }
   }),//.custom(emailExiste),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol',async(rol = '') => {
        const existeRol = await Role.findOne({rol});
        if(existeRol != null){
            throw new Error(`El rol ${ rol } no esta registrado en la BD`);
        }
    }),//.custom(esRoleValido),
    validarCampos
],usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioID),
    validarCampos
], usuariosDelete);

module.exports = router;

/*
{
role: SUPER_USER
}

*/
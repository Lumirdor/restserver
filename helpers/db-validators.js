const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(existeRol != null){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
}

const emailExiste = async(correo ='') =>{
     const existeEmail = await Usuario.findOne({correo});
    if(existeEmail != null){
        throw new Error (`El correo: ${ correo},ya esta registrado`);
    }
}


const existeUsuarioID = async(id) =>{
    const existeUsuario = await Usuario.findById(id);//findOne({ _id: id })
   //if(existeUsuario != null){
    if(!existeUsuario){
       throw new Error (`El usuario con Id: ${ id },no existe`);
   }
}



// module.exports = {
//     esRoleValido,
//     emailExiste,
//     existeUsuarioID
// }


module.exports = esRoleValido;
module.exports = emailExiste;
module.exports = existeUsuarioID;

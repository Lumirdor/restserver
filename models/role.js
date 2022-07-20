const { Schema, model } = require ( 'mongoose' );

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol del usuario es obligatorio']
    }
});

module.exports = model('Role', RoleSchema);
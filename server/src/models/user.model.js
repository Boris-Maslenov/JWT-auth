const {Schema, model} = require('mongoose');

// Schema:
const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, required: true},
    activationLink: {type: String},
});

// Model:
const UserModel = model('User', UserSchema);

module.exports = {UserModel};
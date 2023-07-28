const {Schema, model} = require('mongoose');

// Schema:
const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
});

// Model:
const TokenModel = model('User', UserSchema);

module.exports = {TokenModel};
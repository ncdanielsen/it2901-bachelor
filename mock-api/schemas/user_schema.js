const mongoose = require("mongoose");
/*
const Schema = mongoose.Schema;

module.exports.user_schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true},
    password: {type: String, required: true}
});
*/
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    superuser: { type: "boolean", default: false}, 
    admin: {type: "boolean", default: false}
})
module.exports = mongoose.model("user_schema", userSchema, "users_TEST");
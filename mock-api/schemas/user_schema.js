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
    superuser: boolean
})
module.exports = mongoose.model("user_schema", userSchema, "users_TEST");
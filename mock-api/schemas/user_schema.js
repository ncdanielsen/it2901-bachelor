const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true}, 
    superuser: { type: "boolean", default: false},                                   
    admin: {type: "boolean", default: false}      
})
module.exports = mongoose.model("user_schema", userSchema, "users_TEST");

/**
 * _id:         mongoose.Schema.Types.ObjectId          Description: Automatic and unique id created by mongoose.
 * email:       String                                  Description: The users email in string format. Is unique, and required for creating a user.
 * password:    String                                  Description: The users password. Stored in plaintext. Required in order to create user.
 *                                                                   No real passwords should currently be used when creating user.
 * superuser:   boolean                                 Description: Boolean meant to indicate if a user can view restricted data or not , however, 
 *                                                                   this functionality is currently not implemented. Is still used in "../users/profile" function. 
 * admin:       boolean                                 Description: Boolean meant to indicate if a user should have admin powers, however, 
 *                                                                   this functionality is currently not implemented. Is still used in "../users/profile" function.  
 * 
 */
    

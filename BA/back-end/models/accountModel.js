const mongoose = require('mongoose');

const accountSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:[true, "Pleas add the username"],
        },
        email:{
            type: String,
            required: [true, "Please add the email"],
            unique: [true, "Email addess already taken"],
        },
        password:{
            type: String,
            required: [true, "Please add the password"],
        },
        isAdmin:{
            type: Boolean,
            required : true,
            default: false
        }
    },
    {
        timestamps: true,
    }
    
);

module.exports = Account =  mongoose.model("Account", accountSchema);
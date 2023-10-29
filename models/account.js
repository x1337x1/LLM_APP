const { Schema } = require("mongoose");

const accountSchema = new Schema({
    email: {
        Type: String,
        required: true,
        unique: true
    },
    password: {
        Type: String,
        required: true,

    },
    name: {
        Type: String,
        required: true
    }
},
    { timestamps: true }
);
module.exports = accountSchema;

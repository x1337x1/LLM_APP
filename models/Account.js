const { Schema } = require("mongoose");

const accountSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    tenantId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);
module.exports = accountSchema;

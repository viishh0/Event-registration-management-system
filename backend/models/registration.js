const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({

    userName: {
        type: String,
        required:true
    },

    ticketCount: {
        type: Number,
        required:true
    },

     contact: {
        type: String,
        required:true
    },

     paymentStatus: {
        type: String,
        enum:["PAID","UNPAID"],
        required:true
    }


});


module.exports = mongoose.model("Registration", registrationSchema);
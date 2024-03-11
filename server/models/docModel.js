const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
    
    rev_id: {
        type: Number,
        default: 1
    },
    document: {
        type:[String]
    },
    pendingChanges: {
        type: [String]
    },
    access : [String]
})

const Doc = mongoose.model("Doc", docSchema);

module.exports = Doc;
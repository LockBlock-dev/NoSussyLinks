const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        term: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Term", schema);

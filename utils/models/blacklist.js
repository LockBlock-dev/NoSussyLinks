const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        id: { type: String, unique: true },
        username: { type: String },
        reason: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Blacklist", schema);

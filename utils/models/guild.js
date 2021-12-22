const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        id: { type: String, unique: true },
        name: { type: String },
        logsChannel: { type: String, default: null },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Guild", schema);

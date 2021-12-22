const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        id: { type: String, unique: true },
        name: { type: String },
        left: { type: Boolean, default: false },
        logsChannel: { type: String, default: null },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Guild", schema);

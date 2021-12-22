const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        hash: String,
        domain: String,
        online: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Domain", schema);

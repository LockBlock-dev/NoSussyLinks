const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: { type: String },
    count: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model("Stats", schema);

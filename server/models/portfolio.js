const mongoose = require("mongoose"),
    { Schema } = mongoose,
    Stock = require("./stock"),

    portfolioSchema = new Schema({
        stocks: [{ type: Schema.Types.ObjectId, ref: Stock, unique: true }],
    },
        {
            timestamps: true,
        });

module.exports = mongoose.model("Portfolio", portfolioSchema);
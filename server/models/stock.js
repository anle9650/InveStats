const mongoose = require("mongoose"),
    { Schema } = mongoose,

    stockSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        symbol: {
            type: String,
            required: true,
        },
        transactions: [
            {
                datetime: {
                    type: Date,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                shares: {
                    type: Number,
                    required: true,
                },
            }
        ]
    },
        {
            toObject: {
                virtuals: true
            },
            toJSON: {
                virtuals: true
            },
            timestamps: true,
        });

stockSchema.path('transactions').validate(transactions => {
    return transactions.reduce((totalShares, transaction) => totalShares + transaction.shares, 0) >= 0;
}, 'Total number of shares cannot be less than 0.');

stockSchema.virtual("shares")
    .get(function () {
        return this.transactions.reduce((totalShares, transaction) => totalShares + transaction.shares, 0);
    });
    
module.exports = mongoose.model("Stock", stockSchema);
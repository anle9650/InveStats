const mongoose = require("mongoose"),
    { Schema } = mongoose,

    stockSchema = new Schema({
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

stockSchema.virtual("totalCost")
    .get(function () {
        return this.transactions.reduce((totalCost, transaction) => totalCost + transaction.price * transaction.shares, 0);
    });
stockSchema.virtual("shares")
    .get(function () {
        return this.transactions.reduce((totalShares, transaction) => totalShares + transaction.shares, 0);
    });
stockSchema.virtual("averageCost")
    .get(function () {
        if (this.shares === 0) return this.totalCost;
        return this.totalCost / this.shares;
    });

module.exports = mongoose.model("Stock", stockSchema);
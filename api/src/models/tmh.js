const mongoose = require('mongoose');

const tmhSchema = new mongoose.Schema(
    {
        item: {
            type: String,
        },
        value: {
            type: String,
        },
        result: {
            type: String,
        },
        result_detail: {
            type: String,
        },
        literature_detail: {
            type: String,
        },
        source: {
            type: String,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        approver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        status: {
            type: Number,
        },
    },
    {
        timestamps: true,
    },
);

tmhSchema.index({ item: 1, result: 1 }, { unique: true });
const Tmh = mongoose.model('Tmh', tmhSchema);

module.exports = Tmh;

const mongoose = require("mongoose");

const nccnSchema = new mongoose.Schema(
    {
        gene: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gene",
            required: true,
        },
        cancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cancer",
        },
        result: {
            type: String,
        },
        remark: {
            type: String,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        updator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        approver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

nccnSchema.index({ gene: 1, cancer: 1 }, { unique: true });
const NccnGene = mongoose.model("NccnGene", nccnSchema);

module.exports = NccnGene;

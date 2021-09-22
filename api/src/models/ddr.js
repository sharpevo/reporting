const mongoose = require("mongoose");

const ddrClassSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            unique: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const DdrClass = mongoose.model("DdrClass", ddrClassSchema);

const ddrSchema = new mongoose.Schema(
    {
        gene: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gene",
        },
        ddrclass: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DdrClass",
        },
        result: {
            type: String,
        },
        result_detail: {
            type: String,
        },
        literature: {
            type: String,
        },
        source: {
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

ddrSchema.index({ gene: 1, result: 1 }, { unique: true });
const Ddr = mongoose.model("Ddr", ddrSchema);

module.exports = {
    DdrClass,
    Ddr,
};

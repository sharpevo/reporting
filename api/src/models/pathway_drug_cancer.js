const mongoose = require("mongoose");

const pdcSchema = new mongoose.Schema(
    {
        pathway: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pathway",
        },
        drugs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Drug",
            },
        ],
        cancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cancer",
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

pdcSchema.index({ pathway: 1, drug: 1, cancer: 1 }, { unique: true });

const PathwayDrugCancer = mongoose.model("PathwayDrugCancer", pdcSchema);

module.exports = PathwayDrugCancer;

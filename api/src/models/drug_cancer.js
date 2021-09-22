const mongoose = require("mongoose");

const drugCancerSchema = new mongoose.Schema(
    {
        drug: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drug",
        },
        cancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cancer",
        },
        medical_evidence: {
            type: String,
        },
        source: {
            type: String,
        },
        literature: {
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

drugCancerSchema.index({ drug: 1, cancer: 1 }, { unique: true });

const DrugCancer = mongoose.model("DrugCancer", drugCancerSchema);

module.exports = DrugCancer;

const mongoose = require("mongoose");

const mdboSchema = new mongoose.Schema(
    {
        mutation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MutationCancer",
        },
        drug: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Drug",
        },
        evidence_level: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "EvidenceLevel",
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

mdboSchema.index({ mutation: 1, drug: 1 }, { unique: true });

const MutationDrugBenefitOther = mongoose.model(
    "MutationDrugBenefitOther",
    mdboSchema
);

module.exports = MutationDrugBenefitOther;

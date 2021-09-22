const mongoose = require("mongoose");

const mcSchema = new mongoose.Schema(
    {
        mutation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MutationCancer",
        },
        clinical_or_drug: {
            type: String,
            required: true,
        },
        evidence_level: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "EvidenceLevel",
        },
        evidence: {
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

mcSchema.index({ mutation: 1, clinical_or_drug: 1 }, { unique: true });

const MutationClinical = mongoose.model("MutationClinical", mcSchema);

module.exports = MutationClinical;

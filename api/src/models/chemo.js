const mongoose = require("mongoose");

const drugClassSchema = new mongoose.Schema(
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

const DrugClass = mongoose.model("DrugClass", drugClassSchema);

const chemoSchema = new mongoose.Schema(
    {
        gene: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gene",
        },
        rs: {
            type: String,
        },
        chr: {
            type: String,
        },
        locus: {
            type: String,
        },
        ref: {
            type: String,
        },
        drugclass: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DrugClass",
        },
        drug: {
            type: String,
        },
        type: {
            type: String,
        },
        evidence_level: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "EvidenceLevel",
        },
        cancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cancer",
        },
        race: {
            type: String,
        },
        genotype: {
            type: String,
        },
        description: {
            type: String,
        },
        description_ref: {
            type: String,
        },
        toxicity: {
            type: String,
        },
        effectiveness: {
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

chemoSchema.index({ rs: 1, drug: 1, genotype: 1 }, { unique: true });
const Chemo = mongoose.model("Chemo", chemoSchema);

module.exports = {
    DrugClass,
    Chemo,
};

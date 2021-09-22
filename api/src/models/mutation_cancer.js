const mongoose = require("mongoose");

const mutationClassSchema = new mongoose.Schema(
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

const MutationClass = mongoose.model("MutationClass", mutationClassSchema);

const mutationCancerSchema = new mongoose.Schema(
    {
        mutation: {
            type: String,
        },
        gene_annot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GeneAnnot",
        },
        transcript: {
            type: String,
        },
        position: {
            type: String,
        },
        snp: {
            type: String,
        },
        mutationclass: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MutationClass",
        },
        mutation_detail: {
            type: String,
        },
        cancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cancer",
        },
        drug_info: {
            type: String,
        },
        evidence: {
            type: String,
        },
        literature: {
            type: String,
        },
        creator: {
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

mutationCancerSchema.index({ mutation: 1, cancer: 1 }, { unique: true });
mutationCancerSchema.set("toObject", { virtuals: true, getters: true });
mutationCancerSchema.set("toJSON", { virtuals: true, getters: true });

const MutationCancer = mongoose.model("MutationCancer", mutationCancerSchema);

module.exports = {
    MutationClass,
    MutationCancer,
};

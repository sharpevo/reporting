const mongoose = require("mongoose");

const hrdtSchema = new mongoose.Schema(
    {
        mutation_type: {
            type: String,
        },
        chr: {
            type: String,
        },
        start: {
            type: String,
        },
        end: {
            type: String,
        },
        ref: {
            type: String,
        },
        alt: {
            type: String,
        },
        vcf_mut: {
            type: String,
        },
        func_refgene: {
            type: String,
        },
        gene_name: {
            type: String,
        },
        gene_detail_refgene: {
            type: String,
        },
        exonic_func_refgene: {
            type: String,
        },
        aachange_refgene: {
            type: String,
        },
        func_hgvs: {
            type: String,
        },
        aachange_hgvs: {
            type: String,
        },
        cytoband: {
            type: String,
        },
        avsnp150: {
            type: String,
        },
        clnalleleid: {
            type: String,
        },
        clndn: {
            type: String,
        },
        clndisdb: {
            type: String,
        },
        clnrevstat: {
            type: String,
        },
        clnsig: {
            type: String,
        },
        cosmic90: {
            type: String,
        },
        hgmd: {
            type: String,
        },
        hgmd_pmid: {
            type: String,
        },
        omim_inheritance: {
            type: String,
        },
        omim_disease: {
            type: String,
        },
        hgmd_disease: {
            type: String,
        },
        clinical_detail: {
            type: String,
        },
        hrdt_analysis: {
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

hrdtSchema.index({ chr: 1, start: 1, end: 1, alt: 1 }, { unique: true });
const Hrdt = mongoose.model("Hrdt", hrdtSchema);
module.exports = Hrdt;

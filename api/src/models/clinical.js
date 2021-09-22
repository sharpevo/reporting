const mongoose = require("mongoose");

const clinicalStatusSchema = new mongoose.Schema(
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

const ClinicalStatus = mongoose.model("ClinicalStatus", clinicalStatusSchema);

const clinicalSchema = new mongoose.Schema(
    {
        gene_annot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GeneAnnot",
        },
        transcript: {
            type: String,
        },
        snp: {
            type: String,
        },
        mutation: {
            type: String,
        },
        drug: {
            type: String,
        },
        clinicalid: {
            type: String,
        },
        clinicalstatus: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ClinicalStatus",
        },
        cancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cancer",
        },
        stage: {
            type: String,
        },
        trailtitle: {
            type: String,
        },
        location: {
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

clinicalSchema.index({ mutation: 1, cancer: 1 }, { unique: true });
const Clinical = mongoose.model("Clinical", clinicalSchema);

module.exports = {
    ClinicalStatus,
    Clinical,
};

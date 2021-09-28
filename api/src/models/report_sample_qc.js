const mongoose = require("mongoose");

const reportSampleQcSchema = new mongoose.Schema(
    {
        sample: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ReportSample",
        },
        name: {
            type: String,
        },
        perc_tumor: {
            type: String,
        },
        conc_dna: {
            type: String,
        },
        total_dna: {
            type: String,
        },
        avg_depth: {
            type: String,
        },
        perc_q30: {
            type: String,
        },
        result: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const ReportSampleQc = mongoose.model("ReportSampleQc", reportSampleQcSchema);

module.exports = ReportSampleQc;

const mongoose = require("mongoose");

const reportReportSchema = new mongoose.Schema(
    {
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ReportTask",
            required: true,
        },
        pdf_file: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ReportFile",
        },
        date_generated: {
            type: Date,
        },
        report_status: {
            type: Number,
            default: 0,
        },
        error_message: {
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
    },
    {
        timestamps: true,
    }
);

const ReportReport = mongoose.model("ReportReport", reportReportSchema);

module.exports = ReportReport;

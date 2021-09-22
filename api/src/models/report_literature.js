const mongoose = require("mongoose");

const literatureSchema = new mongoose.Schema(
    {
        pmid: {
            type: String,
            unique: true,
            required: true,
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

const ReportLiterature = mongoose.model("ReportLiterature", literatureSchema);

module.exports = ReportLiterature;

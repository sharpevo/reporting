const mongoose = require("mongoose");

const reportRemarkSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            unique: true,
            required: true,
        },
        content: {
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

const ReportRemark = mongoose.model("ReportRemark", reportRemarkSchema);

module.exports = ReportRemark;

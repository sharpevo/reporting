const mongoose = require("mongoose");

const reportTaskSchema = new mongoose.Schema(
    {
        sample: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ReportSample",
            required: true,
        },
        template: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ReportTemplate",
            required: true,
        },
        name: {
            type: String,
        },
        date_started: {
            type: Date,
        },
        date_completed: {
            type: Date,
        },
        task_status: {
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

reportTaskSchema.virtual("label").get(function() {
    return this.name;
});
reportTaskSchema.set("toObject", { virtuals: true, getters: true });
reportTaskSchema.set("toJSON", { virtuals: true, getters: true });

const ReportTask = mongoose.model("ReportTask", reportTaskSchema);

module.exports = ReportTask;

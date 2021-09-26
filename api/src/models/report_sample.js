const mongoose = require("mongoose");

const inspectionProjectSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: true }
);

const InspectionProject = mongoose.model(
    "InspectionProject",
    inspectionProjectSchema
);

const reportSampleTypeSchema = new mongoose.Schema(
    {
        label: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: true }
);

const ReportSampleType = mongoose.model(
    "ReportSampleType",
    reportSampleTypeSchema
);

const reportSampleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
        },
        age: {
            type: String,
        },
        sample_number: {
            type: String,
            required: true,
        },
        sample_type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ReportSampleType",
        },
        inspection_project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "InspectionProject",
        },
        date_sampled: {
            type: Date,
        },
        date_received: {
            type: Date,
        },
        unit_submitted: {
            type: String,
        },
        inspection_method: {
            type: String,
        },
        inspection_platform: {
            type: String,
        },
        reference_genome: {
            type: String,
        },
        clinical_diagnosis: {
            type: String,
        },
        cancer_from_report: {
            type: String,
        },
        cancer_from_data: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cancer",
        },
        history_family: {
            type: String,
        },
        history_drug: {
            type: String,
        },
        date_reported: {
            type: Date,
        },
        file_main: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ReportFile",
        },
        file_matched: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ReportFile",
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

reportSampleSchema.virtual("label").get(function() {
    return `${this.sample_number}(${this.name})`;
});
reportSampleSchema.set("toObject", { virtuals: true, getters: true });
reportSampleSchema.set("toJSON", { virtuals: true, getters: true });

const ReportSample = mongoose.model("ReportSample", reportSampleSchema);

module.exports = {
    ReportSampleType,
    InspectionProject,
    ReportSample,
};

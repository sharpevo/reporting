const mongoose = require("mongoose");

const reportTemplateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        image_cover_front: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ReportFile",
        },
        image_cover_back: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ReportFile",
        },
        header_left: {
            type: String,
        },
        header_right: {
            type: String,
        },
        footer_left: {
            type: String,
        },
        footer_right: {
            type: String,
        },
        module: {
            type: String,
        },
    },
    { timestamps: true }
);

reportTemplateSchema.virtual("label").get(function() {
    return this.name;
});
reportTemplateSchema.set("toObject", { virtuals: true, getters: true });
reportTemplateSchema.set("toJSON", { virtuals: true, getters: true });

const ReportTemplate = mongoose.model("ReportTemplate", reportTemplateSchema);

module.exports =ReportTemplate

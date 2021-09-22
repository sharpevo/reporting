const mongoose = require("mongoose");

const reportFileSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true,
        },
        mimetype: {
            type: String,
        },
        encoding: {
            type: String,
        },
        path: {
            unique: true,
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
    },
    {
        timestamps: true,
    }
);

reportFileSchema.virtual("label").get(function() {
    return this.filename;
});
reportFileSchema.set("toObject", { virtuals: true, getters: true });
reportFileSchema.set("toJSON", { virtuals: true, getters: true });

const ReportFile = mongoose.model("ReportFile", reportFileSchema);

module.exports = ReportFile;

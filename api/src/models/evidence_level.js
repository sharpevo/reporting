const mongoose = require("mongoose");

const evidenceLevelSchema = new mongoose.Schema(
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

const EvidenceLevel = mongoose.model("EvidenceLevel", evidenceLevelSchema);

module.exports = EvidenceLevel;

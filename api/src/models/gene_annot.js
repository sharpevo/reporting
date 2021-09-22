const mongoose = require("mongoose");

const geneAnnotSchema = new mongoose.Schema(
    {
        gene: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gene",
            required: true,
        },
        name_cn: {
            type: String,
        },
        name_at: {
            type: String,
        },
        chr: {
            type: String,
        },
        description_cn: {
            type: String,
        },
        description_en: {
            type: String,
        },
        source: {
            type: String,
        },
        literature: {
            type: String,
        },
        creator: {
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

geneAnnotSchema.index({ gene: 1 }, { unique: true });
geneAnnotSchema.virtual("label").get(function() {
    return this.gene.label;
});
geneAnnotSchema.set("toObject", { virtuals: true, getters: true });
geneAnnotSchema.set("toJSON", { virtuals: true, getters: true });

const GeneAnnot = mongoose.model("GeneAnnot", geneAnnotSchema);

module.exports = GeneAnnot;

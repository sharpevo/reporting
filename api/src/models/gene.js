const mongoose = require("mongoose");

const geneClassSchema = new mongoose.Schema(
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

const GeneClass = mongoose.model("GeneClass", geneClassSchema);

const geneSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        geneclass: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GeneClass",
        },
        source: {
            type: String,
        },
        is_wes: {
            type: Boolean,
            default: false,
        },
        is_pancancer: {
            type: Boolean,
            default: false,
        },
        is_ncc: {
            type: Boolean,
            default: false,
        },
        is_8glc: {
            type: Boolean,
            default: false,
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

geneSchema.virtual("label").get(function() {
    return this.name;
});
geneSchema.set("toObject", { virtuals: true, getters: true });
geneSchema.set("toJSON", { virtuals: true, getters: true });

const Gene = mongoose.model("Gene", geneSchema);

module.exports = {
    GeneClass,
    Gene,
};

const mongoose = require("mongoose");

const pathwaySchema = new mongoose.Schema(
    {
        name_en: {
            type: String,
        },
        name_cn: {
            type: String,
            unique: true,
            required: true,
        },
        genes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Gene",
            },
        ],
        description: {
            type: String,
        },
        image: {
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

pathwaySchema.virtual("label").get(function() {
    return this.name_cn;
});
pathwaySchema.set("toObject", { virtuals: true, getters: true });
pathwaySchema.set("toJSON", { virtuals: true, getters: true });

const Pathway = mongoose.model("Pathway", pathwaySchema);

module.exports = Pathway;

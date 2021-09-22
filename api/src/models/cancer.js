const mongoose = require("mongoose");

const cancerSchema = new mongoose.Schema(
    {
        name_cn: {
            type: String,
            unique: true,
            required: true,
        },
        name_en: {
            type: String,
        },
        name_en_abbr: {
            type: String,
        },
        description_cn: {
            type: String,
        },
        source: {
            type: String,
        },
        guide: {
            type: String,
        },
        literature: {
            type: String,
        },
        remark: {
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

cancerSchema.virtual("label").get(function() {
    return this.name_cn;
});
cancerSchema.set("toObject", { virtuals: true, getters: true });
cancerSchema.set("toJSON", { virtuals: true, getters: true });

const Cancer = mongoose.model("Cancer", cancerSchema);

module.exports = Cancer;

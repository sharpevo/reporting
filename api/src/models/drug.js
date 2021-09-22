const mongoose = require("mongoose");

const drugSchema = new mongoose.Schema(
    {
        name_cm: {
            type: String,
        },
        name_en: {
            type: String,
        },
        name_cn: {
            type: String,
        },
        name_td: {
            type: String,
        },
        vendor: {
            type: String,
        },
        is_market_ready: {
            type: Boolean,
        },
        date_approved_fda: {
            type: String,
        },
        date_approved_nmpa: {
            type: String,
        },
        associated_gene: {
            type: String,
        },
        is_target_test_required: {
            type: Boolean,
        },
        medicare_catalogue: {
            type: String,
        },
        medicare_number: {
            type: String,
        },
        //cancer: {
        //type: String,
        //},
        description: {
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

drugSchema.index({ name_cm: 1 }, { unique: true });
drugSchema.virtual("label").get(function() {
    return this.name_cm;
});
drugSchema.set("toObject", { virtuals: true, getters: true });
drugSchema.set("toJSON", { virtuals: true, getters: true });

const Drug = mongoose.model("Drug", drugSchema);

module.exports = Drug;

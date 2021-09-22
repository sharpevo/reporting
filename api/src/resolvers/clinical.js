module.exports = {
    gene_annot: async (c, args, { models }) => {
        return await models.GeneAnnot.findById(c.gene_annot).populate("gene");
    },
    clinicalstatus: async (c, args, { models }) => {
        return await models.ClinicalStatus.findById(c.clinicalstatus);
    },
    cancer: async (c, args, { models }) => {
        return await models.Cancer.findById(c.cancer);
    },
};

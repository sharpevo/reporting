module.exports = {
    label: async (mc, args, { models }) => {
        const cancer = await models.Cancer.findById(mc.cancer);
        return mc.mutation + "(" + cancer.label + ")";
    },
    mutationclass: async (mc, args, { models }) => {
        return await models.MutationClass.findById(mc.mutationclass);
    },
    cancer: async (mc, args, { models }) => {
        return await models.Cancer.findById(mc.cancer);
    },
    gene_annot: async (mc, args, { models }) => {
        return await models.GeneAnnot.findById(mc.gene_annot).populate("gene");
    },
};

module.exports = {
    gene: async (geneAnnot, args, { models }) => {
        return await models.Gene.findById(geneAnnot.gene);
    },
    label: async (geneAnnot, args, { models }) => {
        const gened = await models.Gene.findById(geneAnnot.gene);
        return gened.label;
    },
};

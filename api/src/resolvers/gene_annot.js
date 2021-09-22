module.exports = {
    gene: async (geneAnnot, args, { models }) => {
        return await models.Gene.findById(geneAnnot.gene);
    },
};

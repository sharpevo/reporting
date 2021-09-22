module.exports = {
    geneclass: async (gene, args, { models }) => {
        return await models.GeneClass.findById(gene.geneclass);
    },
};

module.exports = {
    ddrclass: async (ddr, args, { models }) => {
        return await models.DdrClass.findById(ddr.ddrclass);
    },
    gene: async (ddr, args, { models }) => {
        return await models.Gene.findById(ddr.gene);
    },
};

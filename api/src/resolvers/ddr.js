module.exports = {
    ddrclass: async (ddr, args, { models }) => {
        return await models.DdrClass.findById(ddr.ddrclass);
    },
    pathwayclass: async (ddr, args, { models }) => {
        return await models.DdrPathwayClass.findById(ddr.pathwayclass);
    },
    gene: async (ddr, args, { models }) => {
        return await models.Gene.findById(ddr.gene);
    },
};

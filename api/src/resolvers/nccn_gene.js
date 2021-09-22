module.exports = {
    gene: async (ng, args, { models }) => {
        return await models.Gene.findById(ng.gene);
    },
    cancer: async (ng, args, { models }) => {
        return await models.Cancer.findById(ng.cancer);
    },
};

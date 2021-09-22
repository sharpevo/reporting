module.exports = {
    gene: async (c, args, { models }) => {
        return await models.Gene.findById(c.gene);
    },
    drugclass: async (c, args, { models }) => {
        return await models.DrugClass.findById(c.drugclass);
    },
    evidence_level: async (c, args, { models }) => {
        return await models.EvidenceLevel.findById(c.evidence_level);
    },
    cancer: async (c, args, { models }) => {
        return await models.Cancer.findById(c.cancer);
    },
};

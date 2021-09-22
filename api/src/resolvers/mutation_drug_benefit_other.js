module.exports = {
    mutation: async (mdbo, args, { models }) => {
        return await models.MutationCancer.findById(mdbo.mutation);
    },
    drug: async (mdbo, args, { models }) => {
        return await models.Drug.findById(mdbo.drug);
    },
    evidence_level: async (mdbo, args, { models }) => {
        return await models.EvidenceLevel.findById(mdbo.evidence_level);
    },
};

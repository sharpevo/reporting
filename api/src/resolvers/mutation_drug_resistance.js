module.exports = {
    mutation: async (mdr, args, { models }) => {
        return await models.MutationCancer.findById(mdr.mutation);
    },
    drug: async (mdr, args, { models }) => {
        return await models.Drug.findById(mdr.drug);
    },
    evidence_level: async (mdr, args, { models }) => {
        return await models.EvidenceLevel.findById(mdr.evidence_level);
    },
};

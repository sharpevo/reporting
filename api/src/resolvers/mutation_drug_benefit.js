module.exports = {
    mutation: async (mdb, args, { models }) => {
        return await models.MutationCancer.findById(mdb.mutation);
    },
    drug: async (mdb, args, { models }) => {
        return await models.Drug.findById(mdb.drug);
    },
    evidence_level: async (mdb, args, { models }) => {
        return await models.EvidenceLevel.findById(mdb.evidence_level);
    },
};

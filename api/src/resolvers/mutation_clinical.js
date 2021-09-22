module.exports = {
    mutation: async (mc, args, { models }) => {
        return await models.MutationCancer.findById(mc.mutation);
    },
    evidence_level: async (mc, args, { models }) => {
        return await models.EvidenceLevel.findById(mc.evidence_level);
    },
};

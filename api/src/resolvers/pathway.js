module.exports = {
    genes: async (pathway, args, { models }) => {
        return await models.Gene.find({ _id: { $in: pathway.genes } });
    },
    image: async (pathway, args, { models }) => {
        return await models.ReportFile.findById(pathway.image);
    },
};

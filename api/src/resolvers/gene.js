module.exports = {
    geneclasses: async (gene, args, { models }) => {
        return await models.GeneClass.find({_id: {$in: gene.geneclasses}});
    },
};

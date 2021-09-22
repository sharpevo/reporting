module.exports = {
    pathway: async (pdc, args, { models }) => {
        return await models.Pathway.findById(pdc.pathway);
    },
    drugs: async (pdc, args, { models }) => {
        return await models.Drug.find({ _id: { $in: pdc.drugs } });
    },
    cancer: async (pdc, args, { models }) => {
        return await models.Cancer.findById(pdc.cancer);
    },
};

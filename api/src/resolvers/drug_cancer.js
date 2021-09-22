module.exports = {
    drug: async (drugCancer, args, { models }) => {
        return await models.Drug.findById(drugCancer.drug);
    },
    cancer: async (drugCancer, args, { models }) => {
        return await models.Cancer.findById(drugCancer.cancer);
    },
};

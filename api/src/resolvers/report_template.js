module.exports = {
    image_cover_front: async (reportTemplate, args, { models }) => {
        return await models.ReportFile.findById(
            reportTemplate.image_cover_front
        );
    },
    image_cover_back: async (reportTemplate, args, { models }) => {
        return await models.ReportFile.findById(
            reportTemplate.image_cover_back
        );
    },
};

module.exports = {
    sample: async (reportTask, args, { models }) => {
        return await models.ReportSample.findById(reportTask.sample);
    },
    template: async (reportTask, args, { models }) => {
        return await models.ReportTemplate.findById(reportTask.template);
    },
};

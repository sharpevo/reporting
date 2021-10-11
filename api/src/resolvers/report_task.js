module.exports = {
    sample: async (reportTask, args, { models }) => {
        return await models.ReportSample.findById(reportTask.sample);
    },
    template: async (reportTask, args, { models }) => {
        return await models.ReportTemplate.findById(reportTask.template);
    },
    //label: async (reportTask, args, { models }) => {
    //const sampled = await models.ReportSample.findById(reportTask.sample);
    //return sampled.label + "(" + reportTask.createdAt * 1 + ")";
    //},
    label: async (reportTask, args, { models }) => {
        return reportTask._id;
    },
};

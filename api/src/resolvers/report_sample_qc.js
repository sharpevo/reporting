module.exports = {
    sample: async (reportSampleQc, args, { models }) => {
        return await models.ReportSample.findById(reportSampleQc.sample);
    },
};

module.exports = {
    task: async (reportReport, args, { models }) => {
        return await models.ReportTask.findById(reportReport.task);
    },
    pdf_file: async (reportReport, args, { models }) => {
        return await models.ReportFile.findById(reportReport.pdf_file);
    },
};

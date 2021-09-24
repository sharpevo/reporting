module.exports = {
    inspection_project: async (reportSample, args, { models }) => {
        return await models.InspectionProject.findById(
            reportSample.inspection_project
        );
    },
    sample_type: async (reportSample, args, { models }) => {
        return await models.ReportSampleType.findById(reportSample.sample_type);
    },
    cancer_from_data: async (reportSample, args, { models }) => {
        return await models.Cancer.findById(reportSample.cancer_from_data);
    },
};

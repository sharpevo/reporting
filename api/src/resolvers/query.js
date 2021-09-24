module.exports = {
    fields: async (parent, { table }, { models }) => {
        return await models.Field.find({ table: table });
    },
    field: async (parent, args, { models }) => {
        return await models.Field.findById(args.id);
    },
    tables: async (parent, args, { models }) => {
        return await models.Table.find({});
    },
    table: async (parent, args, { models }) => {
        return await models.Table.findById(args.id);
    },

    geneclasses: async (parent, args, { models }) => {
        return await models.GeneClass.find({});
    },
    geneclass: async (parent, { id }, { models }) => {
        return await models.GeneClass.findById(id);
    },

    genes: async (parent, args, { models }) => {
        return await models.Gene.find({});
    },
    gene: async (parent, { id }, { models }) => {
        return await models.Gene.findById(id);
    },

    geneannots: async (parent, args, { models }) => {
        return await models.GeneAnnot.find({});
    },
    geneannot: async (parent, { id }, { models }) => {
        return await models.GeneAnnot.findById(id);
    },

    ddrclasses: async (parent, args, { models }) => {
        return await models.DdrClass.find({});
    },
    ddrclass: async (parent, { id }, { models }) => {
        return await models.DdrClass.findById(id);
    },

    ddrs: async (parent, args, { models }) => {
        return await models.Ddr.find({});
    },
    ddr: async (parent, { id }, { models }) => {
        return await models.Ddr.findById(id);
    },

    tmhs: async (parent, args, { models }) => {
        return await models.Tmh.find({});
    },
    tmh: async (parent, { id }, { models }) => {
        return await models.Tmh.findById(id);
    },

    cancers: async (parent, args, { models }) => {
        return await models.Cancer.find({});
    },
    cancer: async (parent, { id }, { models }) => {
        return await models.Cancer.findById(id);
    },

    mutationclasses: async (parent, args, { models }) => {
        return await models.MutationClass.find({});
    },
    mutationclass: async (parent, { id }, { models }) => {
        return await models.MutationClass.findById(id);
    },

    mutationcancers: async (parent, args, { models }) => {
        return await models.MutationCancer.find({});
    },
    mutationcancer: async (parent, { id }, { models }) => {
        return await models.MutationCancer.findById(id);
    },

    drugs: async (parent, args, { models }) => {
        return await models.Drug.find({});
    },
    drug: async (parent, { id }, { models }) => {
        return await models.Drug.findById(id);
    },

    drugcancers: async (parent, args, { models }) => {
        return await models.DrugCancer.find({});
    },
    drugcancer: async (parent, { id }, { models }) => {
        return await models.DrugCancer.findById(id);
    },

    mutationdrugbenefits: async (parent, args, { models }) => {
        return await models.MutationDrugBenefit.find({});
    },
    mutationdrugbenefit: async (parent, { id }, { models }) => {
        return await models.MutationDrugBenefit.findById(id);
    },

    mutationdrugresistances: async (parent, args, { models }) => {
        return await models.MutationDrugResistance.find({});
    },
    mutationdrugresistance: async (parent, { id }, { models }) => {
        return await models.MutationDrugResistance.findById(id);
    },

    mutationdrugbenefitothers: async (parent, args, { models }) => {
        return await models.MutationDrugBenefitOther.find({});
    },
    mutationdrugbenefitother: async (parent, { id }, { models }) => {
        return await models.MutationDrugBenefitOther.findById(id);
    },

    mutationclinicals: async (parent, args, { models }) => {
        return await models.MutationClinical.find({});
    },
    mutationclinical: async (parent, { id }, { models }) => {
        return await models.MutationClinical.findById(id);
    },

    clinicalstatuses: async (parent, args, { models }) => {
        return await models.ClinicalStatus.find({});
    },
    clinicalstatus: async (parent, { id }, { models }) => {
        return await models.ClinicalStatus.findById(id);
    },

    clinicals: async (parent, args, { models }) => {
        return await models.Clinical.find({});
    },
    clinical: async (parent, { id }, { models }) => {
        return await models.Clinical.findById(id);
    },

    drugclasses: async (parent, args, { models }) => {
        return await models.DrugClass.find({});
    },
    drugclass: async (parent, { id }, { models }) => {
        return await models.DrugClass.findById(id);
    },

    evidencelevels: async (parent, args, { models }) => {
        return await models.EvidenceLevel.find({});
    },
    evidencelevel: async (parent, { id }, { models }) => {
        return await models.EvidenceLevel.findById(id);
    },

    chemos: async (parent, args, { models }) => {
        return await models.Chemo.find({});
    },
    chemo: async (parent, { id }, { models }) => {
        return await models.Chemo.findById(id);
    },

    nccngenes: async (parent, args, { models }) => {
        return await models.NccnGene.find({});
    },
    nccngene: async (parent, { id }, { models }) => {
        return await models.NccnGene.findById(id);
    },

    reportremarks: async (parent, args, { models }) => {
        return await models.ReportRemark.find({});
    },
    reportremark: async (parent, { id }, { models }) => {
        return await models.ReportRemark.findById(id);
    },

    reportliteratures: async (parent, args, { models }) => {
        return await models.ReportLiterature.find({});
    },
    reportliterature: async (parent, { id }, { models }) => {
        return await models.ReportLiterature.findById(id);
    },

    reportfiles: async (parent, args, { models }) => {
        return await models.ReportFile.find({});
    },
    reportfile: async (parent, { id }, { models }) => {
        return await models.ReportFile.findById(id);
    },

    pathways: async (parent, args, { models }) => {
        return await models.Pathway.find({});
    },
    pathway: async (parent, { id }, { models }) => {
        return await models.Pathway.findById(id);
    },

    pathwaydrugcancers: async (parent, args, { models }) => {
        return await models.PathwayDrugCancer.find({});
    },
    pathwaydrugcancer: async (parent, { id }, { models }) => {
        return await models.PathwayDrugCancer.findById(id);
    },

    reportsampletypes: async (parent, args, { models }) => {
        return await models.ReportSampleType.find({});
    },
    reportsampletype: async (parent, { id }, { models }) => {
        return await models.ReportSampleType.findById(id);
    },

    inspectionprojects: async (parent, args, { models }) => {
        return await models.InspectionProject.find({});
    },
    inspectionproject: async (parent, { id }, { models }) => {
        return await models.InspectionProject.findById(id);
    },

    reportsamples: async (parent, args, { models }) => {
        return await models.ReportSample.find({});
    },
    reportsample: async (parent, { id }, { models }) => {
        return await models.ReportSample.findById(id);
    },

    reportsampleqcs: async (parent, args, { models }) => {
        return await models.ReportSampleQc.find({});
    },
    reportsampleqcsbysample: async (parent, { sid }, { models }) => {
        return await models.ReportSampleQc.find({ sample: sid });
    },
    reportsampleqc: async (parent, { id }, { models }) => {
        return await models.ReportSampleQc.findById(id);
    },
};

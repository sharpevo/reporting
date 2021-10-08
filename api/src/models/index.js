const { GeneClass, Gene } = require("./gene");
const GeneAnnot = require("./gene_annot");
const { DdrClass, Ddr } = require("./ddr");
const Tmh = require("./tmh");
const Cancer = require("./cancer");
const { MutationClass, MutationCancer } = require("./mutation_cancer");
const Drug = require("./drug");
const DrugCancer = require("./drug_cancer");
const EvidenceLevel = require("./evidence_level");
const MutationDrugBenefit = require("./mutation_drug_benefit");
const MutationDrugResistance = require("./mutation_drug_resistance");
const MutationDrugBenefitOther = require("./mutation_drug_benefit_other");
const MutationClinical = require("./mutation_clinical");
const { ClinicalStatus, Clinical } = require("./clinical");
const { DrugClass, Chemo } = require("./chemo");
const NccnGene = require("./nccn_gene");
const ReportRemark = require("./report_remark");
const ReportLiterature = require("./report_literature");
const ReportFile = require("./report_file");
const Pathway = require("./pathway");
const PathwayDrugCancer = require("./pathway_drug_cancer");
const ReportTemplate = require("./report_template");
const {
    ReportSampleType,
    InspectionProject,
    ReportSample,
} = require("./report_sample");
const ReportSampleQc = require("./report_sample_qc");
const ReportTask = require("./report_task");
const models = {
    GeneClass,
    Gene,
    GeneAnnot,
    DdrClass,
    Ddr,
    Tmh,
    Cancer,
    MutationClass,
    MutationCancer,
    Drug,
    DrugCancer,
    EvidenceLevel,
    MutationDrugBenefit,
    MutationDrugResistance,
    MutationDrugBenefitOther,
    MutationClinical,
    ClinicalStatus,
    Clinical,
    DrugClass,
    Chemo,
    NccnGene,
    ReportRemark,
    ReportLiterature,
    ReportFile,
    Pathway,
    PathwayDrugCancer,
    ReportSampleType,
    InspectionProject,
    ReportSample,
    ReportSampleQc,
    ReportSampleType,
    InspectionProject,
    ReportSample,
    ReportTemplate,
    ReportTask,
};

module.exports = models;

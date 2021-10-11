const Query = require("./query");
const Mutation = require("./mutation");
const Table = require("./table");
const Field = require("./field");
const Gene = require("./gene");
const Ddr = require("./ddr");
const GeneAnnot = require("./gene_annot");
const MutationCancer = require("./mutation_cancer");
const DrugCancer = require("./drug_cancer");
const MutationDrugBenefit = require("./mutation_drug_benefit");
const MutationDrugResistance = require("./mutation_drug_resistance");
const MutationDrugBenefitOther = require("./mutation_drug_benefit_other");
const MutationClinical = require("./mutation_clinical");
const Clinical = require("./clinical");
const { DateTimeResolver } = require("graphql-scalars");
const Chemo = require("./chemo");
const NccnGene = require("./nccn_gene");
const Pathway = require("./pathway");
const PathwayDrugCancer = require("./pathway_drug_cancer");
const { GraphQLUpload } = require("graphql-upload");
const ReportSample = require("./report_sample");
const ReportSampleQc = require("./report_sample_qc");
const ReportTemplate = require("./report_template");
const ReportTask = require("./report_task");
const ReportReport = require("./report_report");
module.exports = {
    DateTime: DateTimeResolver,
    Upload: GraphQLUpload,
    Query,
    Mutation,
    Field,
    Table,
    Gene,
    GeneAnnot,
    Ddr,
    MutationCancer,
    DrugCancer,
    MutationDrugBenefit,
    MutationDrugResistance,
    MutationDrugBenefitOther,
    MutationClinical,
    Clinical,
    Chemo,
    NccnGene,
    Pathway,
    PathwayDrugCancer,
    ReportSample,
    ReportSampleQc,
    ReportTemplate,
    ReportTask,
    ReportReport,
};

import { gql } from "@apollo/client";

const GET_TABLES = gql`
    query tables {
        tables {
            id
            label
            key
            group
            createdAt
            updatedAt
            fields {
                id
                label
            }
        }
    }
`;

const GENE_CLASSES_GET = gql`
    query geneclasses {
        geneclasses {
            id
            label
            createdAt
            updatedAt
        }
    }
`;

const GENES_GET = gql`
    query genes($label: String) {
        genes(label: $label) {
            id
            name
            geneclasses {
                id
                label
            }
            source
            is_wes
            is_pancancer
            is_ncc
            is_8glc
            creator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
            label
        }
    }
`;

const GENE_ANNOTS_GET = gql`
    query geneannots {
        geneannots {
            id
            gene {
                id
                name
                label
            }
            name_cn
            name_at
            chr
            description_cn
            description_en
            source
            literature
            creator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
            label
        }
    }
`;

const DDR_CLASSES_GET = gql`
    query ddrclasses {
        ddrclasses {
            id
            label
            createdAt
            updatedAt
        }
    }
`;

const DDR_PATHWAY_CLASSES_GET = gql`
    query ddrpathwayclasses {
        ddrpathwayclasses {
            id
            label
            createdAt
            updatedAt
        }
    }
`;

const DDRS_GET = gql`
    query ddrs {
        ddrs {
            id
            gene {
                id
                name
                label
            }
            ddrclass {
                id
                label
            }
            pathwayclass {
                id
                label
            }
            result
            result_detail
            literature
            source
            creator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
        }
    }
`;

const TMHS_GET = gql`
    query tmhs {
        tmhs {
            id
            item
            value
            result
            result_detail
            literature_detail
            source
            creator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
        }
    }
`;

const CANCERS_GET = gql`
    query cancers {
        cancers {
            id
            name_cn
            name_en
            name_en_abbr
            description_cn
            source
            guide
            literature
            remark
            creator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
            label
        }
    }
`;

const MUTATION_CLASSES_GET = gql`
    query mutationclasses {
        mutationclasses {
            id
            label
            createdAt
            updatedAt
        }
    }
`;

const MUTATION_CANCERS_GET = gql`
    query mutationcancers {
        mutationcancers {
            id
            mutation
            gene_annot {
                id
                label
            }
            transcript
            position
            snp
            mutationclass {
                id
                label
            }
            mutation_detail
            cancer {
                id
                label
            }
            drug_info
            evidence
            literature
            creator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
            label
        }
    }
`;

const DRUGS_GET = gql`
    query drugs {
        drugs {
            id
            name_cm
            name_en
            name_cn
            name_td
            vendor
            is_market_ready
            date_approved_fda
            date_approved_nmpa
            associated_gene
            is_target_test_required
            medicare_catalogue
            medicare_number
            cancer
            description
            source
            literature
            creator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
            label
        }
    }
`;

const DRUG_CANCERS_GET = gql`
    query drugcancers {
        drugcancers {
            id
            drug {
                id
                label
            }
            cancer {
                id
                label
            }
            medical_evidence
            source
            literature
            creator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
        }
    }
`;

const MUTATION_DRUG_BENEFITS_GET = gql`
    query mutationdrugbenefits {
        mutationdrugbenefits {
            id
            mutation {
                id
                label
            }
            drug {
                id
                label
            }
            evidence_level {
                id
                label
            }
            source
            literature
            creator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
        }
    }
`;

const MUTATION_DRUG_RESISTANCES_GET = gql`
    query mutationdrugresistances {
        mutationdrugresistances {
            id
            mutation {
                id
                label
            }
            drug {
                id
                label
            }
            evidence_level {
                id
                label
            }
            source
            literature
            creator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
        }
    }
`;

const MUTATION_DRUG_BENEFIT_OTHERS_GET = gql`
    query mutationdrugbenefitothers {
        mutationdrugbenefitothers {
            id
            mutation {
                id
                label
            }
            drug {
                id
                label
            }
            evidence_level {
                id
                label
            }
            source
            literature
            creator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
        }
    }
`;

const MUTATION_CLINICALS_GET = gql`
    query mutationclinicals {
        mutationclinicals {
            id
            mutation {
                id
                label
            }
            clinical_or_drug
            evidence_level {
                id
                label
            }
            evidence
            source
            creator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
        }
    }
`;

const CLINICAL_STATUSES_GET = gql`
    query clinicalstatuses {
        clinicalstatuses {
            id
            label
        }
    }
`;

const CLINICALS_GET = gql`
    query clinicals {
        clinicals {
            id
            gene_annot {
                id
                label
            }
            transcript
            snp
            mutation
            drug
            clinicalid
            clinicalstatus {
                id
                label
            }
            cancer {
                id
                label
            }
            stage
            trailtitle
            location
            remark
            creator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
        }
    }
`;

const DRUG_CLASSES_GET = gql`
    query drugclasses {
        drugclasses {
            id
            label
            createdAt
            updatedAt
        }
    }
`;

const EVIDENCE_LEVELS_GET = gql`
    query evidencelevels {
        evidencelevels {
            id
            label
            createdAt
            updatedAt
        }
    }
`;

const CHEMOS_GET = gql`
    query chemos {
        chemos {
            id
            gene {
                id
                label
            }
            rs
            chr
            locus
            ref
            drugclass {
                id
                label
            }
            drug
            type
            evidence_level {
                id
                label
            }
            cancer {
                id
                label
            }
            race
            genotype
            description
            description_ref
            toxicity
            effectiveness
            literature
            creator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
        }
    }
`;

const NCCN_GENES_GET = gql`
    query nccngenes {
        nccngenes {
            id
            gene {
                id
                label
            }
            cancer {
                id
                label
            }
            result
            remark
            creator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
        }
    }
`;

const NCCN_GENES_GENES_GET = gql`
    query nccngenesgenes {
        nccngenesgenes {
            id
            label
        }
    }
`;

const REPORT_REMARKS_GET = gql`
    query reportremarks {
        reportremarks {
            id
            key
            content
            creator {
                id
                name
            }
            updator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
        }
    }
`;

const REPORT_LITERATURES_GET = gql`
    query reportliteratures {
        reportliteratures {
            id
            pmid
            literature
            creator {
                id
                name
            }
            updator {
                id
                name
            }
            approver {
                id
                name
            }
            status
            createdAt
            updatedAt
        }
    }
`;

const REPORT_FILES_GET = gql`
    query reportfiles {
        reportfiles {
            id
            filename
            mimetype
            encoding
            path
            remark
            creator {
                id
                name
            }
            updator {
                id
                name
            }
            createdAt
            updatedAt
            label
        }
    }
`;

const REPORT_FILE_GET_BY_LABEL = gql`
    query reportfilebylabel($label: String!) {
        reportfilebylabel(label: $label) {
            id
            filename
            mimetype
            encoding
            path
            remark
            creator {
                id
                name
            }
            updator {
                id
                name
            }
            createdAt
            updatedAt
            label
        }
    }
`;

const PATHWAYS_GET = gql`
    query pathways {
        pathways {
            id
            name_en
            name_cn
            genes {
                id
                label
            }
            description
            image {
                id
                label
                path
            }
            creator {
                id
                name
            }
            updator {
                id
                name
            }
            createdAt
            updatedAt
            label
        }
    }
`;

const PATHWAY_DRUG_CANCERS_GET = gql`
    query pathwaydrugcancers {
        pathwaydrugcancers {
            id
            pathway {
                id
                label
            }
            drugs {
                id
                label
            }
            cancer {
                id
                label
            }
            createdAt
            updatedAt
        }
    }
`;

const REPORT_SAMPLE_TYPES_GET = gql`
    query reportsampletypes {
        reportsampletypes {
            id
            label
        }
    }
`;

const INSPECTION_PROJECTS_GET = gql`
    query inspectionprojects {
        inspectionprojects {
            id
            label
            genes_nccn {
                id
                label
            }
            genes_panel {
                id
                label
            }
        }
    }
`;

const REPORT_SAMPLES_GET = gql`
    query reportsamples($label: String) {
        reportsamples(label: $label) {
            id
            label
            name
            gender
            age
            sample_number
            sample_type {
                id
                label
            }
            inspection_project {
                id
                label
            }
            date_sampled
            date_received
            unit_submitted
            inspection_method
            inspection_platform
            reference_genome
            clinical_diagnosis
            cancer_from_report
            cancer_from_data {
                id
                label
            }
            history_family
            history_drug
            date_reported
            file_main {
                id
                label
                path
            }
            file_matched {
                id
                label
                path
            }
            creator {
                id
                name
            }
            updator {
                id
                name
            }
            createdAt
            updatedAt
        }
    }
`;

const REPORT_SAMPLE_GET_BY_LABEL = gql`
    query reportsamplebylabel($label: String) {
        reportsamplebylabel(label: $label) {
            id
            label
            name
            gender
            age
            sample_number
            sample_type {
                id
                label
            }
            inspection_project {
                id
                label
            }
            date_sampled
            date_received
            unit_submitted
            inspection_method
            inspection_platform
            reference_genome
            clinical_diagnosis
            cancer_from_report
            cancer_from_data {
                id
                label
            }
            history_family
            history_drug
            date_reported
            file_main {
                id
                label
                path
            }
            file_matched {
                id
                label
                path
            }
            creator {
                id
                name
            }
            updator {
                id
                name
            }
            createdAt
            updatedAt
        }
    }
`;

const REPORT_SAMPLE_QCS_GET = gql`
    query reportsampleqcs {
        reportsampleqcs {
            id
            sample {
                id
                label
            }
            name
            perc_tumor
            conc_dna
            total_dna
            avg_depth
            perc_q30
            result
        }
    }
`;

const REPORT_SAMPLE_QCS_BY_SAMPLE_GET = gql`
    query reportsampleqcsbysample($sid: ID!) {
        reportsampleqcsbysample(sid: $sid) {
            id
            sample {
                id
                label
            }
            name
            perc_tumor
            conc_dna
            total_dna
            avg_depth
            perc_q30
            result
        }
    }
`;

const REPORT_TEMPLATES_GET = gql`
    query reporttemplates {
        reporttemplates {
            id
            name
            module
            image_cover_front {
                id
                label
                path
                filename
            }
            image_cover_back {
                id
                label
                path
                filename
            }
            header_left
            header_right
            footer_left
            footer_right
            createdAt
            updatedAt
            label
        }
    }
`;

const REPORT_TASKS_GET = gql`
    query reporttasks {
        reporttasks {
            id
            sample {
                id
                label
            }
            template {
                id
                label
            }
            task_status
            date_started
            date_completed
            label
            creator {
                id
                name
            }
            updator {
                id
                name
            }
            createdAt
            updatedAt
        }
    }
`;

const REPORT_REPORTS_GET = gql`
    query reportreports {
        reportreports {
            id
            task {
                id
                label
                sample {
                    id
                    label
                }
                template {
                    id
                    label
                }
            }
            date_generated
            report_status
            error_message
            pdf_file {
                id
                label
                path
            }
            creator {
                id
                name
            }
            updator {
                id
                name
            }
            createdAt
            updatedAt
        }
    }
`;

export {
    GET_TABLES,
    GENE_CLASSES_GET,
    GENES_GET,
    GENE_ANNOTS_GET,
    DDR_CLASSES_GET,
    DDR_PATHWAY_CLASSES_GET,
    DDRS_GET,
    TMHS_GET,
    CANCERS_GET,
    MUTATION_CLASSES_GET,
    MUTATION_CANCERS_GET,
    DRUGS_GET,
    DRUG_CANCERS_GET,
    MUTATION_DRUG_BENEFITS_GET,
    MUTATION_DRUG_RESISTANCES_GET,
    MUTATION_DRUG_BENEFIT_OTHERS_GET,
    MUTATION_CLINICALS_GET,
    CLINICAL_STATUSES_GET,
    CLINICALS_GET,
    DRUG_CLASSES_GET,
    EVIDENCE_LEVELS_GET,
    CHEMOS_GET,
    NCCN_GENES_GET,
    NCCN_GENES_GENES_GET,
    REPORT_REMARKS_GET,
    REPORT_LITERATURES_GET,
    REPORT_FILES_GET,
    REPORT_FILE_GET_BY_LABEL,
    PATHWAYS_GET,
    PATHWAY_DRUG_CANCERS_GET,
    REPORT_SAMPLE_TYPES_GET,
    INSPECTION_PROJECTS_GET,
    REPORT_SAMPLES_GET,
    REPORT_SAMPLE_GET_BY_LABEL,
    REPORT_SAMPLE_QCS_GET,
    REPORT_SAMPLE_QCS_BY_SAMPLE_GET,
    REPORT_TEMPLATES_GET,
    REPORT_TASKS_GET,
    REPORT_REPORTS_GET,
};

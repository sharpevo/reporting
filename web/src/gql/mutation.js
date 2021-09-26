import { gql } from "@apollo/client";

const NEW_TABLE = gql`
    mutation newTable($label: String!, $key: String!, $group: String!) {
        newTable(label: $label, key: $key, group: $group) {
            id
            label
            key
            group
        }
    }
`;

const DELETE_TABLE = gql`
    mutation deleteTable($id: ID!) {
        deleteTable(id: $id)
    }
`;

const GENE_NEW = gql`
    mutation newGene(
        $name: String!
        $geneclass: String
        $source: String
        $is_wes: Boolean
        $is_pancancer: Boolean
        $is_ncc: Boolean
        $is_8glc: Boolean
    ) {
        newGene(
            name: $name
            geneclass: $geneclass
            source: $source
            is_wes: $is_wes
            is_pancancer: $is_pancancer
            is_ncc: $is_ncc
            is_8glc: $is_8glc
        ) {
            id
            name
            geneclass {
                id
                label
            }
        }
    }
`;
const GENE_UPDATE = gql`
    mutation updateGene(
        $id: String!
        $name: String!
        $geneclass: String
        $source: String
        $is_wes: Boolean
        $is_pancancer: Boolean
        $is_ncc: Boolean
        $is_8glc: Boolean
    ) {
        updateGene(
            id: $id
            name: $name
            geneclass: $geneclass
            source: $source
            is_wes: $is_wes
            is_pancancer: $is_pancancer
            is_ncc: $is_ncc
            is_8glc: $is_8glc
        ) {
            id
            geneclass {
                id
                label
            }
        }
    }
`;
const GENES_DELETE = gql`
    mutation deleteGenes($ids: [ID!]!) {
        deleteGenes(ids: $ids)
    }
`;

const GENE_ANNOT_NEW = gql`
    mutation newGeneAnnot(
        $gene: String!
        $name_cn: String
        $name_at: String
        $chr: String
        $description_cn: String
        $description_en: String
        $source: String
        $literature: String
    ) {
        newGeneAnnot(
            gene: $gene
            name_cn: $name_cn
            name_at: $name_at
            chr: $chr
            description_cn: $description_cn
            description_en: $description_en
            source: $source
            literature: $literature
        ) {
            id
            gene {
                id
                name
            }
            name_cn
        }
    }
`;

const GENE_ANNOT_UPDATE = gql`
    mutation updateGeneAnnot(
        $id: String!
        $gene: String!
        $name_cn: String
        $name_at: String
        $chr: String
        $description_cn: String
        $description_en: String
        $source: String
        $literature: String
    ) {
        updateGeneAnnot(
            id: $id
            gene: $gene
            name_cn: $name_cn
            name_at: $name_at
            chr: $chr
            description_cn: $description_cn
            description_en: $description_en
            source: $source
            literature: $literature
        ) {
            id
            gene {
                id
                name
                label
            }
            updatedAt
        }
    }
`;

const GENE_ANNOTS_DELETE = gql`
    mutation deleteGeneAnnots($ids: [ID!]!) {
        deleteGeneAnnots(ids: $ids)
    }
`;

const DDR_NEW = gql`
    mutation newDdr(
        $gene: String
        $ddrclass: String
        $result: String
        $result_detail: String
        $literature: String
        $source: String
    ) {
        newDdr(
            gene: $gene
            ddrclass: $ddrclass
            result: $result
            result_detail: $result_detail
            literature: $literature
            source: $source
        ) {
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
        }
    }
`;

const DDR_UPDATE = gql`
    mutation updateDdr(
        $id: String!
        $gene: String
        $ddrclass: String
        $result: String
        $result_detail: String
        $literature: String
        $source: String
    ) {
        updateDdr(
            id: $id
            gene: $gene
            ddrclass: $ddrclass
            result: $result
            result_detail: $result_detail
            literature: $literature
            source: $source
        ) {
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
            updatedAt
        }
    }
`;

const DDRS_DELETE = gql`
    mutation deleteDdrs($ids: [ID!]!) {
        deleteDdrs(ids: $ids)
    }
`;

const TMH_NEW = gql`
    mutation newTmh(
        $item: String
        $value: String
        $result: String
        $result_detail: String
        $literature_detail: String
        $source: String
    ) {
        newTmh(
            item: $item
            value: $value
            result: $result
            result_detail: $result_detail
            literature_detail: $literature_detail
            source: $source
        ) {
            id
            item
            value
        }
    }
`;
const TMH_UPDATE = gql`
    mutation updateTmh(
        $id: String!
        $item: String
        $value: String
        $result: String
        $result_detail: String
        $literature_detail: String
        $source: String
    ) {
        updateTmh(
            id: $id
            item: $item
            value: $value
            result: $result
            result_detail: $result_detail
            literature_detail: $literature_detail
            source: $source
        ) {
            id
            item
            value
        }
    }
`;
const TMHS_DELETE = gql`
    mutation deleteTmhs($ids: [ID!]!) {
        deleteTmhs(ids: $ids)
    }
`;

const CANCER_NEW = gql`
    mutation newCancer(
        $name_cn: String!
        $name_en: String
        $name_en_abbr: String
        $description_cn: String
        $source: String
        $guide: String
        $literature: String
        $remark: String
    ) {
        newCancer(
            name_cn: $name_cn
            name_en: $name_en
            name_en_abbr: $name_en_abbr
            description_cn: $description_cn
            source: $source
            guide: $guide
            literature: $literature
            remark: $remark
        ) {
            id
            name_cn
        }
    }
`;
const CANCER_UPDATE = gql`
    mutation updateCancer(
        $id: String!
        $name_cn: String!
        $name_en: String
        $name_en_abbr: String
        $description_cn: String
        $source: String
        $guide: String
        $literature: String
        $remark: String
    ) {
        updateCancer(
            id: $id
            name_cn: $name_cn
            name_en: $name_en
            name_en_abbr: $name_en_abbr
            description_cn: $description_cn
            source: $source
            guide: $guide
            literature: $literature
            remark: $remark
        ) {
            id
            name_cn
        }
    }
`;
const CANCERS_DELETE = gql`
    mutation deleteCancers($ids: [ID!]!) {
        deleteCancers(ids: $ids)
    }
`;

const MUTATION_CANCER_NEW = gql`
    mutation newMutationCancer(
        $mutation: String!
        $gene_annot: String
        $transcript: String
        $position: String
        $snp: String
        $mutationclass: String
        $cancer: String!
        $drug_info: String
        $evidence: String
        $literature: String
    ) {
        newMutationCancer(
            mutation: $mutation
            gene_annot: $gene_annot
            transcript: $transcript
            position: $position
            snp: $snp
            mutationclass: $mutationclass
            cancer: $cancer
            drug_info: $drug_info
            evidence: $evidence
            literature: $literature
        ) {
            id
            mutation
        }
    }
`;
const MUTATION_CANCER_UPDATE = gql`
    mutation updateMutationCancer(
        $id: String!
        $mutation: String!
        $gene_annot: String
        $transcript: String
        $position: String
        $snp: String
        $mutationclass: String
        $cancer: String!
        $drug_info: String
        $evidence: String
        $literature: String
    ) {
        updateMutationCancer(
            id: $id
            mutation: $mutation
            gene_annot: $gene_annot
            transcript: $transcript
            position: $position
            snp: $snp
            mutationclass: $mutationclass
            cancer: $cancer
            drug_info: $drug_info
            evidence: $evidence
            literature: $literature
        ) {
            id
            mutation
        }
    }
`;
const MUTATION_CANCERS_DELETE = gql`
    mutation deleteMutationCancers($ids: [ID!]!) {
        deleteMutationCancers(ids: $ids)
    }
`;

const DRUG_NEW = gql`
    mutation newDrug(
        $name_cm: String!
        $name_en: String
        $name_cn: String
        $name_td: String
        $vendor: String
        $is_market_ready: Boolean
        $date_approved_fda: String
        $date_approved_nmpa: String
        $associated_gene: String
        $is_target_test_required: Boolean
        $medicare_catalogue: String
        $medicare_number: String
        $cancer: String
        $description: String
        $source: String
        $literature: String
    ) {
        newDrug(
            name_cm: $name_cm
            name_en: $name_en
            name_cn: $name_cn
            name_td: $name_td
            vendor: $vendor
            is_market_ready: $is_market_ready
            date_approved_fda: $date_approved_fda
            date_approved_nmpa: $date_approved_nmpa
            associated_gene: $associated_gene
            is_target_test_required: $is_target_test_required
            medicare_catalogue: $medicare_catalogue
            medicare_number: $medicare_number
            cancer: $cancer
            description: $description
            source: $source
            literature: $literature
        ) {
            id
            name_cm
        }
    }
`;
const DRUG_UPDATE = gql`
    mutation updateDrug(
        $id: String!
        $name_cm: String!
        $name_en: String
        $name_cn: String
        $name_td: String
        $vendor: String
        $is_market_ready: Boolean
        $date_approved_fda: String
        $date_approved_nmpa: String
        $associated_gene: String
        $is_target_test_required: Boolean
        $medicare_catalogue: String
        $medicare_number: String
        $cancer: String
        $description: String
        $source: String
        $literature: String
    ) {
        updateDrug(
            id: $id
            name_cm: $name_cm
            name_en: $name_en
            name_cn: $name_cn
            name_td: $name_td
            vendor: $vendor
            is_market_ready: $is_market_ready
            date_approved_fda: $date_approved_fda
            date_approved_nmpa: $date_approved_nmpa
            associated_gene: $associated_gene
            is_target_test_required: $is_target_test_required
            medicare_catalogue: $medicare_catalogue
            medicare_number: $medicare_number
            cancer: $cancer
            description: $description
            source: $source
            literature: $literature
        ) {
            id
            name_cm
        }
    }
`;
const DRUGS_DELETE = gql`
    mutation deleteDrugs($ids: [ID!]!) {
        deleteDrugs(ids: $ids)
    }
`;

const DRUG_CANCER_NEW = gql`
    mutation newDrugCancer(
        $drug: String!
        $cancer: String!
        $medical_evidence: String
        $source: String
        $literature: String
    ) {
        newDrugCancer(
            drug: $drug
            cancer: $cancer
            medical_evidence: $medical_evidence
            source: $source
            literature: $literature
        ) {
            id
        }
    }
`;
const DRUG_CANCER_UPDATE = gql`
    mutation updateDrugCancer(
        $id: String!
        $drug: String!
        $cancer: String!
        $medical_evidence: String
        $source: String
        $literature: String
    ) {
        updateDrugCancer(
            id: $id
            drug: $drug
            cancer: $cancer
            medical_evidence: $medical_evidence
            source: $source
            literature: $literature
        ) {
            id
        }
    }
`;
const DRUG_CANCERS_DELETE = gql`
    mutation deleteDrugCancers($ids: [ID!]!) {
        deleteDrugCancers(ids: $ids)
    }
`;

const MUTATION_DRUG_BENEFIT_NEW = gql`
    mutation newMutationDrugBenefit(
        $mutation: String!
        $drug: String!
        $evidence_level: String
        $source: String
        $literature: String
    ) {
        newMutationDrugBenefit(
            mutation: $mutation
            drug: $drug
            evidence_level: $evidence_level
            source: $source
            literature: $literature
        ) {
            id
        }
    }
`;
const MUTATION_DRUG_BENEFIT_UPDATE = gql`
    mutation updateMutationDrugBenefit(
        $id: String!
        $mutation: String!
        $drug: String!
        $evidence_level: String
        $source: String
        $literature: String
    ) {
        updateMutationDrugBenefit(
            id: $id
            mutation: $mutation
            drug: $drug
            evidence_level: $evidence_level
            source: $source
            literature: $literature
        ) {
            id
        }
    }
`;
const MUTATION_DRUG_BENEFITS_DELETE = gql`
    mutation deleteMutationDrugBenefits($ids: [ID!]!) {
        deleteMutationDrugBenefits(ids: $ids)
    }
`;

const MUTATION_DRUG_RESISTANCE_NEW = gql`
    mutation newMutationDrugResistance(
        $mutation: String!
        $drug: String!
        $evidence_level: String
        $source: String
        $literature: String
    ) {
        newMutationDrugResistance(
            mutation: $mutation
            drug: $drug
            evidence_level: $evidence_level
            source: $source
            literature: $literature
        ) {
            id
        }
    }
`;
const MUTATION_DRUG_RESISTANCE_UPDATE = gql`
    mutation updateMutationDrugResistance(
        $id: String!
        $mutation: String!
        $drug: String!
        $evidence_level: String
        $source: String
        $literature: String
    ) {
        updateMutationDrugResistance(
            id: $id
            mutation: $mutation
            drug: $drug
            evidence_level: $evidence_level
            source: $source
            literature: $literature
        ) {
            id
        }
    }
`;
const MUTATION_DRUG_RESISTANCES_DELETE = gql`
    mutation deleteMutationDrugResistances($ids: [ID!]!) {
        deleteMutationDrugResistances(ids: $ids)
    }
`;

const MUTATION_DRUG_BENEFIT_OTHER_NEW = gql`
    mutation newMutationDrugBenefitOther(
        $mutation: String!
        $drug: String!
        $evidence_level: String
        $source: String
        $literature: String
    ) {
        newMutationDrugBenefitOther(
            mutation: $mutation
            drug: $drug
            evidence_level: $evidence_level
            source: $source
            literature: $literature
        ) {
            id
        }
    }
`;
const MUTATION_DRUG_BENEFIT_OTHER_UPDATE = gql`
    mutation updateMutationDrugBenefitOther(
        $id: String!
        $mutation: String!
        $drug: String!
        $evidence_level: String
        $source: String
        $literature: String
    ) {
        updateMutationDrugBenefitOther(
            id: $id
            mutation: $mutation
            drug: $drug
            evidence_level: $evidence_level
            source: $source
            literature: $literature
        ) {
            id
        }
    }
`;
const MUTATION_DRUG_BENEFIT_OTHERS_DELETE = gql`
    mutation deleteMutationDrugBenefitOthers($ids: [ID!]!) {
        deleteMutationDrugBenefitOthers(ids: $ids)
    }
`;

const MUTATION_CLINICAL_NEW = gql`
    mutation newMutationClinical(
        $mutation: String!
        $clinical_or_drug: String!
        $evidence_level: String
        $evidence: String
        $source: String
    ) {
        newMutationClinical(
            mutation: $mutation
            clinical_or_drug: $clinical_or_drug
            evidence_level: $evidence_level
            evidence: $evidence
            source: $source
        ) {
            id
        }
    }
`;
const MUTATION_CLINICAL_UPDATE = gql`
    mutation updateMutationClinical(
        $id: String!
        $mutation: String!
        $clinical_or_drug: String!
        $evidence_level: String
        $evidence: String
        $source: String
    ) {
        updateMutationClinical(
            id: $id
            mutation: $mutation
            clinical_or_drug: $clinical_or_drug
            evidence_level: $evidence_level
            evidence: $evidence
            source: $source
        ) {
            id
        }
    }
`;
const MUTATION_CLINICALS_DELETE = gql`
    mutation deleteMutationClinicals($ids: [ID!]!) {
        deleteMutationClinicals(ids: $ids)
    }
`;

const CLINICAL_NEW = gql`
    mutation newClinical(
        $gene_annot: String
        $transcript: String
        $snp: String
        $mutation: String!
        $drug: String
        $clinicalid: String
        $clinicalstatus: String
        $cancer: String!
        $stage: String
        $trailtitle: String
        $location: String
        $remark: String
    ) {
        newClinical(
            gene_annot: $gene_annot
            transcript: $transcript
            snp: $snp
            mutation: $mutation
            drug: $drug
            clinicalid: $clinicalid
            clinicalstatus: $clinicalstatus
            cancer: $cancer
            stage: $stage
            trailtitle: $trailtitle
            location: $location
            remark: $remark
        ) {
            id
        }
    }
`;
const CLINICAL_UPDATE = gql`
    mutation updateClinical(
        $id: String!
        $gene_annot: String
        $transcript: String
        $snp: String
        $mutation: String!
        $drug: String
        $clinicalid: String
        $clinicalstatus: String
        $cancer: String!
        $stage: String
        $trailtitle: String
        $location: String
        $remark: String
    ) {
        updateClinical(
            id: $id
            gene_annot: $gene_annot
            transcript: $transcript
            snp: $snp
            mutation: $mutation
            drug: $drug
            clinicalid: $clinicalid
            clinicalstatus: $clinicalstatus
            cancer: $cancer
            stage: $stage
            trailtitle: $trailtitle
            location: $location
            remark: $remark
        ) {
            id
        }
    }
`;
const CLINICALS_DELETE = gql`
    mutation deleteClinicals($ids: [ID!]!) {
        deleteClinicals(ids: $ids)
    }
`;

const CHEMO_NEW = gql`
    mutation newChemo(
        $gene: String
        $rs: String!
        $chr: String
        $locus: String
        $ref: String
        $drugclass: String
        $drug: String!
        $type: String
        $evidence_level: String
        $cancer: String
        $race: String
        $genotype: String!
        $description: String
        $description_ref: String
        $toxicity: String
        $effectiveness: String
        $literature: String
    ) {
        newChemo(
            gene: $gene
            rs: $rs
            chr: $chr
            locus: $locus
            ref: $ref
            drugclass: $drugclass
            drug: $drug
            type: $type
            evidence_level: $evidence_level
            cancer: $cancer
            race: $race
            genotype: $genotype
            description: $description
            description_ref: $description_ref
            toxicity: $toxicity
            effectiveness: $effectiveness
            literature: $literature
        ) {
            id
        }
    }
`;
const CHEMO_UPDATE = gql`
    mutation updateChemo(
        $id: String!
        $gene: String
        $rs: String!
        $chr: String
        $locus: String
        $ref: String
        $drugclass: String
        $drug: String!
        $type: String
        $evidence_level: String
        $cancer: String
        $race: String
        $genotype: String!
        $description: String
        $description_ref: String
        $toxicity: String
        $effectiveness: String
        $literature: String
    ) {
        updateChemo(
            id: $id
            gene: $gene
            rs: $rs
            chr: $chr
            locus: $locus
            ref: $ref
            drugclass: $drugclass
            drug: $drug
            type: $type
            evidence_level: $evidence_level
            cancer: $cancer
            race: $race
            genotype: $genotype
            description: $description
            description_ref: $description_ref
            toxicity: $toxicity
            effectiveness: $effectiveness
            literature: $literature
        ) {
            id
        }
    }
`;
const CHEMOS_DELETE = gql`
    mutation deleteChemos($ids: [ID!]!) {
        deleteChemos(ids: $ids)
    }
`;

const NCCN_GENE_NEW = gql`
    mutation newNccnGene(
        $gene: String!
        $cancer: String
        $result: String
        $remark: String
    ) {
        newNccnGene(
            gene: $gene
            cancer: $cancer
            result: $result
            remark: $remark
        ) {
            id
        }
    }
`;
const NCCN_GENE_UPDATE = gql`
    mutation updateNccnGene(
        $id: String!
        $gene: String!
        $cancer: String
        $result: String
        $remark: String
    ) {
        updateNccnGene(
            id: $id
            gene: $gene
            cancer: $cancer
            result: $result
            remark: $remark
        ) {
            id
        }
    }
`;
const NCCN_GENES_DELETE = gql`
    mutation deleteNccnGenes($ids: [ID!]!) {
        deleteNccnGenes(ids: $ids)
    }
`;

const REPORT_REMARK_NEW = gql`
    mutation newReportRemark($key: String!, $content: String) {
        newReportRemark(key: $key, content: $content) {
            id
        }
    }
`;
const REPORT_REMARK_UPDATE = gql`
    mutation updateReportRemark($id: String!, $key: String!, $content: String) {
        updateReportRemark(id: $id, key: $key, content: $content) {
            id
        }
    }
`;
const REPORT_REMARKS_DELETE = gql`
    mutation deleteReportRemarks($ids: [ID!]!) {
        deleteReportRemarks(ids: $ids)
    }
`;

const REPORT_LITERATURE_NEW = gql`
    mutation newReportLiterature($pmid: String!, $literature: String) {
        newReportLiterature(pmid: $pmid, literature: $literature) {
            id
        }
    }
`;
const REPORT_LITERATURE_UPDATE = gql`
    mutation updateReportLiterature(
        $id: String!
        $pmid: String!
        $literature: String
    ) {
        updateReportLiterature(id: $id, pmid: $pmid, literature: $literature) {
            id
        }
    }
`;
const REPORT_LITERATURES_DELETE = gql`
    mutation deleteReportLiteratures($ids: [ID!]!) {
        deleteReportLiteratures(ids: $ids)
    }
`;

const REPORT_FILE_NEW = gql`
    mutation newReportFile($file: Upload!) {
        newReportFile(file: $file) {
            id
            filename
            path
        }
    }
`;

const REPORT_FILE_UPDATE = gql`
    mutation updateReportFile($id: ID!, $filename: String, $remark: String) {
        updateReportFile(id: $id, filename: $filename, remark: $remark) {
            filename
        }
    }
`;

const REPORT_FILES_DELETE = gql`
    mutation deleteReportFiles($ids: [ID!]!) {
        deleteReportFiles(ids: $ids)
    }
`;

const PATHWAY_NEW = gql`
    mutation newPathway(
        $name_en: String!
        $name_cn: String
        $genes: [String]
        $description: String
        $image: String
    ) {
        newPathway(
            name_en: $name_en
            name_cn: $name_cn
            genes: $genes
            description: $description
            image: $image
        ) {
            id
            label
        }
    }
`;

const PATHWAY_UPDATE = gql`
    mutation updatePathway(
        $id: String!
        $name_en: String!
        $name_cn: String
        $genes: [String]
        $description: String
        $image: String
    ) {
        updatePathway(
            id: $id
            name_en: $name_en
            name_cn: $name_cn
            genes: $genes
            description: $description
            image: $image
        ) {
            id
            label
        }
    }
`;

const PATHWAYS_DELETE = gql`
    mutation deletePathways($ids: [ID!]!) {
        deletePathways(ids: $ids)
    }
`;

const PATHWAY_DRUG_CANCER_NEW = gql`
    mutation newPathwayDrugCancer(
        $pathway: String
        $drugs: [String]
        $cancer: String
    ) {
        newPathwayDrugCancer(
            pathway: $pathway
            drugs: $drugs
            cancer: $cancer
        ) {
            id
        }
    }
`;

const PATHWAY_DRUG_CANCER_UPDATE = gql`
    mutation updatePathwayDrugCancer(
        $id: String!
        $pathway: String
        $drugs: [String]
        $cancer: String
    ) {
        updatePathwayDrugCancer(
            id: $id
            pathway: $pathway
            drugs: $drugs
            cancer: $cancer
        ) {
            id
        }
    }
`;

const PATHWAY_DRUG_CANCERS_DELETE = gql`
    mutation deletePathwayDrugCancers($ids: [ID!]!) {
        deletePathwayDrugCancers(ids: $ids)
    }
`;

const GENE_CLASS_NEW = gql`
    mutation newGeneClass($label: String!) {
        newGeneClass(label: $label) {
            id
            label
        }
    }
`;

const GENE_CLASS_UPDATE = gql`
    mutation updateGeneClass($id: ID!, $label: String!) {
        updateGeneClass(id: $id, label: $label) {
            id
            label
        }
    }
`;

const GENE_CLASSES_DELETE = gql`
    mutation deleteGeneClasses($ids: [ID!]!) {
        deleteGeneClasses(ids: $ids)
    }
`;

const DDR_CLASS_NEW = gql`
    mutation newDdrClass($label: String!) {
        newDdrClass(label: $label) {
            id
            label
        }
    }
`;

const DDR_CLASS_UPDATE = gql`
    mutation updateDdrClass($id: ID!, $label: String!) {
        updateDdrClass(id: $id, label: $label) {
            id
            label
        }
    }
`;

const DDR_CLASSES_DELETE = gql`
    mutation deleteDdrClasses($ids: [ID!]!) {
        deleteDdrClasses(ids: $ids)
    }
`;

const MUTATION_CLASS_NEW = gql`
    mutation newMutationClass($label: String!) {
        newMutationClass(label: $label) {
            id
            label
        }
    }
`;

const MUTATION_CLASS_UPDATE = gql`
    mutation updateMutationClass($id: ID!, $label: String!) {
        updateMutationClass(id: $id, label: $label) {
            id
            label
        }
    }
`;

const MUTATION_CLASSES_DELETE = gql`
    mutation deleteMutationClasses($ids: [ID!]!) {
        deleteMutationClasses(ids: $ids)
    }
`;

const DRUG_CLASS_NEW = gql`
    mutation newDrugClass($label: String!) {
        newDrugClass(label: $label) {
            id
            label
        }
    }
`;

const DRUG_CLASS_UPDATE = gql`
    mutation updateDrugClass($id: ID!, $label: String!) {
        updateDrugClass(id: $id, label: $label) {
            id
            label
        }
    }
`;

const DRUG_CLASSES_DELETE = gql`
    mutation deleteDrugClasses($ids: [ID!]!) {
        deleteDrugClasses(ids: $ids)
    }
`;

const EVIDENCE_LEVEL_NEW = gql`
    mutation newEvidenceLevel($label: String!) {
        newEvidenceLevel(label: $label) {
            id
            label
        }
    }
`;

const EVIDENCE_LEVEL_UPDATE = gql`
    mutation updateEvidenceLevel($id: ID!, $label: String!) {
        updateEvidenceLevel(id: $id, label: $label) {
            id
            label
        }
    }
`;

const EVIDENCE_LEVELS_DELETE = gql`
    mutation deleteEvidenceLevels($ids: [ID!]!) {
        deleteEvidenceLevels(ids: $ids)
    }
`;

const REPORT_SAMPLE_TYPE_NEW = gql`
    mutation newReportSampleType($label: String!) {
        newReportSampleType(label: $label) {
            id
            label
        }
    }
`;

const REPORT_SAMPLE_TYPE_UPDATE = gql`
    mutation updateReportSampleType($id: ID!, $label: String!) {
        updateReportSampleType(id: $id, label: $label) {
            id
            label
        }
    }
`;

const REPORT_SAMPLE_TYPES_DELETE = gql`
    mutation deleteReportSampleTypes($ids: [ID!]!) {
        deleteReportSampleTypes(ids: $ids)
    }
`;

const INSPECTION_PROJECT_NEW = gql`
    mutation newInspectionProject($label: String!) {
        newInspectionProject(label: $label) {
            id
            label
        }
    }
`;

const INSPECTION_PROJECT_UPDATE = gql`
    mutation updateInspectionProject($id: ID!, $label: String!) {
        updateInspectionProject(id: $id, label: $label) {
            id
            label
        }
    }
`;

const INSPECTION_PROJECTS_DELETE = gql`
    mutation deleteInspectionProject($ids: [ID!]!) {
        deleteInspectionProject(ids: $ids)
    }
`;

const REPORT_SAMPLE_NEW = gql`
    mutation newReportSample(
        $name: String!
        $gender: String
        $age: String
        $sample_number: String!
        $sample_type: String
        $inspection_project: String
        $date_sampled: String
        $date_received: String
        $unit_submitted: String
        $inspection_method: String
        $inspection_platform: String
        $reference_genome: String
        $clinical_diagnosis: String
        $cancer_from_report: String
        $cancer_from_data: String
        $history_family: String
        $history_drug: String
        $date_reported: String
    ) {
        newReportSample(
            name: $name
            gender: $gender
            age: $age
            sample_number: $sample_number
            sample_type: $sample_type
            inspection_project: $inspection_project
            date_sampled: $date_sampled
            date_received: $date_received
            unit_submitted: $unit_submitted
            inspection_method: $inspection_method
            inspection_platform: $inspection_platform
            reference_genome: $reference_genome
            clinical_diagnosis: $clinical_diagnosis
            cancer_from_report: $cancer_from_report
            cancer_from_data: $cancer_from_data
            history_family: $history_family
            history_drug: $history_drug
            date_reported: $date_reported
        ) {
            id
            label
        }
    }
`;

const REPORT_SAMPLE_UPDATE = gql`
    mutation updateReportSample(
        $id: ID!
        $name: String!
        $gender: String
        $age: String
        $sample_number: String!
        $sample_type: String
        $inspection_project: String
        $date_sampled: String
        $date_received: String
        $unit_submitted: String
        $inspection_method: String
        $inspection_platform: String
        $reference_genome: String
        $clinical_diagnosis: String
        $cancer_from_report: String
        $cancer_from_data: String
        $history_family: String
        $history_drug: String
        $date_reported: String
    ) {
        updateReportSample(
            id: $id
            name: $name
            gender: $gender
            age: $age
            sample_number: $sample_number
            sample_type: $sample_type
            inspection_project: $inspection_project
            date_sampled: $date_sampled
            date_received: $date_received
            unit_submitted: $unit_submitted
            inspection_method: $inspection_method
            inspection_platform: $inspection_platform
            reference_genome: $reference_genome
            clinical_diagnosis: $clinical_diagnosis
            cancer_from_report: $cancer_from_report
            cancer_from_data: $cancer_from_data
            history_family: $history_family
            history_drug: $history_drug
            date_reported: $date_reported
        ) {
            id
            label
        }
    }
`;
const REPORT_SAMPLE_FILE_UPDATE = gql`
    mutation updateReportSampleFile($id: ID!, $key: String!, $fid: String!) {
        updateReportSampleFile(id: $id, key: $key, fid: $fid) {
            id
            label
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
        }
    }
`;

const REPORT_SAMPLES_DELETE = gql`
    mutation deleteReportSamples($ids: [ID!]!) {
        deleteReportSamples(ids: $ids)
    }
`;

const REPORT_SAMPLE_QC_NEW = gql`
    mutation newReportSampleQc(
        $sample: String!
        $name: String
        $perc_tumor: String
        $conc_dna: String
        $total_dna: String
        $avg_depth: String
        $perc_q30: String
        $result: String
    ) {
        newReportSampleQc(
            sample: $sample
            name: $name
            perc_tumor: $perc_tumor
            conc_dna: $conc_dna
            total_dna: $total_dna
            avg_depth: $avg_depth
            perc_q30: $perc_q30
            result: $result
        ) {
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

const REPORT_SAMPLE_QC_UPDATE = gql`
    mutation updateReportSampleQc(
        $id: ID!
        $sample: String
        $name: String
        $perc_tumor: String
        $conc_dna: String
        $total_dna: String
        $avg_depth: String
        $perc_q30: String
        $result: String
    ) {
        updateReportSampleQc(
            id: $id
            sample: $sample
            name: $name
            perc_tumor: $perc_tumor
            conc_dna: $conc_dna
            total_dna: $total_dna
            avg_depth: $avg_depth
            perc_q30: $perc_q30
            result: $result
        ) {
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

const REPORT_SAMPLE_QCS_DELETE = gql`
    mutation deleteReportSampleQcs($ids: [ID!]!) {
        deleteReportSampleQcs(ids: $ids)
    }
`;

export {
    NEW_TABLE,
    DELETE_TABLE,
    GENE_NEW,
    GENE_UPDATE,
    GENES_DELETE,
    GENE_ANNOT_NEW,
    GENE_ANNOT_UPDATE,
    GENE_ANNOTS_DELETE,
    DDR_NEW,
    DDR_UPDATE,
    DDRS_DELETE,
    TMH_NEW,
    TMH_UPDATE,
    TMHS_DELETE,
    CANCER_NEW,
    CANCER_UPDATE,
    CANCERS_DELETE,
    MUTATION_CANCER_NEW,
    MUTATION_CANCER_UPDATE,
    MUTATION_CANCERS_DELETE,
    DRUG_NEW,
    DRUG_UPDATE,
    DRUGS_DELETE,
    DRUG_CANCER_NEW,
    DRUG_CANCER_UPDATE,
    DRUG_CANCERS_DELETE,
    MUTATION_DRUG_BENEFIT_NEW,
    MUTATION_DRUG_BENEFIT_UPDATE,
    MUTATION_DRUG_BENEFITS_DELETE,
    MUTATION_DRUG_RESISTANCE_NEW,
    MUTATION_DRUG_RESISTANCE_UPDATE,
    MUTATION_DRUG_RESISTANCES_DELETE,
    MUTATION_DRUG_BENEFIT_OTHER_NEW,
    MUTATION_DRUG_BENEFIT_OTHER_UPDATE,
    MUTATION_DRUG_BENEFIT_OTHERS_DELETE,
    MUTATION_CLINICAL_NEW,
    MUTATION_CLINICAL_UPDATE,
    MUTATION_CLINICALS_DELETE,
    CLINICAL_NEW,
    CLINICAL_UPDATE,
    CLINICALS_DELETE,
    CHEMO_NEW,
    CHEMO_UPDATE,
    CHEMOS_DELETE,
    NCCN_GENE_NEW,
    NCCN_GENE_UPDATE,
    NCCN_GENES_DELETE,
    REPORT_REMARK_NEW,
    REPORT_REMARK_UPDATE,
    REPORT_REMARKS_DELETE,
    REPORT_LITERATURE_NEW,
    REPORT_LITERATURE_UPDATE,
    REPORT_LITERATURES_DELETE,
    REPORT_FILE_NEW,
    REPORT_FILE_UPDATE,
    REPORT_FILES_DELETE,
    PATHWAY_NEW,
    PATHWAY_UPDATE,
    PATHWAYS_DELETE,
    PATHWAY_DRUG_CANCER_NEW,
    PATHWAY_DRUG_CANCER_UPDATE,
    PATHWAY_DRUG_CANCERS_DELETE,
    GENE_CLASS_NEW,
    GENE_CLASS_UPDATE,
    GENE_CLASSES_DELETE,
    DDR_CLASS_NEW,
    DDR_CLASS_UPDATE,
    DDR_CLASSES_DELETE,
    MUTATION_CLASS_NEW,
    MUTATION_CLASS_UPDATE,
    MUTATION_CLASSES_DELETE,
    DRUG_CLASS_NEW,
    DRUG_CLASS_UPDATE,
    DRUG_CLASSES_DELETE,
    EVIDENCE_LEVEL_NEW,
    EVIDENCE_LEVEL_UPDATE,
    EVIDENCE_LEVELS_DELETE,
    REPORT_SAMPLE_TYPE_NEW,
    REPORT_SAMPLE_TYPE_UPDATE,
    REPORT_SAMPLE_TYPES_DELETE,
    INSPECTION_PROJECT_NEW,
    INSPECTION_PROJECT_UPDATE,
    INSPECTION_PROJECTS_DELETE,
    REPORT_SAMPLE_NEW,
    REPORT_SAMPLE_UPDATE,
    REPORT_SAMPLE_FILE_UPDATE,
    REPORT_SAMPLES_DELETE,
    REPORT_SAMPLE_QC_NEW,
    REPORT_SAMPLE_QC_UPDATE,
    REPORT_SAMPLE_QCS_DELETE,
};

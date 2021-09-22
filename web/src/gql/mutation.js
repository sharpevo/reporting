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
const GENE_DELETE = gql`
    mutation deleteGene($id: ID!) {
        deleteGene(id: $id)
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

const GENE_ANNOT_DELETE = gql`
    mutation deleteGeneAnnot($id: ID!) {
        deleteGeneAnnot(id: $id)
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

const DDR_DELETE = gql`
    mutation deleteDdr($id: ID!) {
        deleteDdr(id: $id)
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
const TMH_DELETE = gql`
    mutation deleteTmh($id: ID!) {
        deleteTmh(id: $id)
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
const CANCER_DELETE = gql`
    mutation deleteCancer($id: ID!) {
        deleteCancer(id: $id)
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
const MUTATION_CANCER_DELETE = gql`
    mutation deleteMutationCancer($id: ID!) {
        deleteMutationCancer(id: $id)
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
const DRUG_DELETE = gql`
    mutation deleteDrug($id: ID!) {
        deleteDrug(id: $id)
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
const DRUG_CANCER_DELETE = gql`
    mutation deleteDrugCancer($id: ID!) {
        deleteDrugCancer(id: $id)
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
const MUTATION_DRUG_BENEFIT_DELETE = gql`
    mutation deleteMutationDrugBenefit($id: ID!) {
        deleteMutationDrugBenefit(id: $id)
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
const MUTATION_DRUG_RESISTANCE_DELETE = gql`
    mutation deleteMutationDrugResistance($id: ID!) {
        deleteMutationDrugResistance(id: $id)
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
const MUTATION_DRUG_BENEFIT_OTHER_DELETE = gql`
    mutation deleteMutationDrugBenefitOther($id: ID!) {
        deleteMutationDrugBenefitOther(id: $id)
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
const MUTATION_CLINICAL_DELETE = gql`
    mutation deleteMutationClinical($id: ID!) {
        deleteMutationClinical(id: $id)
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
const CLINICAL_DELETE = gql`
    mutation deleteClinical($id: ID!) {
        deleteClinical(id: $id)
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
const CHEMO_DELETE = gql`
    mutation deleteChemo($id: ID!) {
        deleteChemo(id: $id)
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
const NCCN_GENE_DELETE = gql`
    mutation deleteNccnGene($id: ID!) {
        deleteNccnGene(id: $id)
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
const REPORT_REMARK_DELETE = gql`
    mutation deleteReportRemark($id: ID!) {
        deleteReportRemark(id: $id)
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
const REPORT_LITERATURE_DELETE = gql`
    mutation deleteReportLiterature($id: ID!) {
        deleteReportLiterature(id: $id)
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

const REPORT_FILE_DELETE = gql`
    mutation deleteReportFile($id: ID!) {
        deleteReportFile(id: $id)
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

const PATHWAY_DELETE = gql`
    mutation deletePathway($id: ID!) {
        deletePathway(id: $id)
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

const PATHWAY_DRUG_CANCER_DELETE = gql`
    mutation deletePathwayDrugCancer($id: ID!) {
        deletePathwayDrugCancer(id: $id)
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

const GENE_CLASS_DELETE = gql`
    mutation deleteGeneClass($id: ID!) {
        deleteGeneClass(id: $id)
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

const DDR_CLASS_DELETE = gql`
    mutation deleteDdrClass($id: ID!) {
        deleteDdrClass(id: $id)
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

const MUTATION_CLASS_DELETE = gql`
    mutation deleteMutationClass($id: ID!) {
        deleteMutationClass(id: $id)
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

const DRUG_CLASS_DELETE = gql`
    mutation deleteDrugClass($id: ID!) {
        deleteDrugClass(id: $id)
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

const EVIDENCE_LEVEL_DELETE = gql`
    mutation deleteEvidenceLevel($id: ID!) {
        deleteEvidenceLevel(id: $id)
    }
`;

export {
    NEW_TABLE,
    DELETE_TABLE,
    GENE_NEW,
    GENE_UPDATE,
    GENE_DELETE,
    GENE_ANNOT_NEW,
    GENE_ANNOT_UPDATE,
    GENE_ANNOT_DELETE,
    DDR_NEW,
    DDR_UPDATE,
    DDR_DELETE,
    TMH_NEW,
    TMH_UPDATE,
    TMH_DELETE,
    CANCER_NEW,
    CANCER_UPDATE,
    CANCER_DELETE,
    MUTATION_CANCER_NEW,
    MUTATION_CANCER_UPDATE,
    MUTATION_CANCER_DELETE,
    DRUG_NEW,
    DRUG_UPDATE,
    DRUG_DELETE,
    DRUG_CANCER_NEW,
    DRUG_CANCER_UPDATE,
    DRUG_CANCER_DELETE,
    MUTATION_DRUG_BENEFIT_NEW,
    MUTATION_DRUG_BENEFIT_UPDATE,
    MUTATION_DRUG_BENEFIT_DELETE,
    MUTATION_DRUG_RESISTANCE_NEW,
    MUTATION_DRUG_RESISTANCE_UPDATE,
    MUTATION_DRUG_RESISTANCE_DELETE,
    MUTATION_DRUG_BENEFIT_OTHER_NEW,
    MUTATION_DRUG_BENEFIT_OTHER_UPDATE,
    MUTATION_DRUG_BENEFIT_OTHER_DELETE,
    MUTATION_CLINICAL_NEW,
    MUTATION_CLINICAL_UPDATE,
    MUTATION_CLINICAL_DELETE,
    CLINICAL_NEW,
    CLINICAL_UPDATE,
    CLINICAL_DELETE,
    CHEMO_NEW,
    CHEMO_UPDATE,
    CHEMO_DELETE,
    NCCN_GENE_NEW,
    NCCN_GENE_UPDATE,
    NCCN_GENE_DELETE,
    REPORT_REMARK_NEW,
    REPORT_REMARK_UPDATE,
    REPORT_REMARK_DELETE,
    REPORT_LITERATURE_NEW,
    REPORT_LITERATURE_UPDATE,
    REPORT_LITERATURE_DELETE,
    REPORT_FILE_NEW,
    REPORT_FILE_UPDATE,
    REPORT_FILE_DELETE,
    PATHWAY_NEW,
    PATHWAY_UPDATE,
    PATHWAY_DELETE,
    PATHWAY_DRUG_CANCER_NEW,
    PATHWAY_DRUG_CANCER_UPDATE,
    PATHWAY_DRUG_CANCER_DELETE,
    GENE_CLASS_NEW,
    GENE_CLASS_UPDATE,
    GENE_CLASS_DELETE,
    DDR_CLASS_NEW,
    DDR_CLASS_UPDATE,
    DDR_CLASS_DELETE,
    MUTATION_CLASS_NEW,
    MUTATION_CLASS_UPDATE,
    MUTATION_CLASS_DELETE,
    DRUG_CLASS_NEW,
    DRUG_CLASS_UPDATE,
    DRUG_CLASS_DELETE,
    EVIDENCE_LEVEL_NEW,
    EVIDENCE_LEVEL_UPDATE,
    EVIDENCE_LEVEL_DELETE,
};

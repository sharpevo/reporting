const { gql } = require("apollo-server-express");

module.exports = gql`
    scalar DateTime
    scalar Upload

    type Table {
        id: ID!
        label: String!
        key: String!
        group: String
        createdAt: DateTime!
        updatedAt: DateTime!

        fields: [Field!]
    }

    type Field {
        id: ID!
        label: String!
        key: String!
        order: Int!
        table: Table!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type User {
        id: ID!
        name: String!
    }

    type GeneClass {
        id: ID!
        label: String!
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Gene {
        id: ID!
        name: String!
        geneclass: GeneClass
        source: String
        is_wes: Boolean
        is_pancancer: Boolean
        is_ncc: Boolean
        is_8glc: Boolean
        creator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime

        label: String
    }

    type GeneAnnot {
        id: ID!
        gene: Gene
        name_cn: String
        name_at: String
        chr: String
        description_cn: String
        description_en: String
        source: String
        literature: String
        creator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime

        label: String
    }

    type DdrClass {
        id: ID!
        label: String!
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Ddr {
        id: ID!
        gene: Gene
        ddrclass: DdrClass
        result: String
        result_detail: String
        literature: String
        source: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Tmh {
        id: ID!
        item: String
        value: String
        result: String
        result_detail: String
        literature_detail: String
        source: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Cancer {
        id: ID!
        name_cn: String!
        name_en: String
        name_en_abbr: String
        description_cn: String
        source: String
        guide: String
        literature: String
        remark: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime

        label: String
    }

    type MutationClass {
        id: ID!
        label: String
        createdAt: DateTime
        updatedAt: DateTime
    }

    type MutationCancer {
        id: ID!
        mutation: String!
        gene_annot: GeneAnnot
        transcript: String
        position: String
        snp: String
        mutationclass: MutationClass
        mutation_detail: String
        cancer: Cancer
        drug_info: String
        evidence: String
        literature: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime

        label: String
    }

    type Drug {
        id: ID!
        name_cm: String!
        name_en: String
        name_cn: String
        name_td: String
        vendor: String
        is_market_ready: Boolean
        date_approved_fda: String
        date_approved_nmpa: String
        associated_gene: String
        is_target_test_required: Boolean
        medicare_catalogue: String
        medicare_number: String
        cancer: String
        description: String
        source: String
        literature: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime

        label: String
    }

    type DrugCancer {
        id: ID!
        drug: Drug
        cancer: Cancer
        medical_evidence: String
        source: String
        literature: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type EvidenceLevel {
        id: ID!
        label: String
        createdAt: DateTime
        updatedAt: DateTime
    }

    type MutationDrugBenefit {
        id: ID!
        mutation: MutationCancer
        drug: Drug
        evidence_level: EvidenceLevel
        source: String
        literature: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type MutationDrugResistance {
        id: ID!
        mutation: MutationCancer
        drug: Drug
        evidence_level: EvidenceLevel
        source: String
        literature: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type MutationDrugBenefitOther {
        id: ID!
        mutation: MutationCancer
        drug: Drug
        evidence_level: EvidenceLevel
        source: String
        literature: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type MutationClinical {
        id: ID!
        mutation: MutationCancer
        clinical_or_drug: String!
        evidence_level: EvidenceLevel
        evidence: String
        source: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type ClinicalStatus {
        id: ID!
        label: String!
    }

    type Clinical {
        id: ID!
        gene_annot: GeneAnnot
        transcript: String
        snp: String
        mutation: String
        drug: String
        clinicalid: String
        clinicalstatus: ClinicalStatus
        cancer: Cancer
        stage: String
        trailtitle: String
        location: String
        remark: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type DrugClass {
        id: ID!
        label: String
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Chemo {
        id: ID!
        gene: Gene
        rs: String
        chr: String
        locus: String
        ref: String
        drugclass: DrugClass
        drug: String
        type: String
        evidence_level: EvidenceLevel
        cancer: Cancer
        race: String
        genotype: String
        description: String
        description_ref: String
        toxicity: String
        effectiveness: String
        literature: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type NccnGene {
        id: ID!
        gene: Gene
        cancer: Cancer
        result: String
        remark: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type ReportRemark {
        id: ID!
        key: String
        content: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type ReportLiterature {
        id: ID!
        pmid: String
        literature: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type ReportFile {
        id: ID!
        filename: String
        mimetype: String
        encoding: String
        path: String
        remark: String
        creator: User
        updator: User
        createdAt: DateTime
        updatedAt: DateTime
        label: String
    }

    type Pathway {
        id: ID!
        name_en: String
        name_cn: String
        genes: [Gene]
        description: String
        image: ReportFile
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
        label: String
    }

    type PathwayDrugCancer {
        id: ID!
        pathway: Pathway
        drugs: [Drug]
        cancer: Cancer
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Query {
        tables: [Table!]!
        table(id: ID!): Table!

        fields(table: ID!): [Field!]!
        field(id: ID!): Field!

        geneclasses: [GeneClass!]!
        geneclass(id: ID!): GeneClass!

        genes: [Gene]!
        gene(id: ID!): Gene!

        geneannots: [GeneAnnot]!
        geneannot(id: ID!): GeneAnnot!

        ddrclasses: [DdrClass]!
        ddrclass(id: ID!): DdrClass

        ddrs: [Ddr]!
        ddr(id: ID!): Ddr

        tmhs: [Tmh]!
        tmh(id: ID!): Tmh

        cancers: [Cancer]!
        cancer(id: ID!): Cancer

        mutationclasses: [MutationClass]!
        mutationclass(id: ID!): MutationClass!

        mutationcancers: [MutationCancer]!
        mutationcancer(id: ID!): MutationCancer!

        drugs: [Drug]!
        drug(id: ID!): Drug!

        drugcancers: [DrugCancer]!
        drugcancer(id: ID!): DrugCancer!

        mutationdrugbenefits: [MutationDrugBenefit]!
        mutationdrugbenefit(id: ID!): MutationDrugBenefit!

        mutationdrugresistances: [MutationDrugResistance]!
        mutationdrugresistance(id: ID!): MutationDrugResistance!

        mutationdrugbenefitothers: [MutationDrugBenefitOther]!
        mutationdrugbenefitother(id: ID!): MutationDrugBenefitOther!

        mutationclinicals: [MutationClinical]!
        mutationclinical(id: ID!): MutationClinical!

        clinicalstatuses: [ClinicalStatus]!
        clinicalstatus(id: ID!): ClinicalStatus!

        clinicals: [Clinical]!
        clinical(id: ID!): Clinical!

        drugclasses: [DrugClass]!
        drugclass(id: ID!): DrugClass!

        evidencelevels: [EvidenceLevel]!
        evidencelevel(id: ID!): EvidenceLevel!

        chemos: [Chemo]!
        chemo(id: ID!): Chemo!

        nccngenes: [NccnGene]!
        nccngene(id: ID!): NccnGene!

        reportremarks: [ReportRemark]!
        reportremark(id: ID!): ReportRemark!

        reportliteratures: [ReportLiterature]!
        reportliterature(id: ID!): ReportLiterature!

        reportfiles: [ReportFile]!
        reportfile(id: ID!): ReportFile!

        pathways: [Pathway]!
        pathway(id: ID!): Pathway!

        pathwaydrugcancers: [PathwayDrugCancer]!
        pathwaydrugcancer(id: ID!): PathwayDrugCancer!
    }

    type Mutation {
        newTable(label: String!, key: String!, group: String): Table
        deleteTables(ids: [ID!]!): Boolean!
        updateTable(id: ID!, label: String, key: String, group: String): Table

        newField(label: String!, key: String!, table: ID!, order: Int): Field
        deleteFields(ids: [ID!]!): Boolean!
        updateField(id: ID!, label: String, key: String, group: String): Field

        newGeneClass(label: String!): GeneClass!
        updateGeneClass(id: ID!, label: String!): GeneClass!
        deleteGeneClasses(ids: [ID!]!): Boolean!

        newGene(
            name: String!
            geneclass: String
            source: String
            is_wes: Boolean
            is_pancancer: Boolean
            is_ncc: Boolean
            is_8glc: Boolean
        ): Gene!
        updateGene(
            id: String!
            name: String!
            geneclass: String
            source: String
            is_wes: Boolean
            is_pancancer: Boolean
            is_ncc: Boolean
            is_8glc: Boolean
        ): Gene!
        deleteGenes(ids: [ID!]!): Boolean!
        updateGeneName(id: ID!, name: String!): Gene
        updateGeneGeneClass(id: ID!, geneclass: ID!): Gene
        updateGeneSource(id: ID!, source: String!): Gene
        updateGeneWes(id: ID!, wes: Boolean): Gene
        updateGenePancancer(id: ID!, pancancer: Boolean): Gene
        updateGeneNcc(id: ID!, ncc: Boolean): Gene
        updateGene8glc(id: ID!, glc: Boolean): Gene

        newGeneAnnot(
            gene: String!
            name_cn: String
            name_at: String
            chr: String
            description_cn: String
            description_en: String
            source: String
            literature: String
        ): GeneAnnot!
        updateGeneAnnot(
            id: String!
            gene: String!
            name_cn: String
            name_at: String
            chr: String
            description_cn: String
            description_en: String
            source: String
            literature: String
        ): GeneAnnot!
        deleteGeneAnnots(ids: [ID!]!): Boolean!

        newDdr(
            gene: String
            ddrclass: String
            result: String
            result_detail: String
            literature: String
            source: String
        ): Ddr
        updateDdr(
            id: String!
            gene: String
            ddrclass: String
            result: String
            result_detail: String
            literature: String
            source: String
        ): Ddr
        deleteDdrs(ids: [ID!]!): Boolean!

        newTmh(
            item: String
            value: String
            result: String
            result_detail: String
            literature_detail: String
            source: String
        ): Tmh!
        updateTmh(
            id: String!
            item: String
            value: String
            result: String
            result_detail: String
            literature_detail: String
            source: String
        ): Tmh!
        deleteTmhs(ids: [ID!]!): Boolean!

        newCancer(
            name_cn: String!
            name_en: String
            name_en_abbr: String
            description_cn: String
            source: String
            guide: String
            literature: String
            remark: String
        ): Cancer!
        updateCancer(
            id: String!
            name_cn: String!
            name_en: String
            name_en_abbr: String
            description_cn: String
            source: String
            guide: String
            literature: String
            remark: String
        ): Cancer!
        deleteCancers(ids: [ID!]!): Boolean!

        newMutationCancer(
            mutation: String!
            gene_annot: String
            transcript: String
            position: String
            snp: String
            mutationclass: String
            mutation_detail: String
            cancer: String!
            drug_info: String
            evidence: String
            literature: String
        ): MutationCancer!
        updateMutationCancer(
            id: String!
            mutation: String!
            gene_annot: String
            transcript: String
            position: String
            snp: String
            mutationclass: String
            mutation_detail: String
            cancer: String!
            drug_info: String
            evidence: String
            literature: String
        ): MutationCancer!
        deleteMutationCancers(ids: [ID!]!): Boolean!

        newDrug(
            name_cm: String!
            name_en: String
            name_cn: String
            name_td: String
            vendor: String
            is_market_ready: Boolean
            date_approved_fda: String
            date_approved_nmpa: String
            associated_gene: String
            is_target_test_required: Boolean
            medicare_catalogue: String
            medicare_number: String
            cancer: String
            description: String
            source: String
            literature: String
        ): Drug!
        updateDrug(
            id: String!
            name_cm: String!
            name_en: String
            name_cn: String
            name_td: String
            vendor: String
            is_market_ready: Boolean
            date_approved_fda: String
            date_approved_nmpa: String
            associated_gene: String
            is_target_test_required: Boolean
            medicare_catalogue: String
            medicare_number: String
            cancer: String
            description: String
            source: String
            literature: String
        ): Drug!
        deleteDrugs(ids: [ID!]!): Boolean!

        newDrugCancer(
            drug: String!
            cancer: String!
            medical_evidence: String
            source: String
            literature: String
        ): DrugCancer!
        updateDrugCancer(
            id: String!
            drug: String!
            cancer: String!
            medical_evidence: String
            source: String
            literature: String
        ): DrugCancer!
        deleteDrugCancers(ids: [ID!]!): Boolean!

        newMutationDrugBenefit(
            mutation: String!
            drug: String!
            evidence_level: String
            source: String
            literature: String
        ): MutationDrugBenefit!
        updateMutationDrugBenefit(
            id: String!
            mutation: String!
            drug: String!
            evidence_level: String
            source: String
            literature: String
        ): MutationDrugBenefit!
        deleteMutationDrugBenefits(ids: [ID!]!): Boolean!

        newMutationDrugResistance(
            mutation: String!
            drug: String!
            evidence_level: String
            source: String
            literature: String
        ): MutationDrugResistance!
        updateMutationDrugResistance(
            id: String!
            mutation: String!
            drug: String!
            evidence_level: String
            source: String
            literature: String
        ): MutationDrugResistance!
        deleteMutationDrugResistances(ids: [ID!]!): Boolean!

        newMutationDrugBenefitOther(
            mutation: String!
            drug: String!
            evidence_level: String
            source: String
            literature: String
        ): MutationDrugBenefitOther!
        updateMutationDrugBenefitOther(
            id: String!
            mutation: String!
            drug: String!
            evidence_level: String
            source: String
            literature: String
        ): MutationDrugBenefitOther!
        deleteMutationDrugBenefitOthers(ids: [ID!]!): Boolean!

        newMutationClinical(
            mutation: String!
            clinical_or_drug: String!
            evidence_level: String
            evidence: String
            source: String
        ): MutationClinical!
        updateMutationClinical(
            id: String!
            mutation: String!
            clinical_or_drug: String!
            evidence_level: String
            evidence: String
            source: String
        ): MutationClinical!
        deleteMutationClinicals(ids: [ID!]!): Boolean!

        newClinical(
            gene_annot: String
            transcript: String
            snp: String
            mutation: String!
            drug: String
            clinicalid: String
            clinicalstatus: String
            cancer: String!
            stage: String
            trailtitle: String
            location: String
            remark: String
        ): Clinical!
        updateClinical(
            id: String!
            gene_annot: String
            transcript: String
            snp: String
            mutation: String!
            drug: String
            clinicalid: String
            clinicalstatus: String
            cancer: String!
            stage: String
            trailtitle: String
            location: String
            remark: String
        ): MutationClinical!
        deleteClinicals(ids: [ID!]!): Boolean!

        newChemo(
            gene: String
            rs: String!
            chr: String
            locus: String
            ref: String
            drugclass: String
            drug: String!
            type: String
            evidence_level: String
            cancer: String
            race: String
            genotype: String!
            description: String
            description_ref: String
            toxicity: String
            effectiveness: String
            literature: String
        ): Chemo!
        updateChemo(
            id: String!
            gene: String
            rs: String!
            chr: String
            locus: String
            ref: String
            drugclass: String
            drug: String!
            type: String
            evidence_level: String
            cancer: String
            race: String
            genotype: String!
            description: String
            description_ref: String
            toxicity: String
            effectiveness: String
            literature: String
        ): Chemo!
        deleteChemos(ids: [ID!]!): Boolean!

        newNccnGene(
            gene: String!
            cancer: String
            result: String
            remark: String
        ): NccnGene!
        updateNccnGene(
            id: String!
            gene: String!
            cancer: String
            result: String
            remark: String
        ): NccnGene!
        deleteNccnGenes(ids: [ID!]!): Boolean!

        newReportRemark(key: String!, content: String): ReportRemark!
        updateReportRemark(
            id: String!
            key: String!
            content: String
        ): ReportRemark!
        deleteReportRemarks(ids: [ID!]!): Boolean!

        newReportLiterature(
            pmid: String!
            literature: String
        ): ReportLiterature!
        updateReportLiterature(
            id: String!
            pmid: String!
            literature: String
        ): ReportLiterature!
        deleteReportLiteratures(ids: [ID!]!): Boolean!

        newReportFile(file: Upload!): ReportFile!
        updateReportFile(name: String!, remark: String): ReportFile!
        deleteReportFiles(ids: [ID!]!): Boolean!

        newPathway(
            name_en: String!
            name_cn: String
            genes: [String]
            description: String
            image: String
        ): Pathway!
        updatePathway(
            id: String!
            name_en: String!
            name_cn: String
            genes: [String]
            description: String
            image: String
        ): Pathway!
        deletePathways(ids: [ID!]!): Boolean!

        newPathwayDrugCancer(
            pathway: String
            drugs: [String]
            cancer: String
        ): PathwayDrugCancer!
        updatePathwayDrugCancer(
            id: String!
            pathway: String
            drugs: [String]
            cancer: String
        ): PathwayDrugCancer!
        deletePathwayDrugCancers(ids: [ID!]!): Boolean!

        newDdrClass(label: String!): DdrClass!
        updateDdrClass(id: ID!, label: String!): DdrClass!
        deleteDdrClasses(ids: [ID!]!): Boolean!

        newMutationClass(label: String!): MutationClass
        updateMutationClass(id: ID!, label: String!): MutationClass
        deleteMutationClasses(ids: [ID!]!): Boolean!

        newDrugClass(label: String!): DrugClass
        updateDrugClass(id: ID!, label: String!): DrugClass
        deleteDrugClasses(ids: [ID!]!): Boolean!

        newEvidenceLevel(label: String!): EvidenceLevel
        updateEvidenceLevel(id: ID!, label: String!): EvidenceLevel
        deleteEvidenceLevels(ids: [ID!]!): Boolean!
    }
`;

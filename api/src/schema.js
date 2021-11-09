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
        geneclasses: [GeneClass]
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

    type DdrPathwayClass {
        id: ID!
        label: String!
        createdAt: DateTime
        updatedAt: DateTime
    }

    type Ddr {
        id: ID!
        gene: Gene
        ddrclass: DdrClass
        pathwayclass: DdrPathwayClass
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

    type ReportSampleType {
        id: ID!
        label: String!
    }

    type InspectionProject {
        id: ID!
        label: String!
        genes: [Gene]
    }

    type ReportSample {
        id: ID!
        name: String
        gender: String
        age: String
        sample_number: String
        sample_type: ReportSampleType
        inspection_project: InspectionProject
        date_sampled: DateTime
        date_received: DateTime
        unit_submitted: String
        inspection_method: String
        inspection_platform: String
        reference_genome: String
        clinical_diagnosis: String
        cancer_from_report: String
        cancer_from_data: Cancer
        history_family: String
        history_drug: String
        date_reported: DateTime
        file_main: ReportFile
        file_matched: ReportFile
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
        label: String
    }

    type ReportSampleQc {
        id: ID!
        sample: ReportSample!
        name: String
        perc_tumor: String
        conc_dna: String
        total_dna: String
        avg_depth: String
        perc_q30: String
        result: String
    }

    type ReportTemplate {
        id: ID!
        name: String!
        image_cover_front: ReportFile
        image_cover_back: ReportFile
        header_left: String
        header_right: String
        footer_left: String
        footer_right: String
        module: String
        createdAt: DateTime
        updatedAt: DateTime

        label: String
    }

    type ReportTask {
        id: ID!
        sample: ReportSample
        template: ReportTemplate
        name: String
        date_started: DateTime
        date_completed: DateTime
        task_status: Int
        error_message: String
        creator: User
        updator: User
        approver: User
        status: Int
        createdAt: DateTime
        updatedAt: DateTime
        label: String
    }

    type ReportReport {
        id: ID!
        task: ReportTask
        pdf_file: ReportFile
        date_generated: DateTime
        report_status: Int
        error_message: String
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

        genes(label: String): [Gene]!
        gene(id: ID!): Gene!

        geneannots: [GeneAnnot]!
        geneannot(id: ID!): GeneAnnot!

        ddrclasses: [DdrClass]!
        ddrclass(id: ID!): DdrClass

        ddrpathwayclasses: [DdrPathwayClass]!
        ddrpathwayclass(id: ID!): DdrPathwayClass

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
        nccngenesgenes: [Gene]!
        nccngene(id: ID!): NccnGene!

        reportremarks: [ReportRemark]!
        reportremark(id: ID!): ReportRemark!

        reportliteratures: [ReportLiterature]!
        reportliterature(id: ID!): ReportLiterature!

        reportfiles: [ReportFile]!
        reportfilebylabel(label: String!): ReportFile
        reportfile(id: ID!): ReportFile!

        pathways: [Pathway]!
        pathway(id: ID!): Pathway!

        pathwaydrugcancers: [PathwayDrugCancer]!
        pathwaydrugcancer(id: ID!): PathwayDrugCancer!

        inspectionprojects: [InspectionProject]!
        inspectionproject(id: ID!): InspectionProject!

        reportsampletypes: [ReportSampleType]!
        reportsampletype(id: ID!): ReportSampleType!

        reportsamples(label: String): [ReportSample]!
        reportsamplebylabel(label: String): ReportSample
        reportsample(id: ID!): ReportSample!

        reportsampleqcs: [ReportSampleQc]!
        reportsampleqcsbysample(sid: ID!): [ReportSampleQc]!
        reportsampleqc(id: ID!): ReportSampleQc!

        reporttemplates: [ReportTemplate]!
        reporttemplate(id: ID!): ReportTemplate

        reporttasks: [ReportTask]!
        reporttask(id: ID!): ReportTask

        reportreports: [ReportReport]!
        reportreport(id: ID!): ReportReport
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
            geneclasses: [String]
            source: String
            is_wes: Boolean
            is_pancancer: Boolean
            is_ncc: Boolean
            is_8glc: Boolean
        ): Gene!
        updateGene(
            id: String!
            name: String!
            geneclasses: [String]
            source: String
            is_wes: Boolean
            is_pancancer: Boolean
            is_ncc: Boolean
            is_8glc: Boolean
        ): Gene!
        deleteGenes(ids: [ID!]!): Boolean!
        updateGeneName(id: ID!, name: String!): Gene
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
            pathwayclass: String
            result: String
            result_detail: String
            literature: String
            source: String
        ): Ddr
        updateDdr(
            id: String!
            gene: String
            ddrclass: String
            pathwayclass: String
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

        newDdrPathwayClass(label: String!): DdrPathwayClass!
        updateDdrPathwayClass(id: ID!, label: String!): DdrPathwayClass!
        deleteDdrPathwayClasses(ids: [ID!]!): Boolean!

        newMutationClass(label: String!): MutationClass
        updateMutationClass(id: ID!, label: String!): MutationClass
        deleteMutationClasses(ids: [ID!]!): Boolean!

        newDrugClass(label: String!): DrugClass
        updateDrugClass(id: ID!, label: String!): DrugClass
        deleteDrugClasses(ids: [ID!]!): Boolean!

        newEvidenceLevel(label: String!): EvidenceLevel
        updateEvidenceLevel(id: ID!, label: String!): EvidenceLevel
        deleteEvidenceLevels(ids: [ID!]!): Boolean!

        newReportSampleType(label: String!): ReportSampleType!
        updateReportSampleType(id: ID!, label: String!): ReportSampleType!
        deleteReportSampleTypes(ids: [ID!]!): Boolean!

        newInspectionProject(
            label: String!
            genes: [String]
        ): InspectionProject!
        updateInspectionProject(
            id: ID!
            label: String!
            genes: [String]
        ): InspectionProject!
        deleteInspectionProjects(ids: [ID!]!): Boolean!

        newReportSample(
            name: String!
            gender: String
            age: String
            sample_number: String!
            sample_type: String
            inspection_project: String
            date_sampled: String
            date_received: String
            unit_submitted: String
            inspection_method: String
            inspection_platform: String
            reference_genome: String
            clinical_diagnosis: String
            cancer_from_report: String
            cancer_from_data: String
            history_family: String
            history_drug: String
            date_reported: String
        ): ReportSample
        updateReportSample(
            id: ID!
            name: String!
            gender: String
            age: String
            sample_number: String!
            sample_type: String
            inspection_project: String
            date_sampled: String
            date_received: String
            unit_submitted: String
            inspection_method: String
            inspection_platform: String
            reference_genome: String
            clinical_diagnosis: String
            cancer_from_report: String
            cancer_from_data: String
            history_family: String
            history_drug: String
            date_reported: String
            file_main: String
            file_matched: String
        ): ReportSample
        updateReportSampleFile(
            id: ID!
            key: String!
            fid: String!
        ): ReportSample
        deleteReportSamples(ids: [ID!]!): Boolean

        newReportSampleQc(
            sample: String!
            name: String
            perc_tumor: String
            conc_dna: String
            total_dna: String
            avg_depth: String
            perc_q30: String
            result: String
        ): ReportSampleQc
        updateReportSampleQc(
            id: ID!
            sample: String!
            name: String
            perc_tumor: String
            conc_dna: String
            total_dna: String
            avg_depth: String
            perc_q30: String
            result: String
        ): ReportSampleQc
        deleteReportSampleQcs(ids: [ID!]!): Boolean

        newReportTemplate(
            name: String!
            image_cover_front: String
            image_cover_back: String
            header_left: String
            header_right: String
            footer_left: String
            footer_right: String
            module: String
        ): ReportTemplate
        updateReportTemplate(
            id: String!
            name: String!
            image_cover_front: String
            image_cover_back: String
            header_left: String
            header_right: String
            footer_left: String
            footer_right: String
            module: String
        ): ReportTemplate
        updateReportTemplateModule(id: String!, module: String!): ReportTemplate
        deleteReportTemplates(ids: [ID!]!): Boolean

        newReportTask(
            name: String
            sample: String!
            template: String!
            date_started: String
            date_completed: String
        ): ReportTask
        updateReportTask(
            id: String!
            name: String
            sample: String!
            template: String!
            date_started: String
            date_completed: String
        ): ReportTask
        deleteReportTasks(ids: [ID!]!): Boolean

        id: ID!
        task: ReportTask
        pdf_file: ReportFile
        date_generated: DateTime
        report_status: Int

        newReportReport(task: String!): ReportTask
        updateReportReport(id: String!, task: String!): ReportReport
        updateReportReportFile(id: String!, file: String!): ReportReport
        deleteReportReports(ids: [ID!]!): Boolean
    }
`;

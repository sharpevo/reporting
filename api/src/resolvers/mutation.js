const mongoose = require("mongoose");
const fs = require("fs");
const { finished } = require("stream/promises");
const path = require("path");
const uuid = require("uuid");

module.exports = {
    newField: async (parent, args, { models }) => {
        return await models.Field.create({
            label: args.label,
            key: args.key,
            order: args.order,
            table: mongoose.Types.ObjectId(args.table),
        });
    },
    deleteFields: async (parent, { ids }, { models }) => {
        try {
            const result = await models.Field.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    updateField: async (parent, { id, label, key }, { models }) => {
        //const field = await models.Field.findById(id)
        return await models.Field.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    label: label,
                    key: key,
                },
            },
            {
                new: true,
            }
        );
    },

    newTable: async (parent, args, { models }) => {
        return await models.Table.create({
            label: args.label,
            key: args.key,
            group: args.group,
        });
    },
    deleteTables: async (parent, { ids }, { models }) => {
        try {
            const result = await models.Table.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    updateTable: async (parent, { id, label, key, group }, { models }) => {
        return await models.Table.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    label: label,
                    key: key,
                    group: group,
                },
            },
            {
                new: true,
            }
        );
    },

    newGeneClass: async (parent, { label }, { models }) => {
        return await models.GeneClass.create({
            label: label,
        });
    },
    updateGeneClass: async (parent, { id, label }, { models }) => {
        return await models.GeneClass.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    label: label,
                },
            },
            {
                new: true,
            }
        );
    },
    deleteGeneClasses: async (parent, { ids }, { models }) => {
        try {
            const result = await models.GeneClass.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    newGene: async (
        parent,
        {
            name,
            geneclass,
            source,
            is_wes,
            is_pancancer,
            is_ncc,
            is_8glc,
            creator,
            approver,
        },
        { models }
    ) => {
        let obj = {
            name: name,
            source: source,
            is_wes: is_wes,
            is_pancancer: is_pancancer,
            is_ncc: is_ncc,
            is_8glc: is_8glc,
            status: 0,
        };
        if (geneclass) {
            var geneclassd = await models.GeneClass.findOneAndUpdate(
                { label: geneclass },
                { label: geneclass },
                { upsert: true, new: true }
            );
            obj.geneclass = geneclassd._id;
        }
        try {
            return await models.Gene.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateGene: async (
        parent,
        {
            id,
            name,
            geneclass,
            source,
            is_wes,
            is_pancancer,
            is_ncc,
            is_8glc,
            creator,
            approver,
        },
        { models }
    ) => {
        let obj = new models.Gene({
            _id: id,
            name: name,
            source: source,
            is_wes: is_wes,
            is_pancancer: is_pancancer,
            is_ncc: is_ncc,
            is_8glc: is_8glc,
            status: 0,
        });
        if (geneclass) {
            var geneclassd = await models.GeneClass.findOneAndUpdate(
                { label: geneclass },
                { label: geneclass },
                { upsert: true, new: true }
            );
            obj.geneclass = geneclassd._id;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteGenes: async (parent, { ids }, { models }) => {
        try {
            const result = await models.Gene.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newGeneAnnot: async (
        parent,
        {
            gene,
            name_cn,
            name_at,
            chr,
            description_cn,
            description_en,
            source,
            literature,
        },
        { models }
    ) => {
        const gened = await models.Gene.findOne({ name: gene });
        if (!gened) {
            throw new Error(`gene '${gene}' does not exist`);
        }
        console.log(gened);
        try {
            return await models.GeneAnnot.create({
                gene: gened._id,
                name_cn: name_cn,
                name_at: name_at,
                chr: chr,
                description_cn: description_cn,
                description_en: description_en,
                source: source,
                literature: literature,
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateGeneAnnot: async (
        parent,
        {
            id,
            gene,
            name_cn,
            name_at,
            chr,
            description_cn,
            description_en,
            source,
            literature,
        },
        { models }
    ) => {
        console.log(id, gene);
        let gened = await models.Gene.findOne({ name: gene });
        if (!gened) {
            throw new Error(`gene '${gene}' does not exist`);
        }
        console.log(gened);
        let geneAnnot = new models.GeneAnnot({
            _id: id,
            gene: gened._id,
            name_cn: name_cn,
            name_at: name_at,
            chr: chr,
            description_cn: description_cn,
            description_en: description_en,
            source: source,
            literature: literature,
        });
        geneAnnot.isNew = false;
        try {
            return await geneAnnot.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteGeneAnnots: async (parent, { ids }, { models }) => {
        try {
            const result = await models.GeneAnnot.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newDdr: async (
        parent,
        { gene, ddrclass, result, result_detail, literature, source },
        { models }
    ) => {
        let obj = {
            result: result,
            result_detail: result_detail,
            literature: literature,
            source: source,
        };
        if (gene) {
            var gened = await models.Gene.findOne({ name: gene });
            if (!gened) {
                throw new Error(`gene '${gene}' does not exist`);
            }
            obj.gene = gened._id;
        }
        if (ddrclass) {
            var ddrclassd = await models.DdrClass.findOneAndUpdate(
                { label: ddrclass },
                { label: ddrclass },
                { upsert: true, new: true }
            );
            obj.ddrclass = ddrclassd._id;
        }
        try {
            return await models.Ddr.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateDdr: async (
        parent,
        { id, gene, ddrclass, result, result_detail, literature, source },
        { models }
    ) => {
        let obj = new models.Ddr({
            _id: id,
            result: result,
            result_detail: result_detail,
            literature: literature,
            source: source,
        });
        if (gene) {
            var gened = await models.Gene.findOne({ name: gene });
            if (!gened) {
                throw new Error(`gene '${gene}' does not exist`);
            }
            obj.gene = gened._id;
        }
        if (ddrclass) {
            var ddrclassd = await models.DdrClass.findOneAndUpdate(
                { label: ddrclass },
                { label: ddrclass },
                { upsert: true, new: true }
            );
            obj.ddrclass = ddrclassd._id;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteDdrs: async (parent, { ids }, { models }) => {
        try {
            const result = await models.Ddr.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newTmh: async (
        parent,
        { item, value, result, result_detail, literature_detail, source },
        { models }
    ) => {
        try {
            return await models.Tmh.create({
                item: item,
                value: value,
                result: result,
                result_detail: result_detail,
                literature_detail: literature_detail,
                source: source,
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateTmh: async (
        parent,
        { id, item, value, result, result_detail, literature_detail, source },
        { models }
    ) => {
        let tmh = new models.Tmh({
            _id: id,
            item: item,
            value: value,
            result: result,
            result_detail: result_detail,
            literature_detail: literature_detail,
            source: source,
        });
        tmh.isNew = false;
        try {
            return await tmh.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteTmhs: async (parent, { ids }, { models }) => {
        try {
            const result = await models.Tmh.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newCancer: async (
        parent,
        {
            name_cn,
            name_en,
            name_en_abbr,
            description_cn,
            source,
            guide,
            literature,
            remark,
        },
        { models }
    ) => {
        try {
            return await models.Cancer.create({
                name_cn: name_cn,
                name_en: name_en,
                name_en_abbr: name_en_abbr,
                description_cn: description_cn,
                source: source,
                guide: guide,
                literature: literature,
                remark: remark,
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateCancer: async (
        parent,
        {
            id,
            name_cn,
            name_en,
            name_en_abbr,
            description_cn,
            source,
            guide,
            literature,
            remark,
        },
        { models }
    ) => {
        let cancer = new models.Cancer({
            _id: id,
            name_cn: name_cn,
            name_en: name_en,
            name_en_abbr: name_en_abbr,
            description_cn: description_cn,
            source: source,
            guide: guide,
            literature: literature,
            remark: remark,
        });
        cancer.isNew = false;
        try {
            return await cancer.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteCancers: async (parent, { ids }, { models }) => {
        try {
            const result = await models.Cancer.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newMutationCancer: async (
        parent,
        {
            mutation,
            gene_annot,
            transcript,
            position,
            snp,
            mutationclass,
            mutation_detail,
            cancer,
            drug_info,
            evidence,
            literature,
        },
        { models }
    ) => {
        try {
            let obj = {
                mutation: mutation,
                transcript: transcript,
                position: position,
                snp: snp,
                mutation_detail: mutation_detail,
                drug_info: drug_info,
                evidence: evidence,
                literature: literature,
            };
            if (gene_annot) {
                const gened = await models.Gene.findOne({ name: gene_annot });
                if (!gened) {
                    throw new Error(
                        `gene '${gene_annot}' required by annotation does not exist`
                    );
                }
                const gene_annotd = await models.GeneAnnot.findOne({
                    gene: gened._id,
                });
                if (!gene_annotd) {
                    throw new Error(
                        `annotation '${gene_annot}' (id ${gened._id}) does not exist`
                    );
                }
                obj.gene_annot = gene_annotd._id;
            }
            if (cancer) {
                const cancerd = await models.Cancer.findOne({
                    name_cn: cancer,
                });
                if (!cancerd) {
                    throw new Error(`cancer '${cancer}' does not exist`);
                }
                obj.cancer = cancerd._id;
            }
            // unique:
            if (mutationclass) {
                const mutationclassd = await models.MutationClass.findOneAndUpdate(
                    { label: mutationclass },
                    { label: mutationclass },
                    { upsert: true, new: true }
                );
                obj.mutationclass = mutationclassd._id;
            }
            return await models.MutationCancer.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateMutationCancer: async (
        parent,
        {
            id,
            mutation,
            gene_annot,
            transcript,
            position,
            snp,
            mutationclass,
            mutation_detail,
            cancer,
            drug_info,
            evidence,
            literature,
        },
        { models }
    ) => {
        let obj = new models.MutationCancer({
            _id: id,
            mutation: mutation,
            transcript: transcript,
            position: position,
            snp: snp,
            mutation_detail: mutation_detail,
            drug_info: drug_info,
            evidence: evidence,
            literature: literature,
        });
        if (gene_annot) {
            const gened = await models.Gene.findOne({ name: gene_annot });
            if (!gened) {
                throw new Error(
                    `gene '${gene_annot}' required by annotation does not exist`
                );
            }
            const gene_annotd = await models.GeneAnnot.findOne({
                gene: gened._id,
            });
            if (!gene_annotd) {
                throw new Error(
                    `annotation '${gene_annot}' (id ${gened._id}) does not exist`
                );
            }
            obj.gene_annot = gene_annotd._id;
        }
        if (cancer) {
            const cancerd = await models.Cancer.findOne({ name_cn: cancer });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            obj.cancer = cancerd._id;
        }
        // unique:
        if (mutationclass) {
            const mutationclassd = await models.MutationClass.findOneAndUpdate(
                { label: mutationclass },
                { label: mutationclass },
                { upsert: true, new: true }
            );
            obj.mutationclass = mutationclassd._id;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteMutationCancers: async (parent, { ids }, { models }) => {
        try {
            const result = await models.MutationCancer.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newDrug: async (
        parent,
        {
            name_cm,
            name_en,
            name_cn,
            name_td,
            vendor,
            is_market_ready,
            date_approved_fda,
            date_approved_nmpa,
            associated_gene,
            is_target_test_required,
            medicare_catalogue,
            medicare_number,
            cancer,
            description,
            source,
            literature,
        },
        { models }
    ) => {
        try {
            return await models.Drug.create({
                name_cm: name_cm,
                name_en: name_en,
                name_cn: name_cn,
                name_td: name_td,
                vendor: vendor,
                is_market_ready: is_market_ready,
                date_approved_fda: date_approved_fda,
                date_approved_nmpa: date_approved_nmpa,
                associated_gene: associated_gene,
                is_target_test_required: is_target_test_required,
                medicare_catalogue: medicare_catalogue,
                medicare_number: medicare_number,
                cancer: cancer,
                description: description,
                source: source,
                literature: literature,
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateDrug: async (
        parent,
        {
            id,
            name_cm,
            name_en,
            name_cn,
            name_td,
            vendor,
            is_market_ready,
            date_approved_fda,
            date_approved_nmpa,
            associated_gene,
            is_target_test_required,
            medicare_catalogue,
            medicare_number,
            cancer,
            description,
            source,
            literature,
        },
        { models }
    ) => {
        let drug = new models.Drug({
            _id: id,
            name_cm: name_cm,
            name_en: name_en,
            name_cn: name_cn,
            name_td: name_td,
            vendor: vendor,
            is_market_ready: is_market_ready,
            date_approved_fda: date_approved_fda,
            date_approved_nmpa: date_approved_nmpa,
            associated_gene: associated_gene,
            is_target_test_required: is_target_test_required,
            medicare_catalogue: medicare_catalogue,
            medicare_number: medicare_number,
            cancer: cancer,
            description: description,
            source: source,
            literature: literature,
        });
        drug.isNew = false;
        try {
            return await drug.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteDrugs: async (parent, { ids }, { models }) => {
        try {
            const result = await models.Drug.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newDrugCancer: async (
        parent,
        { drug, cancer, medical_evidence, source, literature },
        { models }
    ) => {
        let obj = {
            medical_evidence: medical_evidence,
            source: source,
            literature: literature,
        };
        if (drug) {
            const drugd = await models.Drug.findOne({ name_cm: drug });
            if (!drugd) {
                throw new Error(`drug '${drug}' does not exist`);
            }
            obj.drug = drugd._id;
        }
        if (cancer) {
            const cancerd = await models.Cancer.findOne({ name_cn: cancer });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            obj.cancer = cancerd._id;
        }
        try {
            return await models.DrugCancer.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateDrugCancer: async (
        parent,
        { id, drug, cancer, medical_evidence, source, literature },
        { models }
    ) => {
        let obj = new models.DrugCancer({
            _id: id,
            medical_evidence: medical_evidence,
            source: source,
            literature: literature,
        });
        if (drug) {
            const drugd = await models.Drug.findOne({ name_cm: drug });
            if (!drugd) {
                throw new Error(`drug '${drug}' does not exist`);
            }
            obj.drug = drugd._id;
        }
        if (cancer) {
            const cancerd = await models.Cancer.findOne({ name_cn: cancer });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            obj.cancer = cancerd._id;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteDrugCancers: async (parent, { ids }, { models }) => {
        try {
            const result = await models.DrugCancer.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newMutationDrugBenefit: async (
        parent,
        { mutation, drug, evidence_level, source, literature },
        { models }
    ) => {
        let obj = {
            source: source,
            literature: literature,
        };
        if (mutation) {
            let mutationSplited = mutation.split("(");
            if (mutationSplited.length != 2) {
                throw new Error(`invalid mutation '$mutation'`);
            }
            let cancerSplited = mutationSplited[1].split(")");
            if (cancerSplited.length != 2) {
                throw new Error(`invalid cancer '$mutation'`);
            }
            const cancerd = await models.Cancer.findOne({
                name_cn: cancerSplited[0],
            });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            const mutationd = await models.MutationCancer.findOne({
                mutation: mutationSplited[0],
                cancer: cancerd._id,
            });
            if (!mutationd) {
                throw new Error(`mutation '${mutation}' does not exist`);
            }
            obj.mutation = mutationd._id;
        }
        if (drug) {
            const drugd = await models.Drug.findOne({ name_cm: drug });
            if (!drugd) {
                throw new Error(`drug '${drug}' does not exist`);
            }
            obj.drug = drugd._id;
        }
        if (evidence_level) {
            let evidenceleveld = await models.EvidenceLevel.findOneAndUpdate(
                { label: evidence_level },
                { label: evidence_level },
                { upsert: true, new: true }
            );
            obj.evidence_level = evidenceleveld._id;
        }
        try {
            return await models.MutationDrugBenefit.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateMutationDrugBenefit: async (
        parent,
        { id, mutation, drug, evidence_level, source, literature },
        { models }
    ) => {
        let obj = new models.MutationDrugBenefit({
            _id: id,
            source: source,
            literature: literature,
        });
        if (mutation) {
            let mutationSplited = mutation.split("(");
            if (mutationSplited.length != 2) {
                throw new Error(`invalid mutation '$mutation'`);
            }
            let cancerSplited = mutationSplited[1].split(")");
            if (cancerSplited.length != 2) {
                throw new Error(`invalid cancer '$mutation'`);
            }
            const cancerd = await models.Cancer.findOne({
                name_cn: cancerSplited[0],
            });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            const mutationd = await models.MutationCancer.findOne({
                mutation: mutationSplited[0],
                cancer: cancerd._id,
            });
            if (!mutationd) {
                throw new Error(`mutation '${mutation}' does not exist`);
            }
            obj.mutation = mutationd._id;
        }
        if (drug) {
            const drugd = await models.Drug.findOne({ name_cm: drug });
            if (!drugd) {
                throw new Error(`drug '${drug}' does not exist`);
            }
            obj.drug = drugd._id;
        }
        if (evidence_level) {
            let evidenceleveld = await models.EvidenceLevel.findOneAndUpdate(
                { label: evidence_level },
                { label: evidence_level },
                { upsert: true, new: true }
            );
            obj.evidence_level = evidenceleveld._id;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteMutationDrugBenefits: async (parent, { ids }, { models }) => {
        try {
            const result = await models.MutationDrugBenefit.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newMutationDrugResistance: async (
        parent,
        { mutation, drug, evidence_level, source, literature },
        { models }
    ) => {
        let obj = {
            source: source,
            literature: literature,
        };
        if (mutation) {
            let mutationSplited = mutation.split("(");
            if (mutationSplited.length != 2) {
                throw new Error(`invalid mutation '$mutation'`);
            }
            let cancerSplited = mutationSplited[1].split(")");
            if (cancerSplited.length != 2) {
                throw new Error(`invalid cancer '$mutation'`);
            }
            const cancerd = await models.Cancer.findOne({
                name_cn: cancerSplited[0],
            });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            const mutationd = await models.MutationCancer.findOne({
                mutation: mutationSplited[0],
                cancer: cancerd._id,
            });
            if (!mutationd) {
                throw new Error(`mutation '${mutation}' does not exist`);
            }
            obj.mutation = mutationd._id;
        }
        if (drug) {
            const drugd = await models.Drug.findOne({ name_cm: drug });
            if (!drugd) {
                throw new Error(`drug '${drug}' does not exist`);
            }
            obj.drug = drugd._id;
        }
        if (evidence_level) {
            let evidenceleveld = await models.EvidenceLevel.findOneAndUpdate(
                { label: evidence_level },
                { label: evidence_level },
                { upsert: true, new: true }
            );
            obj.evidence_level = evidenceleveld._id;
        }
        try {
            return await models.MutationDrugResistance.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateMutationDrugResistance: async (
        parent,
        { id, mutation, drug, evidence_level, source, literature },
        { models }
    ) => {
        let obj = new models.MutationDrugResistance({
            _id: id,
            source: source,
            literature: literature,
        });
        if (mutation) {
            let mutationSplited = mutation.split("(");
            if (mutationSplited.length != 2) {
                throw new Error(`invalid mutation '$mutation'`);
            }
            let cancerSplited = mutationSplited[1].split(")");
            if (cancerSplited.length != 2) {
                throw new Error(`invalid cancer '$mutation'`);
            }
            const cancerd = await models.Cancer.findOne({
                name_cn: cancerSplited[0],
            });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            const mutationd = await models.MutationCancer.findOne({
                mutation: mutationSplited[0],
                cancer: cancerd._id,
            });
            if (!mutationd) {
                throw new Error(`mutation '${mutation}' does not exist`);
            }
            obj.mutation = mutationd._id;
        }
        if (drug) {
            const drugd = await models.Drug.findOne({ name_cm: drug });
            if (!drugd) {
                throw new Error(`drug '${drug}' does not exist`);
            }
            obj.drug = drugd._id;
        }
        if (evidence_level) {
            let evidenceleveld = await models.EvidenceLevel.findOneAndUpdate(
                { label: evidence_level },
                { label: evidence_level },
                { upsert: true, new: true }
            );
            obj.evidence_level = evidenceleveld._id;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteMutationDrugResistances: async (parent, { ids }, { models }) => {
        try {
            const result = await models.MutationDrugResistance.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newMutationDrugBenefitOther: async (
        parent,
        { mutation, drug, evidence_level, source, literature },
        { models }
    ) => {
        let obj = {
            source: source,
            literature: literature,
        };
        if (mutation) {
            let mutationSplited = mutation.split("(");
            if (mutationSplited.length != 2) {
                throw new Error(`invalid mutation '$mutation'`);
            }
            let cancerSplited = mutationSplited[1].split(")");
            if (cancerSplited.length != 2) {
                throw new Error(`invalid cancer '$mutation'`);
            }
            const cancerd = await models.Cancer.findOne({
                name_cn: cancerSplited[0],
            });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            const mutationd = await models.MutationCancer.findOne({
                mutation: mutationSplited[0],
                cancer: cancerd._id,
            });
            if (!mutationd) {
                throw new Error(`mutation '${mutation}' does not exist`);
            }
            obj.mutation = mutationd._id;
        }
        if (drug) {
            const drugd = await models.Drug.findOne({ name_cm: drug });
            if (!drugd) {
                throw new Error(`drug '${drug}' does not exist`);
            }
            obj.drug = drugd._id;
        }
        if (evidence_level) {
            let evidenceleveld = await models.EvidenceLevel.findOneAndUpdate(
                { label: evidence_level },
                { label: evidence_level },
                { upsert: true, new: true }
            );
            obj.evidence_level = evidenceleveld._id;
        }
        try {
            return await models.MutationDrugBenefitOther.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateMutationDrugBenefitOther: async (
        parent,
        { id, mutation, drug, evidence_level, source, literature },
        { models }
    ) => {
        let obj = new models.MutationDrugBenefitOther({
            _id: id,
            source: source,
            literature: literature,
        });
        if (mutation) {
            let mutationSplited = mutation.split("(");
            if (mutationSplited.length != 2) {
                throw new Error(`invalid mutation '$mutation'`);
            }
            let cancerSplited = mutationSplited[1].split(")");
            if (cancerSplited.length != 2) {
                throw new Error(`invalid cancer '$mutation'`);
            }
            const cancerd = await models.Cancer.findOne({
                name_cn: cancerSplited[0],
            });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            const mutationd = await models.MutationCancer.findOne({
                mutation: mutationSplited[0],
                cancer: cancerd._id,
            });
            if (!mutationd) {
                throw new Error(`mutation '${mutation}' does not exist`);
            }
            obj.mutation = mutationd._id;
        }
        if (drug) {
            const drugd = await models.Drug.findOne({ name_cm: drug });
            if (!drugd) {
                throw new Error(`drug '${drug}' does not exist`);
            }
            obj.drug = drugd._id;
        }
        if (evidence_level) {
            let evidenceleveld = await models.EvidenceLevel.findOneAndUpdate(
                { label: evidence_level },
                { label: evidence_level },
                { upsert: true, new: true }
            );
            obj.evidence_level = evidenceleveld._id;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteMutationDrugBenefitOthers: async (parent, { ids }, { models }) => {
        try {
            const result = await models.MutationDrugBenefitOther.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newMutationClinical: async (
        parent,
        { mutation, clinical_or_drug, evidence_level, evidence, source },
        { models }
    ) => {
        let obj = {
            clinical_or_drug: clinical_or_drug,
            evidence: evidence,
            source: source,
        };
        if (mutation) {
            let mutationSplited = mutation.split("(");
            if (mutationSplited.length != 2) {
                throw new Error(`invalid mutation '$mutation'`);
            }
            let cancerSplited = mutationSplited[1].split(")");
            if (cancerSplited.length != 2) {
                throw new Error(`invalid cancer '$mutation'`);
            }
            const cancerd = await models.Cancer.findOne({
                name_cn: cancerSplited[0],
            });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            const mutationd = await models.MutationCancer.findOne({
                mutation: mutationSplited[0],
                cancer: cancerd._id,
            });
            if (!mutationd) {
                throw new Error(`mutation '${mutation}' does not exist`);
            }
            obj.mutation = mutationd._id;
        }
        if (evidence_level) {
            let evidenceleveld = await models.EvidenceLevel.findOneAndUpdate(
                { label: evidence_level },
                { label: evidence_level },
                { upsert: true, new: true }
            );
            obj.evidence_level = evidenceleveld._id;
        }
        try {
            return await models.MutationClinical.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateMutationClinical: async (
        parent,
        { id, mutation, clinical_or_drug, evidence_level, evidence, source },
        { models }
    ) => {
        let obj = new models.MutationClinical({
            _id: id,
            clinical_or_drug: clinical_or_drug,
            evidence: evidence,
            source: source,
        });
        if (mutation) {
            let mutationSplited = mutation.split("(");
            if (mutationSplited.length != 2) {
                throw new Error(`invalid mutation '$mutation'`);
            }
            let cancerSplited = mutationSplited[1].split(")");
            if (cancerSplited.length != 2) {
                throw new Error(`invalid cancer '$mutation'`);
            }
            const cancerd = await models.Cancer.findOne({
                name_cn: cancerSplited[0],
            });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            const mutationd = await models.MutationCancer.findOne({
                mutation: mutationSplited[0],
                cancer: cancerd._id,
            });
            if (!mutationd) {
                throw new Error(`mutation '${mutation}' does not exist`);
            }
            obj.mutation = mutationd._id;
        }
        if (evidence_level) {
            let evidenceleveld = await models.EvidenceLevel.findOneAndUpdate(
                { label: evidence_level },
                { label: evidence_level },
                { upsert: true, new: true }
            );
            obj.evidence_level = evidenceleveld._id;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteMutationClinicals: async (parent, { ids }, { models }) => {
        try {
            const result = await models.MutationClinical.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newClinical: async (
        parent,
        {
            gene_annot,
            transcript,
            snp,
            mutation,
            drug,
            clinicalid,
            clinicalstatus,
            cancer,
            stage,
            trailtitle,
            location,
            remark,
        },
        { models }
    ) => {
        let obj = {
            transcript: transcript,
            snp: snp,
            mutation: mutation,
            drug: drug,
            clinicalid: clinicalid,
            stage: stage,
            trailtitle: trailtitle,
            location: location,
            remark: remark,
        };
        if (gene_annot) {
            const gened = await models.Gene.findOne({ name: gene_annot });
            if (!gened) {
                throw new Error(
                    `gene '${gene_annot}' required by annotation does not exist`
                );
            }
            const gene_annotd = await models.GeneAnnot.findOne({
                gene: gened._id,
            });
            if (!gene_annotd) {
                throw new Error(
                    `annotation '${gene_annot}' (id ${gened._id}) does not exist`
                );
            }
            obj.gene_annot = gene_annotd._id;
        }
        if (cancer) {
            const cancerd = await models.Cancer.findOne({ name_cn: cancer });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            obj.cancer = cancerd._id;
        }
        if (clinicalstatus) {
            let clinicalstatusd = await models.ClinicalStatus.findOneAndUpdate(
                { label: clinicalstatus },
                { label: clinicalstatus },
                { upsert: true, new: true }
            );
            obj.clinicalstatus = clinicalstatusd._id;
        }
        try {
            return await models.Clinical.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateClinical: async (
        parent,
        {
            id,
            gene_annot,
            transcript,
            snp,
            mutation,
            drug,
            clinicalid,
            clinicalstatus,
            cancer,
            stage,
            trailtitle,
            location,
            remark,
        },
        { models }
    ) => {
        let obj = new models.Clinical({
            _id: id,
            transcript: transcript,
            snp: snp,
            mutation: mutation,
            drug: drug,
            clinicalid: clinicalid,
            stage: stage,
            trailtitle: trailtitle,
            location: location,
            remark: remark,
        });
        if (gene_annot) {
            const gened = await models.Gene.findOne({ name: gene_annot });
            if (!gened) {
                throw new Error(
                    `gene '${gene_annot}' required by annotation does not exist`
                );
            }
            const gene_annotd = await models.GeneAnnot.findOne({
                gene: gened._id,
            });
            if (!gene_annotd) {
                throw new Error(
                    `annotation '${gene_annot}' (id ${gened._id}) does not exist`
                );
            }
            obj.gene_annot = gene_annotd._id;
        }
        if (cancer) {
            const cancerd = await models.Cancer.findOne({ name_cn: cancer });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            obj.cancer = cancerd._id;
        }
        if (clinicalstatus) {
            let clinicalstatusd = await models.ClinicalStatus.findOneAndUpdate(
                { label: clinicalstatus },
                { label: clinicalstatus },
                { upsert: true, new: true }
            );
            obj.clinicalstatus = clinicalstatusd._id;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteClinicals: async (parent, { ids }, { models }) => {
        try {
            const result = await models.Clinical.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newChemo: async (
        parent,
        {
            gene,
            rs,
            chr,
            locus,
            ref,
            drugclass,
            drug,
            type,
            evidence_level,
            cancer,
            race,
            genotype,
            description,
            description_ref,
            toxicity,
            effectiveness,
            literature,
        },
        { models }
    ) => {
        let obj = {
            rs: rs,
            chr: chr,
            locus: locus,
            ref: ref,
            drug: drug,
            type: type,
            race: race,
            genotype: genotype,
            description: description,
            description_ref: description_ref,
            toxicity: toxicity,
            effectiveness: effectiveness,
            literature: literature,
        };
        if (gene) {
            const gened = await models.Gene.findOne({ name: gene });
            if (!gened) {
                throw new Error(`gene '${gene}' does not exist`);
            }
            obj.gene = gened._id;
        }
        if (cancer) {
            const cancerd = await models.Cancer.findOne({ name_cn: cancer });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            obj.cancer = cancerd._id;
        }
        if (drugclass) {
            let drugclassd = await models.DrugClass.findOneAndUpdate(
                { label: drugclass },
                { label: drugclass },
                { upsert: true, new: true }
            );
            obj.drugclass = drugclassd._id;
        }
        if (evidence_level) {
            let evidenceleveld = await models.EvidenceLevel.findOneAndUpdate(
                { label: evidence_level },
                { label: evidence_level },
                { upsert: true, new: true }
            );
            obj.evidence_level = evidenceleveld._id;
        }
        try {
            return await models.Chemo.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateChemo: async (
        parent,
        {
            id,
            gene,
            rs,
            chr,
            locus,
            ref,
            drugclass,
            drug,
            type,
            evidence_level,
            cancer,
            race,
            genotype,
            description,
            description_ref,
            toxicity,
            effectiveness,
            literature,
        },
        { models }
    ) => {
        let obj = new models.Chemo({
            _id: id,
            rs: rs,
            chr: chr,
            locus: locus,
            ref: ref,
            drug: drug,
            type: type,
            race: race,
            genotype: genotype,
            description: description,
            description_ref: description_ref,
            toxicity: toxicity,
            effectiveness: effectiveness,
            literature: literature,
        });
        if (gene) {
            const gened = await models.Gene.findOne({ name: gene });
            if (!gened) {
                throw new Error(`gene '${gene}' does not exist`);
            }
            obj.gene = gened._id;
        }
        if (cancer) {
            const cancerd = await models.Cancer.findOne({ name_cn: cancer });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            obj.cancer = cancerd._id;
        }
        if (drugclass) {
            let drugclassd = await models.DrugClass.findOneAndUpdate(
                { label: drugclass },
                { label: drugclass },
                { upsert: true, new: true }
            );
            obj.drugclass = drugclassd._id;
        }
        if (evidence_level) {
            let evidenceleveld = await models.EvidenceLevel.findOneAndUpdate(
                { label: evidence_level },
                { label: evidence_level },
                { upsert: true, new: true }
            );
            obj.evidence_level = evidenceleveld._id;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteChemos: async (parent, { ids }, { models }) => {
        try {
            const result = await models.Chemo.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newNccnGene: async (
        parent,
        { gene, cancer, result, remark },
        { models }
    ) => {
        const gened = await models.Gene.findOne({ name: gene });
        if (!gened) {
            throw new Error(`gene '${gene}' does not exist`);
        }
        const cancerd = await models.Cancer.findOne({ name_cn: cancer });
        if (!cancerd) {
            throw new Error(`cancer '${cancer}' does not exist`);
        }
        console.log(cancerd);
        try {
            return await models.NccnGene.create({
                gene: gened._id,
                cancer: cancerd._id,
                result: result,
                remark: remark,
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateNccnGene: async (
        parent,
        { id, gene, cancer, result, remark },
        { models }
    ) => {
        const gened = await models.Gene.findOne({ name: gene });
        if (!gened) {
            throw new Error(`gene '${gene}' does not exist`);
        }
        const cancerd = await models.Cancer.findOne({ name_cn: cancer });
        if (!cancerd) {
            throw new Error(`cancer '${cancer}' does not exist`);
        }
        console.log(cancerd);
        let ng = new models.NccnGene({
            _id: id,
            gene: gened._id,
            cancer: cancerd._id,
            result: result,
            remark: remark,
        });
        ng.isNew = false;
        try {
            return await ng.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteNccnGenes: async (parent, { ids }, { models }) => {
        try {
            const result = await models.NccnGene.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newReportRemark: async (parent, { key, content }, { models }) => {
        try {
            return await models.ReportRemark.create({
                key: key,
                content: content,
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateReportRemark: async (parent, { id, key, content }, { models }) => {
        let rr = new models.ReportRemark({
            _id: id,
            key: key,
            content: content,
        });
        rr.isNew = false;
        try {
            return await rr.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteReportRemarks: async (parent, { ids }, { models }) => {
        try {
            const result = await models.ReportRemark.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newReportLiterature: async (parent, { pmid, literature }, { models }) => {
        try {
            return await models.ReportLiterature.create({
                pmid: pmid,
                literature: literature,
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateReportLiterature: async (
        parent,
        { id, pmid, literature },
        { models }
    ) => {
        let rl = new models.ReportLiterature({
            _id: id,
            pmid: pmid,
            literature: literature,
        });
        rl.isNew = false;
        try {
            return await rl.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteReportLiteratures: async (parent, { ids }, { models }) => {
        try {
            const result = await models.ReportLiterature.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newReportFile: async (parent, { file }, { models }) => {
        const { createReadStream, filename, mimetype, encoding } = await file;
        let stream = createReadStream();
        const dir = "files";
        const uniqueName = uuid.v4();
        const targetPath = path.join(dir, uniqueName.substr(0, 2));
        if (!fs.existsSync(targetPath))
            fs.mkdirSync(targetPath, { recursive: true });
        const targetFile = path.join(targetPath, uniqueName);
        const out = fs.createWriteStream(targetFile);
        stream.pipe(out);
        await finished(out);
        try {
            return await models.ReportFile.create({
                filename: filename,
                path: targetFile,
            });
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateReportFile: async (
        parent,
        { id, name, path, remark },
        { models }
    ) => {
        let rf = new models.ReportFile({
            _id: id,
            filename: filename,
            remark: remark,
        });
        rf.isNew = false;
        try {
            return await rf.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteReportFiles: async (parent, { ids }, { models }) => {
        try {
            const result = await models.ReportFile.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newPathway: async (
        parent,
        { name_en, name_cn, genes, description, image },
        { models }
    ) => {
        let obj = {
            name_en: name_en,
            name_cn: name_cn,
            description: description,
        };
        if (image) {
            const filed = await models.ReportFile.findOne({ path: image });
            if (!filed) {
                throw new Error(`image '${image}' does not exist`);
            }
            obj.image = filed._id;
        }
        if (genes && genes.length > 0) {
            const geneds = await models.Gene.find(
                //{name_en: {$in: genes.split(",")}})
                { name: { $in: genes } }
            );
            let geneids = [];
            geneds.map((gened) => {
                if (!gened) {
                    throw new Error(`gene '${gene}' does not exist`);
                }
                geneids.push(gened._id);
            });
            obj.genes = geneids;
        }
        try {
            return await models.Pathway.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updatePathway: async (
        parent,
        { id, name_en, name_cn, genes, description, image },
        { models }
    ) => {
        let obj = new models.Pathway({
            _id: id,
            name_en: name_en,
            name_cn: name_cn,
            description: description,
        });
        if (image) {
            const filed = await models.ReportFile.findOne({ path: image });
            if (!filed) {
                throw new Error(`image '${image}' does not exist`);
            }
            obj.image = filed._id;
        }
        if (genes && genes.length > 0) {
            const geneds = await models.Gene.find(
                //{name_en: {$in: genes.split(",")}})
                { name: { $in: genes } }
            );
            let geneids = [];
            geneds.map((gened) => {
                if (!gened) {
                    throw new Error(`gene '${gene}' does not exist`);
                }
                geneids.push(gened._id);
            });
            obj.genes = geneids;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deletePathways: async (parent, { ids }, { models }) => {
        try {
            const result = await models.Pathway.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newPathwayDrugCancer: async (
        parent,
        { pathway, drugs, cancer },
        { models }
    ) => {
        let obj = {};
        if (pathway) {
            const pathwayd = await models.Pathway.findOne({ name_cn: pathway });
            if (!pathwayd) {
                throw new Error(`pathway '${pathway}' does not exist`);
            }
            obj.pathway = pathwayd._id;
        }
        if (drugs && drugs.length > 0) {
            const drugds = await models.Drug.find({ name_cm: { $in: drugs } });
            let drugids = [];
            drugds.map((drugd) => {
                if (!drugd) {
                    throw new Error(`drug '${drugd}' does not exist`);
                }
                drugids.push(drugd._id);
            });
            obj.drugs = drugids;
        }
        if (cancer) {
            const cancerd = await models.Cancer.findOne({ name_cn: cancer });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            obj.cancer = cancerd._id;
        }
        try {
            return await models.PathwayDrugCancer.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updatePathwayDrugCancer: async (
        parent,
        { id, pathway, drugs, cancer },
        { models }
    ) => {
        let obj = new models.PathwayDrugCancer({
            _id: id,
        });
        if (pathway) {
            const pathwayd = await models.Pathway.findOne({ name_cn: pathway });
            if (!pathwayd) {
                throw new Error(`pathway '${pathway}' does not exist`);
            }
            obj.pathway = pathwayd._id;
        }
        if (drugs && drugs.length > 0) {
            const drugds = await models.Drug.find({ name_cm: { $in: drugs } });
            let drugids = [];
            drugds.map((drugd) => {
                if (!drugd) {
                    throw new Error(`drug '${drugd}' does not exist`);
                }
                drugids.push(drugd._id);
            });
            obj.drugs = drugids;
        }
        if (cancer) {
            const cancerd = await models.Cancer.findOne({ name_cn: cancer });
            if (!cancerd) {
                throw new Error(`cancer '${cancer}' does not exist`);
            }
            obj.cancer = cancerd._id;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deletePathwayDrugCancers: async (parent, { ids }, { models }) => {
        try {
            const result = await models.PathwayDrugCancer.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newDdrClass: async (parent, { label }, { models }) => {
        return await models.DdrClass.create({
            label: label,
        });
    },
    updateDdrClass: async (parent, { id, label }, { models }) => {
        return await models.DdrClass.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    label: label,
                },
            },
            {
                new: true,
            }
        );
    },
    deleteDdrClasses: async (parent, { ids }, { models }) => {
        try {
            const result = await models.DdrClass.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    newMutationClass: async (parent, { label }, { models }) => {
        return await models.MutationClass.create({
            label: label,
        });
    },
    updateMutationClass: async (parent, { id, label }, { models }) => {
        return await models.MutationClass.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    label: label,
                },
            },
            {
                new: true,
            }
        );
    },
    deleteMutationClasses: async (parent, { ids }, { models }) => {
        try {
            const result = await models.MutationClass.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    newDrugClass: async (parent, { label }, { models }) => {
        return await models.DrugClass.create({
            label: label,
        });
    },
    updateDrugClass: async (parent, { id, label }, { models }) => {
        return await models.DrugClass.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    label: label,
                },
            },
            {
                new: true,
            }
        );
    },
    deleteDrugClasses: async (parent, { ids }, { models }) => {
        try {
            const result = await models.DrugClass.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    newEvidenceLevel: async (parent, { label }, { models }) => {
        return await models.EvidenceLevel.create({
            label: label,
        });
    },
    updateEvidenceLevel: async (parent, { id, label }, { models }) => {
        return await models.EvidenceLevel.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    label: label,
                },
            },
            {
                new: true,
            }
        );
    },
    deleteEvidenceLevels: async (parent, { ids }, { models }) => {
        try {
            const result = await models.EvidenceLevel.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    newReportSampleType: async (parent, { label }, { models }) => {
        return await models.ReportSampleType.create({
            label: label,
        });
    },
    updateReportSampleType: async (parent, { id, label }, { models }) => {
        return await models.ReportSampleType.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    label: label,
                },
            },
            {
                new: true,
            }
        );
    },
    deleteReportSampleTypes: async (parent, { ids }, { models }) => {
        try {
            const result = await models.ReportSampleType.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    newInspectionProject: async (parent, { label }, { models }) => {
        return await models.InspectionProject.create({
            label: label,
        });
    },
    updateInspectionProject: async (parent, { id, label }, { models }) => {
        return await models.InspectionProject.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    label: label,
                },
            },
            {
                new: true,
            }
        );
    },
    deleteInspectionProjects: async (parent, { ids }, { models }) => {
        try {
            const result = await models.InspectionProject.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    newReportSample: async (
        parent,
        {
            name,
            gender,
            age,
            sample_number,
            sample_type,
            inspection_project,
            date_sampled,
            date_received,
            unit_submitted,
            inspection_method,
            inspection_platform,
            reference_genome,
            clinical_diagnosis,
            cancer_from_report,
            cancer_from_data,
            history_family,
            history_drug,
            date_reported,
        },
        { models }
    ) => {
        let obj = {
            name: name,
            gender: gender,
            age: age,
            sample_number: sample_number,
            date_sampled: date_sampled,
            date_received: date_received,
            unit_submitted: unit_submitted,
            inspection_method: inspection_method,
            inspection_platform: inspection_platform,
            reference_genome: reference_genome,
            clinical_diagnosis: clinical_diagnosis,
            cancer_from_report: cancer_from_report,
            history_family: history_family,
            history_drug: history_drug,
            date_reported: date_reported,
        };
        if (sample_type) {
            const sampleTyped = await models.ReportSampleType.findOne({
                label: sample_type,
            });
            if (!sampleTyped) {
                throw new Error(`sample type '${sample_type}' does not exist`);
            }
            obj.sample_type = sampleTyped._id;
        }
        if (inspection_project) {
            const inspectionProjectd = await models.InspectionProject.findOne({
                label: inspection_project,
            });
            if (!inspectionProjectd) {
                throw new Error(
                    `inspection project '${inspection_project}' does not exist`
                );
            }
            obj.inspection_project = inspectionProjectd._id;
        }
        if (cancer_from_data) {
            const cancerd = await models.Cancer.findOne({
                name_cn: cancer_from_data,
            });
            if (!cancerd) {
                throw new Error(`cancer '${cancer_from_data}' does not exist`);
            }
            obj.cancer_from_data = cancerd._id;
        }
        try {
            return await models.ReportSample.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateReportSample: async (
        parent,
        {
            id,
            name,
            gender,
            age,
            sample_number,
            sample_type,
            inspection_project,
            date_sampled,
            date_received,
            unit_submitted,
            inspection_method,
            inspection_platform,
            reference_genome,
            clinical_diagnosis,
            cancer_from_report,
            cancer_from_data,
            history_family,
            history_drug,
            date_reported,
            file_main,
            file_matched,
        },
        { models }
    ) => {
        let obj = new models.ReportSample({
            _id: id,
            name: name,
            gender: gender,
            age: age,
            sample_number: sample_number,
            date_sampled: date_sampled,
            date_received: date_received,
            unit_submitted: unit_submitted,
            inspection_method: inspection_method,
            inspection_platform: inspection_platform,
            reference_genome: reference_genome,
            clinical_diagnosis: clinical_diagnosis,
            cancer_from_report: cancer_from_report,
            history_family: history_family,
            history_drug: history_drug,
            date_reported: date_reported,
        });
        if (sample_type) {
            const sampleTyped = await models.ReportSampleType.findOne({
                label: sample_type,
            });
            if (!sampleTyped) {
                throw new Error(`sample type '${sample_type}' does not exist`);
            }
            obj.sample_type = sampleTyped._id;
        }
        if (inspection_project) {
            const inspectionProjectd = await models.InspectionProject.findOne({
                label: inspection_project,
            });
            if (!inspectionProjectd) {
                throw new Error(
                    `inspection project '${inspection_project}' does not exist`
                );
            }
            obj.inspection_project = inspectionProjectd._id;
        }
        if (cancer_from_data) {
            const cancerd = await models.Cancer.findOne({
                name_cn: cancer_from_data,
            });
            if (!cancerd) {
                throw new Error(`cancer '${cancer_from_data}' does not exist`);
            }
            obj.cancer_from_data = cancerd._id;
        }
        if (file_main) {
            const filed = await models.ReportFile.findOne({ path: file_main });
            if (!filed) {
                throw new Error(`file_main '${file_main}' does not exist`);
            }
            obj.file_main = filed._id;
        }
        if (file_matched) {
            const filed = await models.ReportFile.findOne({
                path: file_matched,
            });
            if (!filed) {
                throw new Error(
                    `file_matched '${file_matched}' does not exist`
                );
            }
            obj.file_matched = filed._id;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateReportSampleFile: async (parent, { id, key, fid }, { models }) => {
        const reportSampled = await models.ReportSample.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    [key]: fid,
                },
            },
            {
                new: true,
            }
        );
        if (!reportSampled) {
            throw new Error(`sample ${id} does not exist`);
        }
        return reportSampled;
    },
    deleteReportSamples: async (parent, { ids }, { models }) => {
        try {
            const result = await models.ReportSample.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    newReportSampleQc: async (
        parent,
        {
            sample,
            name,
            perc_tumor,
            conc_dna,
            total_dna,
            avg_depth,
            perc_q30,
            result,
        },
        { models }
    ) => {
        let obj = {
            name: name,
            perc_tumor: perc_tumor,
            conc_dna: conc_dna,
            total_dna: total_dna,
            avg_depth: avg_depth,
            perc_q30: perc_q30,
            result: result,
        };
        if (sample) {
            let sampleSplited = sample.split("(");
            if (sampleSplited.length != 2) {
                throw new Error(`invalid sample '${sample}'`);
            }
            let sampleNameSplited = sampleSplited[1].split(")");
            if (sampleNameSplited.length != 2) {
                throw new Error(`invalid sample '${sample}'`);
            }
            const sampled = await models.ReportSample.findOne({
                sample_number: sampleSplited[0],
                name: sampleNameSplited[0],
            });
            if (!sampled) {
                throw new Error(`sample '${sample}' does not exist`);
            }
            obj.sample = sampled._id;
        }
        try {
            return await models.ReportSampleQc.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateReportSampleQc: async (
        parent,
        {
            id,
            sample,
            name,
            perc_tumor,
            conc_dna,
            total_dna,
            avg_depth,
            perc_q30,
            result,
        },
        { models }
    ) => {
        let obj = new models.ReportSampleQc({
            _id: id,
            name: name,
            perc_tumor: perc_tumor,
            conc_dna: conc_dna,
            total_dna: total_dna,
            avg_depth: avg_depth,
            perc_q30: perc_q30,
            result: result,
        });
        if (sample) {
            let sampleSplited = sample.split("(");
            if (sampleSplited.length != 2) {
                throw new Error(`invalid sample '${sample}'`);
            }
            let sampleNameSplited = sampleSplited[1].split(")");
            if (sampleNameSplited.length != 2) {
                throw new Error(`invalid sample '${sample}'`);
            }
            const sampled = await models.ReportSample.findOne({
                sample_number: sampleSplited[0],
                name: sampleNameSplited[0],
            });
            if (!sampled) {
                throw new Error(`sample '${sample}' does not exist`);
            }
            obj.sample = sampled._id;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteReportSampleQcs: async (parent, { ids }, { models }) => {
        try {
            const result = await models.ReportSampleQc.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    },

    newReportTemplate: async (
        parent,
        {
            name,
            image_cover_front,
            image_cover_back,
            header_left,
            header_right,
            footer_left,
            footer_right,
            module,
        },
        { models }
    ) => {
        let obj = {
            name: name,
            header_left: header_left,
            header_right: header_right,
            footer_left: footer_left,
            footer_right: footer_right,
            module: module,
        };
        if (image_cover_front) {
            const frontFiled = await models.ReportFile.findOne({
                path: image_cover_front,
            });
            if (!frontFiled) {
                throw new Error(`front cover image does not exist`);
            }
            obj.image_cover_front = frontFiled._id;
        }
        if (image_cover_back) {
            const backFiled = await models.ReportFile.findOne({
                path: image_cover_back,
            });
            if (!backFiled) {
                throw new Error(`back cover image does not exist`);
            }
            obj.image_cover_back = backFiled._id;
        }
        try {
            return await models.ReportTemplate.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateReportTemplate: async (
        parent,
        {
            id,
            name,
            image_cover_front,
            image_cover_back,
            header_left,
            header_right,
            footer_left,
            footer_right,
            module,
        },
        { models }
    ) => {
        let obj = new models.ReportTemplate({
            _id: id,
            name: name,
            header_left: header_left,
            header_right: header_right,
            footer_left: footer_left,
            footer_right: footer_right,
            module: module,
        });
        if (image_cover_front) {
            const frontFiled = await models.ReportFile.findOne({
                path: image_cover_front,
            });
            if (!frontFiled) {
                throw new Error(`front cover image does not exist`);
            }
            obj.image_cover_front = frontFiled._id;
        }
        if (image_cover_back) {
            const backFiled = await models.ReportFile.findOne({
                path: image_cover_back,
            });
            if (!backFiled) {
                throw new Error(`back cover image does not exist`);
            }
            obj.image_cover_back = backFiled._id;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateReportTemplateModule: async (parent, { id, module }, { models }) => {
        const reportTemplated = await models.ReportTemplate.findOneAndUpdate(
            {
                _id: id,
            },
            {
                $set: {
                    module: module,
                },
            },
            {
                new: true,
            }
        );
        if (!reportTemplated) {
            throw new Error(`template ${id} does not exist`);
        }
        return reportTemplated;
    },
    deleteReportTemplates: async (parent, { ids }, { models }) => {
        try {
            const result = await models.ReportTemplate.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },

    newReportTask: async (
        parent,
        { sample, template, name, date_started, date_completed },
        { models }
    ) => {
        let obj = {
            name: name,
            date_started: date_started,
            date_completed: date_completed,
        };
        if (sample) {
            let sampleSplited = sample.split("(");
            if (sampleSplited.length != 2) {
                throw new Error(`invalid sample '${sample}'`);
            }
            let sampleNameSplited = sampleSplited[1].split(")");
            if (sampleNameSplited.length != 2) {
                throw new Error(`invalid sample '${sample}'`);
            }
            const sampled = await models.ReportSample.findOne({
                sample_number: sampleSplited[0],
                name: sampleNameSplited[0],
            });
            if (!sampled) {
                throw new Error(`sample '${sample}' does not exist`);
            }
            obj.sample = sampled._id;
        }
        if (template) {
            const templated = await models.ReportTemplate.findOne({
                name: template,
            });
            if (!templated) {
                throw new Error(`template '${template}' does not exist`);
            }
            obj.template = templated._id;
        }
        try {
            return await models.ReportTask.create(obj);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    updateReportTask: async (
        parent,
        { id, sample, template, name, date_started, date_completed },
        { models }
    ) => {
        let obj = new models.ReportTask({
            _id: id,
            name: name,
            date_started: date_started,
            date_completed: date_completed,
        });
        if (sample) {
            let sampleSplited = sample.split("(");
            if (sampleSplited.length != 2) {
                throw new Error(`invalid sample '${sample}'`);
            }
            let sampleNameSplited = sampleSplited[1].split(")");
            if (sampleNameSplited.length != 2) {
                throw new Error(`invalid sample '${sample}'`);
            }
            const sampled = await models.ReportSample.findOne({
                sample_number: sampleSplited[0],
                name: sampleNameSplited[0],
            });
            if (!sampled) {
                throw new Error(`sample '${sample}' does not exist`);
            }
            obj.sample = sampled._id;
        }
        if (template) {
            const templated = await models.ReportTemplate.findOne({
                name: template,
            });
            if (!templated) {
                throw new Error(`template '${template}' does not exist`);
            }
            obj.template = templated._id;
        }
        obj.isNew = false;
        try {
            return await obj.save();
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
    deleteReportTasks: async (parent, { ids }, { models }) => {
        try {
            const result = await models.ReportTask.deleteMany({
                _id: { $in: ids },
            });
            return true;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    },
};

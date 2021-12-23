const fs = require("fs");
const os = require("os");
const path = require("path");
const uuid = require("uuid");
const { spawn } = require("child_process");
const OBJ = "{}";

const fillLine = (m, vs) => {
    var vsIndex = 0;
    if (!m.lines) {
        console.log(">", m, vs);
        m.lines = [];
    }
    m.lines.forEach((l, lIndex) => {
        var line = m.lines[lIndex];
        l.forEach((u, uIndex) => {
            switch (u) {
                case OBJ:
                    line[uIndex] = vs[vsIndex];
                    vsIndex++;
                    break;
                default:
                    line[uIndex] = u;
            }
        });
    });
};

const generateData = async (
    models,
    task,
    sample,
    sampleqc,
    resultjson,
    template,
    project,
    nccn
) => {
    const cancerd = await models.Cancer.findOne({
        _id: sample.cancer_from_data,
    });
    if (!cancerd) {
        console.log("result: cancer(data) not found", sample.cancer_from_data);
        return;
    }

    var module = JSON.parse(template.module);
    var enabledModule = module.filter((item) => item.enabled == true);
    //var enabledModule = m().filter((item) => item.enabled == true);
    try {
        const posGeneClassd = await models.DdrClass.findOne({
            label: "正相关基因",
        });
        const negGeneClassd = await models.DdrClass.findOne({
            label: "负相关基因",
        });
        if (!posGeneClassd) {
            throw new Error("'正相关基因' not found");
        }
        if (!negGeneClassd) {
            throw new Error("'负相关基因' not found");
        }
        const ddrPathwayClassds = await models.DdrPathwayClass.find({});
        const posGeneds = await models.Ddr.find({
            ddrclass: posGeneClassd._id,
            pathwayclass: null,
        }).populate("gene");
        const negGeneds = await models.Ddr.find({
            ddrclass: negGeneClassd._id,
        }).populate("gene");

        var pathwayClassGeneds = [];
        var pathwayClassGeneKeys = [];
        var pathwayResultDetails = [];
        var pathwayLiteratureDetails = [];
        for (let p of ddrPathwayClassds) {
            pathwayClassGeneKeys.push(p.label);
            const gds = await models.Ddr.find({
                pathwayclass: p._id,
            }).populate("gene");
            pathwayClassGeneds.push(gds);
            var resultDetail = "";
            var literatureDetail = "";
            gds.forEach((g) => {
                if (g.result_detail) {
                    resultDetail = resultDetail
                        ? resultDetail + "," + g.result_detail
                        : g.result_detail;
                }
                if (g.literature_detail) {
                    literatureDetail = literatureDetail
                        ? literatureDetail + "," + g.literatureDetail
                        : g.literature_detail;
                }
            });
            pathwayResultDetails.push(resultDetail);
            pathwayLiteratureDetails.push(literatureDetail);
        }
        //console.log('== pos', posGeneds);
        //console.log('== neg', negGeneds);
        //console.log('== path', pathwayClassGeneds);
        var geneds = [];
        var ageneds = [];
        var agenedsAll = [];
        var hrdtds = [];
        var vsHrdtAnna = [];
        for (let germData of resultjson.Germline_genetic) {
            const hrdtd = await models.Hrdt.findOne({
                chr: germData[0],
                alt: germData[3],
                start: { $lte: germData[1] },
                end: { $gte: germData[1] },
            });
            if (hrdtd) {
                hrdtds.push(hrdtd);
                var mutations = hrdtd.aachange_refgene.split(",");
                var cm = "";
                var pm = "";
                if (mutations.length > 0) {
                    var mutation = mutations[0].split(":");
                    if (mutation.length > 4) {
                        cm = mutation[3];
                        pm = mutation[4];
                    }
                }
                vsHrdtAnna.push(
                    hrdtd.gene_name,
                    hrdtd.avsnp150,
                    cm,
                    pm,
                    germData[4],
                    hrdtd.mutation_type,
                    hrdtd.clinical_detail,
                    hrdtd.hrdt_analysis
                );
            }
        }
        for (const [index, item] of enabledModule.entries()) {
            switch (item.key) {
                case "cover": //{{{
                    enabledModule[index].lines.push(
                        [...Array(4)].map((x) => OBJ)
                    );
                    fillLine(enabledModule[index], [
                        project.label,
                        sample.name,
                        sample.sample_number,
                        new Date().toISOString().substring(0, 10),
                    ]);
                    break; //}}}
                case "sample_info": //{{{
                    enabledModule[index].lines.push(
                        [...Array(12)].map((x) => OBJ)
                    );
                    fillLine(enabledModule[index], [
                        sample.name,
                        sample.geneder,
                        sample.age,
                        sample.sample_number,
                        sample.sample_type ? sample.sample_type.label : "",
                        sample.date_received
                            ? new Date(sample.date_received)
                                  .toISOString()
                                  .substring(0, 10)
                            : "",
                        sample.date_reported
                            ? new Date(sample.date_reported)
                                  .toISOString()
                                  .substring(0, 10)
                            : "",
                        sample.unit_submitted,
                        project.label,
                        sample.clinical_diagnosis,
                        sample.history_family,
                        sample.history_drug,
                    ]);
                    break; //}}}
                case "drug_result/gene": //{{{
                    var vs = [];
                    var mutationds = [];
                    var drugb = [];
                    var drugr = [];
                    var drugo = [];
                    var drugc = [];
                    for (let somatic of resultjson.Somatic) {
                        var somatic_gene = somatic[1];
                        var somatic_mutation = somatic[5];
                        var somatic_transcript = somatic[9];
                        var somatic_freq = somatic[6];
                        const gened = await models.Gene.findOne({
                            name: somatic_gene,
                        });
                        if (!gened) {
                            console.log("result: gene not found", somatic_gene);
                            continue;
                        }
                        const agened = await models.GeneAnnot.findOne({
                            gene: gened._id,
                        }).populate("gene");
                        if (!agened) {
                            console.log(
                                "result: annot gene not found",
                                gened.label
                            );
                            continue;
                        }
                        agenedsAll.push(agened);
                        const mutationd = await models.MutationCancer.findOne({
                            mutation: somatic_mutation,
                            gene_annot: agened._id,
                            transcript: somatic_transcript,
                            cancer: cancerd._id,
                        });
                        if (!mutationd) {
                            console.log(
                                "result: mutation not found",
                                somatic_mutation,
                                agened._id,
                                somatic_transcript,
                                cancerd._id
                            );
                            continue;
                        }
                        console.log(
                            "result: mutation found",
                            somatic_mutation,
                            agened._id,
                            somatic_transcript,
                            cancerd._id
                        );
                        mutationds.push(mutationd);
                        geneds.push(gened);
                        ageneds.push(agened);
                        vs.push(
                            `${somatic_gene} ${somatic_mutation}\n（${somatic_freq}%）`
                        );

                        const mbds = await models.MutationDrugBenefit.find({
                            mutation: mutationd._id,
                        })
                            .populate("drug")
                            .populate("evidence_level");
                        var drug_mb = "";
                        for (const md of mbds) {
                            if (drug_mb == "") {
                                drug_mb = `${md.drug.label}（${md.evidence_level.label}）`;
                            } else {
                                drug_mb =
                                    drug_mb +
                                    `\n${md.drug.label}（${md.evidence_level.label}）`;
                            }
                            drugb.push(md);
                        }
                        vs.push(drug_mb);

                        const mrds = await models.MutationDrugResistance.find({
                            mutation: mutationd._id,
                        })
                            .populate("drug")
                            .populate("evidence_level");
                        var drug_mr = "";
                        for (const md of mrds) {
                            if (drug_mr == "") {
                                drug_mr = `${md.drug.label}（${md.evidence_level.label}）`;
                            } else {
                                drug_mr =
                                    drug_mr +
                                    `\n${md.drug.label}（${md.evidence_level.label}）`;
                            }
                            drugr.push(md);
                        }
                        vs.push(drug_mr);

                        const mbods =
                            await models.MutationDrugBenefitOther.find({
                                mutation: mutationd._id,
                            })
                                .populate("drug")
                                .populate("evidence_level");
                        var drug_mbo = "";
                        for (const md of mbods) {
                            if (drug_mbo == "") {
                                drug_mbo = `${md.drug.label}（${md.evidence_level.label}）`;
                            } else {
                                drug_mbo =
                                    drug_mbo +
                                    `\n${md.drug.label}（${md.evidence_level.label}）`;
                            }
                            drugo.push(md);
                        }
                        vs.push(drug_mbo);

                        const mcds = await models.MutationClinical.find({
                            mutation: mutationd._id,
                        }).populate("evidence_level");
                        var drug_mc = "";
                        for (const md of mcds) {
                            if (drug_mc == "") {
                                drug_mc = `${md.clinical_or_drug}（${
                                    md.evidence_level
                                        ? md.evidence_level.label
                                        : "-"
                                }）`;
                            } else {
                                drug_mc =
                                    drug_mc +
                                    `\n${md.clinical_or_drug}（${
                                        md.evidence_level
                                            ? md.evidence_level.label
                                            : "-"
                                    }）`;
                            }
                            drugc.push(md);
                        }
                        vs.push(drug_mc);
                    }
                    if (vs.length == 0) {
                        //vs = ["本次检测未检出与靶向用药相关的体细胞变异"];
                        vs = [""];
                        enabledModule[index].lines.push([OBJ]);
                    } else {
                        enabledModule[index].lines.push(
                            ...[...Array(vs.length / 5)].map((x) => [
                                OBJ,
                                OBJ,
                                OBJ,
                                OBJ,
                                OBJ,
                            ])
                        );
                    }
                    fillLine(enabledModule[index], vs);

                    var vsTargetDrugGenePm = [];
                    var vsTargetDrugGeneCv = [];
                    var vsTargetDrugGeneFs = [];
                    mutationds.forEach((mutationd, index) => {
                        resultjson.Somatic.forEach((s) => {
                            if (geneds[index].name == s[1]) {
                                vsTargetDrugGenePm.push(
                                    s[1],
                                    s[7],
                                    s[9],
                                    s[4],
                                    s[5],
                                    s[6],
                                    s[8]
                                );
                            }
                        });
                        resultjson.CNV.forEach((c) => {
                            if (geneds[index].name == c[1]) {
                                vsTargetDrugGeneCv.push(
                                    c[1],
                                    c[2],
                                    c[3],
                                    c[4],
                                    c[5],
                                    c[6]
                                );
                            }
                        });
                        resultjson.Fusion.forEach((f) => {
                            if (geneds[index].name == f[1]) {
                                vsTargetDrugGeneFs.push(f[1], f[2], f[3]);
                            }
                        });
                    });

                    var drugAnnaSomaticIndex = enabledModule.findIndex(
                        (m) => m.key == "drug_anna/gene/somatic"
                    );
                    if (drugAnnaSomaticIndex < 0) {
                        console.error("invalid drug anna gene index");
                        continue;
                    }

                    if (vsTargetDrugGenePm.length == 0) {
                        //vsTargetDrugGenePm = [
                        //"本样本未检出与靶向用药相关的体细胞基因点突变、缺失、插入变异",
                        //];
                        vsTargetDrugGenePm = [""];
                        enabledModule[drugAnnaSomaticIndex].lines.push([OBJ]);
                    } else {
                        enabledModule[drugAnnaSomaticIndex].lines.push(
                            ...[...Array(vsTargetDrugGenePm.length / 7)].map(
                                (x) => [OBJ, OBJ, OBJ, OBJ, OBJ, OBJ, OBJ]
                            )
                        );
                    }
                    fillLine(
                        enabledModule[drugAnnaSomaticIndex],
                        vsTargetDrugGenePm
                    );

                    var drugAnnaCnvIndex = enabledModule.findIndex(
                        (m) => m.key == "drug_anna/gene/cnv"
                    );
                    if (drugAnnaCnvIndex < 0) {
                        console.error("invalid drug anna gene cnv index");
                        continue;
                    }

                    if (vsTargetDrugGeneCv.length == 0) {
                        vsTargetDrugGeneCv = [""];
                        //"本样本未检出与靶向用药相关的基因拷贝数变异",
                        enabledModule[drugAnnaCnvIndex].lines.push([OBJ]);
                    } else {
                        enabledModule[drugAnnaCnvIndex].lines.push(
                            ...[...Array(vsTargetDrugGeneCv.length / 6)].map(
                                (x) => [OBJ, OBJ, OBJ, OBJ, OBJ, OBJ]
                            )
                        );
                    }
                    fillLine(
                        enabledModule[drugAnnaCnvIndex],
                        vsTargetDrugGeneCv
                    );

                    var drugAnnaFusionIndex = enabledModule.findIndex(
                        (m) => m.key == "drug_anna/gene/fusion"
                    );
                    if (drugAnnaFusionIndex < 0) {
                        console.error("invalid drug anna gene fusion index");
                        continue;
                    }

                    if (vsTargetDrugGeneFs.length == 0) {
                        vsTargetDrugGeneFs = [""];
                        //"本样本未检出与靶向用药相关的体细胞基因拷贝数变异",
                        enabledModule[drugAnnaFusionIndex].lines.push([OBJ]);
                    } else {
                        enabledModule[drugAnnaFusionIndex].lines.push(
                            ...[...Array(vsTargetDrugGeneFs.length / 3)].map(
                                (x) => [OBJ, OBJ, OBJ]
                            )
                        );
                    }
                    fillLine(
                        enabledModule[drugAnnaFusionIndex],
                        vsTargetDrugGeneFs
                    );

                    // target_drug_clinical_drug

                    var targetDrugClinicalIndex = enabledModule.findIndex(
                        (m) => m.key == "drug_anna/clinical"
                    );
                    if (targetDrugClinicalIndex < 0) {
                        console.error("invalid target drug clinical index");
                        continue;
                    }
                    var vsTargetDrugClinical = [];
                    mutationds.forEach((mutationd, index) => {
                        resultjson.Somatic.forEach((s) => {
                            if (geneds[index].name == s[1]) {
                                vsTargetDrugClinical.push(
                                    `${s[1]} ${s[9]}:${s[8]}:${s[4]},${s[5]}(${s[6]}%)`,
                                    mutationd.mutation_detail,
                                    ageneds[index].description_cn,
                                    mutationd.drug_info
                                );
                            }
                        });
                    });

                    if (vsTargetDrugClinical.length == 0) {
                        //vsTargetDrugClinical = ["无"];
                        vsTargetDrugClinical = [];
                        enabledModule[targetDrugClinicalIndex].lines.push([
                            OBJ,
                        ]);
                    } else {
                        enabledModule[targetDrugClinicalIndex].lines.push(
                            ...[...Array(vsTargetDrugClinical.length / 4)].map(
                                (x) => [OBJ, OBJ, OBJ, OBJ]
                            )
                        );
                    }
                    fillLine(
                        enabledModule[targetDrugClinicalIndex],
                        vsTargetDrugClinical
                    );

                    // target_drug_benefit_med_evidence

                    var targetDrugMedEvidenceIndex = enabledModule.findIndex(
                        (m) => m.key == "drug_anna/clinical/evidence"
                    );
                    if (targetDrugMedEvidenceIndex < 0) {
                        console.error(
                            "invalid drug anna clinical evidence index"
                        );
                        continue;
                    }
                    var vsTargetDrugMedEvidence = [];
                    var drugds = [...drugb, ...drugr, ...drugo];
                    for (let dn of drugc) {
                        const drugd = await models.Drug.findOne({
                            name_cm: dn.clinical_or_drug,
                        });
                        if (drugd) {
                            drugds.push(drugd);
                        }
                    }
                    //var drugCancerds = [];
                    for (let dd of drugds) {
                        const drugCancerd = await models.DrugCancer.findOne({
                            drug: dd.drug._id,
                            cancer: cancerd._id,
                        });
                        if (drugCancerd) {
                            vsTargetDrugMedEvidence.push(
                                dd.drug.label,
                                cancerd.label,
                                drugCancerd.medical_evidence
                                    ? drugCancerd.medical_evidence
                                    : ""
                            );
                        } else {
                            vsTargetDrugMedEvidence.push(
                                dd.drug.label,
                                cancerd.label,
                                ""
                            );
                        }
                        console.log(
                            "Drug",
                            dd.drug._id,
                            cancerd._id,
                            drugCancerd
                        );
                    }

                    if (vsTargetDrugMedEvidence.length == 0) {
                        //vsTargetDrugMedEvidence = ["无"];
                        vsTargetDrugMedEvidence = [];
                        enabledModule[targetDrugMedEvidenceIndex].lines.push([
                            OBJ,
                        ]);
                    } else {
                        enabledModule[targetDrugMedEvidenceIndex].lines.push(
                            ...[
                                ...Array(vsTargetDrugMedEvidence.length / 3),
                            ].map((x) => [OBJ, OBJ, OBJ])
                        );
                    }
                    fillLine(
                        enabledModule[targetDrugMedEvidenceIndex],
                        vsTargetDrugMedEvidence
                    );

                    // target_drug_clinical_trial

                    var targetDrugClinicalTrialIndex = enabledModule.findIndex(
                        (m) => m.key == "drug_anna/clinical/trial"
                    );
                    if (targetDrugClinicalTrialIndex < 0) {
                        console.error(
                            "invalid target drug clinical trial index"
                        );
                        continue;
                    }
                    var vsTargetDrugClinicalTrial = [];
                    //var clinicalds = [];
                    //for (let d of drugc) {
                    //const cd = await models.Clinical.findOne({
                    //clinicalid: d.clinical_or_drug,
                    //cancer: cancerd._id,
                    //});
                    //if (cd) {
                    //clinicalds.push(cd);
                    //}
                    //}
                    //var agids = agenedsAll.map((g) => g._id);
                    //.filter(
                    //(value, index, array) =>
                    //array.indexOf(value) === index
                    //);
                    //console.log("GGG", somaticGenes, agids);
                    //
                    for (let s of resultjson.Somatic) {
                        var gened = await models.Gene.findOne({
                            name: s[1],
                        });
                        if (!gened) {
                            continue;
                        }
                        var agened = await models.GeneAnnot.findOne({
                            gene: gened._id,
                        });
                        if (!agened) {
                            continue;
                        }
                        var clinicald = await models.Clinical.findOne({
                            mutation: s[5],
                            snp: s[4],
                            gene_annot: agened._id,
                        });
                        if (!clinicald) {
                            continue;
                        }
                        //console.log("CCC", clinicald);
                        vsTargetDrugClinicalTrial.push(
                            clinicald.clinicalid,
                            cancerd.label,
                            clinicald.drug,
                            clinicald.stage,
                            clinicald.location
                        );
                    }

                    if (vsTargetDrugClinicalTrial.length == 0) {
                        //vsTargetDrugClinicalTrial = ["无"];
                        vsTargetDrugClinicalTrial = [];
                        enabledModule[targetDrugClinicalTrialIndex].lines.push([
                            OBJ,
                        ]);
                    } else {
                        enabledModule[targetDrugClinicalTrialIndex].lines.push(
                            ...[
                                ...Array(vsTargetDrugClinicalTrial.length / 5),
                            ].map((x) => [OBJ, OBJ, OBJ, OBJ, OBJ])
                        );
                    }
                    fillLine(
                        enabledModule[targetDrugClinicalTrialIndex],
                        vsTargetDrugClinicalTrial
                    );

                    // case 'result_all':
                    var resultAllIndex = enabledModule.findIndex(
                        (m) => m.key == "result_all"
                    );
                    if (resultAllIndex < 0) {
                        console.error(
                            "invalid result all index",
                            resultAllIndex,
                            enabledModule[2]
                        );
                        continue;
                    }
                    var ms = "";
                    var somatic_ms = resultjson.MSI[0][3];
                    switch (somatic_ms) {
                        case "MSS":
                            ms = "微卫星稳定（MSS）";
                            break;
                        case "MSI-H":
                            ms = "微卫星稳定性高（MSI-H）";
                            break;
                        case "MSI-L":
                            ms = "微卫星稳定性低（MSI-L）";
                            break;
                        default:
                            console.error("invalid ms", somatic_ms);
                    }
                    var germline_genetic = resultjson.Germline_genetic;
                    fillLine(enabledModule[resultAllIndex], [
                        resultjson.Somatic.length +
                            resultjson.CNV.length +
                            resultjson.Fusion.length +
                            " 个基因突变，" +
                            (mutationds.length > 0
                                ? "其中" +
                                  mutationds.length +
                                  "个突变与靶向用药相关"
                                : "未检测到与靶向用药相关的突变"),
                        resultjson.TMB[0][1] + "muts/Mb",
                        ms,
                        vsHrdtAnna.length / 8 > 0
                            ? //germline_genetic.length > 0
                              `检测到${
                                  vsHrdtAnna.length / 8
                              }个与遗传性肿瘤相关的致病突变/可能致病突变`
                            : "未检测到与遗传性肿瘤相关的致病/可能致病突变",
                    ]);

                    // appendix/gene_annot

                    var refGeneAnnotIndex = enabledModule.findIndex(
                        (m) => m.key == "appendix/gene_annot"
                    );
                    if (refGeneAnnotIndex < 0) {
                        console.error(
                            "invalid gene annot index",
                            refGeneAnnotIndex
                        );
                        continue;
                    }
                    var vsRefGeneAnnot = [];
                    agenedsAll
                        .filter(
                            (v, i, a) =>
                                a.findIndex(
                                    (t) => t.gene.label == v.gene.label
                                ) === i
                        )
                        .forEach((g) => {
                            vsRefGeneAnnot.push(g.gene.label, g.description_cn);
                        });
                    enabledModule[refGeneAnnotIndex].lines.push(
                        ...[...Array(vsRefGeneAnnot.length / 2)].map((x) => [
                            OBJ,
                            OBJ,
                        ])
                    );
                    fillLine(enabledModule[refGeneAnnotIndex], vsRefGeneAnnot);
                    break; //}}}
                case "nccn_genes": //{{{
                    var genes = [];
                    var records = {};
                    nccn.forEach((n) => {
                        var gene = n.gene.label;
                        var cancer = n.cancer.label;
                        if (genes.indexOf(gene) < 0) {
                            genes.push(gene);
                            records[gene] = cancer;
                        } else {
                            records[gene] = records[gene] + "/" + cancer;
                        }
                    });
                    var data = [];
                    genes.forEach((gene) => {
                        data.push(gene);
                        data.push(records[gene]);
                        var results = resultjson.Somatic.filter(
                            (s) => s[1] == gene
                        );
                        if (results.length > 0) {
                            data.push(results.map((r) => r[5]).join(", "));
                        } else {
                            data.push("未检测到");
                        }
                    });
                    enabledModule[index].lines.push(
                        ...[...Array(genes.length)].map((x) => [OBJ, OBJ, OBJ])
                    );
                    //console.log(data, lines);
                    fillLine(enabledModule[index], data);
                    break; //}}}
                case "drug_result/immu_result/tmb": //{{{
                    var vsTmbResult = [];
                    vsTmbResult.push(
                        resultjson.TMB[0][0],
                        resultjson.TMB[0][1] + "muts/Mb"
                    );
                    enabledModule[index].lines.push([OBJ, OBJ]);
                    fillLine(enabledModule[index], vsTmbResult);

                    // immu_anna/tmb

                    var tmbAnnaIndex = enabledModule.findIndex(
                        (m) => m.key == "immu_anna/tmb"
                    );
                    if (tmbAnnaIndex < 0) {
                        console.error("invalid tmb anna index");
                        continue;
                    }
                    var tmbValue = resultjson.TMB[0][1];
                    var tmbd = await models.Tmh.findOne({
                        //result: tmbValue,
                        item: "TMB",
                    });
                    var vsTmbAnna = [];
                    if (!tmbd) {
                        //vsTmbAnna = ["无"];
                        vsTmbAnna = [];
                        enabledModule[tmbAnnaIndex].push([OBJ]);
                    } else {
                        vsTmbAnna.push(
                            tmbd.item,
                            resultjson.TMB[0][1] + "muts/Mb",
                            tmbd.result_detail,
                            tmbd.literature_detail
                        );
                        enabledModule[tmbAnnaIndex].lines.push([
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                        ]);
                    }
                    fillLine(enabledModule[tmbAnnaIndex], vsTmbAnna);
                    break; //}}}
                case "drug_result/immu_result/msi": //{{{
                    var vsMsiResult = [];
                    vsMsiResult.push(
                        resultjson.MSI[0][0],
                        resultjson.MSI[0][1],
                        resultjson.MSI[0][2],
                        resultjson.MSI[0][3]
                    );
                    enabledModule[index].lines.push([OBJ, OBJ, OBJ, OBJ]);
                    fillLine(enabledModule[index], vsMsiResult);

                    // immu_anna/msi

                    var msiAnnaIndex = enabledModule.findIndex(
                        (m) => m.key == "immu_anna/msi"
                    );
                    if (msiAnnaIndex < 0) {
                        console.error("invalid msi anna index");
                        continue;
                    }
                    var msiValue = resultjson.MSI[0][3];
                    var msid = await models.Tmh.findOne({
                        result: msiValue,
                        item: "MSI",
                    });
                    var vsMsiAnna = [];
                    if (!msid) {
                        //vsMsiAnna = ["无"];
                        vsMsiAnna = [];
                        enabledModule[msiAnnaIndex].lines.push([OBJ]);
                    } else {
                        vsMsiAnna.push(
                            msid.item,
                            msiValue,
                            msid.result_detail,
                            msid.literature_detail
                        );
                        enabledModule[msiAnnaIndex].lines.push([
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                        ]);
                    }
                    fillLine(enabledModule[msiAnnaIndex], vsMsiAnna);

                    break; //}}}
                case "drug_result/immu_result/gene/pos": //{{{
                    var nonMsg = "未检测出变异";
                    var vsGenePos = [];
                    var vsGenePosAnna = [];
                    posGeneds.forEach((g) => {
                        var found = false;
                        resultjson.Somatic.forEach((s) => {
                            if (g.gene.label == s[1]) {
                                found = true;
                                vsGenePos.push(g.gene.label, s[5]);
                                vsGenePosAnna.push(
                                    g.gene.label,
                                    s[5],
                                    g.result_detail,
                                    g.literature_detail
                                );
                            }
                        });
                        if (!found) {
                            vsGenePos.push(g.gene.label, "未检测出变异");
                            vsGenePosAnna.push(
                                g.gene.label,
                                "未检测出变异",
                                g.result_detail,
                                g.literature_detail
                            );
                        }
                    });
                    //console.log('y', pathwayClassGeneds, pathwayClassGeneKeys);
                    pathwayClassGeneKeys.forEach((k, index) => {
                        vsGenePos.push(k);
                        vsGenePosAnna.push(k);
                        var m = "";
                        //var a = "";
                        //var c = "";
                        pathwayClassGeneds[index].forEach((g) => {
                            resultjson.Somatic.forEach((s) => {
                                if (g.gene.label == s[1]) {
                                    if (m == "") {
                                        m = s[5];
                                    } else {
                                        m = m + ", " + s[5];
                                    }
                                    //if (a == "") {
                                    //a = g.result_detail;
                                    //} else {
                                    //a = a + "; " + g.result_detail;
                                    //}
                                    //if (c == "") {
                                    //c = g.literature_detail;
                                    //} else {
                                    //c = c + "; " + g.literature_detail;
                                    //}
                                }
                            });
                        });
                        if (m == "") {
                            vsGenePos.push(nonMsg);
                            vsGenePosAnna.push(nonMsg);
                        } else {
                            vsGenePos.push(m);
                            vsGenePosAnna.push(m);
                        }
                        vsGenePosAnna.push(pathwayResultDetails[index]);
                        vsGenePosAnna.push(pathwayLiteratureDetails[index]);
                        //vsGenePosAnna.push(a);
                        //vsGenePosAnna.push(c);
                    });

                    //var padding = 6 - (vsGenePos.length % 6);
                    var padding = 6 - (vsGenePos.length % 6);
                    if (padding > 0) {
                        vsGenePos.push(...[...Array(padding)].map((x) => ""));
                    }

                    enabledModule[index].lines.push(
                        //...[...Array(vsGenePos.length / 6)].map((x) => [
                        ...[...Array(vsGenePos.length / 2)].map((x) => [
                            OBJ,
                            OBJ,
                            //OBJ,
                            //OBJ,
                            //OBJ,
                            //OBJ,
                        ])
                    );
                    //console.log('x', vsGenePos);
                    fillLine(enabledModule[index], vsGenePos);

                    // immu_gene_pos_anna

                    var indexGenePosAnna = enabledModule.findIndex(
                        (m) => m.key == "immu_anna/gene/pos"
                    );
                    if (indexGenePosAnna < 0) {
                        console.error("invalid immu gene pos anna index");
                        continue;
                    }

                    enabledModule[indexGenePosAnna].lines.push(
                        ...[...Array(vsGenePosAnna.length / 4)].map((x) => [
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                        ])
                    );
                    fillLine(enabledModule[indexGenePosAnna], vsGenePosAnna);

                    break; //}}}
                case "drug_result/immu_result/gene/neg": //{{{
                    var vsGeneNeg = [];
                    var vsGeneNegAnna = [];
                    var negStatement = "未检测出变异";
                    negGeneds.forEach((g) => {
                        var found = false;
                        resultjson.Somatic.forEach((s) => {
                            if (g.gene.label == s[1]) {
                                found = true;
                                var vsGeneNegIndex = vsGeneNeg.indexOf(
                                    g.gene.label
                                );
                                if (vsGeneNegIndex > 0) {
                                    var negContent =
                                        vsGeneNeg[vsGeneNegIndex + 1];
                                    if (
                                        negContent == negStatement ||
                                        negContent == ""
                                    ) {
                                        vsGeneNeg[vsGeneNegIndex + 1] = s[5];
                                    } else {
                                        vsGeneNeg[vsGeneNegIndex + 1] +=
                                            "; " + s[5];
                                    }
                                } else {
                                    vsGeneNeg.push(g.gene.label, s[5]);
                                }
                                var vsGeneNegAnnaIndex = vsGeneNegAnna.indexOf(
                                    g.gene.label
                                );
                                if (vsGeneNegAnnaIndex > 0) {
                                    var annContent =
                                        vsGeneNegAnna[vsGeneNegAnnaIndex + 1];
                                    if (
                                        annContent == negStatement ||
                                        annContent == ""
                                    ) {
                                        vsGeneNegAnna[vsGeneNegAnnaIndex + 1] =
                                            s[5];
                                        vsGeneNegAnna[vsGeneNegAnnaIndex + 2] =
                                            g.result_detail;
                                    } else {
                                        vsGeneNegAnna[vsGeneNegAnnaIndex + 1] +=
                                            "; " + s[5];
                                        vsGeneNegAnna[vsGeneNegAnnaIndex + 2] +=
                                            g.result_detail;
                                    }
                                } else {
                                    vsGeneNegAnna.push(
                                        g.gene.label,
                                        s[5],
                                        g.result_detail
                                    );
                                }
                            }
                        });
                        if (!found) {
                            vsGeneNeg.push(g.gene.label, "未检测出变异");
                            vsGeneNegAnna.push(
                                g.gene.label,
                                "未检测出变异",
                                g.result_detail
                            );
                        }
                    });
                    //var padding = 6 - (vsGeneNeg.length % 6);
                    //if (padding > 0) {
                    //vsGeneNeg.push(...[...Array(padding)].map((x) => ""));
                    //}

                    enabledModule[index].lines.push(
                        ...[...Array(vsGeneNeg.length / 2)].map((x) => [
                            OBJ,
                            OBJ,
                            //OBJ,
                            //OBJ,
                            //OBJ,
                            //OBJ,
                        ])
                    );
                    fillLine(enabledModule[index], vsGeneNeg);

                    // immu_gene_neg_anna

                    var indexGeneNegAnna = enabledModule.findIndex(
                        (m) => m.key == "immu_anna/gene/neg"
                    );
                    if (indexGeneNegAnna < 0) {
                        console.error("invalid immu gene neg anna index");
                        continue;
                    }

                    enabledModule[indexGeneNegAnna].lines.push(
                        ...[...Array(vsGeneNegAnna.length / 3)].map((x) => [
                            OBJ,
                            OBJ,
                            OBJ,
                        ])
                    );
                    fillLine(enabledModule[indexGeneNegAnna], vsGeneNegAnna);
                    break; //}}}
                case "drug_result/immu_result/gene/hla": //{{{
                    var hlaAs = [];
                    var hlaBs = [];
                    var hlaCs = [];
                    var dqb1s = [];
                    var dpb1s = [];
                    var drb1s = [];
                    resultjson.HLA[0].forEach((h) => {
                        if (h.startsWith("A*")) {
                            hlaAs.push(h);
                        }
                        if (h.startsWith("B*")) {
                            hlaBs.push(h);
                        }
                        if (h.startsWith("C*")) {
                            hlaCs.push(h);
                        }
                        if (h.startsWith("DQB1*")) {
                            dqb1s.push(h);
                        }
                        if (h.startsWith("DPB1*")) {
                            dpb1s.push(h);
                        }
                        if (h.startsWith("DRB1*")) {
                            drb1s.push(h);
                        }
                    });

                    enabledModule[index].lines.push([
                        OBJ,
                        OBJ,
                        OBJ,
                        OBJ,
                        OBJ,
                        OBJ,
                    ]);
                    fillLine(enabledModule[index], [
                        hlaAs.join("\n"),
                        hlaBs.join("\n"),
                        hlaCs.join("\n"),
                        dqb1s.length == 0 ? "-" : dqb1s.join("\n"),
                        dpb1s.length == 0 ? "-" : dpb1s.join("\n"),
                        drb1s.length == 0 ? "-" : drb1s.join("\n"),
                    ]);

                    // hla_anna

                    var indexHlaAnna = enabledModule.findIndex(
                        (m) => m.key == "immu_anna/gene/hla"
                    );
                    if (indexHlaAnna < 0) {
                        console.error("invalid hla anna index");
                        continue;
                    }

                    const hlads = await models.Tmh.find({
                        item: { $regex: "HLA.*" },
                    });
                    if (!hlads.length) {
                        console.error("invalid hla anna text");
                        continue;
                    }
                    var literature_detail = hlads
                        .map((h) => h.literature_detail)
                        .join("");
                    //console.log("HHH", hlads, literature_detail);
                    enabledModule[indexHlaAnna].lines.push(
                        [OBJ, OBJ, OBJ, OBJ, OBJ, OBJ],
                        ["临床意义", OBJ]
                    );
                    fillLine(enabledModule[indexHlaAnna], [
                        hlaAs.join("\n"),
                        hlaBs.join("\n"),
                        hlaCs.join("\n"),
                        dqb1s.length == 0 ? "-" : dqb1s.join("\n"),
                        dpb1s.length == 0 ? "-" : dpb1s.join("\n"),
                        drb1s.length == 0 ? "-" : drb1s.join("\n"),
                        literature_detail,
                    ]);

                    break; //}}}
                case "chemo_anna": //{{{
                    var vsChemoAnna = [];
                    for (let c of resultjson.Germline_chemo) {
                        const chemods = await models.Chemo.find({
                            rs: c[0],
                            genotype: c[1],
                        })
                            .populate("gene")
                            .populate("evidence_level")
                            .populate("cancer");
                        chemods.forEach((d) => {
                            vsChemoAnna.push(
                                d.drug,
                                d.gene.label,
                                d.rs,
                                c[1],
                                d.evidence_level ? d.evidence_level.label : "",
                                //cancerd.label,
                                d.cancer.label,
                                d.description_ref
                            );
                        });
                    }
                    enabledModule[index].lines.push(
                        ...[...Array(vsChemoAnna.length / 7)].map((x) => [
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                        ])
                    );
                    fillLine(enabledModule[index], vsChemoAnna);
                    break; //}}}
                case "hrdt_result": //{{{
                    enabledModule[index].lines.push([OBJ]);
                    fillLine(enabledModule[index], [
                        hrdtds.length > 0
                            ? `本次检测检测到${
                                  vsHrdtAnna.length / 8
                              }个与遗传肿瘤相关的致病/可能致病突变`
                            : "本次检测未检测到与遗传肿瘤相关的致病/可能致病突变",
                    ]);

                    // hrdt_anna

                    var indexHrdtAnna = enabledModule.findIndex(
                        (m) => m.key == "hrdt_anna"
                    );
                    if (indexHrdtAnna < 0) {
                        console.error("invalid hrdt anna index");
                        continue;
                    }

                    enabledModule[indexHrdtAnna].lines.push(
                        ...[...Array(vsHrdtAnna.length / 8)].map((x) => [
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                        ])
                    );
                    fillLine(enabledModule[indexHrdtAnna], vsHrdtAnna);

                    break; //}}}
                case "pd": //{{{
                    var vsPdDrug = [];
                    const tdcds = await models.DrugCancer.find({
                        cancer: cancerd._id,
                    });
                    //const tdcids = tdcds.map((d) => d._id);
                    const tdcids = tdcds.map((d) => d.drug);
                    const tds = await models.Drug.find({
                        _id: { $in: tdcids },
                        associated_gene: { $in: ["PD-1", "PD-L1"] },
                    }).sort("associated_gene");
                    tds.forEach((t) => {
                        vsPdDrug.push(
                            t.name_cm,
                            t.date_approved_fda + "/" + t.date_approved_nmpa,
                            t.associated_gene,
                            //t.cancer.label
                            cancerd.label
                        );
                    });
                    enabledModule[index].lines.push(
                        ...[...Array(vsPdDrug.length / 4)].map((x) => [
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                        ])
                    );
                    fillLine(enabledModule[index], vsPdDrug);
                    break; //}}}
                case "gene_result/somatic": //{{{
                    var vsMas = [];
                    resultjson.Somatic.forEach((s) => {
                        vsMas.push(
                            s[1],
                            s[2],
                            s[3],
                            s[4],
                            s[5],
                            s[6],
                            s[7],
                            s[8],
                            s[9]
                        );
                    });
                    enabledModule[index].lines.push(
                        ...[...Array(vsMas.length / 9)].map((x) => [
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                        ])
                    );
                    fillLine(enabledModule[index], vsMas);
                    break; //}}}
                case "gene_result/fusion": //{{{
                    var vsFusion = [];
                    resultjson.Fusion.forEach((f) => {
                        vsFusion.push(f[1], f[2], f[3], f[4]);
                    });
                    enabledModule[index].lines.push(
                        ...[...Array(vsFusion.length / 4)].map((x) => [
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                        ])
                    );
                    fillLine(enabledModule[index], vsFusion);
                    break; //}}}
                case "gene_result/cnv": //{{{
                    var vsCnv = [];
                    resultjson.CNV.forEach((c) => {
                        vsCnv.push(c[1], c[2], c[3], c[4], c[5], c[6]);
                    });
                    enabledModule[index].lines.push(
                        ...[...Array(vsCnv.length / 6)].map((x) => [
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                        ])
                    );
                    fillLine(enabledModule[index], vsCnv);
                    break; //}}}
                case "ref": //{{{
                    if (project.literatures) {
                        var projectPmids = await models.ReportLiterature.find({
                            _id: { $in: project.literatures },
                        });
                        var vsRef = projectPmids.map((p) => p.literature);
                        if (vsRef.length > 0) {
                            enabledModule[index].lines.push(
                                ...[...Array(vsRef.length)].map((x) => [OBJ])
                            );
                            fillLine(enabledModule[index], vsRef);
                        }
                    }
                    break; //}}}
                case "appendix/gene_tumor/all": //{{{
                    var vsRefGeneTumorAll = [];
                    project.genes_panel.forEach((g) => {
                        vsRefGeneTumorAll.push(g.label);
                    });
                    enabledModule[index].lines.push(
                        ...[...Array(vsRefGeneTumorAll.length)].map((x) => [
                            OBJ,
                        ])
                    );
                    fillLine(enabledModule[index], vsRefGeneTumorAll);
                    break; //}}}
                case "appendix/gene_tumor/chemo": //{{{
                    const chemoGeneClass = await models.GeneClass.findOne({
                        label: "化疗用药相关基因",
                    });
                    if (!chemoGeneClass) {
                        throw new Error("chemo gene class not found");
                    }
                    var vsRefGeneTumorChemo = [];
                    project.genes_panel.forEach((g) => {
                        //console.log("PPP", g);
                        if (g.geneclasses.length > 0) {
                            var found = g.geneclasses.find((c) =>
                                c._id.equals(chemoGeneClass._id)
                            );
                            if (found) {
                                vsRefGeneTumorChemo.push(g.label);
                            }
                        }
                    });
                    enabledModule[index].lines.push(
                        ...[...Array(vsRefGeneTumorChemo.length)].map((x) => [
                            OBJ,
                        ])
                    );
                    fillLine(enabledModule[index], vsRefGeneTumorChemo);
                    break; //}}}
                case "appendix/gene_tumor/hrdt": //{{{
                    const hrdtGeneClass = await models.GeneClass.findOne({
                        label: "遗传易感相关基因",
                    });
                    if (!hrdtGeneClass) {
                        throw new Error("hrdt gene class not found");
                    }
                    var vsRefGeneTumorHrdt = [];
                    project.genes_panel.forEach((g) => {
                        if (g.geneclasses.length > 0) {
                            var found = g.geneclasses.find((c) =>
                                c._id.equals(hrdtGeneClass._id)
                            );
                            if (found) {
                                vsRefGeneTumorHrdt.push(g.label);
                            }
                        }
                    });
                    enabledModule[index].lines.push(
                        ...[...Array(vsRefGeneTumorHrdt.length)].map((x) => [
                            OBJ,
                        ])
                    );
                    fillLine(enabledModule[index], vsRefGeneTumorHrdt);
                    break; //}}}
                case "appendix/sample_qc": //{{{
                    var vsRefSampleQc = [];
                    sampleqc.forEach((s) => {
                        vsRefSampleQc.push(
                            s.name,
                            s.perc_tumor,
                            s.conc_dna,
                            s.total_dna,
                            s.avg_depth,
                            s.result
                        );
                    });
                    enabledModule[index].lines.push(
                        ...[...Array(vsRefSampleQc.length / 6)].map((x) => [
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                            OBJ,
                        ])
                    );
                    fillLine(enabledModule[index], vsRefSampleQc);
                    break; //}}}
                default:
            }
        }
        //enabledModule.forEach((m, index) => {
        //const { enabled, key, ...rest } = enabledModule[index];
        //enabledModule[index] = rest;
        //});
    } catch (err) {
        //console.log('ERROR', err);
        console.log("ERROR", err);
        throw new Error(err);
    }
    return enabledModule;
};

module.exports = {
    generate: async (id, models) => {
        try {
            var result = {};
            var reportTask = await models.ReportTask.findById(id);
            var reportTemplate = await models.ReportTemplate.findById(
                reportTask.template
            );
            //var module = JSON.parse(reportTemplate.module);
            //console.log(module);
            //console.log(reportTask);
            var reportSample = await models.ReportSample.findById(
                reportTask.sample
            )
                .populate("sample_type")
                .populate("file_main");
            if (!reportSample.file_main) {
                throw new Error(
                    `no data file found for sample '${reportSample.label}'`
                );
            }
            var mainJson = JSON.parse(
                fs.readFileSync(reportSample.file_main.path)
            );
            var reportSampleQc = await models.ReportSampleQc.find({
                sample: reportSample._id,
            });
            var inspectionProject = await models.InspectionProject.findById(
                reportSample.inspection_project
            )
                .populate("genes_nccn")
                .populate("genes_panel");
            var nccnGenes = await models.NccnGene.find({
                gene: { $in: inspectionProject.genes_nccn },
            })
                .populate("gene")
                .populate("cancer");

            var result = await generateData(
                models,
                reportTask,
                reportSample,
                reportSampleQc,
                //resultJson,
                mainJson,
                reportTemplate,
                inspectionProject,
                nccnGenes
            );

            var refIndex = result.findIndex((r) => r.key == "ref");
            var resultPmids = JSON.stringify(result).match(/PMID:[\d]{1,8}/gi);

            var projectPmids = inspectionProject.pmids;
            if (projectPmids) {
                defaultPmids = projectPmids.split(",").map((a) => a.trim());
                //console.log("PPP default", defaultPmids);
                //console.log("PPP result", resultPmids);
                resultPmids.push(...defaultPmids);
                //console.log("PPP merged", resultPmids);
            }

            var pmidds = await models.ReportLiterature.find({
                pmid: { $in: resultPmids },
            });
            result[refIndex].lines.push(...pmidds.map((p) => [p.literature]));
            //console.log("RRR", refIndex, resultPmids, result[refIndex]);

            var output = {};
            result.forEach((r, index) => {
                if (r.id && r.lines) {
                    output[r.id] = r.lines.slice(1);
                }
            });

            var xianzhi = [];

            var e = [[""]];
            for (var id in output) {
                var v = output[id];
                if (v.length == 0) {
                    v = [[]];
                }
                for (i = 0; i < v.length; i++) {
                    for (j = 0; j < v[i].length; j++) {
                        if (v[i][j] == null) v[i][j] = "";
                    }
                }
                var l = `"${id}":${JSON.stringify(v)}`;
                if (xianzhi.length == 0) {
                    xianzhi.push("{" + l);
                } else {
                    xianzhi.push(l);
                }
            }
            xianzhi.push("}");
            const tmpName = uuid.v4();
            const tmpPath = path.join("tmp", `${reportTask._id}_${tmpName}`);
            if (!fs.existsSync("tmp")) fs.mkdirSync("tmp", { recursive: true });
            //const tmpPath = path.join(os.tmpdir(), tmpName);
            //const targetPath = path.join("files", tmpName.substr(0, 2));
            //const targetFile = path.join(targetPath, uniqueName);
            //if (!fs.existsSync(targetPath))
            //fs.mkdirSync(targetPath, { recursive: true });
            fs.writeFileSync(tmpPath, xianzhi.join("\n"));
            var report = await models.ReportReport.create({
                task: reportTask._id,
                report_status: -1,
            });
            //var reportFile = await models.ReportFile.create({
            //filename: tmpName,
            //path: targetFile,
            //});

            //const run = spawn("perl", [
            //"bin/make_tex.pl",
            //"-j",
            //tmpPath,
            //"-n",
            //tmpName,
            //"-o",
            //targetPath,
            //]);
            //run.stdout.on("data", (data) => {
            //console.log(`stdout: ${data}`);
            //});

            //run.stderr.on("data", (error) => {
            //console.log(`stderr: ${error}`);
            //report.error_message += `runtime: ${error};`;
            //});

            //run.on("error", (error) => {
            //console.log(`error: ${error}`);
            //report.error_message += `spawn: ${error};`;
            // command not found: spawn echot ENOENT, exit code -2
            //});

            //run.on("close", (code) => {
            //console.log(`child process exited with code ${code}`);
            //report.report_status = code;
            //report.pdf_file = reportFile._id;
            //if (report.report_status == 0) {
            //report.date_generated = time.Now();
            //}
            //report.save();
            //fs.unlinkSync(tmpPath);
            //});
        } catch (err) {
            console.log(err);
            throw new Error(`>> ${err}`);
        }
        return output;
    },
};

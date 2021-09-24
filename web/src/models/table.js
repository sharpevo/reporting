import * as query from "../gql/query";
import * as mutation from "../gql/mutation";
import { format, parseISO } from "date-fns";

var tables = {};

const trimText = (text) => {
    if (!text) {
        return "-";
    }
    if (text.length > 10) {
        return text.substring(0, 10) + " ...";
    }
    return text;
};

const formatDate = (text) => {
    if (!text) {
        return "";
    } else {
        return format(parseISO(text), "MM-dd");
    }
};

const convertBoolean = (text) => {
    switch (text) {
        case "":
        case "否":
        case "false":
        case "FALSE":
        case false:
            return false;
        case "是":
        case "true":
        case "TRUE":
        case true:
            return true;
        default:
            return false;
    }
};

tables["gene"] = {
    query: {
        gql: query.GENES_GET,
        key: "genes",
    },
    mutation: {
        new: mutation.GENE_NEW,
        delete: mutation.GENES_DELETE,
        update: mutation.GENE_UPDATE,
    },
    columns: [
        {
            label: "基因英文名称",
            key: "name",
            exportable: true,
        },
        {
            label: "分类",
            key: "geneclass",
            exportable: true,
        },
        {
            label: "来源依据",
            key: "source",
            exportable: true,
        },
        {
            label: "肿瘤全外显子",
            key: "is_wes",
            exportable: true,
        },
        {
            label: "泛癌种",
            key: "is_pancancer",
            exportable: true,
        },
        {
            label: "NCC肿瘤诊断",
            key: "is_ncc",
            exportable: true,
        },
        {
            label: "肺癌8基因",
            key: "is_8glc",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (row) => {
            return row.name;
        },
        (row) => {
            return row.geneclass ? row.geneclass.label : "-";
        },
        (row) => {
            return trimText(row.source);
        },
        (row) => {
            return row.is_wes ? "是" : "否";
        },
        (row) => {
            return row.is_pancancer ? "是" : "否";
        },
        (row) => {
            return row.is_ncc ? "是" : "否";
        },
        (row) => {
            return row.is_8glc ? "是" : "否";
        },
        (row) => {
            return row.creator ? row.creator.name : "-";
        },
        (row) => {
            return formatDate(row.createdAt);
        },
        (row) => {
            return row.createdAt == row.updatedAt
                ? "-"
                : formatDate(row.updatedAt);
        },
        (row) => {
            return row.status ? "已审核" : "未审核";
        },
        (row) => {
            return row.aprrover ? row.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["source"] = String(obj["source"]);
        obj["is_wes"] = convertBoolean(obj["is_wes"]);
        obj["is_pancancer"] = convertBoolean(obj["is_pancancer"]);
        obj["is_ncc"] = convertBoolean(obj["is_ncc"]);
        obj["is_8glc"] = convertBoolean(obj["is_8glc"]);
        return obj;
    },
    formComponents: [
        {
            label: "基因英文名称",
            key: "name",
            inputType: "text",
        },
        {
            label: "分类",
            key: "geneclass",
            inputType: "singleselect",
            query: query.GENE_CLASSES_GET,
            queryKey: "geneclasses",
        },
        {
            label: "来源依据",
            key: "source",
            inputType: "textarea",
        },
        {
            label: "肿瘤全外显子",
            key: "is_wes",
            inputType: "checkbox",
        },
        {
            label: "泛癌种",
            key: "is_pancancer",
            inputType: "checkbox",
        },
        {
            label: "NCC肿瘤诊断",
            key: "is_ncc",
            inputType: "checkbox",
        },
        {
            label: "肺癌8基因",
            key: "is_8glc",
            inputType: "checkbox",
        },
    ],
};

tables["gene_annot"] = {
    query: {
        gql: query.GENE_ANNOTS_GET,
        key: "geneannots",
    },
    mutation: {
        new: mutation.GENE_ANNOT_NEW,
        delete: mutation.GENE_ANNOTS_DELETE,
        update: mutation.GENE_ANNOT_UPDATE,
    },
    columns: [
        {
            label: "基因英文名称",
            key: "gene",
            exportable: true,
        },
        {
            label: "基因别名",
            key: "name_at",
            exportable: true,
        },
        {
            label: "基因中文名称",
            key: "name_cn",
            exportable: true,
        },
        {
            label: "基因所处染色体位置",
            key: "chr",
            exportable: true,
        },
        {
            label: "基因说明",
            key: "description_cn",
            exportable: true,
        },
        {
            label: "基因说明英文参考",
            key: "description_en",
            exportable: true,
        },
        {
            label: "参考来源",
            key: "source",
            exportable: true,
        },
        {
            label: "参考文献",
            key: "literature",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.gene ? cell.gene.label : "-";
        },
        (cell) => {
            return cell.name_at;
        },
        (cell) => {
            return cell.name_cn;
        },
        (cell) => {
            return cell.chr;
        },
        (cell) => {
            return cell.description_cn;
        },
        (cell) => {
            return cell.description_en;
        },
        (cell) => {
            return cell.source;
        },
        (cell) => {
            return cell.literature;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["name_at"] = String(obj["name_at"]);
        obj["name_cn"] = String(obj["name_cn"]);
        obj["description_cn"] = String(obj["description_cn"]);
        obj["description_en"] = String(obj["description_en"]);
        obj["chr"] = String(obj["chr"]);
        obj["source"] = String(obj["source"]);
        return obj;
    },
    formComponents: [
        {
            label: "基因英文名称",
            key: "gene",
            inputType: "singleselect",
            query: query.GENES_GET,
            queryKey: "genes",
        },
        {
            label: "基因别名",
            key: "name_at",
            inputType: "text",
        },
        {
            label: "基因中文名称",
            key: "name_cn",
            inputType: "text",
        },
        {
            label: "基因所处染色体位置",
            key: "chr",
            inputType: "text",
        },
        {
            label: "基因说明",
            key: "description_cn",
            inputType: "textarea",
        },
        {
            label: "基因说明英文参考",
            key: "description_en",
            inputType: "textarea",
        },
        {
            label: "参考来源",
            key: "source",
            inputType: "textarea",
        },
        {
            label: "参考文献",
            key: "literature",
            inputType: "textarea",
        },
    ],
};

tables["ddr"] = {
    query: {
        gql: query.DDRS_GET,
        key: "ddrs",
    },
    mutation: {
        new: mutation.DDR_NEW,
        delete: mutation.DDRS_DELETE,
        update: mutation.DDR_UPDATE,
    },
    columns: [
        {
            label: "基因名称",
            key: "gene",
            exportable: true,
        },
        {
            label: "基因分类",
            key: "ddrclass",
            exportable: true,
        },
        {
            label: "检测结果",
            key: "result",
            exportable: true,
        },
        {
            label: "检测解析",
            key: "result_detail",
            exportable: true,
        },
        {
            label: "英文解析参考来源",
            key: "source",
            exportable: true,
        },
        {
            label: "参考文献",
            key: "literature",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.gene ? cell.gene.label : "-";
        },
        (cell) => {
            return cell.ddrclass ? cell.ddrclass.label : "-";
        },
        (cell) => {
            return cell.result;
        },
        (cell) => {
            return cell.result_detail;
        },
        (cell) => {
            return cell.source;
        },
        (cell) => {
            return cell.literature;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["result"] = String(obj["result"]);
        obj["result_detail"] = String(obj["result_detail"]);
        obj["source"] = String(obj["source"]);
        obj["literature"] = String(obj["literature"]);
        return obj;
    },
    formComponents: [
        {
            label: "基因名称",
            key: "gene",
            inputType: "singleselect",
            query: query.GENES_GET,
            queryKey: "genes",
        },
        {
            label: "基因分类",
            key: "ddrclass",
            inputType: "singleselect",
            query: query.DDR_CLASSES_GET,
            queryKey: "ddrclasses",
        },
        {
            label: "检测结果",
            key: "result",
            inputType: "text",
        },
        {
            label: "检测解析",
            key: "result_detail",
            inputType: "textarea",
        },
        {
            label: "英文解析参考来源",
            key: "source",
            inputType: "text",
        },
        {
            label: "参考文献",
            key: "literature",
            inputType: "text",
        },
    ],
};

tables["tmh"] = {
    query: {
        gql: query.TMHS_GET,
        key: "tmhs",
    },
    mutation: {
        new: mutation.TMH_NEW,
        delete: mutation.TMHS_DELETE,
        update: mutation.TMH_UPDATE,
    },
    columns: [
        {
            label: "检测内容",
            key: "item",
            exportable: true,
        },
        {
            label: "检测值",
            key: "value",
            exportable: true,
        },
        {
            label: "检测结果",
            key: "result",
            exportable: true,
        },
        {
            label: "指标解析",
            key: "result_detail",
            exportable: true,
        },
        {
            label: "文献中文解析",
            key: "literature_detail",
            exportable: true,
        },
        {
            label: "英文解析参考来源",
            key: "source",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.item;
        },
        (cell) => {
            return cell.value;
        },
        (cell) => {
            return cell.result;
        },
        (cell) => {
            return cell.result_detail;
        },
        (cell) => {
            return cell.literature_detail;
        },
        (cell) => {
            return cell.source;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["item"] = String(obj["item"]);
        obj["value"] = String(obj["value"]);
        obj["result"] = String(obj["result"]);
        obj["result_detail"] = String(obj["result_detail"]);
        obj["literature_detail"] = String(obj["literature_detail"]);
        obj["source"] = String(obj["source"]);
        return obj;
    },
    formComponents: [
        {
            label: "检测内容",
            key: "item",
            inputType: "text",
        },
        {
            label: "检测值",
            key: "value",
            inputType: "text",
        },
        {
            label: "检测结果",
            key: "result",
            inputType: "text",
        },
        {
            label: "指标解析",
            key: "result_detail",
            inputType: "textarea",
        },
        {
            label: "文献中文解析",
            key: "literature_detail",
            inputType: "text",
        },
        {
            label: "英文解析参考来源",
            key: "source",
            inputType: "text",
        },
    ],
};

tables["cancer"] = {
    query: {
        gql: query.CANCERS_GET,
        key: "cancers",
    },
    mutation: {
        new: mutation.CANCER_NEW,
        delete: mutation.CANCERS_DELETE,
        update: mutation.CANCER_UPDATE,
    },
    columns: [
        {
            label: "癌种中文名称",
            key: "name_cn",
            exportable: true,
        },
        {
            label: "癌种英文名称",
            key: "name_en",
            exportable: true,
        },
        {
            label: "癌种英文缩写",
            key: "name_en_abbr",
            exportable: true,
        },
        {
            label: "癌种中文介绍",
            key: "description_cn",
            exportable: true,
        },
        {
            label: "癌种介绍参考来源",
            key: "source",
            exportable: true,
        },
        {
            label: "参考指南",
            key: "guide",
            exportable: true,
        },
        {
            label: "参考文献",
            key: "literature",
            exportable: true,
        },
        {
            label: "备注",
            key: "remark",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.name_cn;
        },
        (cell) => {
            return cell.name_en;
        },
        (cell) => {
            return cell.name_en_abbr;
        },
        (cell) => {
            return cell.description_cn;
        },
        (cell) => {
            return cell.source;
        },
        (cell) => {
            return cell.guide;
        },
        (cell) => {
            return cell.literature;
        },
        (cell) => {
            return cell.remark;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["description_cn"] = String(obj["description_cn"]);
        obj["source"] = String(obj["source"]);
        obj["guide"] = String(obj["guide"]);
        obj["literature"] = String(obj["literature"]);
        obj["remark"] = String(obj["remark"]);
        return obj;
    },
    formComponents: [
        {
            label: "癌种中文名称",
            key: "name_cn",
            inputType: "text",
        },
        {
            label: "癌种英文名称",
            key: "name_en",
            inputType: "text",
        },
        {
            label: "癌种中文介绍",
            key: "description_cn",
            inputType: "textarea",
        },
        {
            label: "癌种介绍参考来源",
            key: "source",
            inputType: "textarea",
        },
        {
            label: "参考指南",
            key: "guide",
            inputType: "text",
        },
        {
            label: "参考文献",
            key: "literature",
            inputType: "text",
        },
        {
            label: "备注",
            key: "remark",
            inputType: "textarea",
        },
    ],
};

tables["mutation_cancer"] = {
    query: {
        gql: query.MUTATION_CANCERS_GET,
        key: "mutationcancers",
    },
    mutation: {
        new: mutation.MUTATION_CANCER_NEW,
        delete: mutation.MUTATION_CANCERS_DELETE,
        update: mutation.MUTATION_CANCER_UPDATE,
    },
    columns: [
        {
            label: "氨基酸变异",
            key: "mutation",
            exportable: true,
        },
        {
            label: "基因英文名称",
            key: "gene_annot",
            exportable: true,
        },
        {
            label: "转录本",
            key: "transcript",
            exportable: true,
        },
        {
            label: "外显子/内含子区域",
            key: "position",
            exportable: true,
        },
        {
            label: "核苷酸变异",
            key: "snp",
            exportable: true,
        },
        {
            label: "变异分类",
            key: "mutationclass",
            exportable: true,
        },
        {
            label: "变异注释",
            key: "mutation_detail",
            exportable: true,
        },
        {
            label: "适用癌种",
            key: "cancer",
            exportable: true,
        },
        {
            label: "用药说明",
            key: "drug_info",
            exportable: true,
        },
        {
            label: "参考依据",
            key: "evidence",
            exportable: true,
        },
        {
            label: "参考文献",
            key: "literature",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.mutation;
        },
        (cell) => {
            return cell.gene_annot ? cell.gene_annot.label : "-";
        },
        (cell) => {
            return cell.transcript;
        },
        (cell) => {
            return cell.position;
        },
        (cell) => {
            return cell.snp;
        },
        (cell) => {
            return cell.mutationclass ? cell.mutationclass.label : "-";
        },
        (cell) => {
            return cell.mutation_detail;
        },
        (cell) => {
            return cell.cancer ? cell.cancer.label : "-";
        },
        (cell) => {
            return cell.drug_info;
        },
        (cell) => {
            return cell.evidence;
        },
        (cell) => {
            return cell.literature;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["trascript"] = String(obj["trascript"]);
        obj["position"] = String(obj["position"]);
        obj["snp"] = String(obj["snp"]);
        obj["mutation_detail"] = String(obj["mutation_detail"]);
        obj["evidence"] = String(obj["evidence"]);
        obj["literature"] = String(obj["literature"]);
        return obj;
    },
    formComponents: [
        {
            label: "氨基酸变异",
            key: "mutation",
            inputType: "text",
        },
        {
            label: "基因英文名称",
            key: "gene_annot",
            inputType: "singleselect",
            query: query.GENE_ANNOTS_GET,
            queryKey: "geneannots",
        },
        {
            label: "转录本",
            key: "transcript",
            inputType: "text",
        },
        {
            label: "外显子/内含子区域",
            key: "position",
            inputType: "text",
        },
        {
            label: "核苷酸变异",
            key: "snp",
            inputType: "text",
        },
        {
            label: "变异分类",
            key: "mutationclass",
            inputType: "singleselect",
            query: query.MUTATION_CLASSES_GET,
            queryKey: "mutationclasses",
        },
        {
            label: "适用癌种",
            key: "cancer",
            inputType: "singleselect",
            query: query.CANCERS_GET,
            queryKey: "cancers",
        },
        {
            label: "用药说明",
            key: "drug_info",
            inputType: "textarea",
        },
        {
            label: "参考依据",
            key: "evidence",
            inputType: "textarea",
        },
        {
            label: "参考文献",
            key: "literature",
            inputType: "textarea",
        },
    ],
};

tables["drug"] = {
    query: {
        gql: query.DRUGS_GET,
        key: "drugs",
    },
    mutation: {
        new: mutation.DRUG_NEW,
        delete: mutation.DRUGS_DELETE,
        update: mutation.DRUG_UPDATE,
    },
    columns: [
        {
            label: "药物通用名称",
            key: "name_cm",
            exportable: true,
        },
        {
            label: "英文名称",
            key: "name_en",
            exportable: true,
        },
        {
            label: "中文名",
            key: "name_cn",
            exportable: true,
        },
        {
            label: "商品名",
            key: "name_td",
            exportable: true,
        },
        {
            label: "生产商",
            key: "vendor",
            exportable: true,
        },
        {
            label: "是否上市",
            key: "is_market_ready",
            exportable: true,
        },
        {
            label: "FDA批准时间",
            key: "date_approved_fda",
            exportable: true,
        },
        {
            label: "NMPA批准时间",
            key: "date_approved_nmpa",
            exportable: true,
        },
        {
            label: "相关联基因",
            key: "associated_gene",
            exportable: true,
        },
        {
            label: "是否需要检测药物靶点",
            key: "is_target_test_required",
            exportable: true,
        },
        {
            label: "医保信息",
            key: "medicare_catalogue",
            exportable: true,
        },
        {
            label: "医保药品编号",
            key: "medicare_number",
            exportable: true,
        },
        //{
        //label: "机构/指南批准适用癌种",
        //key: "cancer",
        //exportable: true,
        //},
        {
            label: "药物相关描述",
            key: "description",
            exportable: true,
        },
        {
            label: "信息来源",
            key: "source",
            exportable: true,
        },
        {
            label: "参考文献",
            key: "literature",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.name_cm;
        },
        (cell) => {
            return cell.name_en;
        },
        (cell) => {
            return cell.name_cn;
        },
        (cell) => {
            return cell.name_td;
        },
        (cell) => {
            return cell.vendor;
        },
        (cell) => {
            return cell.is_market_ready ? "是" : "否";
        },
        (cell) => {
            return cell.date_approved_fda;
        },
        (cell) => {
            return cell.date_approved_nmpa;
        },
        (cell) => {
            return cell.associated_gene;
        },
        (cell) => {
            return cell.is_target_test_required ? "是" : "否";
        },
        (cell) => {
            return cell.medicare_catalogue;
        },
        (cell) => {
            return cell.medicare_number;
        },
        //(cell) => {return cell.cancer},
        (cell) => {
            return cell.description;
        },
        (cell) => {
            return cell.source;
        },
        (cell) => {
            return cell.literature;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["name_cm"] = String(obj["name_cm"]);
        obj["name_en"] = String(obj["name_en"]);
        obj["name_cn"] = String(obj["name_cn"]);
        obj["name_td"] = String(obj["name_td"]);
        obj["vendor"] = String(obj["vendor"]);
        obj["is_market_ready"] = convertBoolean(obj["vendor"]);
        obj["date_approved_fda"] = String(obj["date_approved_fda"]);
        obj["date_approved_nmpa"] = String(obj["date_approved_nmpa"]);
        obj["associated_gene"] = String(obj["associated_gene"]);
        obj["is_target_test_required"] = convertBoolean(
            obj["is_target_test_required"]
        );
        obj["medicare_catalogue"] = String(obj["medicare_catalogue"]);
        obj["medicare_number"] = String(obj["medicare_number"]);
        //obj['cancer'] = String(obj['cancer'])
        obj["description"] = String(obj["description"]);
        obj["source"] = String(obj["source"]);
        obj["literature"] = String(obj["literature"]);
        return obj;
    },
    formComponents: [
        {
            label: "药物通用名称",
            key: "name_cm",
            inputType: "text",
        },
        {
            label: "英文名称",
            key: "name_en",
            inputType: "text",
        },
        {
            label: "中文名",
            key: "name_cn",
            inputType: "text",
        },
        {
            label: "商品名",
            key: "name_td",
            inputType: "text",
        },
        {
            label: "生产商",
            key: "vendor",
            inputType: "text",
        },
        {
            label: "是否上市",
            key: "is_market_ready",
            inputType: "checkbox",
        },
        {
            label: "FDA批准时间",
            key: "date_approved_fda",
            inputType: "text",
        },
        {
            label: "NMPA批准时间",
            key: "date_approved_nmpa",
            inputType: "text",
        },
        {
            label: "相关联基因",
            key: "associated_gene",
            inputType: "textarea",
        },
        {
            label: "是否需要检测药物靶点",
            key: "is_target_test_required",
            inputType: "checkbox",
        },
        {
            label: "医保信息",
            key: "medicare_catalogue",
            inputType: "text",
        },
        {
            label: "医保药品编号",
            key: "medicare_number",
            inputType: "text",
        },
        {
            label: "药物相关性描述",
            key: "description",
            inputType: "textarea",
        },
        {
            label: "信息依据",
            key: "source",
            inputType: "textarea",
        },
        {
            label: "参考文献",
            key: "literature",
            inputType: "textarea",
        },
    ],
};

tables["drug_cancer"] = {
    query: {
        gql: query.DRUG_CANCERS_GET,
        key: "drugcancers",
    },
    mutation: {
        new: mutation.DRUG_CANCER_NEW,
        delete: mutation.DRUG_CANCERS_DELETE,
        update: mutation.DRUG_CANCER_UPDATE,
    },
    columns: [
        {
            label: "抗肿瘤药物",
            key: "drug",
            exportable: true,
        },
        {
            label: "匹配癌种",
            key: "cancer",
            exportable: true,
        },
        {
            label: "匹配癌种循证医学描述",
            key: "medical_evidence",
            exportable: true,
        },
        {
            label: "信息来源",
            key: "source",
            exportable: true,
        },
        {
            label: "参考文献",
            key: "literature",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.drug ? cell.drug.label : "-";
        },
        (cell) => {
            return cell.cancer ? cell.cancer.label : "-";
        },
        (cell) => {
            return cell.medical_evidence;
        },
        (cell) => {
            return cell.source;
        },
        (cell) => {
            return cell.literature;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["drug"] = String(obj["drug"]);
        obj["cancer"] = String(obj["cancer"]);
        obj["medical_evidence"] = String(obj["medical_evidence"]);
        obj["source"] = String(obj["source"]);
        obj["literature"] = String(obj["literature"]);
        return obj;
    },
    formComponents: [
        {
            label: "抗肿瘤药物",
            key: "drug",
            inputType: "singleselect",
            query: query.DRUGS_GET,
            queryKey: "drugs",
        },
        {
            label: "匹配癌种",
            key: "cancer",
            inputType: "singleselect",
            query: query.CANCERS_GET,
            queryKey: "cancers",
        },
        {
            label: "匹配癌种循证医学描述",
            key: "medical_evidence",
            inputType: "textarea",
        },
        {
            label: "信息依据",
            key: "source",
            inputType: "textarea",
        },
        {
            label: "参考文献",
            key: "literature",
            inputType: "textarea",
        },
    ],
};

tables["mutation_drug_benefit"] = {
    query: {
        gql: query.MUTATION_DRUG_BENEFITS_GET,
        key: "mutationdrugbenefits",
    },
    mutation: {
        new: mutation.MUTATION_DRUG_BENEFIT_NEW,
        delete: mutation.MUTATION_DRUG_BENEFITS_DELETE,
        update: mutation.MUTATION_DRUG_BENEFIT_UPDATE,
    },
    columns: [
        {
            label: "氨基酸变异",
            key: "mutation",
            exportable: true,
        },
        {
            label: "FDA/NMPA/其他机构批准用于本癌种获益药物",
            key: "drug",
            exportable: true,
        },
        {
            label: "证据等级",
            key: "evidence_level",
            exportable: true,
        },
        {
            label: "来源依据",
            key: "source",
            exportable: true,
        },
        {
            label: "参考文献",
            key: "literature",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.mutation ? cell.mutation.label : "-";
        },
        (cell) => {
            return cell.drug ? cell.drug.label : "-";
        },
        (cell) => {
            return cell.evidence_level ? cell.evidence_level.label : "-";
        },
        (cell) => {
            return cell.source;
        },
        (cell) => {
            return cell.literature;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["mutation"] = String(obj["mutation"]);
        obj["drug"] = String(obj["drug"]);
        obj["evidence_level"] = String(obj["evidence_level"]);
        obj["source"] = String(obj["source"]);
        obj["literature"] = String(obj["literature"]);
        return obj;
    },
    formComponents: [
        {
            label: "氨基酸变异",
            key: "mutation",
            inputType: "singleselect",
            query: query.MUTATION_CANCERS_GET,
            queryKey: "mutationcancers",
        },
        {
            label: "FDA/NMPA/其他机构批准用于本癌种获益药物",
            key: "drug",
            inputType: "singleselect",
            query: query.DRUGS_GET,
            queryKey: "drugs",
        },
        {
            label: "证据等级",
            key: "evidence_level",
            inputType: "singleselect",
            query: query.EVIDENCE_LEVELS_GET,
            queryKey: "evidencelevels",
        },
        {
            label: "来源依据",
            key: "source",
            inputType: "textarea",
        },
        {
            label: "参考文献",
            key: "literature",
            inputType: "textarea",
        },
    ],
};

tables["mutation_drug_resistance"] = {
    query: {
        gql: query.MUTATION_DRUG_RESISTANCES_GET,
        key: "mutationdrugresistances",
    },
    mutation: {
        new: mutation.MUTATION_DRUG_RESISTANCE_NEW,
        delete: mutation.MUTATION_DRUG_RESISTANCES_DELETE,
        update: mutation.MUTATION_DRUG_RESISTANCE_UPDATE,
    },
    columns: [
        {
            label: "氨基酸变异",
            key: "mutation",
            exportable: true,
        },
        {
            label: "耐药药物",
            key: "drug",
            exportable: true,
        },
        {
            label: "证据等级",
            key: "evidence_level",
            exportable: true,
        },
        {
            label: "参考依据",
            key: "source",
            exportable: true,
        },
        {
            label: "参考文献",
            key: "literature",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.mutation ? cell.mutation.label : "-";
        },
        (cell) => {
            return cell.drug ? cell.drug.label : "-";
        },
        (cell) => {
            return cell.evidence_level ? cell.evidence_level.label : "-";
        },
        (cell) => {
            return cell.source;
        },
        (cell) => {
            return cell.literature;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["mutation"] = String(obj["mutation"]);
        obj["drug"] = String(obj["drug"]);
        obj["evidence_level"] = String(obj["evidence_level"]);
        obj["source"] = String(obj["source"]);
        obj["literature"] = String(obj["literature"]);
        return obj;
    },
    formComponents: [
        {
            label: "氨基酸变异",
            key: "mutation",
            inputType: "singleselect",
            query: query.MUTATION_CANCERS_GET,
            queryKey: "mutationcancers",
        },
        {
            label: "耐药药物",
            key: "drug",
            inputType: "singleselect",
            query: query.DRUGS_GET,
            queryKey: "drugs",
        },
        {
            label: "证据等级",
            key: "evidence_level",
            inputType: "singleselect",
            query: query.EVIDENCE_LEVELS_GET,
            queryKey: "evidencelevels",
        },
        {
            label: "参考依据",
            key: "source",
            inputType: "textarea",
        },
        {
            label: "参考文献",
            key: "literature",
            inputType: "textarea",
        },
    ],
};

tables["mutation_drug_benefit_other"] = {
    query: {
        gql: query.MUTATION_DRUG_BENEFIT_OTHERS_GET,
        key: "mutationdrugbenefitothers",
    },
    mutation: {
        new: mutation.MUTATION_DRUG_BENEFIT_OTHER_NEW,
        delete: mutation.MUTATION_DRUG_BENEFIT_OTHERS_DELETE,
        update: mutation.MUTATION_DRUG_BENEFIT_OTHER_UPDATE,
    },
    columns: [
        {
            label: "氨基酸变异",
            key: "mutation",
            exportable: true,
        },
        {
            label: "FDA/NMPA/其他机构批准用于其他癌种获批获益药物",
            key: "drug",
            exportable: true,
        },
        {
            label: "证据等级",
            key: "evidence_level",
            exportable: true,
        },
        {
            label: "来源依据",
            key: "source",
            exportable: true,
        },
        {
            label: "参考文献",
            key: "literature",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.mutation ? cell.mutation.label : "-";
        },
        (cell) => {
            return cell.drug ? cell.drug.label : "-";
        },
        (cell) => {
            return cell.evidence_level ? cell.evidence_level.label : "-";
        },
        (cell) => {
            return cell.source;
        },
        (cell) => {
            return cell.literature;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["mutation"] = String(obj["mutation"]);
        obj["drug"] = String(obj["drug"]);
        obj["evidence_level"] = String(obj["evidence_level"]);
        obj["source"] = String(obj["source"]);
        obj["literature"] = String(obj["literature"]);
        return obj;
    },
    formComponents: [
        {
            label: "氨基酸变异",
            key: "mutation",
            inputType: "singleselect",
            query: query.MUTATION_CANCERS_GET,
            queryKey: "mutationcancers",
        },
        {
            label: "FDA/NMPA/其他机构批准用于其他癌种获批获益药物",
            key: "drug",
            inputType: "singleselect",
            query: query.DRUGS_GET,
            queryKey: "drugs",
        },
        {
            label: "证据等级",
            key: "evidence_level",
            inputType: "singleselect",
            query: query.EVIDENCE_LEVELS_GET,
            queryKey: "evidencelevels",
        },
        {
            label: "来源依据",
            key: "source",
            inputType: "textarea",
        },
        {
            label: "参考文献",
            key: "literature",
            inputType: "textarea",
        },
    ],
};

tables["mutation_clinical"] = {
    query: {
        gql: query.MUTATION_CLINICALS_GET,
        key: "mutationclinicals",
    },
    mutation: {
        new: mutation.MUTATION_CLINICAL_NEW,
        delete: mutation.MUTATION_CLINICALS_DELETE,
        update: mutation.MUTATION_CLINICAL_UPDATE,
    },
    columns: [
        {
            label: "氨基酸变异",
            key: "mutation",
            exportable: true,
        },
        {
            label: "临床试验ID/药物",
            key: "clinical_or_drug",
            exportable: true,
        },
        {
            label: "证据等级",
            key: "evidence_level",
            exportable: true,
        },
        {
            label: "参考依据",
            key: "evidence",
            exportable: true,
        },
        {
            label: "参考来源",
            key: "source",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.mutation ? cell.mutation.label : "-";
        },
        (cell) => {
            return cell.clinical_or_bug ? cell.clinical_or_bug : "";
        },
        (cell) => {
            return cell.evidence_level ? cell.evidence_level.label : "-";
        },
        (cell) => {
            return cell.evidence;
        },
        (cell) => {
            return cell.source;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["mutation"] = String(obj["mutation"]);
        obj["clinical_or_drug"] = String(obj["clinical_or_drug"]);
        obj["evidence_level"] = String(obj["evidence_level"]);
        obj["evidence"] = String(obj["evidence"]);
        obj["source"] = String(obj["source"]);
        return obj;
    },
    formComponents: [
        {
            label: "氨基酸变异",
            key: "mutation",
            inputType: "singleselect",
            query: query.MUTATION_CANCERS_GET,
            queryKey: "mutationcancers",
        },
        {
            label: "临床试验ID/药物",
            key: "clinical_or_drug",
            inputType: "text",
        },
        {
            label: "证据等级",
            key: "evidence_level",
            inputType: "singleselect",
            query: query.EVIDENCE_LEVELS_GET,
            queryKey: "evidencelevels",
        },
        {
            label: "参考依据",
            key: "evidence",
            inputType: "textarea",
        },
        {
            label: "参考来源",
            key: "source",
            inputType: "textarea",
        },
    ],
};

tables["clinical"] = {
    query: {
        gql: query.CLINICALS_GET,
        key: "clinicals",
    },
    mutation: {
        new: mutation.CLINICAL_NEW,
        delete: mutation.CLINICALS_DELETE,
        update: mutation.CLINICAL_UPDATE,
    },
    columns: [
        {
            label: "基因",
            key: "gene_annot",
            exportable: true,
        },
        {
            label: "转录本",
            key: "transcript",
            exportable: true,
        },
        {
            label: "核苷酸变异",
            key: "snp",
            exportable: true,
        },
        {
            label: "氨基酸变异",
            key: "mutation",
            exportable: true,
        },
        {
            label: "临床试验药物",
            key: "drug",
            exportable: true,
        },
        {
            label: "临床试验ID",
            key: "clinicalid",
            exportable: true,
        },
        {
            label: "试验状态",
            key: "clinicalstatus",
            exportable: true,
        },
        {
            label: "试验招募癌种",
            key: "cancer",
            exportable: true,
        },
        {
            label: "分期",
            key: "stage",
            exportable: true,
        },
        {
            label: "试验题目",
            key: "trailtitle",
            exportable: true,
        },
        {
            label: "地点",
            key: "location",
            exportable: true,
        },
        {
            label: "备注",
            key: "remark",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.gene_annot ? cell.gene_annot.label : "-";
        },
        (cell) => {
            return cell.transcript;
        },
        (cell) => {
            return cell.snp;
        },
        (cell) => {
            return cell.mutation;
        },
        (cell) => {
            return cell.drug;
        },
        (cell) => {
            return cell.clinicalid;
        },
        (cell) => {
            return cell.clinicalstatus ? cell.clinicalstatus.label : "-";
        },
        (cell) => {
            return cell.cancer ? cell.cancer.label : "-";
        },
        (cell) => {
            return cell.stage;
        },
        (cell) => {
            return cell.trailtitle;
        },
        (cell) => {
            return cell.location;
        },
        (cell) => {
            return cell.remark;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["gene_annot"] = String(obj["gene_annot"]);
        obj["transcript"] = String(obj["transcript"]);
        obj["snp"] = String(obj["snp"]);
        obj["mutation"] = String(obj["mutation"]);
        obj["drug"] = String(obj["drug"]);
        obj["clinicalid"] = String(obj["clinicalid"]);
        obj["clinicalstatus"] = String(obj["clinicalstatus"]);
        obj["stage"] = String(obj["stage"]);
        obj["trailtitle"] = String(obj["trailtitle"]);
        obj["location"] = String(obj["location"]);
        obj["remark"] = String(obj["remark"]);
        return obj;
    },
    formComponents: [
        {
            label: "基因",
            key: "gene_annot",
            inputType: "singleselect",
            query: query.GENE_ANNOTS_GET,
            queryKey: "geneannots",
        },
        {
            label: "转录本",
            key: "transcript",
            inputType: "text",
        },
        {
            label: "核苷酸变异",
            key: "snp",
            inputType: "text",
        },
        {
            label: "氨基酸变异",
            key: "mutation",
            inputType: "text",
        },
        {
            label: "临床试验药物",
            key: "drug",
            inputType: "text",
        },
        {
            label: "临床试验ID",
            key: "clinicalid",
            inputType: "text",
        },
        {
            label: "试验状态",
            key: "clinicalstatus",
            inputType: "singleselect",
            query: query.CLINICAL_STATUSES_GET,
            queryKey: "clinicalstatuses",
        },
        {
            label: "试验招募癌种",
            key: "cancer",
            inputType: "singleselect",
            query: query.CANCERS_GET,
            queryKey: "cancers",
        },
        {
            label: "分期",
            key: "stage",
            inputType: "text",
        },
        {
            label: "试验题目",
            key: "trailtitle",
            inputType: "text",
        },
        {
            label: "地点",
            key: "location",
            inputType: "text",
        },
        {
            label: "备注",
            key: "remark",
            inputType: "text",
        },
    ],
};

tables["chemo"] = {
    query: {
        gql: query.CHEMOS_GET,
        key: "chemos",
    },
    mutation: {
        new: mutation.CHEMO_NEW,
        delete: mutation.CHEMOS_DELETE,
        update: mutation.CHEMO_UPDATE,
    },
    columns: [
        {
            label: "基因",
            key: "gene",
            exportable: true,
        },
        {
            label: "位点",
            key: "rs",
            exportable: true,
        },
        {
            label: "染色体",
            key: "chr",
            exportable: true,
        },
        {
            label: "位置",
            key: "locus",
            exportable: true,
        },
        {
            label: "Ref",
            key: "ref",
            exportable: true,
        },
        {
            label: "功能分类",
            key: "drugclass",
            exportable: true,
        },
        {
            label: "药物",
            key: "drug",
            exportable: true,
        },
        {
            label: "类型",
            key: "type",
            exportable: true,
        },
        {
            label: "证据等级",
            key: "evidence_level",
            exportable: true,
        },
        {
            label: "适用癌种",
            key: "cancer",
            exportable: true,
        },
        {
            label: "人种",
            key: "race",
            exportable: true,
        },
        {
            label: "基因型",
            key: "genotype",
            exportable: true,
        },
        {
            label: "药物解析",
            key: "description",
            exportable: true,
        },
        {
            label: "药物解析参考依据",
            key: "description_ref",
            exportable: true,
        },
        {
            label: "毒性",
            key: "toxicity",
            exportable: true,
        },
        {
            label: "有效性",
            key: "effectiveness",
            exportable: true,
        },
        {
            label: "参考文献",
            key: "literature",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.gene ? cell.gene.label : "-";
        },
        (cell) => {
            return cell.rs;
        },
        (cell) => {
            return cell.chr;
        },
        (cell) => {
            return cell.locus;
        },
        (cell) => {
            return cell.ref;
        },
        (cell) => {
            return cell.drugclass ? cell.drugclass.label : "-";
        },
        (cell) => {
            return cell.drug;
        },
        (cell) => {
            return cell.type;
        },
        (cell) => {
            return cell.evidence_level ? cell.evidence_level.label : "-";
        },
        (cell) => {
            return cell.cancer ? cell.cancer.label : "-";
        },
        (cell) => {
            return cell.race;
        },
        (cell) => {
            return cell.genotype;
        },
        (cell) => {
            return cell.description;
        },
        (cell) => {
            return cell.description_ref;
        },
        (cell) => {
            return cell.toxicity;
        },
        (cell) => {
            return cell.effectiveness;
        },
        (cell) => {
            return cell.literature;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["gene"] = String(obj["gene"]);
        obj["rs"] = String(obj["rs"]);
        obj["chr"] = String(obj["chr"]);
        obj["locus"] = String(obj["locus"]);
        obj["ref"] = String(obj["ref"]);
        obj["drugclass"] = String(obj["drugclass"]);
        obj["drug"] = String(obj["drug"]);
        obj["type"] = String(obj["type"]);
        obj["evidence_level"] = String(obj["evidence_level"]);
        obj["cancer"] = String(obj["cancer"]);
        obj["race"] = String(obj["race"]);
        obj["genotype"] = String(obj["genotype"]);
        obj["description"] = String(obj["description"]);
        obj["description_ref"] = String(obj["description_ref"]);
        obj["toxicity"] = String(obj["toxicity"]);
        obj["effectiveness"] = String(obj["effectiveness"]);
        obj["literature"] = String(obj["literature"]);
        return obj;
    },
    formComponents: [
        {
            label: "基因",
            key: "gene",
            inputType: "singleselect",
            query: query.GENES_GET,
            queryKey: "genes",
        },
        {
            label: "位点",
            key: "rs",
            inputType: "text",
        },
        {
            label: "染色体",
            key: "chr",
            inputType: "text",
        },
        {
            label: "位置",
            key: "locus",
            inputType: "text",
        },
        {
            label: "Ref",
            key: "ref",
            inputType: "text",
        },
        {
            label: "功能分类",
            key: "drugclass",
            inputType: "singleselect",
            query: query.DRUG_CLASSES_GET,
            queryKey: "drugclasses",
        },
        {
            label: "药物",
            key: "drug",
            inputType: "text",
        },
        {
            label: "类型",
            key: "type",
            inputType: "text",
        },
        {
            label: "证据等级",
            key: "evidence_level",
            inputType: "singleselect",
            query: query.EVIDENCE_LEVELS_GET,
            queryKey: "evidencelevels",
        },
        {
            label: "适用癌种",
            key: "cancer",
            inputType: "singleselect",
            query: query.CANCERS_GET,
            queryKey: "cancers",
        },
        {
            label: "人种",
            key: "race",
            inputType: "text",
        },
        {
            label: "基因型",
            key: "genotype",
            inputType: "text",
        },
        {
            label: "药物解析",
            key: "description",
            inputType: "textarea",
        },
        {
            label: "药物解析参考依据",
            key: "description_ref",
            inputType: "textarea",
        },
        {
            label: "毒性",
            key: "toxicity",
            inputType: "text",
        },
        {
            label: "有效性",
            key: "effectiveness",
            inputType: "text",
        },
        {
            label: "参考文献",
            key: "literature",
            inputType: "text",
        },
    ],
};

tables["nccn_gene"] = {
    query: {
        gql: query.NCCN_GENES_GET,
        key: "nccngenes",
    },
    mutation: {
        new: mutation.NCCN_GENE_NEW,
        delete: mutation.NCCN_GENES_DELETE,
        update: mutation.NCCN_GENE_UPDATE,
    },
    columns: [
        {
            label: "基因英文名称",
            key: "gene",
            exportable: true,
        },
        {
            label: "NCCN建议检测癌种",
            key: "cancer",
            exportable: true,
        },
        {
            label: "检测结果",
            key: "result",
            exportable: true,
        },
        {
            label: "备注",
            key: "remark",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.gene ? cell.gene.label : "-";
        },
        (cell) => {
            return cell.cancer ? cell.cancer.label : "-";
        },
        (cell) => {
            return cell.result;
        },
        (cell) => {
            return cell.remark;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["gene"] = String(obj["gene"]);
        obj["cancer"] = String(obj["cancer"]);
        obj["result"] = String(obj["result"]);
        obj["remark"] = String(obj["remark"]);
        return obj;
    },
    formComponents: [
        {
            label: "基因英文名称",
            key: "gene",
            inputType: "singleselect",
            query: query.GENES_GET,
            queryKey: "genes",
        },
        {
            label: "NCCN建议检测癌种",
            key: "cancer",
            inputType: "singleselect",
            query: query.CANCERS_GET,
            queryKey: "cancers",
        },
        {
            label: "检测结果",
            key: "result",
            inputType: "text",
        },
        {
            label: "备注",
            key: "remark",
            inputType: "text",
        },
    ],
};

tables["report_remark"] = {
    query: {
        gql: query.REPORT_REMARKS_GET,
        key: "reportremarks",
    },
    mutation: {
        new: mutation.REPORT_REMARK_NEW,
        delete: mutation.REPORT_REMARKS_DELETE,
        update: mutation.REPORT_REMARK_UPDATE,
    },
    columns: [
        {
            label: "关键字",
            key: "key",
            exportable: true,
        },
        {
            label: "内容",
            key: "content",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.key;
        },
        (cell) => {
            return cell.content;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["key"] = String(obj["key"]);
        obj["content"] = String(obj["content"]);
        return obj;
    },
    formComponents: [
        {
            label: "关键字",
            key: "key",
            inputType: "text",
            required: true,
        },
        {
            label: "内容",
            key: "content",
            inputType: "text",
        },
    ],
};

tables["report_literature"] = {
    query: {
        gql: query.REPORT_LITERATURES_GET,
        key: "reportliteratures",
    },
    mutation: {
        new: mutation.REPORT_LITERATURE_NEW,
        delete: mutation.REPORT_LITERATURES_DELETE,
        update: mutation.REPORT_LITERATURE_UPDATE,
    },
    columns: [
        {
            label: "PMID",
            key: "pmid",
            exportable: true,
        },
        {
            label: "文献",
            key: "literature",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.pmid;
        },
        (cell) => {
            return cell.literature;
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["pmid"] = String(obj["pmid"]);
        obj["literature"] = String(obj["literature"]);
        return obj;
    },
    formComponents: [
        {
            label: "PMID",
            key: "pmid",
            inputType: "text",
        },
        {
            label: "文献",
            key: "literature",
            inputType: "text",
        },
    ],
};

tables["report_file"] = {
    query: {
        gql: query.REPORT_FILES_GET,
        key: "reportfiles",
    },
    mutation: {
        new: mutation.REPORT_FILE_NEW,
        delete: mutation.REPORT_FILES_DELETE,
        update: mutation.REPORT_FILE_UPDATE,
    },
    columns: [
        //{
        //label: 'ID',
        //key: 'id',
        //exportable: true
        //},
        {
            label: "文件名",
            key: "name",
            exportable: true,
        },
        {
            label: "路径",
            key: "path",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
    ],
    cellFormatters: [
        //(cell) => {return cell.id},
        (cell) => {
            return cell.filename;
        },
        (cell) => {
            return cell.path;
        },
        (row) => {
            return row.creator ? row.creator.name : "-";
        },
        (row) => {
            return formatDate(row.createdAt);
        },
        (row) => {
            return row.createdAt == row.updatedAt
                ? "-"
                : formatDate(row.updatedAt);
        },
    ],
    normalize: (obj) => {
        obj["id"] = String(obj["id"]);
        obj["name"] = convertBoolean(obj["name"]);
        return obj;
    },
    formComponents: [
        {
            label: "",
            key: "file",
            inputType: "file",
        },
    ],
};

tables["geneclass"] = {
    query: {
        gql: query.GENE_CLASSES_GET,
        key: "geneclasses",
    },
    mutation: {
        new: mutation.GENE_CLASS_NEW,
        delete: mutation.GENE_CLASSES_DELETE,
        update: mutation.GENE_CLASS_UPDATE,
    },
    columns: [
        {
            label: "名称",
            key: "label",
            exportable: true,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.label;
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
    ],
    normalize: (obj) => {
        obj["label"] = String(obj["label"]);
        return obj;
    },
    formComponents: [
        {
            label: "名称",
            key: "label",
            inputType: "text",
        },
    ],
};

tables["ddrclass"] = {
    query: {
        gql: query.DDR_CLASSES_GET,
        key: "ddrclasses",
    },
    mutation: {
        new: mutation.DDR_CLASS_NEW,
        delete: mutation.DDR_CLASSES_DELETE,
        update: mutation.DDR_CLASS_UPDATE,
    },
    columns: [
        {
            label: "名称",
            key: "label",
            exportable: true,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.label;
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
    ],
    normalize: (obj) => {
        obj["label"] = String(obj["label"]);
        return obj;
    },
    formComponents: [
        {
            label: "名称",
            key: "label",
            inputType: "text",
        },
    ],
};

tables["mutationclass"] = {
    query: {
        gql: query.MUTATION_CLASSES_GET,
        key: "mutationclasses",
    },
    mutation: {
        new: mutation.MUTATION_CLASS_NEW,
        delete: mutation.MUTATION_CLASSES_DELETE,
        update: mutation.MUTATION_CLASS_UPDATE,
    },
    columns: [
        {
            label: "名称",
            key: "label",
            exportable: true,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.label;
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
    ],
    normalize: (obj) => {
        obj["label"] = String(obj["label"]);
        return obj;
    },
    formComponents: [
        {
            label: "名称",
            key: "label",
            inputType: "text",
        },
    ],
};

tables["drugclass"] = {
    query: {
        gql: query.DRUG_CLASSES_GET,
        key: "drugclasses",
    },
    mutation: {
        new: mutation.DRUG_CLASS_NEW,
        delete: mutation.DRUG_CLASSES_DELETE,
        update: mutation.DRUG_CLASS_UPDATE,
    },
    columns: [
        {
            label: "名称",
            key: "label",
            exportable: true,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.label;
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
    ],
    normalize: (obj) => {
        obj["label"] = String(obj["label"]);
        return obj;
    },
    formComponents: [
        {
            label: "名称",
            key: "label",
            inputType: "text",
        },
    ],
};

tables["evidencelevel"] = {
    query: {
        gql: query.EVIDENCE_LEVELS_GET,
        key: "evidencelevels",
    },
    mutation: {
        new: mutation.EVIDENCE_LEVEL_NEW,
        delete: mutation.EVIDENCE_LEVELS_DELETE,
        update: mutation.EVIDENCE_LEVEL_UPDATE,
    },
    columns: [
        {
            label: "名称",
            key: "label",
            exportable: true,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.label;
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
    ],
    normalize: (obj) => {
        obj["label"] = String(obj["label"]);
        return obj;
    },
    formComponents: [
        {
            label: "名称",
            key: "label",
            inputType: "text",
        },
    ],
};

tables["pathway"] = {
    query: {
        gql: query.PATHWAYS_GET,
        key: "pathways",
    },
    mutation: {
        new: mutation.PATHWAY_NEW,
        delete: mutation.PATHWAYS_DELETE,
        update: mutation.PATHWAY_UPDATE,
    },
    columns: [
        {
            label: "通路名称英文",
            key: "name_en",
            exportable: true,
        },
        {
            label: "通路名称中文",
            key: "name_cn",
            exportable: true,
        },
        {
            label: "通路中主要基因",
            key: "genes",
            exportable: true,
        },
        {
            label: "通路描述",
            key: "description",
            exportable: true,
        },
        {
            label: "通路图",
            key: "image",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.name_en;
        },
        (cell) => {
            return cell.name_cn;
        },
        (cell) => {
            return cell.genes.map((gene) => gene.label).join(" ");
        },
        (cell) => {
            return cell.description;
        },
        (cell) => {
            return cell.image ? cell.image.label : "-";
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["name_en"] = String(obj["name_en"]);
        obj["name_cn"] = String(obj["name_cn"]);
        obj["genes"] = obj["genes"] ? obj["genes"].split(",") : [];
        obj["description"] = String(obj["description"]);
        obj["image"] = String(obj["image"]);
        return obj;
    },
    formComponents: [
        {
            label: "通路名称英文",
            key: "name_en",
            inputType: "text",
        },
        {
            label: "通路名称中文",
            key: "name_cn",
            inputType: "text",
        },
        {
            label: "通路中主要基因",
            key: "genes",
            inputType: "multiselect",
            query: query.GENES_GET,
            queryKey: "genes",
        },
        {
            label: "通路描述",
            key: "description",
            inputType: "textarea",
        },
        {
            label: "通路图",
            key: "image",
            inputType: "reportfile",
        },
    ],
};

tables["pathway_drug_cancer"] = {
    query: {
        gql: query.PATHWAY_DRUG_CANCERS_GET,
        key: "pathwaydrugcancers",
    },
    mutation: {
        new: mutation.PATHWAY_DRUG_CANCER_NEW,
        delete: mutation.PATHWAY_DRUG_CANCERS_DELETE,
        update: mutation.PATHWAY_DRUG_CANCER_UPDATE,
    },
    columns: [
        {
            label: "信号通路中文名称",
            key: "pathway",
            exportable: true,
        },
        {
            label: "药物",
            key: "drugs",
            exportable: true,
        },
        {
            label: "试用癌种",
            key: "cancer",
            exportable: true,
        },
        {
            label: "创建人",
            key: "creator",
            exportable: false,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.pathway ? cell.pathway.label : "-";
        },
        (cell) => {
            return cell.drugs.map((drug) => drug.label).join(" ");
        },
        (cell) => {
            return cell.cancer ? cell.cancer.label : "-";
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["pathway"] = String(obj["pathway"]);
        obj["drugs"] = obj["drugs"] ? obj["drugs"].split(",") : [];
        obj["cancer"] = String(obj["cancer"]);
        return obj;
    },
    formComponents: [
        {
            label: "信号通路中文名称",
            key: "pathway",
            inputType: "singleselect",
            query: query.PATHWAYS_GET,
            queryKey: "pathways",
        },
        {
            label: "药物",
            key: "drugs",
            inputType: "multiselect",
            query: query.DRUGS_GET,
            queryKey: "drugs",
        },
        {
            label: "适用癌种",
            key: "cancer",
            inputType: "singleselect",
            query: query.CANCERS_GET,
            queryKey: "cancers",
        },
    ],
};

tables["report_sample_type"] = {
    query: {
        gql: query.REPORT_SAMPLE_TYPES_GET,
        key: "reportsampletypes",
    },
    mutation: {
        new: mutation.REPORT_SAMPLE_TYPE_NEW,
        delete: mutation.REPORT_SAMPLE_TYPES_DELETE,
        update: mutation.REPORT_SAMPLE_TYPE_UPDATE,
    },
    columns: [
        {
            label: "名称",
            key: "label",
            exportable: true,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.label;
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
    ],
    normalize: (obj) => {
        obj["label"] = String(obj["label"]);
        return obj;
    },
    formComponents: [
        {
            label: "名称",
            key: "label",
            inputType: "text",
        },
    ],
};

tables["inspection_project"] = {
    query: {
        gql: query.INSPECTION_PROJECTS_GET,
        key: "inspectionprojects",
    },
    mutation: {
        new: mutation.INSPECTION_PROJECT_NEW,
        delete: mutation.INSPECTION_PROJECTS_DELETE,
        update: mutation.INSPECTION_PROJECT_UPDATE,
    },
    columns: [
        {
            label: "名称",
            key: "label",
            exportable: true,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.label;
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
    ],
    normalize: (obj) => {
        obj["label"] = String(obj["label"]);
        return obj;
    },
    formComponents: [
        {
            label: "名称",
            key: "label",
            inputType: "text",
        },
    ],
};

tables["report_sample"] = {
    query: {
        gql: query.REPORT_SAMPLES_GET,
        key: "reportsamples",
    },
    mutation: {
        new: mutation.REPORT_SAMPLE_NEW,
        delete: mutation.REPORT_SAMPLES_DELETE,
        update: mutation.REPORT_SAMPLE_UPDATE,
    },
    columns: [
        {
            label: "姓名",
            key: "name",
            exportable: true,
        },
        {
            label: "性别",
            key: "gender",
            exportable: true,
        },
        {
            label: "年龄",
            key: "age",
            exportable: true,
        },
        {
            label: "样本编号",
            key: "sample_number",
            exportable: true,
        },
        {
            label: "样本类型",
            key: "sample_type",
            exportable: true,
        },
        {
            label: "检测项目",
            key: "project",
            exportable: true,
        },
        {
            label: "采集日期",
            key: "date_sampled",
            exportable: true,
        },
        {
            label: "接收日期",
            key: "date_received",
            exportable: true,
        },
        {
            label: "送检单位",
            key: "unit_submitted",
            exportable: true,
        },
        {
            label: "检测方法",
            key: "inspection_method",
            exportable: true,
        },
        {
            label: "检测平台",
            key: "inspection_platform",
            exportable: true,
        },
        {
            label: "参考基因组",
            key: "reference_genome",
            exportable: true,
        },
        {
            label: "临床诊断结果",
            key: "clinical_diagnosis",
            exportable: true,
        },
        {
            label: "报告显示癌种",
            key: "cancer_from_report",
            exportable: true,
        },
        {
            label: "数据匹配癌种",
            key: "cancer_from_data",
            exportable: true,
        },
        {
            label: "家族史",
            key: "history_family",
            exportable: true,
        },
        {
            label: "用药史",
            key: "history_drug",
            exportable: true,
        },
        {
            label: "报告日期",
            key: "date_reported",
            exportable: true,
        },
        {
            label: "创建日期",
            key: "createdAt",
            exportable: false,
        },
        {
            label: "修改日期",
            key: "updatedAt",
            exportable: false,
        },
        {
            label: "审核状态",
            key: "status",
            exportable: false,
        },
        {
            label: "审核人",
            key: "approver",
            exportable: false,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.name;
        },
        (cell) => {
            return cell.gender;
        },
        (cell) => {
            return cell.age;
        },
        (cell) => {
            return cell.sample_number;
        },
        (cell) => {
            return cell.sample_type ? cell.sample_type.label : "-";
        },
        (cell) => {
            return cell.inspection_project
                ? cell.inspection_project.label
                : "-";
        },
        (cell) => {
            return formatDate(cell.date_sampled);
        },
        (cell) => {
            return formatDate(cell.date_received);
        },
        (cell) => {
            return cell.unit_submitted;
        },
        (cell) => {
            return cell.inspection_method;
        },
        (cell) => {
            return cell.inspection_platform;
        },
        (cell) => {
            return cell.reference_genome;
        },
        (cell) => {
            return cell.clinical_diagnosis;
        },
        (cell) => {
            return cell.cancer_from_report;
        },
        (cell) => {
            return cell.cancer_from_data ? cell.cancer_from_data.label : "-";
        },
        (cell) => {
            return cell.history_family;
        },
        (cell) => {
            return cell.history_drug;
        },
        (cell) => {
            return formatDate(cell.date_reported);
        },
        (cell) => {
            return cell.creator ? cell.creator.name : "-";
        },
        (cell) => {
            return formatDate(cell.createdAt);
        },
        (cell) => {
            return cell.createdAt == cell.updatedAt
                ? "-"
                : formatDate(cell.updatedAt);
        },
        (cell) => {
            return cell.status ? "已审核" : "未审核";
        },
        (cell) => {
            return cell.aprrover ? cell.approver.name : "-";
        },
    ],
    normalize: (obj) => {
        obj["name"] = String(obj["name"]);
        obj["gender"] = String(obj["gender"]);
        obj["age"] = String(obj["age"]);
        obj["sample_number"] = String(obj["sample_number"]);
        obj["sample_type"] = String(obj["sample_type"]);
        obj["project"] = String(obj["project"]);
        obj["date_sampled"] = Date.parse(obj["date_sampled"]);
        obj["date_received"] = Date.parse(obj["date_received"]);
        obj["unit_submitted"] = String(obj["unit_submitted"]);
        obj["inspection_method"] = String(obj["inspection_method"]);
        obj["inspection_platform"] = String(obj["inspection_platform"]);
        obj["reference_genome"] = String(obj["reference_genome"]);
        obj["clinical_diagnosis"] = String(obj["clinical_diagnosis"]);
        obj["cancer_from_report"] = String(obj["cancer_from_report"]);
        obj["cancer_from_data"] = String(obj["cancer_from_data"]);
        obj["history_family"] = String(obj["history_family"]);
        obj["history_drug"] = String(obj["history_drug"]);
        obj["date_reported"] = Date.parse(obj["date_reported"]);
        return obj;
    },
    formComponents: [
        {
            label: "姓名",
            key: "name",
            inputType: "text",
        },
        {
            label: "性别",
            key: "gender",
            inputType: "simpleselect",
            values: ["男", "女"],
        },
        {
            label: "年龄",
            key: "age",
            inputType: "text",
        },
        {
            label: "样本编号",
            key: "sample_number",
            inputType: "text",
        },
        {
            label: "样本类型",
            key: "sample_type",
            inputType: "singleselect",
            query: query.REPORT_SAMPLE_TYPES_GET,
            queryKey: "reportsampletypes",
        },
        {
            label: "检测项目",
            key: "inspection_project",
            inputType: "singleselect",
            query: query.INSPECTION_PROJECTS_GET,
            queryKey: "inspectionprojects",
        },
        {
            label: "采集日期",
            key: "date_sampled",
            inputType: "datepicker",
        },
        {
            label: "接收日期",
            key: "date_received",
            inputType: "datepicker",
        },
        {
            label: "送检单位",
            key: "unit_submitted",
            inputType: "text",
        },
        {
            label: "检测方法",
            key: "inspection_method",
            inputType: "text",
        },
        {
            label: "检测平台",
            key: "inspection_platform",
            inputType: "text",
        },
        {
            label: "参考基因组",
            key: "reference_genome",
            inputType: "simpleselect",
            values: ["GRCh37/hg19", "GRCh38/hg38"],
        },
        {
            label: "临床诊断结果",
            key: "clinical_diagnosis",
            inputType: "text",
        },
        {
            label: "报告显示癌种",
            key: "cancer_from_report",
            inputType: "text",
        },
        {
            label: "数据匹配癌种",
            key: "cancer_from_data",
            inputType: "singleselect",
            query: query.CANCERS_GET,
            queryKey: "cancers",
        },
        {
            label: "家族史",
            key: "history_family",
            inputType: "textarea",
        },
        {
            label: "用药史",
            key: "history_drug",
            inputType: "textarea",
        },
        {
            label: "报告日期",
            key: "date_reported",
            inputType: "datepicker",
        },
    ],
};

tables["report_sample_qc"] = {
    query: {
        gql: query.REPORT_SAMPLE_QCS_BY_SAMPLE_GET,
        key: "reportsampleqcsbysample",
        variables: (value) => {
            return { sid: value };
        },
    },
    mutation: {
        new: mutation.REPORT_SAMPLE_QC_NEW,
        delete: mutation.REPORT_SAMPLE_QCS_DELETE,
        update: mutation.REPORT_SAMPLE_QC_UPDATE,
    },
    columns: [
        {
            label: "样本类型",
            key: "name",
            exportable: true,
        },
        {
            label: "肿瘤细胞含量 (%)",
            key: "perc_tumor",
            exportable: true,
        },
        {
            label: "DNA浓度 (ng/ul)",
            key: "conc_dna",
            exportable: true,
        },
        {
            label: "DNA总量 (ng)",
            key: "total_dna",
            exportable: true,
        },
        {
            label: "平均测序深度",
            key: "avg_depth",
            exportable: true,
        },
        {
            label: "碱基质量Q30占比",
            key: "perc_q30",
            exportable: true,
        },
        {
            label: "质控",
            key: "result",
            exportable: true,
        },
    ],
    cellFormatters: [
        (cell) => {
            return cell.name;
        },
        (cell) => {
            return cell.perc_tumor;
        },
        (cell) => {
            return cell.conc_dna;
        },
        (cell) => {
            return cell.total_dna;
        },
        (cell) => {
            return cell.avg_depth;
        },
        (cell) => {
            return cell.perc_q30;
        },
        (cell) => {
            return cell.result;
        },
    ],
    normalize: (obj) => {
        obj["name"] = String(obj["name"]);
        obj["perc_tumor"] = String(obj["perc_tumor"]);
        obj["conc_dna"] = String(obj["conc_dna"]);
        obj["total_dna"] = String(obj["total_dna"]);
        obj["avg_depth"] = String(obj["avg_depth"]);
        obj["perc_q30"] = String(obj["perc_q30"]);
        obj["result"] = String(obj["result"]);
        return obj;
    },
    formComponents: [
        {
            label: "样本",
            key: "sample",
            inputType: "singleselect",
            query: query.REPORT_SAMPLES_GET,
            hidden: true,
            queryKey: "reportsamples",
        },
        {
            label: "样本类型",
            key: "name",
            inputType: "text",
        },
        {
            label: "肿瘤细胞含量",
            key: "perc_tumor",
            inputType: "text",
        },
        {
            label: "DNA浓度",
            key: "conc_dna",
            inputType: "text",
        },
        {
            label: "DNA总量",
            key: "total_dna",
            inputType: "text",
        },
        {
            label: "平均测序深度",
            key: "avg_depth",
            inputType: "text",
        },
        {
            label: "碱基质量Q30占比",
            key: "perc_q30",
            inputType: "text",
        },
        {
            label: "质控",
            key: "result",
            inputType: "simpleselect",
            values: ["合格", "警戒", "不合格"],
        },
    ],
};
export default tables;

import * as React from "react";
import {
    Box,
    Paper,
    IconButton,
    Avatar,
    ListItemAvatar,
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    Grid,
    Typography,
    Button,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Menu,
    MenuItem,
} from "@mui/material";
import reportsample from "../img/reportsample.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { useQuery, useMutation } from "@apollo/client";
import { makeStyles } from "@mui/styles";
import DataFormDialog from "../components/DataForm";
import TemplateEditDialog from "../components/TemplateEdit";
import * as query from "../gql/query";
import * as mutation from "../gql/mutation";
import { blue } from "@mui/material/colors";

const useStyles = makeStyles({
    container: {
        maxWidth: 800,
        marginBottom: 2,
    },
    title: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100px",
        fontSize: "10px",
    },
});

const formComponents = [
    {
        label: "名称",
        key: "name",
        inputType: "text",
    },
    {
        label: "模块",
        key: "module",
        inputType: "textarea",
    },
    {
        label: "页眉(左)",
        key: "header_left",
        inputType: "text",
    },
    {
        label: "页眉(右)",
        key: "header_right",
        inputType: "text",
    },
    {
        label: "页脚(左)",
        key: "footer_left",
        inputType: "text",
    },
    {
        label: "页脚(右)",
        key: "footer_right",
        inputType: "text",
    },
    {
        label: "封面",
        key: "image_cover_front",
        inputType: "reportfile",
    },
    {
        label: "封底",
        key: "image_cover_back",
        inputType: "reportfile",
    },
];

const OBJ = "{}";
const m = () => {
    return [
        {
            name: "封面",
            key: "cover",
            id: "00020",
            lines: [["标题", "姓名", "样本编号", "报告日期"]],
            enabled: true,
        },
        {
            name: "受检者基本信息",
            key: "sample_info",
            id: "01001",
            enabled: true,
            lines: [
                [
                    "姓名",
                    "性别",
                    "年龄",
                    "样本编号",
                    "样本类型",
                    "接收日期",
                    "报告日期",
                    "送检医院",
                    "检测项目",
                    "临床诊断",
                    "家族病史",
                    "药史",
                ],
            ],
        },
        {
            name: "检测结果总览",
            key: "result_all",
            id: "02001",
            enabled: true,
            lines: [
                ["检测项目", "检测内容", "检测意义", "检测结果"],
                [
                    "体细胞基因变异检测",
                    "基因点突变、缺失、插入分析、基因重排分析和基因拷贝数分析",
                    "预测肿瘤靶向药物的有效性肿瘤分子分",
                    OBJ,
                ],
                [
                    "肿瘤突变负荷（TMB)",
                    "基因点突变、缺失、插入分析",
                    "预测免疫治疗药物有效性",
                    OBJ,
                ],
                [
                    "微卫星不稳定性（MSI）",
                    "微卫星位点（MSI）",
                    "预测免疫治疗药物有效性",
                    OBJ,
                ],
                [
                    "HLA分型",
                    "HLA类分子",
                    "与肿瘤免疫治疗效果相关",
                    "详见检测结果",
                ],
                [
                    "化疗药物疗效相关位点检测",
                    "48个SNP位点",
                    "预测常见化疗药物有效性和毒副作用",
                    "详见检测结果详细解析",
                ],
                [
                    "遗传性肿瘤相关致病基因检测",
                    "112个遗传性肿瘤相关基因",
                    "预测多种肿瘤的遗传风险",
                    OBJ,
                ],
            ],
        },
        {
            name: "NCCN指南建议检测基因列表",
            key: "nccn_genes",
            id: "03001",
            enabled: true,
            lines: [["基因", "NCCN建议检测癌种", "检测结果"]],
            note: "本部分列出的基因为NCCN指南2020版建议检测的基因",
        },
        {
            name: "用药及预后综合提示",
            key: "drug_result",
            enabled: true,
        },
        {
            name: "靶向用药检测结果",
            key: "drug_result/gene",
            id: "04101",
            enabled: true,
            lines: [
                [
                    "基因变异及频率",
                    "FDA/NMPA其他机构批准用于本癌种治疗药物\n获益药物",
                    "FDA/NMPA其他机构批准用于本癌种治疗药物\n耐药药物",
                    "FDA/NMPA其他机构批准用于其他癌种获批潜在获益药物",
                    "临床试验ID/药物",
                ],
            ],
            note: '1. FDA：美国食品药品监督管理局；NMPA: 国家药品监督管理局。\n2. 变异与药物敏感性的证据等级根据 2017 年 AMP/ASCO/CAP 发布的癌症变异解读指南（PMID: 27993330）共分为四个等级： A 级（FDA 批准于特定癌种或者来自于专业临床指南）；B 级（较大规模的临床研究证实，且取得临床专家共识）；C 级（FDA 或其他专业机构批准于其他癌种；或者已作为临床试验的筛选入组标准；或者有多个小型研究支持）；D 级（临床前研究、或者是案例报道支持）。\n3. 基因变异所对应的靶向药物来源于 NCCN 指南、OncoKB 等公共数据库内容。该数据仅为临床诊断及治疗决策提供参考和辅助，仅供临床医生参考。随着数据库内容的完善和更新，该部分内容可能发生变化。\n4. "-"表示本次检测未发现相关变异或药物。',
        },
        {
            name: "免疫治疗相关检测结果",
            key: "drug_result/immu_result",
            enabled: true,
        },
        {
            name: "肿瘤突变负荷(TMB)检测结果",
            key: "drug_result/immu_result/tmb",
            id: "04211",
            enabled: true,
            lines: [["检测项目", "检测结果(muts/Mb)"]],
        },
        {
            name: "微卫星不稳定性（MSI)检测结果",
            key: "drug_result/immu_result/msi",
            id: "04221",
            enabled: true,
            lines: [["微卫星位点", "体细胞特异性", "稳定性", "检测结果"]],
        },
        {
            name: "免疫疗效相关基因检测结果",
            key: "drug_result/immu_result/gene",
            enabled: true,
        },
        {
            name: "免疫疗效正相关基因",
            key: "drug_result/immu_result/gene/pos",
            id: "04231",
            enabled: true,
            lines: [
                ["基因", "检测结果", "基因", "检测结果", "基因", "检测结果"],
            ],
        },
        {
            name: "免疫疗效负相关基因",
            key: "drug_result/immu_result/gene/neg",
            id: "04232",
            enabled: true,
            lines: [
                ["基因", "检测结果", "基因", "检测结果", "基因", "检测结果"],
            ],
        },
        {
            name: "HLA分型检测结果",
            key: "drug_result/immu_result/gene/hla",
            id: "04241",
            enabled: true,
            lines: [["HLA-A", "HLA-B", "HLA-C", "DQBI", "DPBI", "DRBI"]],
        },
        {
            name: "化疗药物疗效相关位点检测结果",
            key: "chemo_result",
            id: "05001",
            enabled: true,
            lines: [['详见报告"化疗用药提示及解析"部分(见报告第9部分)']],
        },
        {
            name: "遗传性肿瘤相关致病基因检测结果",
            key: "hrdt_result",
            enabled: true,
            id: "06001",
            lines: [["突变个数"]],
        },
        {
            name: "靶向用药解析",
            key: "drug_anna",
            enabled: true,
        },
        {
            name: "靶药相关基因变异结果汇总",
            key: "drug_anna/gene",
            enabled: true,
        },
        {
            name: "基因点突变、缺失、插入分析结果",
            key: "drug_anna/gene/somatic",
            id: "07101",
            enabled: true,
            lines: [
                [
                    "基因",
                    "染色体",
                    "转录本",
                    "碱基变化",
                    "氨基酸变化",
                    "频率(%)",
                    "外显子",
                ],
            ],
        },
        {
            name: "拷贝数分析结果",
            key: "drug_anna/gene/cnv",
            id: "07102",
            enabled: true,
            lines: [
                [
                    "基因",
                    "染色体",
                    "拷贝数变异起始位置",
                    "拷贝数变异终止位置",
                    "变异系数",
                    "变异类型",
                ],
            ],
        },
        {
            name: "基因重排析结果",
            key: "drug_anna/gene/fusion",
            id: "07103",
            enabled: true,
            lines: [["基因", "融合基因转录本及断点位置", "外显子/内含子"]],
            note: "1.根据人类基因组变异学会（HGVS) 已建立系统的基因变异命名：“c.”表示 cDNA 序列，”p.”表示蛋白序列。\n2.基因变异描述示例：EGFR c.2573T>G（p.L858R）描述为“EGFR 基因上第 2573 位核苷酸由 T 突变为 G, 导致相应蛋白序列中第 858 位氨基酸由亮氨酸 (L) 突变为精氨酸 (R)”。\n3.频率（变异丰度）：肿瘤样本检测的数据中，支持该基因位点变异的分子数占该位点总分子数的比例。变异丰度可能因测序深度和肿瘤取样部位的不同存在差异。",
        },
        {
            name: "靶向药物临床用药解析",
            key: "drug_anna/clinical",
            enabled: true,
            id: "07201",
            lines: [
                [
                    "基因",
                    "突变形式(突变频率)",
                    "变异解析",
                    "基因说明",
                    "用药说明",
                ],
            ],
        },
        {
            name: "获益药物循证医学证据",
            key: "drug_anna/clinical/evidence",
            id: "07202",
            enabled: true,
            lines: [["靶向药物", "癌种", "循证医学证据"]],
        },
        {
            name: "临床试验信息",
            key: "drug_anna/clinical/trial",
            id: "07203",
            enabled: true,
            lines: [
                [
                    "临床试验ID",
                    "癌种",
                    "临床试验药物",
                    "临床试验阶段",
                    "临床试验地点",
                ],
            ],
        },
        {
            name: "免疫治疗相关指标检测结果解析",
            key: "immu_anna",
            enabled: true,
        },
        {
            name: "TMB检测结果解析",
            key: "immu_anna/tmb",
            id: "08101",
            enabled: true,
            lines: [["检测内容", "检测结果", "结果解析"]],
            note: "肿瘤突变负荷 (TMB) 一般指特定基因组区域内每兆碱基对（Mb）体细胞非同义突变的个数。部分研究显示较高的 TMB 可能与免疫治疗获益相关。不同的肿瘤设定的阈值可能不同，且目前尚无明确的肿瘤相关阈值。因此本次检测提供 TMB 值仅供临床参考。",
        },
        {
            name: "MSI检测结果解析",
            key: "immu_anna/msi",
            id: "08201",
            enabled: true,
            lines: [["检测内容", "检测结果", "结果解析"]],
            note: "微卫星不稳定性 (MSI) 是由于 DNA 复制时插入或缺失变异而导致 MS 序列长度改变的现象，主要由 DNA 错配修复 (mismatch repair，MMR) 功能缺陷引起。肿瘤的微卫星不稳定越高，越可能产生大量的体细胞突变，导致靶向抗癌药物的基因其上下游通路基因可能都存在突变，使得靶向药物可能对肿瘤无效。另一方面，大量的体细胞突变会产生大量的新生抗原，从而被免疫系统识别，因此可能对免疫检查点抑制剂 PD-1/PD-L1 单克隆抗体或者 CTLA-4 单克隆抗体敏感。按照稳定性从高到低，可以分为 MSI-H(不稳定性高)，MSI-L(不稳定性低) 和 MSS(稳定) 三个水平。",
        },
        {
            name: "免疫药物疗效预测相关基因检测结果解析",
            key: "immu_anna/gene",
            enabled: true,
        },
        {
            name: "免疫疗效正相关基因",
            key: "immu_anna/gene/pos",
            id: "08311",
            enabled: true,
            lines: [["基因", "检测结果", "结果解析"]],
        },
        {
            name: "免疫疗效负相关基因",
            key: "immu_anna/gene/neg",
            id: "08321",
            enabled: true,
            lines: [["基因", "检测结果", "结果解析"]],
            note: "本部分列出的是既往研究支持的可能与免疫治疗疗效有关的变异基因，但样本检测到的变异可能与文献报道的基因变异不完全一致，部分基因变异的致病性和临床意义未明或缺乏功能验证，该部分结果仅供临床医生参考。",
        },
        {
            name: "免疫检查点抑制剂治疗预后影响因素HLA",
            key: "immu_anna/gene/hla",
            id: "08331",
            enabled: true,
            lines: [["HLA-A", "HLA-B", "HLA-C", "DQBI", "DPBI", "DRBI"]],
            note: "HLA 等位基因命名规则：以 A*02:06:01 为例，各部分释义如下：A①*02②:06③:01④\n① 基因座名称\n② 等位基因群编号，代表不同的血清学类型\n③ 等位基因群下的具体等位基因型，代表特定类型的蛋白\n④ 等位基因型中发生在编码区的同义突变\n",
        },
        {
            name: "化疗药物疗效相关位点检测解析",
            key: "chemo_anna",
            id: "09001",
            enabled: true,
            lines: [
                [
                    "药物",
                    "基因",
                    "检测位点",
                    "检测结果",
                    "证据等级",
                    "适用癌种",
                    "化疗药物解析",
                ],
            ],
            note: "1. Level 1A：由临床遗传药理学联盟或遗传药理学指南确认, 或在遗传药理学研究网络及其它主要卫生系统中已有应用。\n2. Level 1B：大量证据支持与多药联合有相关性, 且此相关性在不止一项队列研究中具有显著性差异和较强效应量。\n3. Level 2A：符合 2B 等级的定义, 且只包含已知的重要药物基因, 更有可能具有功能性意义。\n4. Level 2B：多项重复性研究中有中等程度证据支持与多药联合具有相关性, 但其中一些研究统计学无显著性或效应量较小。\n5. Level 3：在 PharmGKB 数据库中只有 1 项有显著差异的研究或有几项研究但结果未能得到重复。\n",
        },
        {
            name: "PD-1/PD-L1药物",
            key: "pd",
            id: "10001",
            enabled: true,
            lines: [
                ["药物名称", "FDA/NMPA批准上市时间", "药物靶点", "适用癌种"],
            ],
            note: "该表格中呈现的药物已经获得 FDA/NMPA 批准 (截止 2020 年)，且药物的适用性不依赖基因突变检测结果，请根据患者情况酌情用药。",
        },
        {
            name: "遗传变异解析",
            key: "hrdt_anna",
            id: "11001",
            enabled: true,
            lines: [
                [
                    "基因",
                    "RS号",
                    "核苷酸变异",
                    "氨基酸变异",
                    "纯/杂合",
                    "突变类型",
                    "临床意义",
                    "遗传变异解析",
                ],
            ],
            note: "1. 本报告对遗传性肿瘤相关基因进行筛选及评估，相关变异位点的临床意义判断依据 ACMG 2015 变异解读指南可分为良性，可能良性，意义未明，可能致病和致病。本报告只呈现与遗传性肿瘤发生发展相关的致病或可能致病变异，由于肿瘤发生受遗传因素、生活习惯、环境等因素的影响，因此若筛选出致病或可能致病变异，请不要惊慌，致病或可能致病变异意味着您将来患癌（变异关联的癌种）的可能性相比普通人群高一些，但并不能说明您将来一定患癌，建议您和您的家人及早在医生的指导下进行遗传风险筛查及评估。\n2. 纯合：指同一位点上的两个等位基因有相同的基因型。\n3. 杂合：指同一位点上的两个等位基因有不相同的基因型。\n4. 无义突变：指由于某个碱基的改变使代表某种氨基酸的密码子突变为终止密码子，从而使肽链合成提前终止。\n5. 错义突变：指编码某种氨基酸的密码子经碱基替换以后，变成编码另一种氨基酸的密码子，从而使多肽链的氨基酸种类和序列发生改变。\n6. 移码突变：指在正常的 DNA 分子中，一对或少数几对邻接的核苷酸的增加或减少，造成这一位置之后的一系列编码发生移位错误的改变。",
        },

        {
            name: "变异结果汇总",
            key: "gene_result",
            enabled: true,
        },
        {
            name: "基因点突变、缺失、插入分析结果",
            key: "gene_result/somatic",
            id: "12001",
            enabled: true,
            lines: [
                [
                    "基因",
                    "突变信息",
                    "突变类型",
                    "核苷酸变化",
                    "氨基酸变化",
                    "频率(%)",
                    "染色体",
                    "外显子",
                    "转录本号",
                ],
            ],
        },
        {
            name: "基因重排分析结果",
            key: "gene_result/fusion",
            id: "12002",
            enabled: true,
            lines: [
                [
                    "基因",
                    "融合基因转录本及断点位置",
                    "外显子/内含子",
                    "Reads数量",
                ],
            ],
        },
        {
            name: "拷贝数分析结果",
            key: "gene_result/cnv",
            id: "12003",
            enabled: true,
            lines: [
                [
                    "基因",
                    "染色体",
                    "拷贝数变异起始位置",
                    "拷贝数变异终止位置",
                    "变异系数",
                    "变异类型",
                ],
            ],
        },
        {
            name: "参考文献",
            key: "ref",
            id: "13001",
            enabled: true,
            lines: [],
            note: "",
        },
        {
            name: "附录",
            key: "appendix",
            enabled: true,
        },
        {
            name: "基因注释",
            key: "appendix/gene_annot",
            id: "14101",
            enabled: true,
            lines: [["基因名称", "基因注释"]],
        },
        {
            name: "肿瘤基因检测列表",
            key: "appendix/gene_tumor",
            enabled: true,
        },
        {
            name: "检测基因总表",
            key: "appendix/gene_tumor/all",
            id: "14201",
            enabled: true,
            lines: [["基因名称"]],
        },
        {
            name: "化疗用药相关基因",
            key: "appendix/gene_tumor/chemo",
            id: "14202",
            enabled: true,
            lines: [["基因名称"]],
        },
        {
            name: "遗传易感相关基因",
            key: "appendix/gene_tumor/hrdt",
            id: "14203",
            enabled: true,
            lines: [["基因名称"]],
        },
        {
            name: "样本质控信息",
            key: "appendix/sample_qc",
            id: "14301",
            enabled: true,
            lines: [
                [
                    "样本",
                    "肿瘤细胞含量(%)",
                    "DNA浓度(%)",
                    "DNA总量(ng)",
                    "平均测序深度",
                    "质控",
                ],
            ],
            note: "1. 肿瘤细胞含量检测结果仅对送检样本负责，仅供参考，实际推荐以就诊医院病理科/ 检验科检测结果为准;\n2. DNA 样本浓度测定方式为荧光定量（Qubit3.0）;\n3. DNA 总量（ng）= DNA 浓度（ng/ul）x 提取的 DNA 体积（ul）;\n4. 平均测序深度：指目标区域碱基检测到的平均次数;\n5. 质控结果分为“合格”、“警戒”和“不合格”三个等级，质控结果为“警戒”可能会对检测结果的准确性和敏感性造成影响，质控结果为“不合格”可能因样本本身质量问题无法进行后续检测。\n",
        },
        {
            name: "基因检测报告说明",
            key: "intro",
            id: "15001",
            enabled: true,
            lines: [
                ,
                [
                    "1. 本报告仅对送检样本的此次检测结果负责，本报告属于个人隐私，本公司将严格保护被检者个人信息与检测结果不被泄露，因受检者个人原因出现的信息外泄，本公司不承担相应责任。",
                ],
                [
                    "2. 本检测方法适用于检测肿瘤相关基因的 DNA 和 RNA 水平的变异，检测突变形式为单核苷酸变异 (SNV) 、小片段插入缺失 (Indel)、剪切位点变异 (Splicing)、拷贝数变异 (CNV) 以及融合 (Fusion)。",
                ],
                [
                    "3. 基于肿瘤样本异质性特点，检测到的变异可能无法完全反映驱动肿瘤发生的突变谱信息，甚至检测不出明确用药相关的驱动突变，因此并非所有受检者都可以找到相应的靶向/免疫治疗药物。",
                ],
                [
                    "4. 对受检者送检样品进行有限数量的位点检测不能揭示受检者可能存在的基因突变/基因多态性。基因突变/基因多态性/蛋白表达可能由于检测技术的局限性、样本采集或运输意外以及其他无法预知的因素等而未被发现。",
                ],
                [
                    "5. 本检测结果仅对本次送检样本负责，本检测系基于当前的科学认知水平，本报告仅供受检者参考，具体诊疗请遵医嘱。若因受检者使用不当带来的心理、生理、经济等负担，医院及检测机构不承担责任和风险。",
                ],
                [
                    "6. 受检者的遗传易感风险是基于遗传基因分析和个人家族癌症遗传史的综合结果，然而遗传性因素只是患癌风险因素的一部分，生活环境、习惯等也是影响患癌风险的重要因素。",
                ],
                [
                    "7. 本检测仅为临床诊断及治疗决策提供参考和辅助，不作为临床诊断及治疗的依据，若有疑义，请于报告发送后的 10 个工作日内与我们联系。部分基因与药物对应关系，目前仅限于科学研究或临床实验阶段，尚未进入临床指南，需临床医生酌情参考。",
                ],
            ],
        },
    ];
};
const defaultModules = m();

const defaultModulesOld = [
    {
        name: "受检者基本信息",
        key: "sample",
        enabled: true,
    },
    {
        name: "检测结果总览",
        key: "result",
        enabled: true,
    },
    {
        name: "NCCN指南建议检测基因列表",
        key: "nccn",
        enabled: true,
    },
    {
        name: "用药及预后综合提示",
        key: "drug",
        enabled: true,
        modules: [
            {
                name: "靶向用药检测结果",
                key: "target_med",
                enabled: true,
            },
            {
                name: "免疫治疗相关检测结果",
                key: "immu",
                enabled: true,
                modules: [
                    {
                        name: "肿瘤突变负荷（TMB)检测结果",
                        key: "tmb_result",
                        enabled: true,
                    },
                    {
                        name: "微卫星不稳定性（MSI)检测结果",
                        key: "msi_result",
                        enabled: true,
                    },
                    {
                        name: "免疫疗效相关基因检测结果",
                        key: "immu_gene_result",
                        enabled: true,
                    },
                    {
                        name: "HLA分型检测结果",
                        key: "hla_result",
                        enabled: true,
                    },
                ],
            },
        ],
    },
    {
        name: "化疗药物疗效相关位点检测结果",
        key: "chemo",
        enabled: true,
    },
    {
        name: "遗传性肿瘤相关致病基因检测结果",
        key: "genetic_result",
        enabled: true,
    },
    {
        name: "靶向用药解析",
        key: "target_drug",
        enabled: true,
        modules: [
            {
                name: "靶药相关基因变异结果汇总",
                key: "target_drug_gene",
                enabled: true,
            },
            {
                name: "靶向药物临床用药解析",
                key: "target_drug_clinical",
                enabled: true,
            },
        ],
    },
    {
        name: "免疫治疗相关指标检测结果解析",
        key: "immu_index",
        enabled: true,
        modules: [
            {
                name: "TMB 检测结果解析",
                key: "tmb_anna",
                enabled: true,
            },
            {
                name: "MSI 检测结果解析",
                key: "msi_anna",
                enabled: true,
            },
            {
                name: "免疫药物疗效预测相关基因检测结果解析",
                key: "immu_gene_anna",
                enabled: true,
                modules: [
                    {
                        name: "免疫疗效正相关基因",
                        key: "immu_gene_pos",
                        enabled: true,
                    },
                    {
                        name: "免疫疗效负相关基因",
                        key: "immu_gene_neg",
                        enabled: true,
                    },
                    {
                        name: "免疫检查点抑制剂治疗预后影响因素 HLA-I",
                        key: "immu_inh",
                        enabled: true,
                    },
                ],
            },
        ],
    },
    {
        name: "化疗药物疗效相关位点检测解析",
        key: "chemo_drug",
        enabled: true,
    },
    {
        name: "PD-1/PD-L1药物",
        key: "pd_drug",
        enabled: true,
    },
    {
        name: "遗传变异解析",
        key: "genetic_anna",
        enabled: true,
    },
    {
        name: "变异结果汇总",
        key: "var",
        enabled: true,
    },
    {
        name: "参考文献",
        key: "ref",
        enabled: true,
    },
    {
        name: "附录",
        key: "app",
        enabled: true,
        modules: [
            {
                name: "基因注释",
                key: "gene_anno",
                enabled: true,
            },
            {
                name: "肿瘤基因检测列表",
                key: "gene_list",
                enabled: true,
            },
            {
                name: "样本质控信息",
                key: "qc",
                enabled: true,
            },
        ],
    },
    {
        name: "基因检测报告说明",
        key: "intro",
        enabled: true,
    },
];

const ImportDefaultModuleDialog = ({ onClose, open, setOpen, parseModule }) => {
    const handleListItemClick = () => {
        setOpen(false);
        parseModule(JSON.stringify(defaultModules));
    };
    return (
        <Dialog open={open}>
            <DialogTitle>No module configured</DialogTitle>
            <List sx={{ pt: 0 }} style={{ minWidth: 500 }}>
                <ListItem button onClick={() => handleListItemClick(true)}>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                            <AccountTreeIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="import default modules" />
                </ListItem>
                <ListItem button onClick={() => setOpen(false)}>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                            <CloseIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="close" />
                </ListItem>
            </List>
        </Dialog>
    );
};

const PageTemplate = () => {
    const classes = useStyles();
    const [modules, setModules] = React.useState([]);
    const [isOpenDataFormDialog, setOpenDataFormDialog] = React.useState(false);
    const [isOpenTemplateEditDialog, setOpenTemplateEditDialog] =
        React.useState(false);
    const [isOpenImportDefaultModuleDialog, setOpenImportDefaultModuleDialog] =
        React.useState(false);
    const [isImportDefaultModule, setImportDefaultModule] =
        React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState({});

    const handleAddClick = (event) => {
        setOpenDataFormDialog(true);
    };
    const handleEditClick = (item) => {
        setSelectedItem(item);
        setOpenDataFormDialog(true);
    };
    const [rm, rmLoading, rmError] = useMutation(
        mutation.REPORT_TEMPLATES_DELETE,
        {
            refetchQueries: [{ query: query.REPORT_TEMPLATES_GET }],
            onCompleted: (data) => {
                //console.log("done", data);
            },
            onError: ({ graphQLErrors, networkError, operation, forward }) => {
                if (graphQLErrors) {
                    for (let err of graphQLErrors) {
                        console.log("gqlerror", err.message);
                    }
                }
                if (networkError) {
                    console.log(`[Network error]: ${networkError}`);
                }
            },
        }
    );

    const [updateModule, updateModuleLoading, updateModuleError] = useMutation(
        mutation.REPORT_TEMPLATE_MODULE_UPDATE,
        {
            refetchQueries: [{ query: query.REPORT_TEMPLATES_GET }],
            onCompleted: (data) => {
                //console.log("done", data);
            },
            onError: ({ graphQLErrors, networkError, operation, forward }) => {
                if (graphQLErrors) {
                    for (let err of graphQLErrors) {
                        console.log("gqlerror", err.message);
                    }
                }
                if (networkError) {
                    console.log(`[Network error]: ${networkError}`);
                }
            },
        }
    );

    const handleDeleteClick = (item) => {
        rm({ variables: { ids: [item.id] } }).then((v) => {
            if (v.errors) {
                console.error(v.errors);
            } else {
                //console.log("deleted", item.id);
            }
        });
    };

    const { loading, error, data } = useQuery(query.REPORT_TEMPLATES_GET, {
        //options: { fetchPolicy: "cache-and-network" },
        onError: ({ graphQLErrors, networkError, operation, forward }) => {
            if (graphQLErrors) {
                for (let err of graphQLErrors) {
                    console.log("gqlerror", err.message);
                }
            }
            if (networkError) {
                console.log(`[Network error]: ${networkError}`);
            }
        },
    });
    if (loading) return <p>loading...</p>;
    if (error) {
        console.log(error);
        return <p>error: {String(error)}</p>;
    }
    const templates = data["reporttemplates"];

    const handleModuleEdit = (item) => {
        //console.log(JSON.stringify(defaultModules));
        setSelectedItem(item);
        if (!item.module) {
            setOpenImportDefaultModuleDialog(true);
        } else {
            parseModule(item.module);
        }
    };

    const parseModule = (module) => {
        let dialog = true;
        if (module) {
            try {
                setModules(JSON.parse(module));
            } catch (e) {
                alert(e);
                dialog = false;
            }
        }
        setOpenTemplateEditDialog(dialog);
    };
    const handleModuleUpdate = () => {
        //console.log("u", selectedItem.id, modules);
        updateModule({
            variables: { id: selectedItem.id, module: JSON.stringify(modules) },
        }).then((v) => {
            if (v.errors) {
                console.error(v.errors);
            } else {
                //console.log("updatem", v);
            }
        });
    };

    return (
        <Box>
            <ImportDefaultModuleDialog
                open={isOpenImportDefaultModuleDialog}
                setOpen={setOpenImportDefaultModuleDialog}
                parseModule={parseModule}
            />
            <TemplateEditDialog
                isOpen={isOpenTemplateEditDialog}
                setOpen={setOpenTemplateEditDialog}
                modules={modules}
                setModules={setModules}
                onModuleChanged={handleModuleUpdate}
                setSelectedItem={setSelectedItem}
            />
            <DataFormDialog
                isOpen={isOpenDataFormDialog}
                setOpen={setOpenDataFormDialog}
                mutation={{
                    new: mutation.REPORT_TEMPLATE_NEW,
                    update: mutation.REPORT_TEMPLATE_UPDATE,
                }}
                query={query.REPORT_TEMPLATES_GET}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                formComponents={formComponents}
            />
            <Typography variant="h6">Template Management</Typography>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                rowSpacing={{ xs: 1, sm: 2, md: 3 }}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                {templates.map((template, index) => (
                    <Grid item key={index}>
                        <ImageListItem sx={{ width: 200 }}>
                            <img
                                src={
                                    template.image_cover_front
                                        ? `http://${window.location.hostname}:5200/` +
                                          template.image_cover_front.path +
                                          "?name=" +
                                          template.image_cover_front.filename
                                        : reportsample
                                }
                                alt={template.title}
                                loading="lazy"
                                onClick={() => handleModuleEdit(template)}
                            />
                            <ImageListItemBar
                                position="top"
                                style={{ background: "rgba(0, 0, 0, 0)" }}
                                actionIcon={
                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            handleDeleteClick(template)
                                        }
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                }
                            />
                            <ImageListItemBar
                                title={template.name}
                                position="bottom"
                                actionIcon={
                                    <div>
                                        <IconButton
                                            sx={{
                                                color: "rgba(255, 255, 255, 0.54)",
                                            }}
                                            onClick={() =>
                                                handleEditClick(template)
                                            }
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </div>
                                }
                            />
                        </ImageListItem>
                    </Grid>
                ))}
            </Grid>
            <IconButton onClick={(event) => handleAddClick(event)}>
                <AddCircleIcon />
            </IconButton>
        </Box>
    );
};

export default PageTemplate;

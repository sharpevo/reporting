import React, { useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";

import AccordionActions from "@material-ui/core/AccordionActions";
import { GET_TABLES, GET_GENES } from "../gql/query";
import { DELETE_TABLE } from "../gql/mutation";
import InnerTable from "../components/InnerTable";
import { format } from "date-fns";

const databases = {
    "分类/注释": [
        {
            name: "基因注释数据库",
            key: "gene_annot",
        },
        {
            name: "基因分类",
            key: "gene",
        },
    ],
    免疫治疗相关: [
        {
            name: "免疫疗效相关/DDR通路",
            key: "ddr",
        },
        {
            name: "TMB/MSI/HLA/数据库",
            key: "tmh",
        },
    ],
    位点变异靶向用药: [
        {
            name: "位点用药解析数据库",
            key: "mutation_cancer",
        },
        {
            name: "获益靶向药物数据库",
            key: "mutation_drug_benefit",
        },
        {
            name: "耐药靶向药物数据库",
            key: "mutation_drug_resistance",
        },
        {
            name: "其他癌种获益靶向药物数据库",
            key: "mutation_drug_benefit_other",
        },
        {
            name: "临床试验药物靶向药物",
            key: "mutation_clinical",
        },
        {
            name: "临床试验数据库",
            key: "clinical",
        },
    ],
    抗肿瘤药物: [
        {
            name: "抗肿瘤药物数据库",
            key: "drug",
        },
        {
            name: "抗肿瘤药物匹配癌种",
            key: "drug_cancer",
        },
    ],
    其他: [
        {
            name: "遗传变异数据库",
            key: "",
        },
        {
            name: "化疗数据库",
            key: "chemo",
        },
        {
            name: "NCCN建议检测基因列表2020版",
            key: "nccn_gene",
        },
        {
            name: "备注",
            key: "report_remark",
        },
        {
            name: "文献汇总",
            key: "report_literature",
        },
        {
            name: "常见癌种名称表",
            key: "cancer",
        },
        {
            name: "通路数据库",
            key: "pathway",
        },
        {
            name: "通路药物数据库",
            key: "pathway_drug_cancer",
        },
    ],
    系统: [
        {
            name: "基因分类 - 分类",
            key: "geneclass",
        },
        {
            name: "免疫疗效相关/DDR通路 - 基因分类",
            key: "ddrclass",
        },
        {
            name: "免疫疗效相关/DDR通路 - 通路分类",
            key: "ddrpathwayclass",
        },
        {
            name: "位点用药解析数据库 - 变异分类",
            key: "mutationclass",
        },
        {
            name: "化疗数据库 - 功能分类",
            key: "drugclass",
        },
        {
            name: "证据等级",
            key: "evidencelevel",
        },
        {
            name: "样本 - 样本类型",
            key: "report_sample_type",
        },
        {
            name: "样本 - 检测项目",
            key: "inspection_project",
        },
        {
            name: "文件",
            key: "report_file",
        },
    ],
};

const PageTable = () => {
    const [expandedKey, setExpandedKey] = React.useState("");
    useEffect(() => {
        document.title = "Database";
    });
    const handleChange = (key) => (event, isExpanded) => {
        setExpandedKey(isExpanded ? key : "");
    };
    return (
        <React.Fragment>
            {Object.keys(databases).map((groupName, index) => (
                <div key={index}>
                    <br />
                    <Typography variant="body2" gutterBottom>
                        {groupName}
                    </Typography>
                    <div>
                        {databases[groupName].map((database, index) => (
                            <Accordion
                                TransitionProps={{
                                    unmountOnExit: true,
                                    timeout: 0,
                                }}
                                key={index}
                                disabled={
                                    !database.hasOwnProperty("key") ||
                                    database.key == ""
                                }
                                expanded={
                                    database.key != "" &&
                                    expandedKey === database.key
                                }
                                onChange={handleChange(database.key)}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{database.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <InnerTable databaseKey={database.key} />
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </div>
            ))}
        </React.Fragment>
    );
};

export default PageTable;

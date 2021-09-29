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

const defaultModules = [
    {
        name: "1. 受检者基本信息",
        key: "sample",
        enabled: true,
    },
    {
        name: "2. 检测结果总览",
        key: "result",
        enabled: true,
    },
    {
        name: "3. NCCN指南建议检测基因列表",
        key: "nccn",
        enabled: true,
    },
    {
        name: "4. 用药及预后综合提示",
        key: "drug",
        enabled: true,
        modules: [
            {
                name: "4.1 靶向用药检测结果",
                key: "target_med",
                enabled: true,
            },
            {
                name: "4.2 免疫治疗相关检测结果",
                key: "immu",
                enabled: true,
                modules: [
                    {
                        name: "4.2.1 肿瘤突变负荷（TMB)检测结果",
                        key: "tmb_result",
                        enabled: true,
                    },
                    {
                        name: "4.2.2 微卫星不稳定性（MSI)检测结果",
                        key: "msi_result",
                        enabled: true,
                    },
                    {
                        name: "4.2.3 免疫疗效相关基因检测结果",
                        key: "immu_gene_result",
                        enabled: true,
                    },
                    {
                        name: "4.2.4 HLA分型检测结果",
                        key: "hla_result",
                        enabled: true,
                    },
                ],
            },
        ],
    },
    {
        name: "5 化疗药物疗效相关位点检测结果",
        key: "chemo",
        enabled: true,
    },
    {
        name: "6 遗传性肿瘤相关致病基因检测结果",
        key: "genetic_result",
        enabled: true,
    },
    {
        name: "7 靶向用药解析",
        key: "target_drug",
        enabled: true,
        modules: [
            {
                name: "7.1 靶药相关基因变异结果汇总",
                key: "target_drug_gene",
                enabled: true,
            },
            {
                name: "7.2 靶向药物临床用药解析",
                key: "target_drug_clinical",
                enabled: true,
            },
        ],
    },
    {
        name: "8 免疫治疗相关指标检测结果解析",
        key: "immu_index",
        enabled: true,
        modules: [
            {
                name: "8.1.TMB 检测结果解析",
                key: "tmb_anna",
                enabled: true,
            },
            {
                name: "8.2 MSI 检测结果解析",
                key: "msi_anna",
                enabled: true,
            },
            {
                name: "8.3 免疫药物疗效预测相关基因检测结果解析",
                key: "immu_gene_anna",
                enabled: true,
                modules: [
                    {
                        name: "8.3.1 免疫疗效正相关基因",
                        key: "immu_gene_pos",
                        enabled: true,
                    },
                    {
                        name: "8.3.2 免疫疗效负相关基因",
                        key: "immu_gene_neg",
                        enabled: true,
                    },
                    {
                        name: "8.3.3 免疫检查点抑制剂治疗预后影响因素 HLA-I",
                        key: "immu_inh",
                        enabled: true,
                    },
                ],
            },
        ],
    },
    {
        name: "9 化疗药物疗效相关位点检测解析",
        key: "chemo_drug",
        enabled: true,
    },
    {
        name: "10 PD-1/PD-L1药物",
        key: "pd_drug",
        enabled: true,
    },
    {
        name: "11 遗传变异解析",
        key: "genetic_anna",
        enabled: true,
    },
    {
        name: "12 变异结果汇总",
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
                name: "1 基因注释",
                key: "gene_anno",
                enabled: true,
            },
            {
                name: "2 肿瘤基因检测列表",
                key: "gene_list",
                enabled: true,
            },
            {
                name: "3 样本质控信息",
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
    const [
        isOpenTemplateEditDialog,
        setOpenTemplateEditDialog,
    ] = React.useState(false);
    const [
        isOpenImportDefaultModuleDialog,
        setOpenImportDefaultModuleDialog,
    ] = React.useState(false);
    const [isImportDefaultModule, setImportDefaultModule] = React.useState(
        false
    );
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
                                src={reportsample}
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
                                                color:
                                                    "rgba(255, 255, 255, 0.54)",
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

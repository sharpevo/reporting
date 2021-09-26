import * as React from "react";
import {
    Box,
    Stepper,
    Step,
    Grid,
    Card,
    CardContent,
    StepLabel,
    Table,
    TableContainer,
    TableBody,
    TableCell,
    FormControlLabel,
    TableHead,
    TableRow,
    StepContent,
    Button,
    Paper,
    Typography,
} from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { makeStyles } from "@mui/styles";
import InnerTable from "../components/InnerTable";
import { format, parseISO } from "date-fns";
const formatDate = (text) => {
    if (!text) {
        return "";
    } else {
        return format(parseISO(text), "MM-dd");
    }
};
import * as query from "../gql/query";
import * as mutation from "../gql/mutation";

const contents = [
    {
        label: "姓名",
        value: (sample) => sample.name,
    },
    {
        label: "性别",
        value: (sample) => sample.gender,
    },
    {
        label: "年龄",
        value: (sample) => sample.age,
    },
    {
        label: "样本编号",
        value: (sample) => sample.sample_number,
    },
    {
        label: "样本类型",
        value: (sample) => (sample.sample_type ? sample.sample_type.label : ""),
    },
    {
        label: "检测项目",
        value: (sample) =>
            sample.inspection_project ? sample.inspection_project.label : "",
    },
    {
        label: "采集日期",
        value: (sample) => formatDate(sample.date_sampled),
    },
    {
        label: "接收日期",
        value: (sample) => formatDate(sample.date_received),
    },
    {
        label: "送检单位",
        value: (sample) => sample.unit_submitted,
    },
    {
        label: "检测方法",
        value: (sample) => sample.inspection_method,
    },
    {
        label: "检测平台",
        value: (sample) => sample.inspection_platform,
    },
    {
        label: "参考基因组",
        value: (sample) => sample.reference_genome,
    },
    {
        label: "临床诊断结果",
        value: (sample) => sample.history_family,
    },
    {
        label: "报告显示癌种",
        value: (sample) => sample.cancer_from_report,
    },
    {
        label: "数据匹配癌种",
        value: (sample) =>
            sample.cancer_from_data ? sample.cancer_from_data.label : "",
    },
    {
        label: "家族史",
        value: (sample) => sample.history_family,
    },
    {
        label: "用药史",
        value: (sample) => sample.history_drug,
    },
    {
        label: "报告日期",
        value: (sample) => formatDate(sample.date_reported),
    },
];

const useStyles = makeStyles({
    container: {
        maxWidth: 800,
    },
});

const PageSample = () => {
    const classes = useStyles();
    const [sample, setSample] = React.useState({});
    const [activeStep, setActiveStep] = React.useState(0);
    //const [sampleFileMain, setSampleFileMain] = React.useState("");
    const [sampleFileMatched, setSampleFileMatched] = React.useState("");

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const [upload, uploadLoading, uploadError] = useMutation(
        mutation.REPORT_FILE_NEW,
        {
            onCompleted: (data) => {
                //console.log("done", data)
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

    const [updateFile, updateFileLoading, uploadFileError] = useMutation(
        mutation.REPORT_SAMPLE_FILE_UPDATE,
        {
            onCompleted: (data) => {
                //console.log("done", data)
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

    const handleReportFileChange = (event) => {
        upload({ variables: { file: event.target.files[0] } }).then((v) => {
            if (v.errors) {
                let message = String(v.errors);
                if (v.errors.networkError) {
                    v.errors.networkError.result.errors.map((err) => {
                        message = message.concat(err.message);
                    });
                }
                console.log("error", message);
            } else {
                updateFile({
                    variables: {
                        id: sample.id,
                        key: event.target.name,
                        fid: v.data.newReportFile.id,
                    },
                }).then((v) => {
                    if (v.errors) {
                        let message = String(v.errors);
                        if (v.errors.networkError) {
                            v.errors.networkError.result.errors.map((err) => {
                                message = message.concat(err.message);
                            });
                        }
                        console.log("error", message);
                    } else {
                        console.log(v.data);
                        //switch (event.target.name) {
                        //case "file_main":
                        //setSampleFileMain(
                        //v.data.updateReportSampleFile.file_main
                        //.label
                        //);
                        //break;
                        //case "file_matched":
                        //setSampleFileMatched(
                        //v.data.updateReportSampleFile.file_matched
                        //.label
                        //);
                        //break;
                        //}
                        console.log("updated");
                    }
                    //setItem({
                    //...item,
                    //[event.target.name]: v.data.newReportFile.path,
                    //});
                });
            }
        });
    };

    return (
        <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
                <Step>
                    <StepLabel>Select or Create sample</StepLabel>
                    <StepContent>
                        <Paper className={classes.container}>
                            <InnerTable
                                databaseKey="report_sample"
                                setItem={setSample}
                            />
                        </Paper>
                        <Box sx={{ mb: 2 }}>
                            <div>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Continue
                                </Button>
                            </div>
                        </Box>
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>Create or Edit QC</StepLabel>
                    <StepContent>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                        >
                            Sample
                        </Typography>
                        {sample.id ? (
                            <Card className={classes.container}>
                                <CardContent>
                                    <Grid
                                        container
                                        spacing={2}
                                        justifyContent="center"
                                        alignment="center"
                                    >
                                        {contents.map((content, index) => (
                                            <Grid
                                                item
                                                key={index}
                                                xs={4}
                                                style={{ fontSize: "10px" }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                >
                                                    {content.label}
                                                </Typography>
                                                <br />
                                                <Typography variant="caption">
                                                    {content.value(sample)}
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        ) : (
                            <span>N/A</span>
                        )}
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2, mt: 2 }}
                        >
                            QC
                        </Typography>
                        {sample.id ? (
                            <Paper className={classes.container}>
                                <InnerTable
                                    databaseKey="report_sample_qc"
                                    queryVariableValue={sample.id}
                                    defaultValues={[
                                        { key: "sample", value: sample.label },
                                    ]}
                                />
                            </Paper>
                        ) : (
                            <span>N/A</span>
                        )}
                        <Box sx={{ mb: 2 }}>
                            <div>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Continue
                                </Button>
                                <Button
                                    size="small"
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                            </div>
                        </Box>
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>Upload VCF</StepLabel>
                    <StepContent>
                        {sample.id ? (
                            <div>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    主样本(建议:肿瘤活检)
                                </Typography>
                                <FormControlLabel
                                    sx={{ mb: 4 }}
                                    control={
                                        <Button
                                            variant="outlined"
                                            component="span"
                                            size="small"
                                            sx={{ mr: 2 }}
                                        >
                                            {sample.file_main ? "更新" : "上传"}
                                            <input
                                                name="file_main"
                                                type="file"
                                                onChange={
                                                    handleReportFileChange
                                                }
                                                hidden
                                            />
                                        </Button>
                                    }
                                    label={
                                        sample.file_main
                                            ? sample.file_main.label
                                            : ""
                                    }
                                />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    匹配样本(建议:血样)
                                </Typography>
                                <FormControlLabel
                                    sx={{ mb: 4 }}
                                    control={
                                        <Button
                                            variant="outlined"
                                            component="span"
                                            size="small"
                                            sx={{ mr: 2 }}
                                        >
                                            {sample.file_matched
                                                ? "更新"
                                                : "上传"}
                                            <input
                                                name="file_matched"
                                                type="file"
                                                onChange={
                                                    handleReportFileChange
                                                }
                                                hidden
                                            />
                                        </Button>
                                    }
                                    label={
                                        sample.file_matched
                                            ? sample.file_matched.label
                                            : ""
                                    }
                                />
                            </div>
                        ) : (
                            <span>N/A</span>
                        )}
                        <Box sx={{ mb: 2 }}>
                            <div>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={handleReset}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Finish
                                </Button>
                                <Button
                                    size="small"
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                            </div>
                        </Box>
                    </StepContent>
                </Step>
            </Stepper>
            {activeStep === -1 && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed</Typography>
                    <Box sx={{ mb: 2 }}>
                        <div>
                            <Button
                                size="small"
                                variant="contained"
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Submit
                            </Button>
                            <Button
                                size="small"
                                onClick={handleReset}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Reset
                            </Button>
                        </div>
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default PageSample;

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
    TableHead,
    TableRow,
    StepContent,
    Button,
    Paper,
    Typography,
} from "@mui/material";
import InnerTable from "../components/InnerTable";
import { format, parseISO } from "date-fns";
const formatDate = (text) => {
    if (!text) {
        return "";
    } else {
        return format(parseISO(text), "MM-dd");
    }
};

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

const PageSample = () => {
    const [sample, setSample] = React.useState({});
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
                <Step>
                    <StepLabel>Select or Create sample</StepLabel>
                    <StepContent>
                        <InnerTable
                            databaseKey="report_sample"
                            setItem={setSample}
                        />
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
                        <Card sx={{ maxWidth: 800 }}>
                            <CardContent>
                                {sample ? (
                                    <Grid
                                        container
                                        spacing={2}
                                        justifyContent="center"
                                        alignment="center"
                                    >
                                        {contents.map((content, index) => (
                                            <Grid item key={index} xs={4}>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {content.label}
                                                </Typography>
                                                <Typography variant="body1">
                                                    {content.value(sample)}
                                                </Typography>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <span>N/A</span>
                                )}
                            </CardContent>
                        </Card>
                        <TableContainer>
                            <Table></Table>
                        </TableContainer>
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
                    <StepLabel>Review and Submit</StepLabel>
                    <StepContent>
                        <Box sx={{ mb: 2 }}>
                            <div>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={handleNext}
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
            {activeStep === 3 && (
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

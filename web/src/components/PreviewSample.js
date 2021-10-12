import * as React from "react";
import {
    Box,
    Paper,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { useQuery } from "@apollo/client";
import { REPORT_SAMPLE_GET_BY_LABEL } from "../gql/query";

const TableCellEllipsis = ({ value, params }) => {
    return (
        <Tooltip title={value ? value : " "}>
            <TableCell
                sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100px",
                    fontSize: "10px",
                    borderBottom: "none",
                    color: "rgba(0, 0, 0, 0.6)",
                    paddingLeft: "0px",
                }}
                {...params}
            >
                {value}
            </TableCell>
        </Tooltip>
    );
};

const TableCellKey = ({ value }) => {
    return (
        <TableCellEllipsis
            value={value}
            params={{
                align: "right",
            }}
        />
    );
};

const TableCellValue = ({ value }) => {
    return (
        <TableCellEllipsis
            value={value}
            params={{
                align: "left",
            }}
        />
    );
};

const SamplePreview = ({ sampleLabel }) => {
    const { loading, error, data } = useQuery(REPORT_SAMPLE_GET_BY_LABEL, {
        variables: { label: sampleLabel },
    });
    if (loading) return <p>loading...</p>;
    if (error) {
        console.log(error);
        return <p>error: {String(error)}</p>;
    }
    const sample = data["reportsamplebylabel"];
    console.log("sample", sample);
    return (
        <Paper elevation={0}>
            <Table sx={{ maxWidth: 850 }} size="small">
                <TableBody>
                    <TableRow>
                        <TableCellKey value="样本编号" />
                        <TableCellValue value={sample.sample_number} />
                        <TableCellKey value="样本名称" />
                        <TableCellValue value={sample.name} />
                    </TableRow>
                    <TableRow>
                        <TableCellKey value="年龄" />
                        <TableCellValue value={sample.age} />
                        <TableCellKey value="性别" />
                        <TableCellValue value={sample.gender} />
                    </TableRow>
                    <TableRow>
                        <TableCellKey value="家族史" />
                        <TableCellValue value={sample.history_family} />
                        <TableCellKey value="用药史" />
                        <TableCellValue value={sample.history_drug} />
                    </TableRow>
                    <TableRow>
                        <TableCellKey value="临床诊断结果" />
                        <TableCellValue value={sample.clinical_diagnosis} />
                    </TableRow>
                    <TableRow>
                        <TableCellKey value="报告显示癌种" />
                        <TableCellValue
                            value={
                                sample.cancer_from_report
                                    ? sample.cancer_from_report.label
                                    : " "
                            }
                        />
                        <TableCellKey value="数据匹配癌种" />
                        <TableCellValue
                            value={
                                sample.cancer_from_data
                                    ? sample.cancer_from_data.label
                                    : " "
                            }
                        />
                    </TableRow>
                    <TableRow>
                        <TableCellKey value="检测项目" />
                        <TableCellValue
                            value={
                                sample.inspection_project
                                    ? sample.inspection_project.label
                                    : " "
                            }
                        />
                        <TableCellKey value="接收日期" />
                        <TableCellValue
                            value={
                                sample.date_received
                                    ? format(
                                          parseISO(sample.date_received),
                                          "yyyy-MM-dd HH:mm"
                                      )
                                    : " "
                            }
                        />
                    </TableRow>
                    <TableRow>
                        <TableCellKey value="创建人" />
                        <TableCellValue
                            value={sample.creator ? sample.creator.label : ""}
                        />
                        <TableCellKey value="创建日期" />
                        <TableCellValue
                            value={
                                sample.createdAt
                                    ? format(
                                          parseISO(sample.createdAt),
                                          "yyyy-MM-dd"
                                      )
                                    : " "
                            }
                        />
                    </TableRow>
                    <TableRow>
                        <TableCellKey value="主样本文件" />
                        <TableCellValue
                            value={
                                sample.file_main ? sample.file_main.label : ""
                            }
                        />
                        <TableCellKey value="匹配样本文件" />
                        <TableCellValue
                            value={
                                sample.file_matched
                                    ? sample.file_matched.label
                                    : " "
                            }
                        />
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};
export default SamplePreview;

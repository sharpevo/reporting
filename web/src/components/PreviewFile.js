import * as React from "react";
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { useQuery } from "@apollo/client";
import { REPORT_FILE_GET_BY_LABEL } from "../gql/query";

const FilePreview = ({ filePath }) => {
    const { loading, error, data } = useQuery(REPORT_FILE_GET_BY_LABEL, {
        variables: { label: filePath },
    });
    if (loading) return <p>loading...</p>;
    if (error) {
        console.log(error);
        return <p>error: {String(error)}</p>;
    }
    const reportFile = data["reportfilebylabel"];
    console.log("file", reportFile);
    if (!reportFile) {
        return <span>N/A</span>;
    }
    return (
        <Paper elevation={0}>
            {reportFile.filename.match(/.(jpg|jpeg|png|gif)$/i) ? (
                <div>
                    <img
                        src={
                            `http://${window.location.hostname}:5200/` +
                            reportFile.path +
                            "?name=" +
                            reportFile.filename
                        }
                        width="300"
                    />
                    <br />
                    <Typography variant="caption" color="text.secondary">
                        <i>
                            {format(
                                parseISO(reportFile.createdAt),
                                "MM-dd HH:mm"
                            )}
                        </i>
                    </Typography>
                </div>
            ) : (
                <div>
                    <a
                        href={
                            `http://${window.location.hostname}:5200/` +
                            reportFile.path +
                            "?name=" +
                            reportFile.filename
                        }
                    >
                        {reportFile.filename}
                    </a>
                    <br />
                    <Typography variant="caption" color="text.secondary">
                        <i>
                            {format(
                                parseISO(reportFile.createdAt),
                                "MM-dd HH:mm"
                            )}
                        </i>
                    </Typography>
                </div>
            )}
        </Paper>
    );
};
export default FilePreview;

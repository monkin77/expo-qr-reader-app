import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

const QrReaderPage = () => {
    const [data, setData] = useState("No Result");

    return (
        <Box>
            <Box
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    paddingTop: 3,
                    paddingBottom: 3,
                }}
            >
                <Typography variant="h4" color="white">
                    QrReader
                </Typography>
            </Box>

            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                sx={{ width: "100%" }}
                constraints={{ facingMode: "environment", aspectRatio: 1 }}
            />

            <Box
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    paddingTop: 3,
                    paddingBottom: 3,
                }}
            >
                <Typography
                    color="white"
                    variant="body1"
                    sx={{ textAlign: "center" }}
                >
                    {data}
                </Typography>
            </Box>
        </Box>
    );
};

export default QrReaderPage;

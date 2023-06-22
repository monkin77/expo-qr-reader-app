import { useState } from "react";
import { QrReader } from "react-qr-reader";

const QrReaderPage = () => {
    const [data, setData] = useState("No Result");

    return (
        <>
            <h1>QrReader</h1>

            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                style={{ width: "100%" }}
            />

            <p>{data}</p>
        </>
    );
};

export default QrReaderPage;

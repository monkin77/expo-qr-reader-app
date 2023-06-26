// file = QrScannerPlugin.jsx
import { MutableRefObject, useEffect, useRef } from "react";
import QrScanner from "qr-scanner";
import classes from "./QrScanner2.module.css";
import { Box } from "@mui/material";
import { checkCameraPermissions } from "../utils/media";

// Id of the HTML element used by the QrScanner.
const qrcodeRegionId = "qr-code-video-region";

interface QrProps {
    preferredCamera?: string;
    maxScansPerSecond?: number;
    highlightScanRegion?: boolean;
    highlightCodeOutline?: boolean;
    onDecode: (result: QrScanner.ScanResult) => void;
    onPermRefused: () => void;
}

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: QrProps) => {
    // default config values
    let config: {
        preferredCamera?: string;
        maxScansPerSecond?: number;
        highlightScanRegion?: boolean;
        highlightCodeOutline?: boolean;
    } = {
        preferredCamera: "environment",
        maxScansPerSecond: 25,
        highlightScanRegion: true,
        highlightCodeOutline: false,
    };

    if (props.preferredCamera) {
        config.preferredCamera = props.preferredCamera;
    }
    if (props.maxScansPerSecond) {
        config.maxScansPerSecond = props.maxScansPerSecond;
    }
    if (props.highlightScanRegion !== undefined) {
        config.highlightScanRegion = props.highlightScanRegion;
    }
    if (props.highlightCodeOutline !== undefined) {
        config.highlightCodeOutline = props.highlightCodeOutline;
    }

    return config;
};

const QrScannerPlugin = (props: QrProps) => {
    const qrScanner: MutableRefObject<QrScanner | null> = useRef(null);

    useEffect(() => {
        const videoElem = document.getElementById(
            qrcodeRegionId
        ) as HTMLVideoElement;
        // console.log("videoElem", videoElem);

        const showQRCode = async () => {
            const hasCamPerm: boolean = await checkCameraPermissions();
            if (!hasCamPerm) {
                // Notify that the permission is refused
                if (props.onPermRefused) {
                    props.onPermRefused();
                }
                return;
            };

            // console.log("here")
            const config = createConfig(props);

            if (qrScanner.current !== null) {
                return;
            }

            // To enforce the use of the new api with detailed scan results, call the constructor with an options object, see below.
            qrScanner.current = new QrScanner(
                videoElem,
                props.onDecode,
                config
            );
            
            // console.log("here2");

            await qrScanner.current?.start();
        };

        showQRCode();

        // cleanup function when component will unmount
        return () => {
            const stopQrScanner = async () => {
                console.log("cleaning up...");
                if (qrScanner.current != null) {
                    qrScanner.current.stop();
                    qrScanner.current = null;
                }
            };

            stopQrScanner();
        };
    }, [props]);

    return (
        <Box sx={{width: "100%", marginLeft: "auto", marginRight: "auto"}}>
            <video id={qrcodeRegionId} className={classes.videoElem} />
        </Box>
    );
};

export default QrScannerPlugin;

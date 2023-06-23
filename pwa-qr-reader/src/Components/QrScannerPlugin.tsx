// file = QrScannerPlugin.jsx
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { useEffect } from "react";

// Id of the HTML element used by the Html5QrcodeScanner.
const qrcodeRegionId = "html5qr-code-full-region";

interface QrProps {
    fps?: number;   // Expected frame rate of qr code scanning. example { fps: 2 } means the scanning would be done every 500 ms.
    qrbox?: number;
    aspectRatio?: number;
    disableFlip?: boolean;
    qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void;
    qrCodeErrorCallback?: (errorMessage: string, error: any) => void;
    verbose?: boolean;
    formatsToSupport?: Html5QrcodeSupportedFormats[];
}

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: QrProps) => {
    // default config values
    let config: {
        fps: number;
        qrbox: number;
        aspectRatio: number;
        disableFlip: boolean;
        formatsToSupport?: Html5QrcodeSupportedFormats[];
    } = { fps: 10, qrbox: 250, aspectRatio: 1.0, disableFlip: false, formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE] };

    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    if (props.formatsToSupport) {
        config.formatsToSupport = props.formatsToSupport;
    }
    return config;
};

const QrScannerPlugin = (props: QrProps) => {
    useEffect(() => {
        // when component mounts
        const config = createConfig(props);
        const verbose = props.verbose === true;
        // Suceess callback is required.
        if (!props.qrCodeSuccessCallback) {
            throw new Error("qrCodeSuccessCallback is required."); // TODO: Check if we should throw an error
        }

        const html5QrcodeScanner = new Html5QrcodeScanner(
            qrcodeRegionId,
            config,
            verbose
        );
        html5QrcodeScanner.render(
            props.qrCodeSuccessCallback,
            props.qrCodeErrorCallback
        );

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch((error) => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, [props]);

    return <div id={qrcodeRegionId} />;
};

export default QrScannerPlugin;

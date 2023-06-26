import {
    useRef,
    useState,
    useCallback,
    MutableRefObject,
    useEffect,
} from "react";
import Webcam from "react-webcam";
import { getVideoStream } from "../utils/media";

interface WebcamStreamProps {
    audio?: boolean;
    mirrored?: boolean;
    videoConstraints?: MediaTrackConstraints;
    fps?: number;
}

const WebcamStream = (props: WebcamStreamProps) => {
    const webcamRef: MutableRefObject<Webcam | null> = useRef(null);
    const mediaRecorderRef: MutableRefObject<MediaRecorder | null> =
        useRef(null);
    const [capturing, setCapturing] = useState<boolean>(false);

    const handleDataAvailable = useCallback(
        ({ data }: any) => {
            if (data?.size > 0) {
                // Get screenshot data since the data received is a stream in the format video/webm
                const screenshot = webcamRef.current?.getScreenshot();
                console.log("screenshot: ", screenshot);
                // TODO: use the screenshot to check for QR codes
            }
        },
        []
    );

    const handleStartCapture = useCallback(async () => {
        if (capturing) return;

        setCapturing(true);

        const stream: MediaStream | null = await getVideoStream();
        if (stream) {
            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: "video/webm",
            });
            mediaRecorderRef.current.addEventListener(
                "dataavailable",
                handleDataAvailable
            );
            const processingInterval : number = 1000 / (props.fps ?? 10);   // milliseconds between each interrupt
            mediaRecorderRef.current.start(processingInterval);
        }
    }, [setCapturing, mediaRecorderRef, handleDataAvailable, capturing, props.fps]);

    const handleStopCapture = useCallback(() => {
        mediaRecorderRef.current?.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    useEffect(() => {
        // console.log("here");
        handleStartCapture();
     
        // cleanup function when component will unmount
        return () => {
            const stopStream = async () => {
                if (mediaRecorderRef.current) {
                    mediaRecorderRef.current.stop();
                    mediaRecorderRef.current = null;
                }
            };

            stopStream();
        };
    }, [handleStartCapture]);

    return (
        <Webcam
            audio={false}
            mirrored={false}
            videoConstraints={props.videoConstraints}
            ref={webcamRef}
            screenshotFormat="image/png"    /* Lossless format */
        />
    );
};

export default WebcamStream;

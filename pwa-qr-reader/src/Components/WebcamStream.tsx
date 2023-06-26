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
}

const WebcamStream = (props: WebcamStreamProps) => {
    const webcamRef: MutableRefObject<Webcam | null> = useRef(null);
    const mediaRecorderRef: MutableRefObject<MediaRecorder | null> =
        useRef(null);
    const [capturing, setCapturing] = useState<boolean>(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const handleDataAvailable = useCallback(
        ({ data }: any) => {
            if (data?.size > 0) {
                console.log("New data received: ", data);
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
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
            mediaRecorderRef.current.start();
        }
    }, [setCapturing, mediaRecorderRef, handleDataAvailable, capturing]);

    const handleStopCapture = useCallback(() => {
        mediaRecorderRef.current?.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    useEffect(() => {
        console.log("here");
        handleStartCapture();
    }, [handleStartCapture]);

    return (
        <Webcam
            audio={false}
            mirrored={false}
            videoConstraints={props.videoConstraints}
            ref={webcamRef}
        />
    );
};

export default WebcamStream;

import Webcam from "react-webcam";

interface WebcamStreamProps {
    audio?: boolean,
    mirrored?: boolean
    videoConstraints?: MediaTrackConstraints
}

const WebcamStream = (props: WebcamStreamProps) => {
    return (
        <Webcam
            audio={false}
            mirrored={false}
            videoConstraints={props.videoConstraints}
        />
    );
};

export default WebcamStream;

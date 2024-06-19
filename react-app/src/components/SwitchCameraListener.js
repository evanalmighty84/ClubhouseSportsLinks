import {
    useMeeting,
    usePubSub,
    createCameraVideoTrack,
} from "@videosdk.live/react-sdk";
import { useMeetingAppContext } from "../MeetingAppContextDef";
import { useEffect, useRef, useState } from "react";
import useMediaStream from "./hooks/useMediaStream";

const SwitchCameraListener = () => {
    const [webcams, setWebcams] = useState([]);
    const webcamsRef = useRef();

    useEffect(() => {
        webcamsRef.current = webcams;
    }, [webcams]);

    const getWebcams = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const webcams = devices.filter(
            (d) =>
                d.kind === "videoinput" &&
                d.deviceId !== "default" &&
                d.deviceId !== "communications"
        );

        webcams && webcams?.length && setWebcams(webcams);
    };

    const mMeeting = useMeeting();

    useEffect(() => {
        getWebcams(mMeeting?.getWebcams);
    }, []);

    usePubSub(`SWITCH_PARTICIPANT_CAMERA_${mMeeting?.localParticipant?.id}`, {
        onMessageReceived: async ({ message }) => {
            let customTrack;

            const deviceId = webcamsRef.current.find((webcam) =>
                webcam.label.toLowerCase().includes(message.facingMode)
            )?.deviceId;
            const label = webcamsRef.current.find((webcam) =>
                webcam.label.toLowerCase().includes(message.facingMode)
            )?.label;

            await mMeeting?.disableWebcam();
            try {
                customTrack = await createCameraVideoTrack({
                    cameraId: deviceId,
                    facingMode: message.facingMode,
                    optimizationMode: "motion",
                    multiStream: false,
                });
            } catch (error) {
                console.log("error in creating custom video track", error);
            }

            mMeeting.changeWebcam(customTrack);
        },
    });

    return <></>;
};

export default SwitchCameraListener;
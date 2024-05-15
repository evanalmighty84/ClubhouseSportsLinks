// @ts-nocheck
import {MeetingProvider} from "@videosdk.live/react-sdk";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {MeetingAppProvider} from "../../MeetingAppContextDef";
import {MeetingContainer} from "../meeting/MeetingContainer";
import {LeaveScreen} from "../../components/screens/LeaveScreen";
import {getToken, validateMeeting} from "../TeamStream/api";
import '../../styles.css';

function VideoFeedReady({teamName, email, meetingId}) {
    const [token, setToken] = useState("");
    const [participantName, setParticipantName] = useState("");
    const [micOn, setMicOn] = useState(false);
    const [webcamOn, setWebcamOn] = useState(false);
    const [customAudioStream, setCustomAudioStream] = useState(null);
    const [customVideoStream, setCustomVideoStream] = useState(null)
    const [isMeetingStarted, setMeetingStarted] = useState(false);
    const [isMeetingLeft, setIsMeetingLeft] = useState(false);

    const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

    console.log('videoReady is the component that is loaded!!!')


    useEffect(() => {
        const onClickJoinHandler = async (id) => {
            const token = await getToken();
            const {meetingId: responseMeetingId, err} = await validateMeeting({
                roomId: id,
                token,
            });
            if (responseMeetingId === id) {
                setToken(token);
                setMeetingStarted(true);
            } else {
                toast(
                    `${err}`,
                    {
                        position: "bottom-left",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeButton: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    }
                );
            }

            console.log('here is the token you need for the videoready', token)
        };

        if (meetingId) {
            console.log('meetingId is already present!', meetingId);
            setMeetingStarted(true);

            // Assuming you have the onClickJoin function defined
            // Replace 'id' with the appropriate meeting id
            onClickJoinHandler(meetingId);
        }
    }, [meetingId]);

    useEffect(() => {
        const sendMeetingIdToBackend = async (meetingId, teamName, email) => {
            console.log('sending the meeting id from the meetingdetails screen', meetingId)
            try {
                const data = {
                    teamName: teamName,
                    email: email,
                    meetingId: meetingId
                    // Add any other data you need to send to the backend
                };

                const response = await axios.post('/server/alien_city_function/api/sendMeetingId', data);
                console.log('Response from backend:', response.data);
                return response.data;
            } catch (error) {
                console.error('Error sending meeting ID to backend:', error);
                throw new Error('Error sending meeting ID to backend');
            }
        };
        sendMeetingIdToBackend(meetingId, teamName, email);
    }, [meetingId, teamName, email]);

    useEffect(() => {
        if (isMobile) {
            window.onbeforeunload = () => {
                return "Are you sure you want to exit?";
            };
        }
    }, [isMobile]);

    return (
        <MeetingAppProvider>
            {isMeetingStarted && token ? (
                <MeetingProvider
                    config={{
                        meetingId,
                        micEnabled: micOn,
                        webcamEnabled: webcamOn,
                        name: participantName ? participantName : "TestUser",
                        multiStream: true,
                        customCameraVideoTrack: customVideoStream,
                        customMicrophoneAudioTrack: customAudioStream
                    }}
                    token={token}
                    reinitialiseMeetingOnConfigChange={true}
                    joinWithoutUserInteraction={true}
                >
                    <MeetingContainer
                        onMeetingLeave={() => {
                            setToken("");
                            setMeetingStarted(false);
                            setIsMeetingLeft(true);
                        }}
                        setIsMeetingLeft={setIsMeetingLeft}
                    />
                </MeetingProvider>
            ) : null}
            {isMeetingLeft && <LeaveScreen setIsMeetingLeft={setIsMeetingLeft}/>}
        </MeetingAppProvider>
    );
}

export default VideoFeedReady;

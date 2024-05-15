// @ts-nocheck
import {MeetingProvider} from "@videosdk.live/react-sdk";
import React, {useEffect} from "react";
import {useState} from "react";
import {MeetingAppProvider} from "../../MeetingAppContextDef";
import {MeetingContainer} from "../meeting/MeetingContainer";
import {LeaveScreen} from "../../components/screens/LeaveScreen.js";
import {JoiningScreen} from "../screens/JoiningScreen.js"
import '../../styles.css'
import axios from "axios";

function Videofeed({teamName, email}) {
    const [token, setToken] = useState("");
    const [meetingId, setMeetingId] = useState("");
    const [participantName, setParticipantName] = useState("");
    const [micOn, setMicOn] = useState(false);
    const [webcamOn, setWebcamOn] = useState(false);
    const [customAudioStream, setCustomAudioStream] = useState(null);
    const [customVideoStream, setCustomVideoStream] = useState(null)
    const [isMeetingStarted, setMeetingStarted] = useState(false);
    const [isTeamMeetingStarted, setIsTeamMeetingStarted] = useState(false);
    const [isTeamMeetingFinished, setIsTeamMeetingFinished] = useState(false);
    const [isMeetingLeft, setIsMeetingLeft] = useState(false);

    console.log('video is the component that is loaded!!!')
    const isMobile = window.matchMedia(
        "only screen and (max-width: 768px)"
    ).matches;


    useEffect(() => {
        if (meetingId) {
            const sendMeetingIdToBackend = async (meetingId, teamName, email, token) => {
                console.log('sending the meeting id from the meetingdetails screen', meetingId, 'here is the token', token)
                try {
                    const data = {
                        teamName: teamName,
                        email: email,
                        meetingId: meetingId
                        // Add any other data you need to send to the backend
                    };

                    const response = await axios.post('/server/alien_city_function/api/sendMeetingId', data);

                    // Process response as needed
                    console.log('Response from backend:', response.data);

                    // Optionally return response data if needed
                    return response.data;
                } catch (error) {
                    // Handle errors
                    console.error('Error sending meeting ID to backend:', error);
                    throw new Error('Error sending meeting ID to backend');
                }
            };

            sendMeetingIdToBackend(meetingId, teamName, email);

            console.log("Meeting ID:", meetingId);
            console.log("TeamName", teamName);
            console.log("email", email);
        }
    }, [meetingId, teamName, email]);


    useEffect(() => {
        console.log('team meeting has started  according to this useEffect')
        // Construct the data object with the isTeamMeetingStarted value
        const data = {
            teamName: teamName,
            email: email,
            isTeamMeetingStarted: true,
            isTeamMeetingFinished: false
            // set all in that particular team to true
            // assuming isTeamMeetingStarted is a boolean variable
        };

        axios.put(`/server/alien_city_function/isTeamStreamStarted`, data)
            .then(response => {
                console.log('this is the response from has the the team stream started', response.data);
                //if its already started then send response isTeamStarted value ie. true
                //and set the isMeetingStarted hook to true and pass the meetingID from the firestore
                //to the meetingId in the meeting provider.

            })
            .catch(error => {
                alert(error.message);
                // setLoading(false);
            });
    }, [isTeamMeetingStarted]);
    useEffect(() => {
        // Construct the data object with the isTeamMeetingStarted value
        const data = {
            teamName: teamName,
            email: email,
            isTeamMeetingStarted: false,         //set that particular user to false
            isTeamMeetingFinished: true           // set that particular user to true
        };

        axios.put(`/server/alien_city_function/isTeamStreamFinished`, data)
            .then(response => {
                console.log('this is the response from has the the team stream finished', response.data);
            })
            .catch(error => {
                alert(error.message);
                // setLoading(false);
            });
    }, [isTeamMeetingFinished]);


    useEffect(() => {
        if (isMobile) {
            window.onbeforeunload = () => {
                return "Are you sure you want to exit?";
            };
        }
    }, [isMobile]);

    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <MeetingAppProvider>
                {isMeetingStarted ? (

                    <MeetingProvider
                        config={{
                            meetingId,
                            micEnabled: micOn,
                            webcamEnabled: webcamOn,
                            name: participantName ? participantName : "TestUser",
                            multiStream: true,
                            // @ts-ignore
                            customCameraVideoTrack: customVideoStream,
                            // @ts-ignore
                            customMicrophoneAudioTrack: customAudioStream
                        }}
                        token={token}
                        reinitialiseMeetingOnConfigChange={true}
                        joinWithoutUserInteraction={true}
                    >
                        <MeetingContainer
                            onMeetingLeave={() => {
                                setToken("");
                                setMeetingId("");
                                setParticipantName("");
                                setWebcamOn(false);
                                setMicOn(false);
                                setMeetingStarted(false);

                            }}
                            setIsMeetingLeft={setIsMeetingLeft}
                        />
                    </MeetingProvider>

                ) : isMeetingLeft ? (
                    setIsTeamMeetingFinished(true),
                        <LeaveScreen setIsMeetingLeft={setIsMeetingLeft}/>
                ) : (

                    <JoiningScreen
                        participantName={participantName}
                        setParticipantName={setParticipantName}
                        setMeetingId={setMeetingId}
                        setToken={setToken}
                        micOn={micOn}
                        setMicOn={setMicOn}
                        webcamOn={webcamOn}
                        setWebcamOn={setWebcamOn}
                        customAudioStream={customAudioStream}
                        setCustomAudioStream={setCustomAudioStream}
                        // @ts-ignore
                        customVideoStream={customVideoStream}
                        setCustomVideoStream={setCustomVideoStream}
                        onClickStartMeeting={() => {
                            setMeetingStarted(true);
                            setIsTeamMeetingStarted(true)

                        }}
                        startMeeting={isMeetingStarted}
                        setIsMeetingLeft={setIsMeetingLeft}
                    />
                )}
            </MeetingAppProvider>
        </>
    );
}

export default Videofeed

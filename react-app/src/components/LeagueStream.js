import { MeetingProvider } from "@videosdk.live/react-sdk";
import { useEffect } from "react";
import { useState } from "react";
import { MeetingAppProvider } from "../MeetingAppContextDef";
import { MeetingContainer } from "./meeting/MeetingContainer";
import { LeaveScreen } from "./screens/LeaveScreen";
import { JoiningScreen } from "./screens/JoiningScreen"
import "./leaguestream.css"
import {useLocation} from "react-router-dom";
import axios from "axios";

function LeagueStream() {
    const [token, setToken] = useState("");
    const [meetingId, setMeetingId] = useState("");
    const [email, setEmail] = useState("");
    const [teamName, setTeamName] = useState("");
    const [leagueName, setLeagueName] = useState("");
    const [participantName, setParticipantName] = useState("");
    const [micOn, setMicOn] = useState(false);
    const [webcamOn, setWebcamOn] = useState(false);
    const [customAudioStream, setCustomAudioStream] = useState(null);
    const [customVideoStream, setCustomVideoStream] = useState(null)
    const [isMeetingStarted, setMeetingStarted] = useState(false);
    const [isMeetingLeft, setIsMeetingLeft] = useState(false);
    const location = useLocation();

    const { Email,
        AccessToken,
        TeamName,
        Permission,
        MeetingId,
        LeagueName,
        JoinLiveButton } = location.state;
    console.log("League Stream is mounted")


    useEffect(() => {
        if (location.state && location.state.MeetingId) {
            setMeetingId(location.state.MeetingId);
        }
    }, [location.state]);
    console.log('LeagueStream meeting id:',meetingId)

    useEffect(() => {
        if (location.state && location.state.TeamName && location.state.Email && location.state.LeagueName ) {
            setTeamName(location.state.TeamName);
            setEmail(location.state.Email);
            setLeagueName(location.state.LeagueName);
        }
    }, [location.state]);
    console.log('LeagueStream data to sendToBackEnd onclick create meeting:',email,teamName , 'eventual meeting Id')


    const handleLeaveMeeting = async () => {
        const data = {
            teamName: teamName,
            leagueName: leagueName,
            email: email,
        };

        try {
            const response = await axios.post('/server/sports_business_info/api/clearMeetingId', data);
            console.log('Meeting ID cleared:', response.data.message);
        } catch (error) {
            console.error('Failed to clear meeting ID:', error);
        }

    };

// Effect to call handleLeaveMeeting when isMeetingLeft is set to true
    useEffect(() => {
        if (isMeetingLeft) {
            handleLeaveMeeting();
        }
    }, [isMeetingLeft]); // Add
    const isMobile = window.matchMedia(
        "only screen and (max-width: 768px)"
    ).matches;

    useEffect(() => {
        if (isMobile) {
            window.onbeforeunload = () => {
                return "Are you sure you want to exit?";
            };
        }
    }, [isMobile]);

    return (
        <>
            <MeetingAppProvider>
                {isMeetingStarted ? (

                    <MeetingProvider
                        config={{
                            meetingId,
                            micEnabled: micOn,
                            webcamEnabled: webcamOn,
                            name: participantName ? participantName : Email,
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


                    <LeaveScreen setRejoinMeetingId={location.state.MeetingId} setMeetingId={setMeetingId} setIsMeetingLeft={setIsMeetingLeft} />
                ) : (

                    <JoiningScreen
                        participantName={participantName}
                        setParticipantName={setParticipantName}
                        meetingId={meetingId}
                        email={email}
                        teamName={teamName}
                        leagueName={leagueName}
                        setMeetingId={setMeetingId}
                        setToken={setToken}
                        micOn={micOn}
                        setMicOn={setMicOn}
                        webcamOn={webcamOn}
                        setWebcamOn={setWebcamOn}
                        customAudioStream={customAudioStream}
                        setCustomAudioStream={setCustomAudioStream}
                        customVideoStream={customVideoStream}
                        setCustomVideoStream={setCustomVideoStream}
                        onClickStartMeeting={() => {
                            setMeetingStarted(true);
                        }}
                        startMeeting={isMeetingStarted}
                        setIsMeetingLeft={setIsMeetingLeft}
                    />
                )}
            </MeetingAppProvider>
        </>
    );
}

export default LeagueStream;

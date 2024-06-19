import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Dashboard from "./Dashboard";
import WaitingToJoinScreen from "../screens/WaitingToJoinScreen";
import axios from "axios";

const TeamStream = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [meetingId, setMeetingId] = useState('');
    const [joinLiveButton, setJoinLiveButton] = useState(false);
    const { teamName, leagueName } = useParams();
    const location = useLocation();
    useEffect(() => {
        const checkForMeetingIdToBackend = async () => {
            console.log('Checking for a meeting ID...');
            try {
                const data = { teamName, leagueName };
                const response = await axios.post('/server/sports_business_info/api/checkMeetingId', data);
                console.log('Response from backend:', response.data);
                const { meetingId } = response.data;

                if (meetingId && meetingId.trim() !== '') {
                    setMeetingId(meetingId);
                    setJoinLiveButton(true);
                    console.log('Setting join live button in dashboard to visible');
                } else {
                    setJoinLiveButton(false);
                    console.log('Setting join live button in dashboard to hidden');
                }
            } catch (error) {
                console.error('Error checking meeting ID with backend:', error);
                setJoinLiveButton(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkForMeetingIdToBackend();
    }, [teamName, leagueName]);
    // Check if location.state is null or undefined
    if (!location.state) {
        return <h1>You must log in to view this page.</h1>;
    }

    const { email, accessToken, permission } = location.state;
    console.log('here is the email from team stream component', email);
    console.log('here is the teamName from team stream component', teamName, leagueName);



    return (
        <div>
            {isLoading ? (
                <WaitingToJoinScreen />
            ) : (
                <Dashboard
                    Email={email}
                    LeagueName={leagueName}
                    TeamName={teamName}
                    MeetingId={meetingId}
                    Permission={permission}
                    AccessToken={accessToken}
                    JoinLiveButton={joinLiveButton}
                />
            )}
        </div>
    );
};

export default TeamStream;

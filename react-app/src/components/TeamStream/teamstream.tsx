// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import Dashboard from "./Dashboard";
import Videofeed from './videofeed'
import Videofeedready from "./videofeedready";
import axios from "axios";
// @ts-ignore
const TeamStream = ({accessToken, streamingPermission}) => {
    const [meetingId, setMeetingId] = useState('');
    const {teamName, leagueName} = useParams();
    const location = useLocation();
    const email = location.state.email
    console.log('here is the email from team stream compponent', email)
    console.log('here is the teamName from team stream component', teamName, leagueName)

    useEffect(() => {
        const checkForMeetingIdToBackend = async (teamName, leagueName) => {
            console.log('Checking for a meeting ID...');
            try {
                const data = {
                    teamName: teamName,
                    leagueName: leagueName
                };

                const response = await axios.post('/server/sports_business_info/api/checkMeetingId', data);
                console.log('Response from backend:', response.data);
                const {meetingId} = response.data
                setMeetingId(meetingId)
            } catch (error) {
                console.error('Error checking meeting ID with backend:', error);
                throw new Error('Error checking meeting ID with backend');
            }
        };

        checkForMeetingIdToBackend(teamName, leagueName);
    }, [meetingId]); // Empty dependency array means it runs once when the component mounts


    // Component logic
    return (
        <div>

            {/*{meetingId && <div><h1>Meeting ID: {meetingId}</h1>
                <Videofeedready teamName={teamName} email={email} meetingId={meetingId}/></div>}

            <h1>new stuff</h1>
            {!meetingId && <Videofeed teamName={teamName} email={email}/>}*/}
<Dashboard Email={email} LeagueName={leagueName} TeamName={teamName}/>
        </div>

    );
};

export default TeamStream;

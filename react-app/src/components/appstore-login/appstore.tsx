import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {GoogleLogin} from "@react-oauth/google";
import {useNavigate} from 'react-router-dom';
import RegistrationForm from '../TeamStream/registration'
import Gif from '../appstore-login/TeamStreamFinal.gif'
import {Route, redirect} from 'react-router-dom';
import TeamStream from "../TeamStream/teamstream"

const AppStore = () => {
    const [accessToken, setAccessToken] = useState('');
    const [leagueName, setLeagueName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [email, setEmail] = useState('');
    const [meetingId, setMeetingId] = useState('');
    const [permission, setPermission] = useState(null);
    const [showRegistration, setShowRegistration] = useState(null);
    const navigate = useNavigate();

    const handleSuccess = async (response: any) => {
        try {
            const idToken = response.credential; // Access the credential directly
            const backendResponse = await axios.post(`/server/sports_business_info/api/login`, {idToken});
            const {accessToken} = backendResponse.data; // Corrected variable name
            const {teamName} = backendResponse.data; // Corrected variable name
            const {permission} = backendResponse.data;
            const {email} = backendResponse.data
            const {meetingId} = backendResponse.data
            const {leagueName} = backendResponse.data
            // Corrected variable name
            // Store token securely (e.g., in localStorage)
            localStorage.setItem('accessToken', accessToken);
            setAccessToken(accessToken); // Set the access token state
            setTeamName(teamName);
            setEmail(email);// Set the access token state
            setPermission(permission)
            setMeetingId(meetingId)
            setLeagueName(leagueName)
            // Redirect or perform other actions after successful login
            console.log('Organizer response is', response);
            console.log('Organizer accessToken is ', accessToken)
            console.log('Organizer team name is ', teamName);
            console.log('Organizer league is ', leagueName);//
            console.log('Organizer permission is ', permission)
            if (!permission) {
                // If permission is false, show the registration form
                // @ts-ignore
                setShowRegistration(true);
                console.log(permission)
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login error (e.g., display error message)
        }
    };

    useEffect(() => {
        console.log(accessToken); // Log the access token state when it changes
    }, [accessToken]);


    const handleError = (error: any) => {
        console.error('Google login failed:', error);

        // Handle login failure (e.g., display error message)
    };


    useEffect(() => {
        if (accessToken && teamName && permission && email && leagueName) {
            navigate(`/app/teamStream/PrestonwoodSoccer/${teamName}`, {
                state: {
                    email,
                    accessToken,
                    teamName,
                    permission,
                    meetingId,
                    leagueName
                }
            }); // Redirect to /app/teamStream if accessToken and teamName are present
        }
        console.log('here is the email you are looking for', email)
        console.log('here is the teamName you are looking for', teamName)
    }, [accessToken, teamName, navigate, email, permission]);


    return (

        <div>
            <h1> Team Stream Login</h1>
            <div className="hero-container">
                <img src={Gif} style={{width:'100%'}} alt="Youth Sports" className="hero-video"  />


                <div className="hero-content" style={{ backgroundColor: 'rgb(47, 47, 47)', color: 'white' }}>

                <div className="teamstream-content-container"> With the touch of a button you can create your own
                        virtual outdoor zoom with all of room for all of your team parents. Never before seen angles are
                        at your disposal with everyone streaming from different angles to your cloud device.
                    </div>
                </div>
            </div>
            <GoogleLogin
                // @ts-ignore
                clientId="179478627002-th39iebli3b17dg5mkj4vu32sneo8mt9.apps.googleusercontent.com"
                onSuccess={handleSuccess}
                onFailure={handleError}
            />
            {showRegistration && <RegistrationForm email={email}/>}
        </div>


    );
};

export default AppStore;
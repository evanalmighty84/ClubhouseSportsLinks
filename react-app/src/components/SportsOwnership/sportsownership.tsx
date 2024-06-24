import React, { useEffect, useState } from 'react';
import axios from "axios";
import NewspaperArticles from "./newspaperSportsOwnership";

const SportsOwnership = () => {


    const [newsPaperObject2, setNewsPaperObject2] = useState({});
    const [newsPaperObject2B, setNewsPaperObject2B] = useState({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const sportsOwnershipContainerStyle: React.CSSProperties = {
        backgroundColor:'white',
        display: 'flex',
        color: 'black',

    };

    const sportsOwnershipColumnStyle1: React.CSSProperties = {
        borderRightStyle: 'solid',
        marginRight: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'start',

    };

    const sportsOwnershipColumnStyle2: React.CSSProperties = {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '.1em'
    };

    const sportsOwnershipColumnStyle3: React.CSSProperties = {
        borderLeftStyle: 'solid',
        marginLeft: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'end',

    };

    const sportsOwnershipTimelineStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        marginTop: '0px',
        marginBottom: '0px',
    };

    const sportsOwnershipIframeStyle: React.CSSProperties = {
        position: 'static',
        visibility: 'visible',
        display: 'block',
        flexGrow: 1,
        width: '100%', // Make the iframe fill its container horizontally
        height: '700px', // Set the initial height (you can adjust this as needed)
        overflow: 'auto',
    };

    const hideColumnsStyle: React.CSSProperties = {
        display: windowWidth < 1076 ? 'none' : 'flex', // Hide the columns when width is below 576px
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        axios.get(`/server/sports_business_info/fetchData`)
            .then(response => {
                setNewsPaperObject2(response.data.SportsOwnershipNewspaper);
                setNewsPaperObject2B(response.data.SportsOwnershipLNoGifNewspaper);
            })
            .catch(error => {
                alert(error.message);
            });
    }, []);

    return (
        <div style={sportsOwnershipContainerStyle}>
            <div style={windowWidth < 1076 ? hideColumnsStyle :sportsOwnershipColumnStyle1}>
                <div className="twitter-timeline twitter-timeline-rendered" style={sportsOwnershipTimelineStyle}>
                    <iframe
                        id="twitter-widget-0"
                        scrolling="no"
                        frameBorder="0"
                        allowTransparency
                        allowFullScreen
                        className=""
                        style={sportsOwnershipIframeStyle}
                        title="Twitter Timeline"
                        src="https://syndication.twitter.com/srv/timeline-profile/screen-name/GenXMediaGuide?dnt=false&amp;embedId=twitter-widget-0&amp;features=..."
                    ></iframe>
                </div>
            </div>
            <div style={sportsOwnershipColumnStyle2}>
                <div className="twitter-timeline twitter-timeline-rendered" style={sportsOwnershipTimelineStyle}>
                    <NewspaperArticles
                        serpApiArticles={newsPaperObject2}
                        serpApiArticlesNoGif={newsPaperObject2B}
                    />
                </div>
            </div>
            <div style={windowWidth < 1076 ? hideColumnsStyle :sportsOwnershipColumnStyle3}>
                <div className="twitter-timeline twitter-timeline-rendered" style={sportsOwnershipTimelineStyle}>
                    <iframe
                        id="twitter-widget-2"
                        scrolling="no"
                        frameBorder="0"
                        allowTransparency
                        allowFullScreen
                        className=""
                        style={sportsOwnershipIframeStyle}
                        title="Twitter Timeline"
                        src="https://syndication.twitter.com/srv/timeline-profile/screen-name/GenXMediaGuide?dnt=false&amp;embedId=twitter-widget-2&amp;features=..."
                    ></iframe>
                </div>
            </div>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </div>
    );
};

export default SportsOwnership;

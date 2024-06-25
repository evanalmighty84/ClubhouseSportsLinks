// SportsOwnership.js

import React, { useEffect, useState } from 'react';
import axios from "axios";
import NewspaperArticles from "./newspaperSportsOwnership";

const SportsOwnership = () => {
    const [newsPaperObject2, setNewsPaperObject2] = useState({});
    const [newsPaperObject2B, setNewsPaperObject2B] = useState({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [timelineHeight, setTimelineHeight] = useState(500); // Initial height

    const sportsOwnershipContainerStyle: React.CSSProperties = {
        backgroundColor: 'white',
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

    const hideColumnsStyle: React.CSSProperties = {
        display: windowWidth < 1076 ? 'none' : 'flex',
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
            <div style={windowWidth < 1076 ? hideColumnsStyle : sportsOwnershipColumnStyle1}>
                <div className="twitter-timeline twitter-timeline-rendered" style={sportsOwnershipTimelineStyle}>
                    <iframe height={`${timelineHeight}px`} src="https://rss.app/embed/v1/wall/toxkoqj6hxRi93B8"
                            frameBorder="0"></iframe>
                </div>
            </div>
            <div style={sportsOwnershipColumnStyle2}>
                <div className="twitter-timeline twitter-timeline-rendered" style={sportsOwnershipTimelineStyle}>
                    <NewspaperArticles
                        serpApiArticles={newsPaperObject2}
                        serpApiArticlesNoGif={newsPaperObject2B}
                        onHeightChange={setTimelineHeight}
                    />
                </div>
            </div>
            <div style={windowWidth < 1076 ? hideColumnsStyle : sportsOwnershipColumnStyle3}>
                <div className="twitter-timeline twitter-timeline-rendered" style={sportsOwnershipTimelineStyle}>
                    <iframe height={`${timelineHeight}px`}src="https://rss.app/embed/v1/wall/tDzTHU1IlXvefZ7X"
                            frameBorder="0"></iframe>
                </div>
            </div>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </div>
    );
};

export default SportsOwnership;

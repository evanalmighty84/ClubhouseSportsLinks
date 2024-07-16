import React, { useEffect, useState } from 'react';
import axios from "axios";
import NewsSection from "./newspaperYouthSports";

const YouthSports = () => {

    const [newsPaperObject2, setNewsPaperObject2] = useState({});
    const [newsPaperObject2B, setNewsPaperObject2B] = useState({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [timelineHeight, setTimelineHeight] = useState(500);

    const youthSportsContainerStyle: React.CSSProperties = {
        backgroundColor:'white',
        display: 'flex',
        color: 'black',
    };

    const youthSportsColumnStyle1: React.CSSProperties = {
        borderRightStyle: 'solid',
        marginRight: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'start',
        marginTop: '1em'
    };

    const youthSportsColumnStyle2: React.CSSProperties = {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: '.1em'
    };

    const youthSportsColumnStyle3: React.CSSProperties = {
        borderLeftStyle: 'solid',
        marginLeft: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'end',
        marginTop: '1em'
    };

    const youthSportsTimelineStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        marginTop: '0px',
        marginBottom: '0px',
    };

    const youthSportsIframeStyle: React.CSSProperties = {
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
        axios.get(`/server/sports_future_info/fetchData`)
            .then(response => {
                setNewsPaperObject2(response.data.YouthSportsNewspaper);
                setNewsPaperObject2B(response.data.YouthSportsNoGifNewspaper);
            })
            .catch(error => {
                alert(error.message);
            });
    }, []);

    return (
        <div style={youthSportsContainerStyle}>
            <div style={windowWidth < 1076 ? hideColumnsStyle : youthSportsColumnStyle1}>
                <div className="twitter-timeline twitter-timeline-rendered" style={youthSportsTimelineStyle}>
                    <iframe height={`${timelineHeight}px`} src="https://rss.app/embed/v1/wall/tGmvGZlANP0xdOYZ"
                            frameBorder="0"></iframe>
                </div>
            </div>
            <div style={youthSportsColumnStyle2}>
                <div className="twitter-timeline twitter-timeline-rendered" style={youthSportsTimelineStyle}>
                    <NewsSection
                        onHeightChange={setTimelineHeight}
                    />
                </div>
            </div>
            <div style={windowWidth < 1076 ? hideColumnsStyle : youthSportsColumnStyle3}>
                <div className="twitter-timeline twitter-timeline-rendered" style={youthSportsTimelineStyle}>
                    <iframe height={`${timelineHeight}px`} src="https://rss.app/embed/v1/wall/tYqftkFOmW1C57gf"
                            frameBorder="0"></iframe>
                </div>
            </div>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </div>
    );
};

export default YouthSports;

import React, { useEffect, useState } from 'react';
import axios from "axios";
import NewspaperArticles from "./newspaperNIL";

const NIL = () => {
    const [urlResultLink, setUrlResultLink] = useState([]);
    const [urlResultImage, setUrlResultImage] = useState([]);
    const [heroUrl, setHeroUrl] = useState('');
    const [articleObject, setArticleObject] = useState({});
    const [newsObject, setNewsObject] = useState({});
    const [newsPaperObject, setNewsPaperObject] = useState({});
    const [newsPaperObjectB, setNewsPaperObjectB] = useState({});
    const [newsPaperObject2, setNewsPaperObject2] = useState({});
    const [newsPaperObject2B, setNewsPaperObject2B] = useState({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const nilContainerStyle: React.CSSProperties = {
        display: 'flex',
        color: 'white',
        paddingTop: '1em'
    };

    const nilColumnStyle1: React.CSSProperties = {
        borderRightStyle: 'solid',
        marginRight: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'start',
        marginTop: '1em'
    };

    const nilColumnStyle2: React.CSSProperties = {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2f2f2f',
        marginTop: '1em',
        borderRadius: '.1em'
    };

    const nilColumnStyle3: React.CSSProperties = {
        borderLeftStyle: 'solid',
        marginLeft: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'end',
        marginTop: '1em'
    };

    const nilTimelineStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        marginTop: '0px',
        marginBottom: '0px',
    };

    const nilIframeStyle: React.CSSProperties = {
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
        axios.get(`/server/sports_info_table_source/fetchData`)
            .then(response => {
                setNewsPaperObject(response.data.NILNewspaper);
                setNewsPaperObjectB(response.data.NILNoGifNewspaper);
                setNewsPaperObject2(response.data.NILNewspaper);
                setNewsPaperObject2B(response.data.NILNoGifNewspaper);
            })
            .catch(error => {
                alert(error.message);
            });
    }, []);

    return (
        <div style={nilContainerStyle}>
            <div style={windowWidth < 1076 ? hideColumnsStyle : nilColumnStyle1}>
                <div className="twitter-timeline twitter-timeline-rendered" style={nilTimelineStyle}>
                    <iframe
                        id="twitter-widget-0"
                        scrolling="no"
                        frameBorder="0"
                        allowTransparency
                        allowFullScreen
                        className=""
                        style={nilIframeStyle}
                        title="Twitter Timeline"
                        src="https://syndication.twitter.com/srv/timeline-profile/screen-name/GenXMediaGuide?dnt=false&amp;embedId=twitter-widget-0&amp;features=..."
                    ></iframe>
                </div>
            </div>
            <div style={nilColumnStyle2}>
                <div className="twitter-timeline twitter-timeline-rendered" style={nilTimelineStyle}>
                    <NewspaperArticles
                        serpApiArticles={newsPaperObject2}
                        newsDataIOArticles={newsPaperObject}
                        serpApiArticlesNoGif={newsPaperObject2B}
                        newsDataIOArticlesNoGif={newsPaperObjectB}
                    />
                </div>
            </div>
            <div style={windowWidth < 1076 ? hideColumnsStyle : nilColumnStyle3}>
                <div className="twitter-timeline twitter-timeline-rendered" style={nilTimelineStyle}>
                    <iframe
                        id="twitter-widget-2"
                        scrolling="no"
                        frameBorder="0"
                        allowTransparency
                        allowFullScreen
                        className=""
                        style={nilIframeStyle}
                        title="Twitter Timeline"
                        src="https://syndication.twitter.com/srv/timeline-profile/screen-name/GenXMediaGuide?dnt=false&amp;embedId=twitter-widget-2&amp;features=..."
                    ></iframe>
                </div>
            </div>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </div>
    );
};

export default NIL;

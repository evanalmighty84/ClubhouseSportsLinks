import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewspaperArticles from './newspaperSportsTechnology';

const SportsTechnology = () => {
    const [heroUrl, setHeroUrl] = useState('');
    const [newsPaperObject, setNewsPaperObject] = useState([]);
    const [newsPaperObjectB, setNewsPaperObjectB] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [timelineHeight, setTimelineHeight] = useState(500); // Initial height

    const sportsTechnologyContainerStyle: React.CSSProperties = {
        backgroundColor: 'white',
        display: 'flex',
        color: 'black',
    };

    const sportsTechnologyColumnStyle1: React.CSSProperties = {
        borderRightStyle: 'solid',
        marginRight: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'start',
    };

    const sportsTechnologyColumnStyle2: React.CSSProperties = {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '.1em',
    };

    const sportsTechnologyColumnStyle3: React.CSSProperties = {
        borderLeftStyle: 'solid',
        marginLeft: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'end',
    };

    const sportsTechnologyTimelineStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column' as 'column',
        maxWidth: '100%',
        marginTop: '0px',
        marginBottom: '0px',
    };

    const hideColumnsStyle: React.CSSProperties = {
        display: windowWidth < 1076 ? 'none' : 'flex', // Hide the columns when width is below 1076px
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
                const data = response.data;
                setNewsPaperObject(data.SportsTechnologyNewspaper);
                setNewsPaperObjectB(data.SportsTechnologyNoGifNewspaper);
                setHeroUrl(data.banner[0]?.BannerImages.url); // Ensure to safely access nested properties
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert(error.message);
            });
    }, []);

    const handleHeightChange = (height: number) => {
        setTimelineHeight(height);
    };

    return (
        <div style={sportsTechnologyContainerStyle}>
            <div style={windowWidth < 1076 ? hideColumnsStyle : sportsTechnologyColumnStyle1}>
                <div className="twitter-timeline twitter-timeline-rendered" style={sportsTechnologyTimelineStyle}>
                    <iframe height={`${timelineHeight}px`} src="https://rss.app/embed/v1/wall/tOVNGYjgFaj3ZcOw" frameBorder="0"></iframe>
                </div>
            </div>
            <div style={sportsTechnologyColumnStyle2}>
                <div className="twitter-timeline twitter-timeline-rendered" style={sportsTechnologyTimelineStyle}>
                    <NewspaperArticles
                        serpApiArticles={newsPaperObject}
                        serpApiArticlesNoGif={newsPaperObjectB}
                        onHeightChange={handleHeightChange}
                    />
                </div>
            </div>
            <div style={windowWidth < 1076 ? hideColumnsStyle : sportsTechnologyColumnStyle3}>
                <div className="twitter-timeline twitter-timeline-rendered" style={sportsTechnologyTimelineStyle}>
                    <iframe height={`${timelineHeight}px`} src="https://rss.app/embed/v1/wall/tpGIWWO2Nb8CLzME" frameBorder="0"></iframe>
                </div>
            </div>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </div>
    );
};

export default SportsTechnology;

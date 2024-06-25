import React, { useEffect, useState } from 'react';
import axios from "axios";
import NewspaperArticles from "./newspaperSportsTechnologyStocks";

const SportsTechnologyStocks = () => {

    const [newsPaperObject, setNewsPaperObject] = useState({});
    const [newsPaperObjectB, setNewsPaperObjectB] = useState({});
    const [newsPaperObject2, setNewsPaperObject2] = useState({});
    const [newsPaperObject2B, setNewsPaperObject2B] = useState({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [timelineHeight, setTimelineHeight] = useState(500); // Initial height

    const SportsTechnologyStocksContainerStyle: React.CSSProperties = {
        backgroundColor:'white',
        display: 'flex',
        color: 'black',
    };

    const SportsTechnologyStocksColumnStyle1: React.CSSProperties = {
        borderRightStyle: 'solid',
        marginRight: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'start',
        marginTop: '1em'
    };

    const SportsTechnologyStocksColumnStyle2: React.CSSProperties = {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '.1em'
    };

    const SportsTechnologyStocksColumnStyle3: React.CSSProperties = {
        borderLeftStyle: 'solid',
        marginLeft: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'end',
        marginTop: '1em'
    };

    const SportsTechnologyStocksTimelineStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        marginTop: '0px',
        marginBottom: '0px',
    };

    const SportsTechnologyStocksIframeStyle: React.CSSProperties = {
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
                setNewsPaperObject(response.data.SportsTechnologyStockNewspaper);
                setNewsPaperObjectB(response.data.SportsTechnologyStockNoGifNewspaper);
                setNewsPaperObject2(response.data.SportsTechnologyStockNewspaper);
                setNewsPaperObject2B(response.data.SportsTechnologyStockNoGifNewspaper);
            })
            .catch(error => {
                alert(error.message);
            });
    }, []);

    return (
        <div style={SportsTechnologyStocksContainerStyle}>
            <div style={windowWidth < 1076 ? hideColumnsStyle : SportsTechnologyStocksColumnStyle1}>
                <div className="twitter-timeline twitter-timeline-rendered" style={SportsTechnologyStocksTimelineStyle}>
                    <iframe height={`${timelineHeight}px`}  src="https://rss.app/embed/v1/wall/tEuDsOTDIDajB5TO"
                            frameBorder="0"></iframe>
                </div>
            </div>
            <div style={SportsTechnologyStocksColumnStyle2}>
                <div className="twitter-timeline twitter-timeline-rendered" style={SportsTechnologyStocksTimelineStyle}>
                    <NewspaperArticles
                        serpApiArticles={newsPaperObject2}
                        newsDataIOArticles={newsPaperObject}
                        serpApiArticlesNoGif={newsPaperObject2B}
                        newsDataIOArticlesNoGif={newsPaperObjectB}
                        onHeightChange={setTimelineHeight}
                    />
                </div>
            </div>
            <div style={windowWidth < 1076 ? hideColumnsStyle : SportsTechnologyStocksColumnStyle3}>
                <div className="twitter-timeline twitter-timeline-rendered" style={SportsTechnologyStocksTimelineStyle}>
                    <iframe height={`${timelineHeight}px`} src="https://rss.app/embed/v1/wall/tMYVkU9GjPgOZt6m"
                            frameBorder="0"></iframe>
                </div>
            </div>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </div>
    );
};

export default SportsTechnologyStocks;

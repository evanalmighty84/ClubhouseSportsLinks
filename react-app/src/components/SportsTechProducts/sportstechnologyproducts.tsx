import React, {useEffect, useState} from 'react';
import axios from "axios"
import NewspaperArticles from "./newspaperSportsTechnology";


const SportsTechnology = () => {

    const [heroUrl, setHeroUrl] = useState('');
    const [newsPaperObject, setNewsPaperObject] = useState({});
    const [newsPaperObjectB, setNewsPaperObjectB] = useState({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const sportsTechnologyContainerStyle: React.CSSProperties = {
        display: 'flex',
        color: 'white',
        paddingTop: '1em'
    };

    const sportsTechnologyColumnStyle1: React.CSSProperties = {
        borderRightStyle: 'solid',
        marginRight: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'start',
        marginTop: '1em'

    };
    const sportsTechnologyColumnStyle2: React.CSSProperties = {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1em',
        borderRadius: '.1em'
    };
    const sportsTechnologyColumnStyle3: React.CSSProperties = {
        borderLeftStyle: 'solid',
        marginLeft: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'end',
        marginTop: '1em'

    };
    const sportsTechnologyTimelineStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        marginTop: '0px',
        marginBottom: '0px',
    };

    const sportsTechnologyIframeStyle: React.CSSProperties = {
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

    /* API function response schema  "YouthSportsNewspaper": details1,
            "NILNewspaper": details2,
            "banner": details3,
            "YouthSportsNoGifNewspaper": details4,
            "NILNoGifNewspaper": details5,*/
    useEffect(() => {
        axios.get(`/server/sports_business_info/fetchData`)
            .then(response => {
                console.log('is the whole Sports Technology response here' + JSON.stringify(response.data))

                // const mediumArticles = response.data
// @ts-ignore

                setNewsPaperObject(response.data.SportsTechnologyNewspaper)
                console.log('updated sports technology newspaper object with gifs ! from serp' + JSON.stringify(newsPaperObject))

                setNewsPaperObjectB(response.data.SportsTechnologyNoGifNewspaper)
                console.log('updated sports technology newspaper object with normal pics! from serp' + JSON.stringify(newsPaperObjectB))
                setHeroUrl(response.data.banner[0].BannerImages.url)
                console.log('here is this new banner' + JSON.stringify(heroUrl))
// @ts-ignore

                // @ts-ignore
                //  setLoading(false);
            })
            .catch((error: { message: any; }) => {
                alert(error.message);
                // setLoading(false);
            });
    }, [])


    return (
        <div style={sportsTechnologyContainerStyle}>
            <div style={windowWidth < 1076 ? hideColumnsStyle :sportsTechnologyColumnStyle1}>
                <div className="twitter-timeline twitter-timeline-rendered" style={sportsTechnologyTimelineStyle}>
                    <iframe
                        id="twitter-widget-0"
                        scrolling="no"
                        frameBorder="0"
                        allowTransparency
                        allowFullScreen
                        className=""
                        style={sportsTechnologyIframeStyle}
                        title="Twitter Timeline"
                        src="https://syndication.twitter.com/srv/timeline-profile/screen-name/GenXMediaGuide?dnt=false&amp;embedId=twitter-widget-0&amp;features=..."
                    ></iframe>
                </div>
            </div>
            <div style={sportsTechnologyColumnStyle2}>
                <div className="twitter-timeline twitter-timeline-rendered" style={sportsTechnologyTimelineStyle}>
                   <NewspaperArticles serpApiArticles={newsPaperObject}
                                       serpApiArticlesNoGif={newsPaperObjectB}/>
                </div>
            </div>
            <div style={windowWidth < 1076 ? hideColumnsStyle :sportsTechnologyColumnStyle3}>
                <div className="twitter-timeline twitter-timeline-rendered" style={sportsTechnologyTimelineStyle}>
                    <iframe
                        id="twitter-widget-2"
                        scrolling="no"
                        frameBorder="0"
                        allowTransparency
                        allowFullScreen
                        className=""
                        style={sportsTechnologyIframeStyle}
                        title="Twitter Timeline"
                        src="https://syndication.twitter.com/srv/timeline-profile/screen-name/GenXMediaGuide?dnt=false&amp;embedId=twitter-widget-2&amp;features=..."
                    ></iframe>
                </div>
            </div>
            <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </div>
    );
};

export default SportsTechnology;
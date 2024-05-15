import React, {useEffect, useState} from 'react';
import axios from "axios"
import NewspaperArticles from "./newspaperSportsTechnology";


const SportsTechnology = () => {

    const [urlResultLink, setUrlResultLink] = useState([]);
    const [urlResultImage, setUrlResultImage] = useState([]);
    const [heroUrl, setHeroUrl] = useState('');
    const [articleObject, setArticleObject] = useState({});
    const [newsObject, setNewsObject] = useState({});
    const [newsPaperObject, setNewsPaperObject] = useState({});
    const [newsPaperObjectB, setNewsPaperObjectB] = useState({});
    const [newsPaperObject2, setNewsPaperObject2] = useState({});
    const [newsPaperObject2B, setNewsPaperObject2B] = useState({});
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        color: 'white',
        paddingTop: '1em'
    };

    const columnStyle1: React.CSSProperties = {
        borderRightStyle: 'solid',
        marginRight: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'start',
        marginTop: '1em'

    };
    const columnStyle2: React.CSSProperties = {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightslategray',
        marginTop: '1em',
        borderRadius: '.1em'
    };
    const columnStyle3: React.CSSProperties = {
        borderLeftStyle: 'solid',
        marginLeft: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'end',
        marginTop: '1em'

    };
    const timelineStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        marginTop: '0px',
        marginBottom: '0px',
    };

    const iframeStyle: React.CSSProperties = {
        position: 'static',
        visibility: 'visible',
        display: 'block',
        flexGrow: 1,
        width: '100%', // Make the iframe fill its container horizontally
        height: '700px', // Set the initial height (you can adjust this as needed)
        overflow: 'auto',
    };

    /* API function response schema  "YouthSportsNewspaper": details1,
            "NILNewspaper": details2,
            "banner": details3,
            "YouthSportsNoGifNewspaper": details4,
            "NILNoGifNewspaper": details5,*/
    useEffect(() => {
        axios.get(`/server/alien_city_function/fetchData`)
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
    /* useEffect(() => {
         axios.get(`/server/sports_info_table_source/fetchData`)
             .then(response => {
                 console.log('is the whole response here' + JSON.stringify(response.data))

                 // const mediumArticles = response.data
 // @ts-ignore
                 setNewsPaperObject(response.data.YouthSportsNewspaper)
                 console.log('updated  youth sports newspaper object with gifs!' + JSON.stringify(newsPaperObject))

                 setNewsPaperObjectB(response.data.YouthSportsNoGifNewspaper)
                 console.log('updated  youth sports newspaper object with normal pics!' + JSON.stringify(newsPaperObjectB))

                 setNewsPaperObject2(response.data.NILNewspaper)
                 console.log('updated Sportstechnologystocks newspaper object with gifs ! from serp' + JSON.stringify(newsPaperObject2))

                 setNewsPaperObject2B(response.data.NILNoGifNewspaperr)
                 console.log('updated Sportstechnologystocks newspaper object with normal pics! from serp' + JSON.stringify(newsPaperObject2B))
                 /!* setHeroUrl(response.data.banner[0].BannerImages.url)
                  console.log('here is this new banner' + JSON.stringify(heroUrl))*!/
 // @ts-ignore

                 // @ts-ignore
                 //  setLoading(false);
             })
             .catch((error: { message: any; }) => {
                 alert(error.message);
                 // setLoading(false);
             });
     }, [])*/

    return (
        <div style={containerStyle}>
            <div style={columnStyle1}>
                <div className="twitter-timeline twitter-timeline-rendered" style={timelineStyle}>
                    <iframe
                        id="twitter-widget-0"
                        scrolling="no"
                        frameBorder="0"
                        allowTransparency
                        allowFullScreen
                        className=""
                        style={iframeStyle}
                        title="Twitter Timeline"
                        src="https://syndication.twitter.com/srv/timeline-profile/screen-name/GenXMediaGuide?dnt=false&amp;embedId=twitter-widget-0&amp;features=..."
                    ></iframe>
                </div>
            </div>
            <div style={columnStyle2}>
                <div className="twitter-timeline twitter-timeline-rendered" style={timelineStyle}>
                {/*    <NewspaperArticles newsDataIOArticles={newsPaperObject}
                                       newsDataIOArticlesNoGif={newsPaperObjectB}/>*/}
                </div>
            </div>
            <div style={columnStyle3}>
                <div className="twitter-timeline twitter-timeline-rendered" style={timelineStyle}>
                    <iframe
                        id="twitter-widget-2"
                        scrolling="no"
                        frameBorder="0"
                        allowTransparency
                        allowFullScreen
                        className=""
                        style={iframeStyle}
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
import React, {CSSProperties, useState, useEffect} from 'react';
import {useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import {Carousel} from 'react-responsive-carousel';
import './newspaperLocalSports.css';
import path from 'path';
// @ts-ignore
import {InView} from 'react-intersection-observer';
// @ts-ignore
import VideoComponent from "../common/MacDesktop";
// @ts-ignore
import videoSrc from "../LocalSportsNews/saudiTourism.mp4";
// @ts-ignore
import guyImage from "../Banner_Image.gif";
import {ArticleContext} from "../../App";



// @ts-ignore
const NewspaperArticles = ({serpApiArticles}) => {
    const [weather, setWeather] = useState('Plenty of Sunshine'); // Example weather state
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);


    const navigate = useNavigate();
    const {setSelectedArticle} = useContext(ArticleContext);
    const navigateToYouthSports = (article: { YouthSports: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean } }) => {
        // @ts-ignore
        setSelectedArticle(article); // set the clicked article

        navigate("/app/Localsp");
        // Navigation code to the Localsports component goes here...
    }
    const navigateToYouthSportsNoGif = (article: { YouthSportsNoGif: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean } }) => {
        // @ts-ignore
        setSelectedArticle(article); // set the clicked article

        navigate("/app/Localsports");
        // Navigation code to the Localsports component goes here...
    }
    const navigateToNIL = (article: { NIL: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean } }) => {
        // @ts-ignore
        setSelectedArticle(article); // set the clicked article

        navigate("/app/Localsports");
        // Navigation code to the Localsports component goes here...
    }
    const navigateToNILNoGif = (article: { NILNoGif: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean } }) => {
        // @ts-ignore
        setSelectedArticle(article); // set the clicked article

        navigate("/app/Localsports");
        // Navigation code to the Localsports component goes here...
    }

    // @ts-ignore
    // @ts-ignore
    const defaultOptions1 = {
        loop: true,
        autoplay: true,
        animationData: '',
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };


    useEffect(() => {

    }, [serpApiArticles]);

    if (!Array.isArray(serpApiArticles)) {
        // Handle the case when articles are not in the correct format
        return <div style={{backgroundColor: '#2f2f2f'}}>
            <h1> Loading Local Sports</h1>
            {loading && !completed ? (
                'loading!'
            ) : (
                <>
                    <hr/>
                    {/* ... (rest of your code) */}
                </>
            )}
        </div>
    }


    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div style={{backgroundColor: 'darkcyan'}}>
            <hr/>
            <div className="nil-head">
                <div className="headerobjectswrapper">
                    <div className="flex-container"> {/* Flex container */}
                        <div className="middleColumnStyle">
                            <div className="header-content middle-content">
                                <header>LOCAL SPORTS<br/>NEWS<Link to="/app/signup"> </Link></header>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="subhead" style={{justifyContent: "space-between"}}>

                    <div style={{textAlign: "center", flex: "1"}}>
                        <h1 className="subheadmobile" style={{
                            background: 'linear-gradient(to right,#2f2f2f,brown',
                            margin: ".5em 0 0em",
                            borderTop: '.1em solid indianred',
                            borderBottom: '0.1em solid indianred',
                            backgroundColor: 'brown',
                            fontSize: '1.5rem',
                            marginBottom: "1em",
                            letterSpacing: "normal"
                        }}>Latest Local Sports News</h1>
                    </div>
                </div>
                {/* <video style={{width:'100%',backgroundColor:'skyblue',margin: '1% 1% 1% 0%',
                   }} className="overlay-image"  controls autoPlay muted>
                    <source src={videoSrc} type="video/mp4" />
                </video>*/}


                <div className="collumns">
                    {/* Display articles with gif */}
                    {serpApiArticles &&
                        serpApiArticles.map((article, index) => (
                            <div key={index} className="collumn">
                                <div className="head">
              <span className="headline hl3" style={{backgroundColor: 'darkcyan'}}>
                {article.title}
              </span>
                                </div>
                                {index < serpApiArticles.length && (
                                    <InView>
                                        {({inView, ref}) => (
                                            <img
                                                onClick={() => navigateToNIL(article)}
                                                className={`media ${inView ? 'in-view' : ''}`}
                                                src={article.url}
                                                alt=""
                                                ref={ref}
                                            />
                                        )}
                                    </InView>
                                )}
                                <p className="newspaper-description">{article.description}</p>
                            </div>
                        ))}

                    {/* Display articles without gif */}

                </div>
                );

            </div>
        </div>

    );
};

export default NewspaperArticles;
// @ts-nocheck
import React, {CSSProperties, useState, useEffect, useRef} from 'react';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import WaitingToJoinScreen from '../screens/WaitingToJoinScreen'
import axios from 'axios';
import {Carousel} from 'react-responsive-carousel';
import './newspaperYouthSports.css';
// @ts-ignore
import {InView} from 'react-intersection-observer';

import {Link} from "react-router-dom";

// @ts-ignore

// @ts-ignore
import guyImage from "../Banner_Image.gif";

import {ArticleContext} from "../../App";



// @ts-ignore
const NewspaperArticles = ({ serpApiArticles, serpApiArticlesNoGif, onHeightChange}) => {
    const [weather, setWeather] = useState('Plenty of Sunshine'); // Example weather state


    const navigate = useNavigate();
    const {setSelectedArticle} = useContext(ArticleContext);
    const containerRef = useRef(null);
    const handleHeightChange = () => {
        if (containerRef.current) {
            onHeightChange(containerRef.current.clientHeight);
        }
    };

    const navigateToYouthSports = (article: { YouthSports: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean } }) => {
        // @ts-ignore
        setSelectedArticle(article); // set the clicked article

        navigate("/app/YouthSportsDetails");
        // Navigation code to the Localsports component goes here...
    }
    const navigateToYouthSportsNoGif = (article: { YouthSportsNoGif: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean } }) => {
        // @ts-ignore
        setSelectedArticle(article); // set the clicked article

        navigate("/app/YouthSportsDetails");
        // Navigation code to the Localsports component goes here...
    }
    useEffect(() => {
        handleHeightChange();
    }, [serpApiArticles, serpApiArticlesNoGif]);

    useEffect(() => {

    }, [serpApiArticles]);

    if (!Array.isArray(serpApiArticles)) {
        // Handle the case when articles are not in the correct format
        return <div><WaitingToJoinScreen/></div>;
    }


    // @ts-ignore
    return (
        <div ref={containerRef}>
            <hr/>
            <div className="YouthSports-head">
                <div className="headerobjectswrapper">
                    <div className="flex-container"> {/* Flex container */}
                        <div className="middleColumnStyle">
                            <div className="header-content middle-content">
                                <header>Name Image Likeness<br/>News<Link to="/app/signup"> </Link></header>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="subhead" style={{justifyContent: "space-between"}}>

                    <div style={{textAlign: "center", flex: "1"}}>
                        <h1 className="subheadmobile" style={{
                            fontSize: '1.5rem',
                            backgroundColor: '#de4e7f',
                            color:'white',
                            borderStyle:'solid',
                            borderColor:'white',
                            borderWidth:'.2em',
                        }}>Latest Youth Sports News</h1>
                    </div>
                </div>
                {/* <video style={{width:'100%',backgroundColor:'skyblue',margin: '1% 1% 1% 0%',
                   }} className="overlay-image"  controls autoPlay muted>
                    <source src={videoSrc} type="video/mp4" />
                </video>*/}


                <div className="content">


                    <div className="collumns">
                        {Array.isArray(serpApiArticles) && serpApiArticles.length > 0 ? (
                            serpApiArticles.map((article: { YouthSports: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean }; }, index: number) => (
                                <div key={index} className="collumn">
                                    <div className="head">
                                        <span className="headline hl3 "
                                              style={{
                                                  borderColor:'white',
                                                  backgroundColor: '#de4e7f',
                                                  borderStyle: 'solid',
                                                  padding:'1em',
                                                  fontWeight: '800',
                                                  fontStyle: 'italic',
                                                  fontSize: '24px',
                                                  boxSizing: 'border-box',
                                              }}>{article.YouthSports.title}</span>
                                        {console.log('HERE IS THE TITLE!!!!' + article.YouthSports.title)}
                                    </div>

                                    {index < serpApiArticles.length && (
                                        <InView>
                                            {({inView, ref}) => (
                                                <img onClick={() => navigateToYouthSports(article)}
                                                     className={`media ${inView ? 'in-view' : ''}`}
                                                     src={article.YouthSports.url}
                                                     style={{    borderColor: 'white',
                                                         borderWidth: '0.2em'}}
                                                     alt=""
                                                     ref={ref}
                                                />
                                            )}
                                        </InView>
                                    )}
                                    <p className="newspaper-description">{article.YouthSports.description}</p>
                                </div>
                            ))
                        ) : (
                            <div>No articles available</div>
                        )}

                        {Array.isArray(serpApiArticlesNoGif) && serpApiArticlesNoGif.length > 0 ? (
                            serpApiArticlesNoGif.map((article: { YouthSportsNoGif: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean }; }, index: number) => (
                                <div key={index} className="collumn">
                                    <div className="head">
                                        <span className="headline hl3"
                                              style={{
                                                  borderColor:'white',
                                                  backgroundColor: '#de4e7f',
                                                  borderStyle: 'solid',
                                                  padding:'1em',
                                                  fontWeight: '800',
                                                  fontStyle: 'italic',
                                                  fontSize: '24px',
                                                  boxSizing: 'border-box',
                                              }}>{article.YouthSportsNoGif.title}</span>
                                    </div>

                                    {index < serpApiArticlesNoGif.length && (
                                        <InView>
                                            {({inView, ref}) => (
                                                <img onClick={() => navigateToYouthSportsNoGif(article)}
                                                     className={`media ${inView ? 'in-view' : ''}`}
                                                     src={article.YouthSportsNoGif.url}
                                                     style={{    borderColor: 'white',
                                                         borderWidth: '0.2em'}}
                                                     alt=""
                                                     ref={ref}
                                                />
                                            )}
                                        </InView>
                                    )}
                                    <p className="newspaper-description">{article.YouthSportsNoGif.description}</p>
                                </div>
                            ))
                        ) : (
                            <div>No articles available</div>
                        )}
                    </div>


                </div>
            </div>
        </div>

    );
};

export default NewspaperArticles;

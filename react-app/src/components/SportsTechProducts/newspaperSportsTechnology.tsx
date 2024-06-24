// @ts-nocheck
import React, {CSSProperties, useState, useEffect} from 'react';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import WaitingToJoinScreen from '../screens/WaitingToJoinScreen'
import axios from 'axios';
import {Carousel} from 'react-responsive-carousel';
import './newspaperSportsTechnology.css';
import path from 'path';
// @ts-ignore
import {InView} from 'react-intersection-observer';

import {Link} from "react-router-dom";

// @ts-ignore

// @ts-ignore
import guyImage from "../Banner_Image.gif";

import {ArticleContext} from "../../App";



// @ts-ignore
const NewspaperArticles = ({ serpApiArticles, serpApiArticlesNoGif}) => {
    const [weather, setWeather] = useState('Plenty of Sunshine'); // Example weather state


    const navigate = useNavigate();
    const {setSelectedArticle} = useContext(ArticleContext);

    const navigateToSportsTechnology = (article: { SportsTechnology: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean } }) => {
        // @ts-ignore
        setSelectedArticle(article); // set the clicked article

        navigate("/app/sportsTechProductsDetails");
        // Navigation code to the Localsports component goes here...
    }
    const navigateToSportsTechnologyNoGif = (article: { SportsTechnologyNoGif: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean } }) => {
        // @ts-ignore
        setSelectedArticle(article); // set the clicked article

        navigate("/app/sportsTechProductsDetails");
        // Navigation code to the Localsports component goes here...
    }

    useEffect(() => {

    }, [serpApiArticles]);

    if (!Array.isArray(serpApiArticles)) {
        // Handle the case when articles are not in the correct format
        return <div><WaitingToJoinScreen/></div>;
    }


    // @ts-ignore
    return (
        <div>
            <hr/>
            <div className="SportsTechnology-head">
                <div className="subhead" style={{justifyContent: "space-between"}}>

                    <div style={{textAlign: "center", flex: "1"}}>
                        <h1 className="subheadmobile" style={{
                            fontSize: '1.5rem',
                            backgroundColor: 'steelblue',
                            color:'white',
                            borderStyle:'solid',
                            borderColor:'white',
                            borderWidth:'.2em',
                        }}>Latest Sports Technology News</h1>
                    </div>
                </div>
                <div className="headerobjectswrapper">
                    <div className="flex-container"> {/* Flex container */}
                        <div className="middleColumnStyle">
                            <div className="header-content middle-content">
                                <header>Sports Technology <br/>News<Link to="/app/signup"> </Link></header>
                            </div>

                        </div>
                    </div>
                </div>


                {/* <video style={{width:'100%',backgroundColor:'skyblue',margin: '1% 1% 1% 0%',
                   }} className="overlay-image"  controls autoPlay muted>
                    <source src={videoSrc} type="video/mp4" />
                </video>*/}


                <div className="content">


                    <div className="collumns">
                        {Array.isArray(serpApiArticles) && serpApiArticles.length > 0 ? (
                            serpApiArticles.map((article: { SportsTechnology: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean }; }, index: number) => (
                                <div key={index} className="collumn">
                                    <div className="head">
                                        <span className="headline hl3 "
                                              style={{
                                                  borderColor:'white',
                                                  backgroundColor: 'steelblue',
                                                  borderStyle: 'solid',
                                                  padding:'1em',
                                                  fontWeight: '800',
                                                  fontStyle: 'italic',
                                                  fontSize: '24px',
                                                  boxSizing: 'border-box',
                                              }}>{article.SportsTechnology.title}</span>
                                        {console.log('HERE IS THE TITLE!!!!' + article.SportsTechnology.title)}
                                    </div>

                                    {index < serpApiArticles.length && (
                                        <InView>
                                            {({inView, ref}) => (
                                                <img onClick={() => navigateToSportsTechnology(article)}
                                                     className={`media ${inView ? 'in-view' : ''}`}
                                                     src={article.SportsTechnology.url}
                                                     style={{    borderColor: 'white',
                                                         borderWidth: '0.2em'}}
                                                     alt=""
                                                     ref={ref}
                                                />
                                            )}
                                        </InView>
                                    )}
                                    <p className="newspaper-description">{article.SportsTechnology.description}</p>
                                </div>
                            ))
                        ) : (
                            <div>No articles available</div>
                        )}

                        {Array.isArray(serpApiArticlesNoGif) && serpApiArticlesNoGif.length > 0 ? (
                            serpApiArticlesNoGif.map((article: { SportsTechnologyNoGif: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean }; }, index: number) => (
                                <div key={index} className="collumn">
                                    <div className="head">
                                        <span className="headline hl3"
                                              style={{
                                                  borderColor:'white',
                                                  backgroundColor: 'steelblue',
                                                  borderStyle: 'solid',
                                                  padding:'1em',
                                                  fontWeight: '800',
                                                  fontStyle: 'italic',
                                                  fontSize: '24px',
                                                  boxSizing: 'border-box',
                                              }}>{article.SportsTechnologyNoGif.title}</span>
                                    </div>

                                    {index < serpApiArticlesNoGif.length && (
                                        <InView>
                                            {({inView, ref}) => (
                                                <img onClick={() => navigateToSportsTechnologyNoGif(article)}
                                                     className={`media ${inView ? 'in-view' : ''}`}
                                                     src={article.SportsTechnologyNoGif.url}
                                                     style={{    borderColor: 'white',
                                                         borderWidth: '0.2em'}}
                                                     alt=""
                                                     ref={ref}
                                                />
                                            )}
                                        </InView>
                                    )}
                                    <p className="newspaper-description">{article.SportsTechnologyNoGif.description}</p>
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

// @ts-nocheck
import React, {CSSProperties, useState, useEffect} from 'react';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Carousel} from 'react-responsive-carousel';
import './newspaperNIL.css';
import path from 'path';
// @ts-ignore
import {InView} from 'react-intersection-observer';

import {Link} from "react-router-dom";

// @ts-ignore

// @ts-ignore
import guyImage from "../Banner_Image.gif";

import {ArticleContext} from "../../App";
import WaitingToJoinScreen from "../screens/WaitingToJoinScreen";


// @ts-ignore
const NewspaperArticles = ({ serpApiArticles, serpApiArticlesNoGif}) => {
    const [weather, setWeather] = useState('Plenty of Sunshine'); // Example weather state


    const navigate = useNavigate();
    const {setSelectedArticle} = useContext(ArticleContext);

    const navigateToNIL = (article: { NIL: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean } }) => {
        // @ts-ignore
        setSelectedArticle(article); // set the clicked article

        navigate("/app/NilDetails");
        // Navigation code to the Localsports component goes here...
    }
    const navigateToNILNoGif = (article: { NILNoGif: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean } }) => {
        // @ts-ignore
        setSelectedArticle(article); // set the clicked article

        navigate("/app/NILDetails");
        // Navigation code to the Localsports component goes here...
    }

    useEffect(() => {

    }, [serpApiArticles]);

    if (!Array.isArray(serpApiArticles)) {
        // Handle the case when articles are not in the correct format
        return <div>waiting for nil articles</div>;
    }


    // @ts-ignore
    return (
        <div>
            <hr/>
            <div className="NIL-head">
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
                            background: 'linear-gradient(to right,#2f2f2f,#008B00',
                            margin: ".5em 0 0em",
                            borderTop: '.1em solid #008B00',
                            borderBottom: '0.1em solid white',
                            backgroundColor: '#008B00',
                            fontSize: '1.5rem',
                            marginBottom: "1em",
                            letterSpacing: "normal"
                        }}>Latest NIL News</h1>
                    </div>
                </div>
                {/* <video style={{width:'100%',backgroundColor:'skyblue',margin: '1% 1% 1% 0%',
                   }} className="overlay-image"  controls autoPlay muted>
                    <source src={videoSrc} type="video/mp4" />
                </video>*/}


                <div className="content">


                    <div className="collumns">
                        {Array.isArray(serpApiArticles) && serpApiArticles.length > 0 ? (
                            serpApiArticles.map((article: { NIL: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean }; }, index: number) => (
                                <div key={index} className="collumn">
                                    <div className="head">
                                        <span className="headline hl3 "
                                              style={{
                                                  borderColor:'white',
                                                  backgroundColor: '#008B00',
                                                  borderStyle: 'solid',
                                                  padding:'1em',
                                                  fontWeight: '800',
                                                  fontStyle: 'italic',
                                                  fontSize: '24px',
                                                  boxSizing: 'border-box',
                                              }}>{article.NIL.title}</span>
                                        {console.log('HERE IS THE TITLE!!!!' + article.NIL.title)}
                                    </div>

                                    {index < serpApiArticles.length && (
                                        <InView>
                                            {({inView, ref}) => (
                                                <img onClick={() => navigateToNIL(article)}
                                                     className={`media ${inView ? 'in-view' : ''}`}
                                                     src={article.NIL.url}
                                                     style={{    borderColor: 'white',
                                                         borderWidth: '0.2em'}}
                                                     alt=""
                                                     ref={ref}
                                                />
                                            )}
                                        </InView>
                                    )}
                                    <p className="newspaper-description">{article.NIL.description}</p>
                                </div>
                            ))
                        ) : (
                            <div>No articles available</div>
                        )}

                        {Array.isArray(serpApiArticlesNoGif) && serpApiArticlesNoGif.length > 0 ? (
                            serpApiArticlesNoGif.map((article: { NILNoGif: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean }; }, index: number) => (
                                <div key={index} className="collumn">
                                    <div className="head">
                                        <span className="headline hl3"
                                              style={{
                                                  borderColor:'white',
                                                  backgroundColor: '#008B00',
                                                  borderStyle: 'solid',
                                                  padding:'1em',
                                                  fontWeight: '800',
                                                  fontStyle: 'italic',
                                                  fontSize: '24px',
                                                  boxSizing: 'border-box',
                                              }}>{article.NILNoGif.title}</span>
                                    </div>

                                    {index < serpApiArticlesNoGif.length && (
                                        <InView>
                                            {({inView, ref}) => (
                                                <img onClick={() => navigateToNILNoGif(article)}
                                                     className={`media ${inView ? 'in-view' : ''}`}
                                                     src={article.NILNoGif.url}
                                                     style={{    borderColor: 'white',
                                                         borderWidth: '0.2em'}}
                                                     alt=""
                                                     ref={ref}
                                                />
                                            )}
                                        </InView>
                                    )}
                                    <p className="newspaper-description">{article.NILNoGif.description}</p>
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

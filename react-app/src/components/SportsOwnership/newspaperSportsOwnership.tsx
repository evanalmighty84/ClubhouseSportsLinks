// @ts-nocheck
import React, {CSSProperties, useState,useRef, useEffect} from 'react';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Carousel} from 'react-responsive-carousel';
import WaitingToJoinScreen from '../screens/WaitingToJoinScreen'
import './newspaperSportsOwnership.css';
import path from 'path';
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

    const navigateToSportsOwnership = (article: { SportsOwnership: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean } }) => {
        // @ts-ignore
        setSelectedArticle(article); // set the clicked article

        navigate("/app/sportsOwnershipDetails");
        // Navigation code to the Localsports component goes here...
    }
    const navigateToSportsOwnershipNoGif = (article: { SportsOwnershipNoGif: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean } }) => {
        // @ts-ignore
        setSelectedArticle(article); // set the clicked article

        navigate("/app/sportsOwnershipDetails");
        // Navigation code to the Localsports component goes here...
    }
    useEffect(() => {
        handleHeightChange();
    }, [serpApiArticles, serpApiArticlesNoGif]);


    useEffect(() => {

    }, [serpApiArticles]);

    if (!Array.isArray(serpApiArticles)) {
        // Handle the case when articles are not in the correct format
      /*  return <div><WaitingToJoinScreen/></div>;*/
        <div><WaitingToJoinScreen/></div>
    }


    // @ts-ignore
    return (
        <div ref={containerRef}>
            <div className="head">
                <div className="subhead" style={{justifyContent: "space-between"}}>
                    <div style={{textAlign: "center", flex: "1"}}>
                        <h1 className="subheadmobile" style={{
                            fontSize: '1.5rem',
                            backgroundColor: 'brown',
                            color:'white',
                            borderStyle:'solid',
                            borderColor:'white',
                            borderWidth:'.2em',

                        }}>Latest Sports Ownership News</h1>
                    </div>
                </div>
                <div className="headerobjectswrapper">
                    <div className="flex-container"> {/* Flex container */}
                        <div className="middleColumnStyle">
                            <div className="header-content middle-content">
                                <header>Sports Ownership <br/>News<Link to="/app/signup"> </Link></header>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="content">


                    <div className="collumns">
                        {Array.isArray(serpApiArticles) && serpApiArticles.length > 0 ? (
                            serpApiArticles.map((article: { SportsOwnership: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean }; }, index: number) => (
                                <div key={index} className="collumn">
                                    <div className="head">
                                        <span className="headline hl3 "
                                              style={{
                                                  borderColor:'white',
                                                  color:'white',
                                                  backgroundColor: 'brown',
                                                  borderStyle: 'solid',
                                                  padding:'1em',
                                                  fontWeight: '800',
                                                  fontStyle: 'italic',
                                                  fontSize: '24px',
                                                  boxSizing: 'border-box',
                                              }}>{article.SportsOwnership.title}</span>
                                        {console.log('HERE IS THE TITLE!!!!' + article.SportsOwnership.title)}
                                    </div>

                                    {index < serpApiArticles.length && (
                                        <InView>
                                            {({inView, ref}) => (
                                                <img onClick={() => navigateToSportsOwnership(article)}
                                                     className={`media ${inView ? 'in-view' : ''}`}
                                                     src={article.SportsOwnership.url}
                                                     style={{    borderColor: 'white',
                                                         borderWidth: '0.2em'}}
                                                     alt=""
                                                     ref={ref}
                                                />
                                            )}
                                        </InView>
                                    )}
                                    <p className="newspaper-description">{article.SportsOwnership.description}</p>
                                </div>
                            ))
                        ) : (
                            <div>{''}</div>
                        )}

                        {Array.isArray(serpApiArticlesNoGif) && serpApiArticlesNoGif.length > 0 ? (
                            serpApiArticlesNoGif.map((article: { SportsOwnershipNoGif: { video1: string; video2: string; video3: string; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean }; }, index: number) => (
                                <div key={index} className="collumn">
                                    <div className="head">
                                        <span className="headline hl3"
                                              style={{
                                                  borderColor:'white',
                                                  backgroundColor: 'brown',
                                                  borderStyle: 'solid',
                                                  padding:'1em',
                                                  fontWeight: '800',
                                                  fontStyle: 'italic',
                                                  fontSize: '24px',
                                                  boxSizing: 'border-box',
                                              }}>{article.SportsOwnershipNoGif.title}</span>
                                    </div>

                                    {index < serpApiArticlesNoGif.length && (
                                        <InView>
                                            {({inView, ref}) => (
                                                <img onClick={() => navigateToSportsOwnershipNoGif(article)}
                                                     className={`media ${inView ? 'in-view' : ''}`}
                                                     src={article.SportsOwnershipNoGif.url}
                                                     style={{    borderColor: 'white',
                                                         borderWidth: '0.2em'}}
                                                     alt=""
                                                     ref={ref}
                                                />
                                            )}
                                        </InView>
                                    )}
                                    <p className="newspaper-description">{article.SportsOwnershipNoGif.description}</p>
                                </div>
                            ))
                        ) : (
                            <div>{''}</div>
                        )}
                    </div>


                </div>
            </div>
        </div>
    );

};

export default NewspaperArticles;

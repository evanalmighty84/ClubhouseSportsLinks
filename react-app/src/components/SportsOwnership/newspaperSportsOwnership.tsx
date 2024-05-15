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
import TodaysDate from "../common/TodaysDate";
import {Link} from "react-router-dom";

// @ts-ignore
import VideoComponent from "../common/MacDesktop";
// @ts-ignore
import videoSrc from "../LocalSportsNews/saudiTourism.mp4";
// @ts-ignore
import guyImage from "../Banner_Image.gif";

import {ArticleContext} from "../../App";
import WaitingToJoinScreen from "../screens/WaitingToJoinScreen";


// @ts-ignore
const NewspaperArticles = ({newsDataIOArticles, newsDataIOArticlesNoGif, serpApiArticles, serpApiArticlesNoGif}) => {
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
        return <div><WaitingToJoinScreen/></div>;
    }


    // @ts-ignore
    return (
        <div>
            <div className="head">
                <div className="headerobjectswrapper">
                    <div className="flex-container"> {/* Flex container */}
                        <div className="middleColumnStyle">
                            <div className="header-content middle-content">
                                <header>WINNOVATIVE Daily <br/>Times<Link to="/app/signup"> </Link></header>
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
                            marginBottom: ".5rem"
                        }}>Sports Ownership</h1>
                    </div>
                </div>

                <div className="content">
                    <div className="collumns">
                        {newsDataIOArticles ? (
                            newsDataIOArticles.map((article: { SportsOwnership: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean }; }, index: number) => (
                                <div key={index} className="collumn">
                                    <div className="head">
                                        <span className="headline hl3">{article.SportsOwnership.title}</span>
                                    </div>
                                    {/* Your existing code */}
                                </div>
                            ))
                        ) : (
                            <div>No articles available</div>
                        )}

                        {/* Check if newsDataIOArticlesNoGif is an array before mapping */}
                        {Array.isArray(newsDataIOArticlesNoGif) && newsDataIOArticlesNoGif.length > 0 ? (
                            newsDataIOArticlesNoGif.map((article: { SportsOwnershipNoGif: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean }; }, index: number) => (
                                <div key={index} className="collumn">
                                    <div className="head">
                                        <span className="headline hl3">{article.SportsOwnershipNoGif.title}</span>
                                    </div>
                                    {/* Your existing code */}
                                </div>
                            ))
                        ) : (
                            <div>No articles available</div>
                        )}
                    </div>
                    <div className="subhead" style={{justifyContent: "space-between"}}>
                        <div style={{textAlign: "center", flex: "1", backgroundColor: "darkslateblue"}}>
                            <h1 className="subheadmobile" style={{margin: ".5em 0 0px"}}>Sports Technology</h1>
                        </div>
                    </div>
                    <div className="collumns">
                        {serpApiArticles ? (
                            serpApiArticles.map((article: { SportsTechnology: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean }; }, index: number) => (
                                <div key={index} className="collumn">
                                    <div className="head">
                                        <span className="headline hl3">{article.SportsTechnology.title}</span>
                                    </div>
                                    {/* Your existing code */}
                                </div>
                            ))
                        ) : (
                            <div>No articles available</div>
                        )}

                        {serpApiArticlesNoGif ? (
                            serpApiArticlesNoGif.map((article: { SportsTechnologyNoGif: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean }; }, index: number) => (
                                <div key={index} className="collumn">
                                    <div className="head">
                                        <span className="headline hl3">{article.SportsTechnologyNoGif.title}</span>
                                    </div>
                                    {/* Your existing code */}
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

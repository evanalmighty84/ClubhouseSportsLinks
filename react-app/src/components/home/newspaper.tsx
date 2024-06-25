// @ts-nocheck
import React, {CSSProperties, useState, useEffect} from 'react';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import './newspaper.module.css';

import {InView} from 'react-intersection-observer';

import {Link} from "react-router-dom";


import {ArticleContext} from "../../App";


// @ts-ignore
const NewspaperArticles = ({newsDataIOArticles, serpApiArticles, serpApiArticlesNoGif, newsDataIOArticlesNoGif}) => {
    const [weather, setWeather] = useState('Plenty of Sunshine'); // Example weather state
    const navigate = useNavigate();
    const {setSelectedArticle} = useContext(ArticleContext);

    useEffect(() => {
        // Check if there is a selected article in localStorage
        const storedArticle = localStorage.getItem('selectedArticle');
        if (storedArticle) {
            setSelectedArticle(JSON.parse(storedArticle));
        }
    }, []);
    const navigateToSportsOwnership = (article: { SportsOwnership: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean; }; }) => {
        console.log('Selected Article:', article);
        setSelectedArticle(article);
        // Save the selected article to localStorage
        localStorage.setItem('selectedArticle', JSON.stringify(article));
        navigate('/app/sportsOwnership');
    };
    const navigateToSportsOwnershipNoGif = (article: { SportsOwnershipNoGif: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean } }) => {
        // @ts-ignore
        setSelectedArticle(article); // set the clicked article

        navigate("/app/sportsOwnership");
        // Navigation code to the SportsOwnership component goes here...
    }
    const navigateToSportsTechnology = (article: { SportsTechnology: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean } }) => {
        // @ts-ignore
        setSelectedArticle(article); // set the clicked article

        navigate("/app/sportsOwnership");
        // Navigation code to the SportsOwnership component goes here...
    }
    const navigateToSportsTechnologyNoGif = (article: { SportsTechnologyNoGif: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean } }) => {
        // @ts-ignore
        setSelectedArticle(article); // set the clicked article

        navigate("/app/sportsOwnership");
        // Navigation code to the SportsOwnership component goes here...
    }

    useEffect(() => {

    }, [newsDataIOArticles]);

    if (!Array.isArray(newsDataIOArticles)) {
        // Handle the case when articles are not in the correct format
        return <div>Invalid data format for api</div>;
    }


    // @ts-ignore
    return (
        <div>

            <div className="head">
                <div className="headerobjectswrapper">
                    <div className="flex-container"> {/* Flex container */}
                        <div className="middleColumnStyle">
                            <div className="header-content middle-content">
                                <header>Clubhouse <br/>Links<Link to="/app/signup"> </Link></header>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="subhead" style={{justifyContent: "space-between"}}>

                    <div style={{textAlign: "center", flex: "1"}}>
                        <h1 className="subheadmobile" style={{
                            color:'white',
                            borderStyle:'solid',
                            borderColor:'white',
                            borderWidth:'.2em',
                            backgroundColor: 'brown'
                            ,
                            fontSize: '1.5rem',
                        }}>Sports Ownership</h1>
                    </div>
                </div>
                {/* <video style={{width:'100%',backgroundColor:'skyblue',margin: '1% 1% 1% 0%',
                   }} className="overlay-image"  controls autoPlay muted>
                    <source src={videoSrc} type="video/mp4" />
                </video>*/}

                <div className="content">


                    <div className="collumns">
                        {newsDataIOArticles ? (
                            newsDataIOArticles.map((article: { SportsOwnership: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean }; }, index: number) => (
                                <div key={index} className="collumn">
                                    <div className="head">
                                        <span className="headline hl3">{article.SportsOwnership.title}</span>
                                    </div>

                                    {index < newsDataIOArticles.length && (
                                        <InView>
                                            {({inView, ref}) => (
                                                <img onClick={() => navigateToSportsOwnership(article)}
                                                     className={`media ${inView ? 'in-view' : ''}`}
                                                     src={article.SportsOwnership.url}
                                                     alt=""
                                                     ref={ref}
                                                />
                                            )}
                                        </InView>
                                    )}
                                    <p>{article.SportsOwnership.description}</p>
                                </div>
                            ))
                        ) : (
                            <div>No articles available</div>
                        )}

                        {newsDataIOArticlesNoGif ? (
                            newsDataIOArticlesNoGif.map((article: { SportsOwnershipNoGif: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean }; }, index: number) => (
                                <div key={index} className="collumn">
                                    <div className="head">
                                        <span className="headline hl3">{article.SportsOwnershipNoGif.title}</span>
                                    </div>

                                    {index < newsDataIOArticlesNoGif.length && (
                                        <InView>
                                            {({inView, ref}) => (
                                                <img onClick={() => navigateToSportsOwnershipNoGif(article)}
                                                     className={`media ${inView ? 'in-view' : ''}`}
                                                     src={article.SportsOwnershipNoGif.url}
                                                     alt=""
                                                     ref={ref}
                                                />
                                            )}
                                        </InView>
                                    )}
                                    <p>{article.SportsOwnershipNoGif.description}</p>
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

                                    {index < serpApiArticles.length && (
                                        <InView>
                                            {({inView, ref}) => (
                                                <img onClick={() => navigateToSportsTechnology(article)}
                                                     className={`media ${inView ? 'in-view' : ''}`}
                                                     src={article.SportsTechnology.url}
                                                     alt=""
                                                     ref={ref}
                                                />
                                            )}
                                        </InView>
                                    )}
                                    <p>{article.SportsTechnology.description}</p>
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

                                    {index < serpApiArticlesNoGif.length && (
                                        <InView>
                                            {({inView, ref}) => (
                                                <InView>
                                                    {({inView, ref}) => (
                                                        <img onClick={() => navigateToSportsTechnologyNoGif(article)}
                                                             className={`media ${inView ? 'in-view' : ''}`}
                                                             src={article.SportsTechnologyNoGif.url}
                                                             alt=""
                                                             ref={ref}
                                                        />
                                                    )}
                                                </InView>
                                            )}
                                        </InView>
                                    )}
                                    <p>{article.SportsTechnologyNoGif.description}</p>
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

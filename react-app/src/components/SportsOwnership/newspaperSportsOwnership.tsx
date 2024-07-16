import React, { useState, useEffect, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { InView } from 'react-intersection-observer';
import { ArticleContext } from '../../App';

interface Article {
    id: string;
    url: string;
    title: string;
    content_text: string;
    content_html: string;
    image: string;
    date_published: string;
    authors: { name: string }[];
    attachments: { url: string }[];
}

const NewspaperArticles = ({
                               serpApiArticles,
                               serpApiArticlesNoGif,
                               onHeightChange,
                           }: {
    serpApiArticles: any[];
    serpApiArticlesNoGif: any[];
    onHeightChange: (height: number) => void;
}) => {
    const [selectedSport, setSelectedSport] = useState('');
    const [fetchedArticles, setFetchedArticles] = useState<Article[]>([]);
    const [showSerpApiArticles, setShowSerpApiArticles] = useState(true);
    const navigate = useNavigate();
    const { setSelectedArticle } = React.useContext(ArticleContext);
    const containerRef = useRef<HTMLDivElement>(null);

    const rssFeeds: { [key: string]: string } = {
        sportsTransactions: 'https://rss.app/feeds/v1.1/tk1GBzUy7UDcieGu.json',
        mediaRights: 'https://rss.app/feeds/v1.1/tpNa22IIsHMEOnYG.json',
        teamAcquisitions: 'https://rss.app/feeds/v1.1/tIHBruIjHiARWNdI.json',
        topOwners: 'https://rss.app/feeds/v1.1/tIVmYKqL4S9IBLCb.json',
    };

    const fetchArticles = async (sport: string) => {
        try {
            const response = await axios.get(rssFeeds[sport]);
            const articles: Article[] = response.data.items;
            const uniqueArticles = articles.filter(
                (article, index, self) => index === self.findIndex((a) => a.title === article.title)
            );
            setFetchedArticles(uniqueArticles);
        } catch (error) {
            console.error(`Error fetching ${sport} articles:`, error);
            // Handle error gracefully (e.g., show a message or retry fetching)
        }
    };

    useEffect(() => {
        fetchArticles(selectedSport);
    }, [selectedSport]);

    useEffect(() => {
        fetchArticles('sportsTransactions'); // Fetch sports Data Analytics articles by default
    }, []);

    const navigateToArticle = (article: Article) => {
        window.open(article.url, '_blank');
    };

    const handleHeightChange = () => {
        if (containerRef.current) {
            onHeightChange(containerRef.current.clientHeight);
        }
    };

    useEffect(() => {
        const handleHeightChange = () => {
            if (containerRef.current) {
                onHeightChange(containerRef.current.clientHeight);
            }
        };

        handleHeightChange(); // Initial height calculation

        // Recalculate height when articles change
        const timeout = setTimeout(() => {
            handleHeightChange();
        }, 500); // Adjust timeout as needed based on content loading speed

        return () => clearTimeout(timeout);
    }, [fetchedArticles, serpApiArticles, onHeightChange]);


    if (!Array.isArray(serpApiArticles) || !Array.isArray(serpApiArticlesNoGif)) {
        return <div>Loading...</div>;
    }

    const handleShowSerpApiArticles = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault(); // Prevent default behavior of anchor tag
        setShowSerpApiArticles(true);
        setSelectedSport(''); // Reset selected sport when showing SERP API articles
    };

    const handleSportSelection = (sport: string, event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        event.preventDefault(); // Prevent default behavior of anchor tag
        setSelectedSport(sport);
        setShowSerpApiArticles(false); // Reset to hide SERP API articles when selecting a sport
    };

    return (
        <div>
            <div className="headerobjectswrapper">
                <div className="flex-container"> {/* Flex container */}
                    <div className="middleColumnStyle" style={{margin:'0px'}}>
                        <div className="header-content middle-content" style={{backgroundSize:'contain'}}>
                            <span style={{color:'white',fontFamily:'system-ui', textAlign:'center'}}>Clubhouse Links</span>
                            <header></header>
                        </div>

                    </div>
                </div>
            </div>
            <nav
                className="nav nav-pills nav-fill"
                style={{ backgroundColor: 'black', border: 'solid' }}
            >
                <span
                    className={`nav-item nav-link ${showSerpApiArticles ? 'active' : ''} w-100`}
                    onClick={handleShowSerpApiArticles}
                    style={{
                        borderRadius:'0px',
                        cursor: 'pointer',
                        color: 'white',
                        background: showSerpApiArticles ? 'linear-gradient(to right, #044e70, #00254f)' : 'transparent',
                        display: 'block',
                        padding: '0.5rem 1rem',
                    }}
                >
                    SPORTS OWNERSHIP
                </span>
                {['sportsTransactions', 'mediaRights', 'teamAcquisitions', 'topOwners'].map((sport) => (
                    <span
                        key={sport}
                        className={`nav-item nav-link ${selectedSport === sport && !showSerpApiArticles ? 'active' : ''} w-100`}
                        onClick={(e) => handleSportSelection(sport, e)}
                        style={{
                            marginTop: '.5em',
                            marginBottom: '.5em',
                            border:'solid',
                            cursor: 'pointer',
                            color: 'white',
                            background: selectedSport === sport && !showSerpApiArticles ? 'linear-gradient(to right, #044e70, #00254f)'  : 'transparent',
                            display: 'block',
                            padding: '0.5rem 1rem',
                        }}
                    >
                        {sport === 'sportsTransactions' ? 'Sports Transactions' :
                            sport === 'mediaRights' ? 'Media Rights' :
                                sport === 'topOwners' ? 'Top Owners' :
                                    sport === 'teamAcquisitions' ? 'Team Acquisitions' :
                                        sport.charAt(0).toUpperCase() + sport.slice(1)}
                    </span>
                ))}
            </nav>


            <div ref={containerRef}>
                {showSerpApiArticles ? (
                    serpApiArticles.map((article, index) => (
                        <div key={index} className="column" style={{margin:'0px'}}>
                            <div
                                className="head"
                                style={{
                                    color: 'white',
                                    borderColor: 'white',
                                    backgroundColor:'black',
                                    borderStyle: 'solid',
                                    padding: '0em',
                                    fontWeight: '800',
                                    fontSize: '24px',
                                    borderWidth:'.1em',
                                    boxSizing: 'border-box',
                                    textAlign: 'center',
                                    borderRadius:'.2em'
                                }}
                            >
                                <span style={{ fontFamily: 'MyCustomFont' }} className="headline hl3">{article.SportsOwnership.title}</span>
                            </div>
                            <InView>
                                {({ inView, ref }) => (
                                    <img
                                        onClick={() => navigateToArticle(article)}
                                        className={`media ${inView ? 'in-view' : ''}`}
                                        src={article.SportsOwnership.url}
                                        style={{ borderColor: 'white', borderWidth: '0.2em' }}
                                        alt=""
                                        ref={ref}
                                    />
                                )}
                            </InView>
                            <p style={{fontFamily: 'system-ui', fontWeight:'300',marginBottom:'2em',color:'darkslategray',textIndent:'2em'}} className="newspaper-description">{article.SportsOwnership.description}</p>
                        </div>
                    )),
                        serpApiArticlesNoGif.map((article, index) => (
                            <div key={index} className="column" style={{margin:'0px'}}>
                                <div
                                    className="head"
                                    style={{
                                        color: 'white',
                                        borderColor: 'white',
                                        backgroundColor:'black',
                                        borderStyle: 'solid',
                                        padding: '0em',
                                        fontWeight: '800',
                                        fontSize: '24px',
                                        borderWidth:'.1em',
                                        boxSizing: 'border-box',
                                        textAlign: 'center',
                                        borderRadius:'.2em'
                                    }}
                                >
                                    <span style={{ fontFamily: 'MyCustomFont' }} className="headline hl3">{article.SportsOwnershipNoGif.title}</span>
                                </div>
                                <InView>
                                    {({ inView, ref }) => (
                                        <img
                                            onClick={() => navigateToArticle(article)}
                                            className={`media ${inView ? 'in-view' : ''}`}
                                            src={article.SportsOwnershipNoGif.url}
                                            style={{ borderColor: 'white', borderWidth: '0.2em' }}
                                            alt=""
                                            ref={ref}
                                        />
                                    )}
                                </InView>
                                <p style={{fontFamily: 'system-ui', fontWeight:'300',marginBottom:'2em',color:'darkslategray',textIndent:'2em'}} className="newspaper-description">{article.SportsOwnershipNoGif.description}</p>
                            </div>
                        ))
                ) : (
                    fetchedArticles.map((article, index) => (
                        <div key={index} className="column" style={{margin:'0px'}}>
                            <div
                                className="head"
                                style={{
                                    color: 'white',
                                    borderColor: 'white',
                                    backgroundColor: selectedSport === 'sportsTransactions' ? 'black' :
                                        selectedSport === 'mediaRights' ? 'black' :
                                            selectedSport === 'teamAcquisitions' ? 'black' : 'black',
                                    borderStyle: 'solid',
                                    padding: '0em',
                                    fontWeight: '800',
                                    fontSize: '24px',
                                    borderWidth:'.1em',
                                    boxSizing: 'border-box',
                                    textAlign: 'center',
                                    borderRadius:'.2em'
                                }}
                            >
                                <span style={{ fontFamily: 'MyCustomFont' }}  className=" headline hl3">{article.title}</span>
                            </div>
                            <InView>
                                {({ inView, ref }) => (
                                    <img
                                        onClick={() => navigateToArticle(article)}
                                        className={`media ${inView ? 'in-view' : ''}`}
                                        src={article.image}
                                        style={{ borderColor: 'white', borderWidth: '0.2em' }}
                                        alt=""
                                        ref={ref}
                                    />
                                )}
                            </InView>
                            <p style={{fontFamily: 'system-ui', fontWeight:'300',marginBottom:'2em',color:'darkslategray',textIndent:'2em'}} className="newspaper-description">{article.content_text}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NewspaperArticles;

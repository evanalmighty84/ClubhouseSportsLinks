import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
        sportsDataAnalytics: 'https://rss.app/feeds/v1.1/tqT5Go9AjgGoMua3.json',
        athleticPerformance: 'https://rss.app/feeds/v1.1/tfFMpBXKOVuTbUYo.json',
        athleticApparel: 'https://rss.app/feeds/v1.1/tFlakD2qiGivqLwd.json',
        artificialIntelligence: 'https://rss.app/feeds/v1.1/t8u86Fgn0cBpgIpY.json',
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
        fetchArticles('sportsDataAnalytics'); // Fetch sports Data Analytics articles by default
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
            <nav
                className="nav nav-pills nav-fill"
                style={{ marginTop: '2em', backgroundColor: 'black', margin: '10px', border: 'solid' }}
            >
                <span
                    className={`nav-item nav-link ${showSerpApiArticles ? 'active' : ''} w-100`}
                    onClick={handleShowSerpApiArticles}
                    style={{
                        cursor: 'pointer',
                        color: 'steelblue',
                        backgroundColor: showSerpApiArticles ? 'white' : 'transparent',
                        display: 'block',
                        padding: '0.5rem 1rem',
                    }}
                >
                    SPORTS TECHNOLOGY
                </span>
                {['sportsDataAnalytics', 'athleticPerformance', 'athleticApparel', 'artificialIntelligence'].map((sport) => (
                    <span
                        key={sport}
                        className={`nav-item nav-link ${selectedSport === sport && !showSerpApiArticles ? 'active' : ''} w-100`}
                        onClick={(e) => handleSportSelection(sport, e)}
                        style={{
                            cursor: 'pointer',
                            color: 'steelblue',
                            backgroundColor: selectedSport === sport && !showSerpApiArticles ? 'white' : 'transparent',
                            display: 'block',
                            padding: '0.5rem 1rem',
                        }}
                    >
                        {sport === 'sportsDataAnalytics' ? 'Data Analytics' :
                            sport === 'athleticPerformance' ? 'Athletic Performance' :
                                sport === 'artificialIntelligence' ? 'Artificial Intelligence' :
                                    sport === 'athleticApparel' ? 'Athletic Apparel' :
                                sport.charAt(0).toUpperCase() + sport.slice(1)}
                    </span>
                ))}
            </nav>
            <div ref={containerRef}>
                {showSerpApiArticles ? (
                    serpApiArticles.map((article, index) => (
                        <div key={index} className="column">
                            <div
                                className="head"
                                style={{
                                    color: 'white',
                                    borderColor: 'white',
                                    backgroundColor: 'steelblue',
                                    borderStyle: 'solid',
                                    padding: '0em',
                                    fontWeight: '800',
                                    fontStyle: 'italic',
                                    fontSize: '24px',
                                    boxSizing: 'border-box',
                                    textAlign: 'center',
                                }}
                            >
                                <span className="headline hl3">{article.SportsTechnology.title}</span>
                            </div>
                            <InView>
                                {({ inView, ref }) => (
                                    <img
                                        onClick={() => navigateToArticle(article)}
                                        className={`media ${inView ? 'in-view' : ''}`}
                                        src={article.SportsTechnology.url}
                                        style={{ borderColor: 'white', borderWidth: '0.2em' }}
                                        alt=""
                                        ref={ref}
                                    />
                                )}
                            </InView>
                            <p className="newspaper-description">{article.SportsTechnology.description}</p>
                        </div>
                    ))
                ) : (
                    fetchedArticles.map((article, index) => (
                        <div key={index} className="column">
                            <div
                                className="head"
                                style={{
                                    color: 'white',
                                    borderColor: 'white',
                                    backgroundColor: selectedSport === 'sportsDataAnalytics' ? 'black' :
                                        selectedSport === 'athleticPerformance' ? 'black' :
                                            selectedSport === 'athleticApparel' ? 'black' : 'black',
                                    borderStyle: 'solid',
                                    padding: '0em',
                                    fontWeight: '800',
                                    fontStyle: 'italic',
                                    fontSize: '24px',
                                    boxSizing: 'border-box',
                                    textAlign: 'center',
                                }}
                            >
                                <span className="headline hl3">{article.title}</span>
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
                            <p className="newspaper-description">{article.content_text}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NewspaperArticles;

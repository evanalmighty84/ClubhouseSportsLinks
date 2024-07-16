import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { InView } from 'react-intersection-observer';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define types
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

interface NewsSectionProps {
    onHeightChange: (height: number) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ onHeightChange }) => {
    const [fetchedArticles, setFetchedArticles] = useState<Article[]>([]);
    const [selectedSport, setSelectedSport] = useState('soccer');
    const containerRef = useRef<HTMLDivElement>(null);

    const rssFeeds: { [key: string]: string } = {
        soccer: 'https://rss.app/feeds/v1.1/t12t5FRyj5nEB2mA.json',
        basketball: 'https://rss.app/feeds/v1.1/tngtJareL70aAsr6.json',
        football: 'https://rss.app/feeds/v1.1/tOAM3JTgnJVNuG87.json',
        golf: 'https://rss.app/feeds/v1.1/tFDo136dbR6k0F20.json',
    };

    const fetchArticles = async (sport: string) => {
        try {
            const response = await axios.get(rssFeeds[sport]);
            const articles = response.data.items;
            const uniqueArticles = articles.filter(
                (article: Article, index: number, self: Article[]) =>
                    index === self.findIndex((a) => a.title === article.title)
            );
            setFetchedArticles(uniqueArticles);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    useEffect(() => {
        fetchArticles(selectedSport);
    }, [selectedSport]);

    useEffect(() => {
        if (containerRef.current) {
            onHeightChange(containerRef.current.clientHeight);
        }
    }, [fetchedArticles, onHeightChange]);

    const navigateToArticle = (article: Article) => {
        window.open(article.url, '_blank');
    };

    const handleSportSelection = (sport: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault(); // Prevent default behavior
        setSelectedSport(sport);
    };

    return (
        <div>
            <nav className="nav nav-pills nav-fill" style={{ marginTop: '2em', backgroundColor: 'black', margin: '10px', border: 'solid' }}>
                {['soccer', 'basketball', 'football', 'golf'].map((sport) => (
                    <div
                        key={sport}
                        className={`nav-item nav-link ${selectedSport === sport ? 'active' : ''} w-100`}
                        onClick={(e) => handleSportSelection(sport, e)}
                        style={{
                            cursor: 'pointer',
                            color: '#de4e7f',
                            backgroundColor: selectedSport === sport ? 'white' : 'transparent'
                        }}
                    >
                        Youth {sport.charAt(0).toUpperCase() + sport.slice(1)}
                    </div>
                ))}
            </nav>
            <div ref={containerRef} className="columns">
                {Array.isArray(fetchedArticles) && fetchedArticles.length > 0 ? (
                    fetchedArticles.map((article, index) => (
                        <div key={index} className="column">
                            <div className="head" style={{
                                color: 'white',
                                borderColor: 'white',
                                backgroundColor: '#de4e7f',
                                borderStyle: 'solid',
                                padding: '0em',
                                fontWeight: '800',
                                fontStyle: 'italic',
                                fontSize: '24px',
                                boxSizing: 'border-box',
                                textAlign: 'center'
                            }}>
                                <span className="headline hl3">
                                    {article.title}
                                </span>
                            </div>

                            {index < fetchedArticles.length && (
                                <InView>
                                    {({ inView, ref }) => (
                                        <img
                                            onClick={() => navigateToArticle(article)}
                                            className={`media ${inView ? 'in-view' : ''}`}
                                            src={article.image}
                                            style={{ borderColor: 'white', borderWidth: '0.2em' }}
                                            alt={article.title}
                                            ref={ref}
                                        />
                                    )}
                                </InView>
                            )}
                            <p className="newspaper-description">{article.content_text}</p>
                        </div>
                    ))
                ) : (
                    <div>No articles available</div>
                )}
            </div>
        </div>
    );
};

export default NewsSection;

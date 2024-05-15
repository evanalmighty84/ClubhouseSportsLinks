// @ts-nocheck
import React, {useEffect, useState} from "react";
import {Container, Row, Col} from "react-bootstrap";
import ArticleCarousel from './ArticleCarousel';
import NewsCarousel from './NewsCarousel';
import Carousel from 'react-bootstrap/Carousel';

import Localsports from "../LocalSportsNews/localsports";
// @ts-ignore
import Typist from "react-typist";

// @ts-ignore
import newTry from "/src/newesttry.jpg"
import ArticlesList from "./ArticleCarousel";
import "./home.css";
import axios from "axios";


import {Box} from '@chakra-ui/react';
import NewspaperArticles from "./newspaper";

import ImageGallery from "./ArticleCarousel";
import SportsTechProducts from "../SportsTechProducts/sportstechnologyproducts";


const heroSection = {
    color: "white"
};

const rowStyle = {
    color: "white",
    backgroundColor: "blue"
};

const photoSection = {
    marginTop: 40
};


const Hero = () => {
    const [loading, setLoading] = useState(true);
    const [articleLoading, setArticleLoading] = useState(true);
    const [urlResultLink, setUrlResultLink] = useState([]);
    const [urlResultImage, setUrlResultImage] = useState([]);
    const [heroUrl, setHeroUrl] = useState('');
    const [articles, setArticles] = useState([]);
    const [images, setImages] = useState([]);
    const [newsObject, setNewsObject] = useState({});
    const [newsPaperObject, setNewsPaperObject] = useState({});
    const [newsPaperObjectB, setNewsPaperObjectB] = useState({});
    const [newsPaperObject2, setNewsPaperObject2] = useState({});
    const [newsPaperObject2B, setNewsPaperObject2B] = useState({});


    function useMediaQuery(query: string) {
        const [matches, setMatches] = useState(window.matchMedia(query).matches);

        useEffect(() => {
            axios.get('/server/sports_business_info/articles')
                .then(response => {
                    // Assuming the API returns an array of objects with 'Articles' property
                    const articles = response.data.map(item => item.Articles);
                    setArticleObject(articles); // Update state with the extracted Articles
                    setArticleLoading(false)
                })
                .catch(error => {
                    console.error('Error fetching articles:', error);
                });
        }, []);

        return matches;
    }

    const isLandscape = useMediaQuery('(max-height: 600px)');

    useEffect(() => {
        if (isLandscape) {
            // Activate your hook or run some logic here
        }
    }, [isLandscape]);


    useEffect(() => {
        axios.get('/server/sports_business_info/articles')
            .then(response => {
                const fetchedArticles = response.data.map(item => item.Articles);
                setArticles(fetchedArticles);
                setArticleLoading(false)
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
            });
    }, []);

// Repeat similar logic for the other useEffect block




    useEffect(() => {
        axios.get(`/server/sports_business_info/fetchData`)
            .then(response => {
                console.log('is the whole response here' + JSON.stringify(response.data))

                // const mediumArticles = response.data
// @ts-ignore
                setNewsPaperObject(response.data.SportsOwnershipNewspaper)
                console.log('updated  sports ownership newspaper object with gifs!' + JSON.stringify(newsPaperObject))

                setNewsPaperObjectB(response.data.SportsOwnershipNoGifNewspaper)
                console.log('updated  sports ownership newspaper object with normal pics!' + JSON.stringify(newsPaperObjectB))

                setNewsPaperObject2(response.data.SportsTechnologyNewspaper)
                console.log('updated sports technology newspaper object with gifs ! from serp' + JSON.stringify(newsPaperObject2))

                setNewsPaperObject2B(response.data.SportsTechnologyNoGifNewspaper)
                console.log('updated sports technology newspaper object with normal pics! from serp' + JSON.stringify(newsPaperObject2B))
                setHeroUrl(response.data.banner[0].BannerImages.url)
                console.log('here is this new banner' + JSON.stringify(heroUrl))
                setLoading(false);  // Set loading to false once data is fetched
// @ts-ignore

                // @ts-ignore
                //  setLoading(false);
            })
            .catch((error: { message: any; }) => {
                alert(error.message+'newspaper call timed out!');
                // setLoading(false);
            });
    }, [])
    if (loading) {
        return <div>Loading...</div>;  // Render loading state or spinner here
    }

    return (
        <div>

            <div style={heroSection}>

                <div style={{position: 'absolute', top: 0, left: 0, zIndex: 1, width: '25%', display: 'flex'}}>


                    {/*
                    {isLandscape ?  <SportsTechProducts/> : ''}*/}

                </div>

                <div>
                    <Container style={{padding: '0px'}}>


                        <div className="new-container" style={{padding: 'inherit'}}>





                            <NewspaperArticles serpApiArticles={newsPaperObject2}
                                               newsDataIOArticles={newsPaperObject}
                                               serpApiArticlesNoGif={newsPaperObject2B}
                                               newsDataIOArticlesNoGif={newsPaperObjectB}/>




                            <div className="item">


                            </div>

                            {/* Middle Column */}
                            <div className="carousel-container item">
                                {!articleLoading ?
                                    <div style={{ display: 'inline-block' }}>
                                        {/* Check if articleObject is an array and has elements before rendering Carousel */}
                                        {Array.isArray(articles) && articles.length > 0 ? (
                                            <Carousel interval={10000} ride="carousel" slide={true}>
                                                {articles.map((article, index) => (
                                                    <Carousel.Item key={article.ROWID}>
                                                        <img
                                                            className="d-block w-100" // Bootstrap classes for full width and display block
                                                            src={article.IMAGES}
                                                            alt={`Slide ${index}`}
                                                        />
                                                        <Carousel.Caption>
                                                            <h3>{article.TITLE}</h3>
                                                            <p>{article.URLS}</p> // Typically, you might use a description or excerpt here
                                                        </Carousel.Caption>
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                        ) : (
                                            <p>No articles available</p> // Displayed if articleObject is empty
                                        )}
                                    </div> :
                                    <p>Loading articles...</p>  // Displayed while articles are loading
                                }
                            </div>


                            {/* Right Column */}
                            <div className="item">

                            </div>
                        </div>





                    </Container>


                </div>


            </div>
            <div>

            </div>
        </div>

    );
};

export default Hero;

import React, { useState, useEffect } from 'react';
// @ts-ignore
import ReactImageGallery from "react-image-gallery";
import { Carousel } from 'react-responsive-carousel';
// @ts-ignore
import Marquee from 'react-text-marquee';

import '../carousel.min.css';


import '../../App.css'

import ArticleCarousel from "./ArticleCarousel";

// @ts-ignore
const NewsCarousel = ({ news }) => {
    // @ts-ignore
    const SingleSVG = ({ svg }) => (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
    );

    useEffect(() => {

    }, [news]);

    if (!Array.isArray(news)) {
        // Handle the case when articles are not in the correct format
        return <div>Invalid data format for articles.</div>;
    }


    // @ts-ignore
    // @ts-ignore
    return (
        <div style={{width:'50%'}}>
            {/*  <SingleSVG svg={news[0].thumbnail} />*/}
            <Carousel
                className="news-carousel-container"
                autoPlay    // Enable auto-rotation
                interval={5000} // Set the interval (in milliseconds) for rotation
                infiniteLoop // Enable infinite looping of carousel items
                width={'57%'}
                showThumbs={false}


            >

                {news.map((article, index) => (
                    <div className="news-carousel-item" key={index}>
                        <h1>Sports and Tech News Articles</h1>
                        <div dangerouslySetInnerHTML={{ __html: article.thumbnail }} style={{ width: '100%', height: 'auto' }} />
                        <p><b>{article.title}</b></p>
                        <p>
                            <a href={article.link} target="_blank" rel="noopener noreferrer">
                                Read More
                            </a>
                        </p>
                    </div>
                ))}
            </Carousel>


        </div>

    );


}

export default NewsCarousel;
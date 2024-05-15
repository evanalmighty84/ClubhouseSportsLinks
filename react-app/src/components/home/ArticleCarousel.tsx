// @ts-nocheck
import React, { useState, useEffect } from 'react';
// @ts-ignore
import ReactImageGallery from "react-image-gallery";
import { Carousel } from 'react-responsive-carousel';
import '../../App.css'


// @ts-ignore
const ArticlesList = ({ articles }) => {


    useEffect(() => {

    }, [articles]);

    if (!Array.isArray(articles)) {
        // Handle the case when articles are not in the correct format
        return <div>Invalid data format for articles.</div>;
    }


    return (
        <div>
            {/*  <SingleSVG svg={news[0].thumbnail} />*/}
            <Carousel
                className="news-carousel-container"
                autoPlay    // Enable auto-rotation
                interval={50000} // Set the interval (in milliseconds) for rotation
                infiniteLoop // Enable infinite looping of carousel items
                width={'100%'}
                showThumbs={false}
                showArrows={false}
                showIndicators={false}

            >
                {articles.map((article: { Articles: { TITLE: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; CREATORID: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; CREATEDTIME: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; MODIFIEDTIME: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; IMAGES: string | undefined; URLS: string | undefined; }; }, index: React.Key | null | undefined) => (
                    <div className="news-carousel-item" key={index}>
                        <img src={article.Articles.IMAGES} style={{width:'100%'}} alt="Article Thumbnail"/>

                        <p><b>{article.Articles.TITLE}</b></p>

                        <p> <a href={article.Articles.URLS} target="_blank" rel="noopener noreferrer">
                            Read More
                        </a></p>
                        {/*<p>Created Time: {article.Articles.CREATEDTIME}</p> */}
                        {/* <p>Modified Time: {article.Articles.MODIFIEDTIME} </p> */}


                    </div>
                ))}
            </Carousel>
        </div>

    );


}

export default ArticlesList;
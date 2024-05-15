import React, {useState, useEffect, useRef} from 'react';

/// @ts-ignore
import videoSrc from "../LocalSportsNews/saudiTourism.mp4";
import '../home/newspaper.css';
/// @ts-ignore
import videoBackground from "../icon5.svg";
import path from 'path';
import {InView} from 'react-intersection-observer';
import '../home/newspaper.css';
import {Container, Row, Col} from "react-bootstrap";


/// @ts-ignore
import guyImage from "../Banner_Image.gif";
import {ArticleContext} from '../../App';  // replace 'path-to-your-app-component' with the correct path





import {useContext} from 'react';
import axios from "axios";


const SportsOwnership = () => {
    const {selectedArticle} = useContext(ArticleContext);
    const [sportsOwnershipNewsNoGifArray, setSportsOwnershipNewsNoGifArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeVideo, setActiveVideo] = useState(false);


    const handleImageClick = () => {

        setActiveVideo(true);
    };


    useEffect(() => {
        axios.get(`/server/sports_business_info/fetchSportsOwnership`)
            .then(response => {
                setSportsOwnershipNewsNoGifArray(response.data.SportsOwnershipNoGif)
                setLoading(false);  // Set loading to false once data is fetched
            })
            .catch((error: { message: any; }) => {
                alert(error.message);
                setLoading(false);  // Set loading to false even if there's an error
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;

    }


    if (!selectedArticle || !selectedArticle.SportsOwnership) {
        return <div>No article selected or article data is missing.</div>

    } else {
        return (
            <Container style={{padding: '0px'}}>

                <div className="mobile-news-carousel">
                    <div className="subhead"
                         style={{justifyContent: "space-between", paddingLeft: '1%', paddingRight: '1%'}}>

                        <div style={{textAlign: "center", flex: "1"}}>
                            <h1 className="subheadmobile" style={{
                                background: 'linear-gradient(to right,#2f2f2f,brown',


                                backgroundColor: 'brown',
                                fontSize: '1.5rem',
                                margin: "0px"
                            }}>Sports Ownership</h1>
                        </div>
                    </div>
                    <div className="mobile-slide">
                        {
                            activeVideo ? (
                                <video width="320" height="240" controls autoPlay>
                                    <source src={videoSrc} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img src={videoSrc} alt="News 2" onClick={() => handleImageClick()}/>
                            )
                        }
                        <h3>{selectedArticle.SportsOwnership.title}</h3>
                    </div>
                </div>
                <div className="news-carouseld">

                    <div className="slide">

                        <video width="320" height="240" controls autoPlay>
                            <source src={videoSrc} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>

                        <h3>
                            {selectedArticle.SportsOwnership.title}</h3>
                    </div>
                </div>


                <div className="new-container" style={{padding: 'inherit'}}>
                    <div>
                        <div className="head">

                            <div className="content">


                            </div>


                            <div className="collumns">


                                <div className="collumn"
                                     style={{background: 'linear-gradient(to right,#2f2f2f,brown)'}}>
                                    <div className="head">
                                        {/*<span
                                                className="headline hl4">{selectedArticle.SportsOwnership.title}</span>*/}
                                    </div>

                                    <InView>
                                        {({inView, ref}) => (
                                            <img style={{borderColor: 'gold', borderTopColor: 'gold'}}
                                                 className={`media ${inView ? 'in-view' : ''}`}

                                                 src={selectedArticle.SportsOwnership.url}
                                                 alt=""
                                                 ref={ref}
                                            />
                                        )}
                                    </InView>

                                    {/*        <p>
                                            {
                                                selectedArticle.SportsOwnership.description}</p>*/}
                                    <hr/>
                                    <p style={{textAlign: 'left'}}>
                                        {
                                            selectedArticle.SportsOwnership.content}</p>
                                </div>
                                );

                            </div>

                            {
                                loading
                                    ? null
                                    : (
                                        <div className="collumns">
                                            {
                                                (sportsOwnershipNewsNoGifArray && sportsOwnershipNewsNoGifArray.length > 0)
                                                    ? sportsOwnershipNewsNoGifArray.map((article: { SportsOwnershipNoGif: { title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: string | undefined; description: boolean }; }, index: number) => {

                                                        return (
                                                            <div key={index} className="collumn">
                                                                <div className="head">
                                                                    <span
                                                                        className="headline hl4">{article.SportsOwnershipNoGif.title}</span>
                                                                </div>

                                                                {index < sportsOwnershipNewsNoGifArray.length && (
                                                                    <InView>
                                                                        {({inView, ref}) => (
                                                                            <img
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
                                                        );
                                                    })
                                                    : null
                                            }
                                        </div>
                                    )
                            }


                            <div className="subhead" style={{justifyContent: "space-between"}}>

                                <div style={{textAlign: "center", flex: "1"}}>
                                    <h1 className="subheadmobile" style={{
                                        background: 'linear-gradient(to right,#2f2f2f,brown',
                                        margin: ".5em 0 0em",
                                        borderTop: '.1em solid indianred',
                                        borderBottom: '0.1em solid indianred',
                                        backgroundColor: 'brown'
                                        ,
                                        fontSize: '1.5rem',
                                        marginBottom: ".5rem"
                                    }}>Latest Sports Ownership Videos</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }


}


export default SportsOwnership;

import React, {useState, useEffect, useContext} from 'react';
import {Container} from "react-bootstrap";
import {ArticleContext} from '../../App';
import axios from "axios";
import {InView} from 'react-intersection-observer';

const SportsTechnologyStocksDetails = () => {
    const {selectedArticle} = useContext(ArticleContext);
    const [SportsTechnologyStockNoGifArray, setSportsTechnologyStockNoGifArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeVideo, setActiveVideo] = useState(false);

    const handleImageClick = () => {
        setActiveVideo(true);
    };

    useEffect(() => {
        axios.get(`/server/sports_info_table_source/fetchData`)
            .then(response => {
                setSportsTechnologyStockNoGifArray(response.data.SportsTechnologyStockNoGifNewspaper);
                setLoading(false);
            })
            .catch(error => {
                alert(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!selectedArticle.SportsTechnologyStockNoGif && !selectedArticle.SportsTechnologyStock) {
        return <div>No article selected or article data is missing.</div>;
    }

    const renderVideos = () => {
        const videos = [];

        if (selectedArticle.SportsTechnologyStockNoGif) {
            if (selectedArticle.SportsTechnologyStockNoGif.video1) {
                videos.push(
                    <iframe
                        key="video1"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.SportsTechnologyStockNoGif.video1}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none', marginRight: '1em'}}
                    ></iframe>
                );
            }
            if (selectedArticle.SportsTechnologyStockNoGif.video2) {
                videos.push(
                    <iframe
                        key="video2"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.SportsTechnologyStockNoGif.video2}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none', marginRight: '1em'}}
                    ></iframe>
                );
            }
            if (selectedArticle.SportsTechnologyStockNoGif.video3) {
                videos.push(
                    <iframe
                        key="video3"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.SportsTechnologyStockNoGif.video3}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none', marginRight: '1em'}}
                    ></iframe>
                );
            }
        }

        if (selectedArticle.SportsTechnologyStock) {
            if (selectedArticle.SportsTechnologyStock.video1) {
                videos.push(
                    <iframe
                        key="video1"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.SportsTechnologyStock.video1}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none', marginRight: '1em'}}
                    ></iframe>
                );
            }
            if (selectedArticle.SportsTechnologyStock.video2) {
                videos.push(
                    <iframe
                        key="video2"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.SportsTechnologyStock.video2}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none', marginRight: '1em'}}
                    ></iframe>
                );
            }
            if (selectedArticle.SportsTechnologyStock.video3) {
                videos.push(
                    <iframe
                        key="video3"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.SportsTechnologyStock.video3}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none', marginRight: '1em'}}
                    ></iframe>
                );
            }
        }

        return videos;
    };

    return (
        <Container style={{padding: '0px'}}>
            <h1 className="subheadmobile" style={{
                letterSpacing:'normal',
                fontWeight: '800',
                color:'white',
                textAlign:'center',
                background: 'linear-gradient(to right,#2f2f2f,#008B00',
                margin: ".5em 0 0em",
                borderTop: '.1em solid #008B00',
                borderBottom: '0.1em solid cadetblule',
                backgroundColor: '#008B00',
                fontSize: '1.5rem',
                marginBottom: ".5rem"
            }}>{selectedArticle.SportsTechnologyStockNoGif ? selectedArticle.SportsTechnologyStockNoGif.title : selectedArticle.SportsTechnologyStock.title}</h1>

            <div className="new-container" style={{padding: 'inherit'}}>
                <div className="head">
                    <div className="collumns">
                        <div className="collumn" style={{background: 'linear-gradient(to right,#2f2f2f,#008B00)',padding:'0px'}}>
                            <div className="head"></div>
                            <InView>
                                {({inView, ref}) => (
                                    <img style={{borderColor: 'white', borderTopColor: 'white'}}
                                         className={`media ${inView ? 'in-view' : ''}`}
                                         src={selectedArticle.SportsTechnologyStockNoGif ? selectedArticle.SportsTechnologyStockNoGif.url : selectedArticle.SportsTechnologyStock.url}
                                         alt="" ref={ref}/>
                                )}
                            </InView>
                            <hr/>
                            <p style={{textAlign: 'left',color:'white'}}>{selectedArticle.SportsTechnologyStockNoGif ? selectedArticle.SportsTechnologyStockNoGif.content : selectedArticle.SportsTechnologyStock.content}</p>
                        </div>
                    </div>
                    <div className="subhead" style={{justifyContent: "space-between"}}>
                        <div style={{textAlign: "center", flex: "1"}}>
                            <h1 className="subheadmobile" style={{
                                color:'white',
                                letterSpacing:'normal',
                                background: 'linear-gradient(to right,#2f2f2f,#008B00',
                                margin: ".5em 0 0em",
                                borderTop: '.1em solid #008B00',
                                borderBottom: '0.1em solid #008B00',
                                backgroundColor: '#008B00',
                                fontSize: '1.5rem',
                                marginBottom: ".5rem"
                            }}>Latest SportsTechnology Stock Videos</h1>
                            {/* Embed YouTube video */}
                            <div className="video-container" style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                                {renderVideos()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default SportsTechnologyStocksDetails;

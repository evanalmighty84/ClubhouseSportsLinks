import React, {useState, useEffect, useContext} from 'react';
import {Container} from "react-bootstrap";
import {ArticleContext} from '../../App';
import axios from "axios";
import '../../App.css';
import {InView} from 'react-intersection-observer';

const NILDetails = () => {
    const {selectedArticle} = useContext(ArticleContext);
    const [NILNoGifArray, setNILNoGifArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeVideo, setActiveVideo] = useState(false);

    const handleImageClick = () => {
        setActiveVideo(true);
    };

    useEffect(() => {
        axios.get(`/server/sports_future_info/fetchData`)
            .then(response => {
                setNILNoGifArray(response.data.NILNoGifNewspaper);
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

    if (!selectedArticle.NILNoGif && !selectedArticle.NIL) {
        return <div>No article selected or article data is missing.</div>;
    }
    const formattedContent = (content: any): JSX.Element => {
        const paragraphs = content.split('\n').filter((p: string) => p);
        return (
            <div className="text-content">
                {paragraphs.map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        );
    };
    const renderVideos = () => {

        const videos = [];

        if (selectedArticle.NILNoGif) {
            if (selectedArticle.NILNoGif.video1) {
                videos.push(
                    <iframe
                        key="video1"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.NILNoGif.video1}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none'}}
                    ></iframe>
                );
            }
            if (selectedArticle.NILNoGif.video2) {
                videos.push(
                    <iframe
                        key="video2"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.NILNoGif.video2}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none'}}
                    ></iframe>
                );
            }
            if (selectedArticle.NILNoGif.video3) {
                videos.push(
                    <iframe
                        key="video3"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.NILNoGif.video3}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none'}}
                    ></iframe>
                );
            }
        }

        if (selectedArticle.NIL) {

            if (selectedArticle.NIL.video2) {
                videos.push(
                    <iframe
                        key="video2"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.NIL.video2}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none'}}
                    ></iframe>
                );
            }
            if (selectedArticle.NIL.video3) {
                videos.push(
                    <iframe
                        key="video3"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.NIL.video3}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none'}}
                    ></iframe>
                );
            }
        }

        return   videos;
    };

    return (
        <Container style={{padding: '0px'}}>
            {
                selectedArticle.NILNoGif && selectedArticle.NILNoGif.video1 ? (
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', background: 'linear-gradient(to top,#2f2f2f,#008B00', borderColor: '#008B00' }}>
                        <iframe
                            key="video1"
                            title="YouTube Video"
                            width="600"
                            height="400"
                            src={selectedArticle.NILNoGif.video1}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ border: 'none' }}
                        ></iframe>
                    </div>
                ) : selectedArticle.NIL && selectedArticle.NIL.video1 ? (
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', background: 'linear-gradient(to top,#2f2f2f,#008B00', borderColor: '#008B00' }}>
                        <iframe
                            key="video1"
                            title="YouTube Video"
                            width="600"
                            height="400"
                            src={selectedArticle.NIL.video1}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ border: 'none' }}
                        ></iframe>
                    </div>
                ) : (
                    ''
                )
            }



            <h1 className="subheadmobile" style={{
                letterSpacing:'normal',
                fontWeight: '500',
                color:'white',
                textAlign:'center',
                background: 'linear-gradient(to right,#2f2f2f,#008B00',
                borderTop: '.1em solid #008B00',
                borderBottom: '0.1em solid #008B00',
                fontSize: '1.5rem',
                marginBottom: "0em"
            }}>{selectedArticle.NILNoGif ? selectedArticle.NILNoGif.title : selectedArticle.NIL.title}</h1>

            <div className="new-container" style={{padding: 'inherit'}}>
                <div className="head">
                    <div className="collumns">
                        <div className="collumn" style={{background: 'linear-gradient(to right,#2f2f2f,#008B00)',padding:'0px',marginBottom:'0px'}}>
                            <div className="head"></div>
                            <InView>
                                {({inView, ref}) => (
                                    <img style={{borderColor: 'white', borderTopColor: 'white'}}
                                         className={`media ${inView ? 'in-view' : ''}`}
                                         src={selectedArticle.NILNoGif ? selectedArticle.NILNoGif.url : selectedArticle.NIL.url}
                                         alt="" ref={ref}/>
                                )}
                            </InView>
                            <hr/>
                            <p style={{textAlign: 'left',color:'white'}}>{selectedArticle.NILNoGif ? formattedContent(selectedArticle.NILNoGif.content) : formattedContent(selectedArticle.NIL.content)}</p>
                        </div>
                    </div>
                    <div className="subhead" style={{justifyContent: "space-between"}}>
                        <div style={{textAlign: "center", flex: "1"}}>
                            {selectedArticle.NIL && selectedArticle.NIL.video2 && (
                                <span className="subheadmobile" style={{
                                    color: 'white',
                                    letterSpacing: 'normal',
                                    margin: ".5em 0 0em",
                                    borderBottom: '0.1em solid #008B00',
                                    fontSize: '1.5rem',
                                    marginBottom: ".5rem"
                                }}><h4 style={{borderBottom: '0.1em solid #008B00', borderTop: '0.1em solid #008B00',}}> {selectedArticle.NIL.title}</h4> </span>
                            )}
                            {selectedArticle.NILNoGif && selectedArticle.NILNoGif.video2 && (
                                <span className="subheadmobile" style={{
                                    color: 'white',
                                    letterSpacing: 'normal',
                                    margin: ".5em 0 0em",
                                    borderBottom: '0.1em solid #008B00',
                                    fontSize: '1.5rem',
                                    marginBottom: ".5rem"
                                }}><h4 style={{borderBottom: '0.1em solid #008B00', borderTop: '0.1em solid #008B00',}}> {selectedArticle.NILNoGif.title}</h4> </span>
                            )}

                            {/* Embed YouTube video */}
                            <div className="video-container" style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap',background:'linear-gradient(to bottom, rgb(47, 47, 47), #008B00)'}}>
                                {renderVideos()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default NILDetails;

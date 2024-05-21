import React, {useState, useEffect, useContext} from 'react';
import {Container} from "react-bootstrap";
import {ArticleContext} from '../../App';
import axios from "axios";
import '../../App.css';
import {InView} from 'react-intersection-observer';

const SportsTechnologyDetails = () => {
    const {selectedArticle} = useContext(ArticleContext);
    const [SportsTechnologyNoGifArray, setSportsTechnologyNoGifArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeVideo, setActiveVideo] = useState(false);

    const handleImageClick = () => {
        setActiveVideo(true);
    };

    useEffect(() => {
        axios.get(`/server/sports_business_info/fetchData`)
            .then(response => {
                setSportsTechnologyNoGifArray(response.data.SportsTechnologyNoGifNewspaper);
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

    if (!selectedArticle.SportsTechnologyNoGif && !selectedArticle.SportsTechnology) {
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

        if (selectedArticle.SportsTechnologyNoGif) {
            if (selectedArticle.SportsTechnologyNoGif.video1) {
                videos.push(
                    <iframe
                        key="video1"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.SportsTechnologyNoGif.video1}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none'}}
                    ></iframe>
                );
            }
            if (selectedArticle.SportsTechnologyNoGif.video2) {
                videos.push(
                    <iframe
                        key="video2"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.SportsTechnologyNoGif.video2}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none'}}
                    ></iframe>
                );
            }
            if (selectedArticle.SportsTechnologyNoGif.video3) {
                videos.push(
                    <iframe
                        key="video3"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.SportsTechnologyNoGif.video3}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none'}}
                    ></iframe>
                );
            }
        }

        if (selectedArticle.SportsTechnology) {

            if (selectedArticle.SportsTechnology.video2) {
                videos.push(
                    <iframe
                        key="video2"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.SportsTechnology.video2}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none'}}
                    ></iframe>
                );
            }
            if (selectedArticle.SportsTechnology.video3) {
                videos.push(
                    <iframe
                        key="video3"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.SportsTechnology.video3}
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
                selectedArticle.SportsTechnologyNoGif && selectedArticle.SportsTechnologyNoGif.video1 ? (
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', background: 'linear-gradient(to top,#2f2f2f,steelblue', borderColor: 'steelblue' }}>
                        <iframe
                            key="video1"
                            title="YouTube Video"
                            width="600"
                            height="400"
                            src={selectedArticle.SportsTechnologyNoGif.video1}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ border: 'none' }}
                        ></iframe>
                    </div>
                ) : selectedArticle.SportsTechnology && selectedArticle.SportsTechnology.video1 ? (
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', background: 'linear-gradient(to top,#2f2f2f,steelblue', borderColor: 'steelblue' }}>
                        <iframe
                            key="video1"
                            title="YouTube Video"
                            width="600"
                            height="400"
                            src={selectedArticle.SportsTechnology.video1}
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
                background: 'linear-gradient(to right,#2f2f2f,steelblue',
                borderTop: '.1em solid steelblue',
                borderBottom: '0.1em solid steelblue',
                fontSize: '1.5rem',
                marginBottom: "0em"
            }}>{selectedArticle.SportsTechnologyNoGif ? selectedArticle.SportsTechnologyNoGif.title : selectedArticle.SportsTechnology.title}</h1>

            <div className="new-container" style={{padding: 'inherit'}}>
                <div className="head">
                    <div className="collumns">
                        <div className="collumn" style={{background: 'linear-gradient(to right,#2f2f2f,steelblue)',padding:'0px',marginBottom:'0px'}}>
                            <div className="head"></div>
                            <InView>
                                {({inView, ref}) => (
                                    <img style={{borderColor: 'white', borderTopColor: 'white'}}
                                         className={`media ${inView ? 'in-view' : ''}`}
                                         src={selectedArticle.SportsTechnologyNoGif ? selectedArticle.SportsTechnologyNoGif.url : selectedArticle.SportsTechnology.url}
                                         alt="" ref={ref}/>
                                )}
                            </InView>
                            <hr/>
                            <p style={{textAlign: 'left',color:'white'}}>{selectedArticle.SportsTechnologyNoGif ? formattedContent(selectedArticle.SportsTechnologyNoGif.content) : formattedContent(selectedArticle.SportsTechnology.content)}</p>
                        </div>
                    </div>
                    <div className="subhead" style={{justifyContent: "space-between"}}>
                        <div style={{textAlign: "center", flex: "1"}}>
                            {selectedArticle.SportsTechnology && selectedArticle.SportsTechnology.video2 && (
                                <span className="subheadmobile" style={{
                                    color: 'white',
                                    letterSpacing: 'normal',
                                    margin: ".5em 0 0em",
                                    borderBottom: '0.1em solid steelblue',
                                    fontSize: '1.5rem',
                                    marginBottom: ".5rem"
                                }}><h4 style={{borderBottom: '0.1em solid steelblue', borderTop: '0.1em solid steelblue',}}> {selectedArticle.SportsTechnology.title}</h4> </span>
                            )}
                            {selectedArticle.SportsTechnologyNoGif && selectedArticle.SportsTechnologyNoGif.video2 && (
                                <span className="subheadmobile" style={{
                                    color: 'white',
                                    letterSpacing: 'normal',
                                    margin: ".5em 0 0em",
                                    borderBottom: '0.1em solid steelblue',
                                    fontSize: '1.5rem',
                                    marginBottom: ".5rem"
                                }}><h4 style={{borderBottom: '0.1em solid steelblue', borderTop: '0.1em solid steelblue',}}> {selectedArticle.SportsTechnologyNoGif.title}</h4> </span>
                            )}

                            {/* Embed YouTube video */}
                            <div className="video-container" style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap',background:'linear-gradient(to bottom, rgb(47, 47, 47), steelblue)'}}>
                                {renderVideos()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default SportsTechnologyDetails;

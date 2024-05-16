import React, {useState, useEffect, useContext} from 'react';
import {Container} from "react-bootstrap";
import {ArticleContext} from '../../App';
import axios from "axios";
import '../../App.css';
import {InView} from 'react-intersection-observer';

const YouthSportsDetails = () => {
    const {selectedArticle} = useContext(ArticleContext);
    const [YouthSportsNoGifArray, setYouthSportsNoGifArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeVideo, setActiveVideo] = useState(false);

    const handleImageClick = () => {
        setActiveVideo(true);
    };

    useEffect(() => {
        axios.get(`/server/sports_future_info/fetchData`)
            .then(response => {
                setYouthSportsNoGifArray(response.data.YouthSportsNoGifNewspaper);
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

    if (!selectedArticle.YouthSportsNoGif && !selectedArticle.YouthSports) {
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

        if (selectedArticle.YouthSportsNoGif) {
            if (selectedArticle.YouthSportsNoGif.video1) {
                videos.push(
                    <iframe
                        key="video1"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.YouthSportsNoGif.video1}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none'}}
                    ></iframe>
                );
            }
            if (selectedArticle.YouthSportsNoGif.video2) {
                videos.push(
                    <iframe
                        key="video2"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.YouthSportsNoGif.video2}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none'}}
                    ></iframe>
                );
            }
            if (selectedArticle.YouthSportsNoGif.video3) {
                videos.push(
                    <iframe
                        key="video3"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.YouthSportsNoGif.video3}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none'}}
                    ></iframe>
                );
            }
        }

        if (selectedArticle.YouthSports) {

            if (selectedArticle.YouthSports.video2) {
                videos.push(
                    <iframe
                        key="video2"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.YouthSports.video2}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{border: 'none'}}
                    ></iframe>
                );
            }
            if (selectedArticle.YouthSports.video3) {
                videos.push(
                    <iframe
                        key="video3"
                        title="YouTube Video"
                        width="300"
                        height="200"
                        src={selectedArticle.YouthSports.video3}
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
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap',  background: 'linear-gradient(to top,#2f2f2f,#de4e7f',borderColor:'#de4e7f'}}>
                {selectedArticle.YouthSportsNoGif ?     <iframe
                    key="video1"
                    title="YouTube Video"
                    width="600"
                    height="400"
                    src={selectedArticle.YouthSports.video1}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{border: 'none'}}
                ></iframe> :     <iframe
                    key="video1"
                    title="YouTube Video"
                    width="600"
                    height="400"
                    src={selectedArticle.YouthSports.video1}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{border: 'none'}}
                ></iframe>}
            </div>


            <h1 className="subheadmobile" style={{
                letterSpacing:'normal',
                fontWeight: '500',
                color:'white',
                textAlign:'center',
                background: 'linear-gradient(to right,#2f2f2f,#de4e7f',
                borderTop: '.1em solid #de4e7f',
                borderBottom: '0.1em solid #de4e7f',
                fontSize: '1.5rem',
                marginBottom: "0em"
            }}>{selectedArticle.YouthSportsNoGif ? selectedArticle.YouthSportsNoGif.title : selectedArticle.YouthSports.title}</h1>

            <div className="new-container" style={{padding: 'inherit'}}>
                <div className="head">
                    <div className="collumns">
                        <div className="collumn" style={{background: 'linear-gradient(to right,#2f2f2f,#de4e7f)',padding:'0px',marginBottom:'0px'}}>
                            <div className="head"></div>
                            <InView>
                                {({inView, ref}) => (
                                    <img style={{borderColor: 'white', borderTopColor: 'white'}}
                                         className={`media ${inView ? 'in-view' : ''}`}
                                         src={selectedArticle.YouthSportsNoGif ? selectedArticle.YouthSportsNoGif.url : selectedArticle.YouthSports.url}
                                         alt="" ref={ref}/>
                                )}
                            </InView>
                            <hr/>
                            <p style={{textAlign: 'left',color:'white'}}>{selectedArticle.YouthSportsNoGif ? formattedContent(selectedArticle.YouthSportsNoGif.content) : formattedContent(selectedArticle.YouthSports.content)}</p>
                        </div>
                    </div>
                    <div className="subhead" style={{justifyContent: "space-between"}}>
                        <div style={{textAlign: "center", flex: "1"}}>
                            {selectedArticle.YouthSports && selectedArticle.YouthSports.video2 && (
                                <span className="subheadmobile" style={{
                                    color: 'white',
                                    letterSpacing: 'normal',
                                    margin: ".5em 0 0em",
                                    borderBottom: '0.1em solid #de4e7f',
                                    fontSize: '1.5rem',
                                    marginBottom: ".5rem"
                                }}><h4 style={{borderBottom: '0.1em solid #de4e7f', borderTop: '0.1em solid #de4e7f',}}> {selectedArticle.YouthSports.title}</h4> </span>
                            )}
                            {selectedArticle.YouthSportsNoGif && selectedArticle.YouthSportsNoGif.video2 && (
                                <span className="subheadmobile" style={{
                                    color: 'white',
                                    letterSpacing: 'normal',
                                    margin: ".5em 0 0em",
                                    borderBottom: '0.1em solid #de4e7f',
                                    fontSize: '1.5rem',
                                    marginBottom: ".5rem"
                                }}><h4 style={{borderBottom: '0.1em solid #de4e7f', borderTop: '0.1em solid #de4e7f',}}> {selectedArticle.YouthSportsNoGif.title}</h4> </span>
                            )}

                            {/* Embed YouTube video */}
                            <div className="video-container" style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap',background:'linear-gradient(to bottom, rgb(47, 47, 47), #de4e7f)'}}>
                                {renderVideos()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default YouthSportsDetails;

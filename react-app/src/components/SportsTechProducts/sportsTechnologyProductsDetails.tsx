import React, {useState, useEffect, useContext} from 'react';
import {Container} from "react-bootstrap";
import {ArticleContext} from '../../App';
import axios from "axios";
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
        axios.get(`/server/sports_info_table_source/fetchData`)
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

    return (
        <Container style={{padding: '0px'}}>
            <h1 className="subheadmobile" style={{
                background: 'linear-gradient(to right,#2f2f2f,brown',
                margin: ".5em 0 0em",
                borderTop: '.1em solid indianred',
                borderBottom: '0.1em solid indianred',
                backgroundColor: 'brown',
                fontSize: '1.5rem',
                marginBottom: ".5rem"
            }}>{selectedArticle.SportsTechnologyNoGif ? selectedArticle.SportsTechnologyNoGif.title : selectedArticle.SportsTechnology.title}</h1>


            <div className="new-container" style={{padding: 'inherit'}}>
                <div className="head">
                    <div className="collumns">
                        <div className="collumn" style={{background: 'linear-gradient(to right,#2f2f2f,brown)'}}>
                            <div className="head"></div>
                            <InView>
                                {({inView, ref}) => (
                                    <img style={{borderColor: 'gold', borderTopColor: 'gold'}}
                                         className={`media ${inView ? 'in-view' : ''}`}
                                         src={selectedArticle.SportsTechnologyNoGif ? selectedArticle.SportsTechnologyNoGif.url : selectedArticle.SportsTechnology.url}
                                         alt="" ref={ref}/>
                                )}
                            </InView>
                            <hr/>
                            <p style={{textAlign: 'left'}}>{selectedArticle.SportsTechnologyNoGif ? selectedArticle.SportsTechnologyNoGif.content : selectedArticle.SportsTechnology.content}</p>

                        </div>
                    </div>
                    <div className="subhead" style={{justifyContent: "space-between"}}>
                        <div style={{textAlign: "center", flex: "1"}}>
                            <h1 className="subheadmobile" style={{
                                background: 'linear-gradient(to right,#2f2f2f,brown',
                                margin: ".5em 0 0em",
                                borderTop: '.1em solid indianred',
                                borderBottom: '0.1em solid indianred',
                                backgroundColor: 'brown',
                                fontSize: '1.5rem',
                                marginBottom: ".5rem"
                            }}>Latest Sports Technology Videos</h1>
                            {/* Embed YouTube video */}
                            <div className="video-container">
                                {selectedArticle.SportsTechnologyNoGif && (
                                    <>
                                        {selectedArticle.SportsTechnologyNoGif.video1 && (
                                            <iframe
                                                title="YouTube Video"
                                                width="300"
                                                height="200"
                                                src={selectedArticle.SportsTechnologyNoGif.video1}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{border: 'none'}}
                                            ></iframe>
                                        )}
                                        {selectedArticle.SportsTechnologyNoGif.video2 && (
                                            <iframe
                                                title="YouTube Video"
                                                width="300"
                                                height="200"
                                                src={selectedArticle.SportsTechnologyNoGif.video2}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{border: 'none'}}
                                            ></iframe>
                                        )}
                                        {selectedArticle.SportsTechnologyNoGif.video3 && (
                                            <iframe
                                                title="YouTube Video"
                                                width="300"
                                                height="200"
                                                src={selectedArticle.SportsTechnologyNoGif.video3}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{border: 'none'}}
                                            ></iframe>
                                        )}
                                    </>
                                )}
                                {selectedArticle.SportsTechnology && (
                                    <>
                                        {selectedArticle.SportsTechnology.video1 && (
                                            <iframe
                                                title="YouTube Video"
                                                width="300"
                                                height="200"
                                                src={selectedArticle.SportsTechnology.video1}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{border: 'none'}}
                                            ></iframe>
                                        )}
                                        {selectedArticle.SportsTechnology.video2 && (
                                            <iframe
                                                title="YouTube Video"
                                                width="300"
                                                height="200"
                                                src={selectedArticle.SportsTechnology.video2}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{border: 'none'}}
                                            ></iframe>
                                        )}
                                        {selectedArticle.SportsTechnology.video3 && (
                                            <iframe
                                                title="YouTube Video"
                                                width="300"
                                                height="200"
                                                src={selectedArticle.SportsTechnology.video3}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                style={{border: 'none'}}
                                            ></iframe>
                                        )}
                                    </>
                                )}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default SportsTechnologyDetails;

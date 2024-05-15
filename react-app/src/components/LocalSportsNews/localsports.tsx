import React, {useEffect, useState} from 'react';
import axios from "axios";
import NewspaperArticles from "./newspaperLocalSports";

const LocalSports = () => {
    const [location, setLocation] = useState(null);
    const [newsPaperObject, setNewsPaperObject] = useState({});
    const [newsPaperObjectB, setNewsPaperObjectB] = useState({});
    const [newsPaperObject2, setNewsPaperObject2] = useState({});
    const [newsPaperObject2B, setNewsPaperObject2B] = useState({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        color: 'white',
        paddingTop: '1em'
    };

    const columnStyle1: React.CSSProperties = {
        borderRightStyle: 'solid',
        marginRight: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'start',
        marginTop: '1em'

    };
    const columnStyle2: React.CSSProperties = {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2f2f2f',
        marginTop: '1em',
        borderRadius: '.1em'
    };
    const columnStyle3: React.CSSProperties = {
        borderLeftStyle: 'solid',
        marginLeft: '1em',
        padding: '.5em',
        paddingTop: '.1em',
        display: 'flex',
        justifyContent: 'end',
        marginTop: '1em'

    };
    const timelineStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        marginTop: '0px',
        marginBottom: '0px',
    };

    const iframeStyle: React.CSSProperties = {
        position: 'static',
        visibility: 'visible',
        display: 'block',
        flexGrow: 1,
        width: '100%', // Make the iframe fill its container horizontally
        height: '700px', // Set the initial height (you can adjust this as needed)
        overflow: 'auto',
    };
    const hideColumnsStyle: React.CSSProperties = {
        display: windowWidth < 1076 ? 'none' : 'flex', // Hide the columns when width is below 576px
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        let isMounted = true; // Flag to check if the component is still mounted

        // Set a timeout to limit the frequency of the network call
        const timeout = setTimeout(() => {
            if (isMounted) { // Check if the component is still mounted before making the call
                const handleGetLocation = () => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                const { latitude, longitude } = position.coords;
                                // @ts-ignore
                                setLocation({ latitude, longitude });

                                // Check if data is already present in sessionStorage or localStorage
                                const storedFilteredData = sessionStorage.getItem('filteredDataWithTitle2');
                                const storedNoPictureFilteredData = sessionStorage.getItem('noPictureFilteredDataWithTitle2');

                                if (storedFilteredData && storedNoPictureFilteredData) {
                                    // Data is present, use it instead of making an API request
                                    setNewsPaperObject(JSON.parse(storedFilteredData));
                                    setNewsPaperObjectB(JSON.parse(storedNoPictureFilteredData));
                                    console.log(`it didn't make the api call`)
                                } else {
                                    // Data not present, make an API request
                                    axios
                                        .post('/server/sports_info_table_source/submitLocation', {
                                            latitude,
                                            longitude,
                                        })
                                        .then((response) => {
                                            const filteredDataWithTitle2 = response.data.filteredDataWithTitle2;
                                            const noPictureFilteredDataWithTitle2 =
                                                response.data.noPictureFilteredDataWithTitle2;

                                            // Store data in sessionStorage
                                            sessionStorage.setItem(
                                                'filteredDataWithTitle2',
                                                JSON.stringify(filteredDataWithTitle2)
                                            );
                                            sessionStorage.setItem(
                                                'noPictureFilteredDataWithTitle2',
                                                JSON.stringify(noPictureFilteredDataWithTitle2)
                                            );

                                            setNewsPaperObject(filteredDataWithTitle2);
                                            setNewsPaperObjectB(noPictureFilteredDataWithTitle2);
                                        })
                                        .catch((error) => {
                                            console.error('Error fetching data:', error);
                                        });
                                }
                            },
                            (error) => {
                                console.error('Error getting location:', error.message);
                            }
                        );
                    } else {
                        console.error('Geolocation is not supported by your browser');
                    }
                };

                // Trigger the location retrieval
                handleGetLocation();
            }
        }, 3000); // Adjust the timeout duration as needed (here it's set to 3 seconds)

        // Cleanup function to clear the timeout and prevent memory leaks
        return () => {
            isMounted = false; // Set the flag to false when the component unmounts
            clearTimeout(timeout); // Clear the timeout
        };
    }, []);


// ...
    ; // The empty dependency array ensures that this effect runs only once when the component mounts

    return (
        <div style={containerStyle}>
            <div style={windowWidth < 1076 ? hideColumnsStyle : columnStyle1}>
       {/*         <div className="twitter-timeline twitter-timeline-rendered" style={timelineStyle}>
                    <iframe
                        id="twitter-widget-0"
                        scrolling="no"
                        frameBorder="0"
                        allowTransparency
                        allowFullScreen
                        className=""
                        style={iframeStyle}
                        title="Twitter Timeline"
                        src="https://syndication.twitter.com/srv/timeline-profile/screen-name/GenXMediaGuide?dnt=false&amp;embedId=twitter-widget-0&amp;features=..."
                    ></iframe>
                </div>*/}
            </div>
            <div style={columnStyle2}>
                <div className="twitter-timeline twitter-timeline-rendered" style={timelineStyle}>
                    <NewspaperArticles serpApiArticles={newsPaperObject}

                    />
                </div>
            </div>
            <div style={windowWidth < 1076 ? hideColumnsStyle : columnStyle3}>
                <div className="twitter-timeline twitter-timeline-rendered" style={timelineStyle}>
                    <iframe
                        id="twitter-widget-2"
                        scrolling="no"
                        frameBorder="0"
                        allowTransparency
                        allowFullScreen
                        className=""
                        style={iframeStyle}
                        title="Twitter Timeline"
                        src="https://syndication.twitter.com/srv/timeline-profile/screen-name/GenXMediaGuide?dnt=false&amp;embedId=twitter-widget-2&amp;features=..."
                    ></iframe>
                </div>
            </div>
          {/*  <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>*/}
        </div>
    );
};

export default LocalSports;

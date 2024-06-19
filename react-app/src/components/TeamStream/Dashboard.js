import './teamstream.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import youthSportsEmoji from "../icon2.svg";
import profilePicEmoji from "../profile-pic.svg"
import rokuEmoji from "../roku.svg"
import {useNavigate} from "react-router-dom";
import videoEmoji from "../static/animations/recording-blink.json"
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
  ButtonGroup
} from "react-bootstrap";
import Gif from "../appstore-login/TeamStreamFinal.gif";


function Dashboard({Email,LeagueName,TeamName,AccessToken,Permission,JoinLiveButton,MeetingId}) {

  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const handleJoinClick = () => {
    if (AccessToken && TeamName && Permission && Email && LeagueName && MeetingId && JoinLiveButton) {
      navigate(`/app/LeagueStream`, {
        state: {
          Email,
          AccessToken,
          TeamName,
          Permission,
          MeetingId,
          LeagueName,
          JoinLiveButton
        }
      });
    } else {
      console.log('All required information is not available');
    }
  };
  const handleCreateClick = () => {
    if (AccessToken && TeamName && Permission && Email && LeagueName) {
      navigate(`/app/LeagueStream`, {
        state: {
          Email,
          AccessToken,
          TeamName,
          Permission,
          LeagueName,
        }
      });
    } else {
      console.log('All required information is not available');
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const teamName =  TeamName;
      const leagueName = LeagueName;
      try {
        const response = await axios.post('/server/sports_business_info/api/TeamStreamRecordings', { teamName, leagueName });
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [TeamName, LeagueName]);


  return (
      <>
        <Container fluid>
          <Row className='roku-row'>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body className='roku-c-body'>
                  <Row>
                    <Col xs="7">
                      <img src={rokuEmoji} alt="roku" style={{ width: '100%', height: 'auto',border:'none' }} />
                      <div className="numbers">
                        <p className="card-category">Personalized Roku Feed #1</p>
                        <Card.Title as="h4">Youth Sports</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="fas fa-redo mr-1"></i>
                    Update Now
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body className='roku-c-body'>
                  <Row>

                    <Col xs="7">
                      <img src={rokuEmoji} alt="roku" style={{ width: '100%', height: 'auto',border:'none' }} />
                      <div className="numbers">
                        <p className="card-category">Personalized Roku Feed #2</p>
                        <Card.Title as="h4">NIL</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="far fa-clock-o mr-1"></i>
                    Update Now
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body className='roku-c-body'>
                  <Row>
                    <Col xs="7">
                      <img src={rokuEmoji} alt="roku" style={{ width: '100%', height: 'auto',border:'none' }} />
                      <div className="numbers">
                        <p className="card-category">Personalized Roku Feed #3</p>
                        <Card.Title as="h4"> Tech Stocks</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="far fa-clock-o mr-1"></i>
                    Update Now
                  </div>
                </Card.Footer>
              </Card>
            </Col>
            <Col lg="3" sm="6">
              <Card className="card-stats">
                <Card.Body className='roku-c-body'>
                  <Row>
                    <Col xs="7">
                      <img src={rokuEmoji} alt="roku" style={{ width: '100%', height: 'auto',border:'none' }} />
                      <div className="numbers">
                        <p className="card-category">Personalized Roku Feed #4</p>
                        <Card.Title as="h4"> Medium Articles</Card.Title>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="fas fa-redo mr-1"></i>
                    Update now
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Card className="teamstream-card-container">
                <Card.Header className="teamstream-card-header">
                  <Card.Title as="h4">Team Stream</Card.Title>
                  <p className="card-category">All products including Taxes</p>
                </Card.Header>
                <Card.Body className="teamstream-card-body">
                  <div className="ct-chart" id="chartActivity">
                    <img src={Gif} style={{width:'100%'}} alt="Youth Sports" className="hero-video"  />
                  </div>
                </Card.Body>
                <Card.Footer>
                  <div className="legend">
                    <i className="fas fa-circle text-info"></i>
                    {TeamName}<i className="fas fa-circle text-danger"></i>
                    <div>  {LeagueName}</div>

                  </div>
                  <hr style={{backgroundColor:'white'}}></hr>
                  <Card.Body className="teamstream-card-info">
                    <Row>
                      {/* Image and Icon Column */}
                      <Col xs={12}>
                        <img src={profilePicEmoji} alt="Profile Pic" style={{ width: '100%', height: 'auto' }} />
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-favourite-28 text-primary"></i>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className="numbers">
                          <p className="card-category">{Email}</p>
                          <p className="card-category">{LeagueName}</p>
                          <p className="card-category">{TeamName}</p>
                          <div style={{margin:'1em'}}>
                            {JoinLiveButton ? (
                                <Button variant={"danger"} onClick={handleJoinClick} className="card-category">Join Live Team Stream</Button>
                            ) : (
                                <Button variant={"danger"} onClick={handleCreateClick} className="card-category">Create a Meeting</Button>
                            )}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card.Footer>
                <Card.Body style={{backgroundColor:'#2f2f2f'}} className="teamstream-card-info">
                  <Row style={{backgroundColor:'orange'}}>
                    <Col xs={12}>
                      <h1>Video Links</h1>
                      <div className="table-responsive">
                        <Table striped bordered hover className="wrapped-table">
                          <thead>
                          <tr>
                            <th>#</th>
                            <th>Videos</th>
                            <th>Actions</th>
                          </tr>
                          </thead>
                          <tbody>
                          {videos?.map((video, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="wrapped-cell">
                                  <a href={video.url} download target="_blank" rel="noopener noreferrer">
                                    {video.public_id}
                                  </a>
                                </td>
                                <td className="td-actions text-right">
                                  <OverlayTrigger
                                      overlay={<Tooltip id={`tooltip-edit-${index}`}>Edit Task..</Tooltip>}
                                  >
                                    <Button className="btn-simple btn-link p-1" type="button" variant="info">
                                      <i className="fas fa-edit"></i>
                                    </Button>
                                  </OverlayTrigger>
                                  <OverlayTrigger
                                      overlay={<Tooltip id={`tooltip-remove-${index}`}>Remove..</Tooltip>}
                                  >
                                    <Button className="btn-simple btn-link p-1" type="button" variant="danger">
                                      <i className="fas fa-times"></i>
                                    </Button>
                                  </OverlayTrigger>
                                </td>
                              </tr>
                          ))}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md="6">
              <Card className="roku-channel-container">
                <Card.Header className="roku-card-header">
                  <Card.Title as="h4">Personal Roku Interests Feed</Card.Title>
                  <span className="card-category">Choose 3 channel options for your Roku Stream</span>
                  <span>Download Roku now and look for the the channel Clubhouse Links. Then Sign into your account to see your personalied entertainment channel</span>
                </Card.Header>
                <Card.Body className="roku-channels-card-body">
                  <div className="container">
                    {/* First Column */}
                    <div className="column">
                      <h3 className="roku-selection">Trending</h3>
                      <div className="button-group" style={{ '--gradient-start': '#2f2f2f', '--gradient-end': 'brown' }}>
                        <button>Sports Ownership</button>
                        <button>Sports Technology</button>
                        <button>Sports Technology Stock</button>
                        <button>Name Image Likeness</button>
                        <button>Youth Sports</button>
                        <button>Local Sports</button>
                        <button>Winnovative App Store Login</button>
                      </div>
                    </div>

                    {/* Second Column */}
                    <div className="column">
                      <h3 className="roku-selection">Podcasts</h3>
                      <div className="button-group" style={{ '--gradient-start': '#2f2f2f', '--gradient-end': '#de4e7f' }}>
                        <button>The greatest of all time</button>
                        <button>Sports Fashion</button>
                        <button>Pros vs Joes</button>
                        <button>True Crime Sports</button>
                        <button>Sports Tea</button>
                        <button>Parents know best</button>
                      </div>
                    </div>

                    {/* Third Column */}
                    <div className="column">
                      <h3 className="roku-selection">Pro Sports</h3>
                      <div className="button-group" style={{ '--gradient-start': '#2f2f2f', '--gradient-end': 'steelblue' }}>
                        <button>NFL</button>
                        <button>NBA</button>
                        <button>MLS</button>
                        <button>WNBA</button>
                        <button>MLB</button>
                        <button>NFL</button>
                        <button>PGA</button>
                      </div>
                    </div>

                    {/* Fourth Column */}
                    <div className="column">
                      <h3 className="roku-selection">Articles</h3>
                      <div className="button-group" style={{ '--gradient-start': '#2f2f2f', '--gradient-end': 'cadetblue' }}>
                        <button>Facebook</button>
                        <button>Medium</button>
                        <button>Vocal</button>
                        <button>Reddit</button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer style={{backgroundColor:"#6f1ab1",color:'white'}}>
                  <hr></hr>
                  <div className="stats">
                    <i className="now-ui-icons loader_refresh spin"></i>
                    Updated 3 minutes ago
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
  );
}

export default Dashboard;

// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import stockEmoji from "../memphis-risk-management-kpi-and-metrics.png";
// @ts-ignore
import nilEmoji from "../memphis-financial-success-and-economic-growth (1).png";
// @ts-ignore
import youthSportsEmoji from "../memphis-brainstorm-innovation-creativity-and-teamwork.png";
// @ts-ignore
import sportsTechnologyEmoji from "../memphis-ai-and-artificial-neural-networks (1).png";
// @ts-ignore
import sportsOwnershipEmoji from "../memphis-market-segmentation-and-targeted-advertising.png";
// @ts-ignore
import localSportsEmoji from "../memphis-studying-geography-with-a-globe.png";
// @ts-ignore
import appStoreEmoji from "../memphis-biometric-authentication-and-account-login.gif";


const Header = () => {
    const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsHeaderExpanded(false); // Collapse the navbar on component mount
    }, []);

    const handleToggle = () => {
        setIsHeaderExpanded(!isHeaderExpanded);
    };

    const getBorderColor = (path) => {
        switch (path) {
            case '/app/sportsOwnership': return 'brown';
            case '/app/sportsTechProducts': return 'steelblue';
            case '/app/youthSports': return '#de4e7f';
            case '/app/NIL': return '#008B00';
            case '/app/sportsTechnologyStocks': return 'cadetblue';
            case '/app/localSportsNews': return 'gold';
            case '/app/appstore': return 'orange';
            default: return 'transparent';
        }
    };



    const getNavLinkStyle = (path) => {
        let style = {
            color: 'white', // Default text color
            backgroundColor: 'transparent', // Default background color
            borderWidth: '.4em',
            borderStyle: 'solid',
            borderColor: 'transparent' // Default border color
        };
        switch (path) {
            case '/app/sportsOwnership':
                style.backgroundColor= 'brown';
                    style.color= 'white';
                style.borderColor = 'white';
                style.color = 'brown';
                break;
            case '/app/sportsTechProducts':
                style.backgroundColor= 'steelblue';
                    style.color= 'white';
                style.borderColor = 'white';
                style.color = 'steelblue';
                break;
            case '/app/youthSports':
                style.backgroundColor= '#de4e7f';
                    style.color= 'white';
                style.borderColor = 'white';
                style.color = "#de4e7f";
                break;
            case '/app/NIL':
                style.backgroundColor= '#008B00';
                    style.color= 'white';
                style.borderColor = 'white';
                style.color = "#008B00";
                break;
            case '/app/sportsTechnologyStocks':
                style.backgroundColor= 'cadetblue';
                    style.color= 'white';
                style.borderColor = 'white';
                style.color = 'cadetblue';
                break;
            case '/app/localSportsNews':
                style.backgroundColor= 'gold';
                    style.color= 'white';
                style.borderColor = 'white';
                style.color = 'gold';
                break;
            case '/app/appstore':
                style.backgroundColor= 'orange';
                    style.color= 'white';
                style.borderColor = 'white';
                style.color = 'orange';
                break;
            default:
                style.borderColor = 'white';
                style.color = 'white';
        }



        return style;
    };



    const navItems = [
        { path: '/app/sportsOwnership', label: 'Sports Ownership News', icon: sportsOwnershipEmoji },
        { path: '/app/sportsTechProducts', label: 'Sports Technology Products', icon: sportsTechnologyEmoji },
        { path: '/app/sportsTechnologyStocks', label: 'Sports Technology Stock', icon: stockEmoji },
        { path: '/app/NIL', label: 'Name Image Likeness', icon: nilEmoji },
        { path: '/app/youthSports', label: 'Youth Sports', icon: youthSportsEmoji },
        { path: '/app/localSportsNews', label: 'Local Sports News', icon: localSportsEmoji },
        { path: '/app/appstore', label: 'Winnovative App Store/login', icon: appStoreEmoji }
    ];

    const renderNavLink = (item) => (
        <Nav.Link
            key={item.path}
            onClick={handleToggle}
            className="evanston-tavern navLinkHover"
            style={{
                ...getNavLinkStyle(item.path),
                flex: '1 0 0', // Equal width for each link

                justifyContent: 'center',
                alignItems: 'center', // Center content vertically

            }}
            as={NavLink}
            to={item.path}
        >
            <div className="navlinkText" style={{
                width: '100%',
                flexDirection: 'column', // Stack items vertically
                justifyContent: 'center', // Center vertically
                alignItems: 'center', // Center horizontally
                textAlign: 'center',
                color:'white',
                border: getNavLinkStyle(location.pathname === item.path ? item.path : '/').borderWidth + ' solid',
                borderColor: getNavLinkStyle(location.pathname === item.path ? item.path : '/').backgroundColor
            }}>
                <img style={{ maxWidth: '100%', height: 'auto', marginBottom: '5px',border:'none' }} src={item.icon} />
                <div>{item.label}</div>
            </div>
        </Nav.Link>
    );



    return (
        <div className="headerSection">
            <Navbar className={`menu-container ${isHeaderExpanded ? 'open' : ''}`} onToggle={handleToggle} expanded={isHeaderExpanded} variant="dark" collapseOnSelect expand="sm">
                <Navbar.Toggle
                    className="custom-toggler"
                    style={{
                        borderRadius: '0px',
                        borderRight: 'none',
                        backgroundImage: "url('data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='white' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")"
                    }}
                    aria-controls="basic-navbar-nav"
                />
                <a className="hamburger-text" href={'/app/'}> <span>Clubhouse Links</span></a>
                <Navbar.Collapse id="basic-navbar-nav" style={{ border: 'solid', borderWidth: '.5em', borderColor: getBorderColor(location.pathname) }}>
                    <Nav className="mr-auto" style={{ display: 'flex', width: '100%' }}>
                        {navItems.map(renderNavLink)}
                    </Nav>
                </Navbar.Collapse>
                <Nav.Link
                    as={NavLink}
                    to="/"
                    className="ml-auto"
                    style={{
                        display: isHeaderExpanded ? 'none' : 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                </Nav.Link>
            </Navbar>
        </div>
    );
};

export default Header;

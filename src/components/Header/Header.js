import React, { useContext } from 'react';
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Logo from '../../Icon/Logo.png'
import { Link, useLocation } from 'react-router-dom';
import { UserDetails } from '../../App';
import firebase from "firebase/app";

const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserDetails);
    
  const location = useLocation();
    const faBar = <FontAwesomeIcon icon={faBars} />
    function handleBurger(){
        let nav = document.getElementById("header-nav-links-id");
        if(nav.className === "header-nav-links"){
            nav.className += " responsive";
        }
        else{
            nav.className = "header-nav-links";
        }
    }

    return (
        <div className="header-container">
            <header className="header">
                <div className="header-logo">
                    <Link to="/home"><img className={`${
                        location.pathname.includes("/login") ? 'logo-2' 
                        : location.pathname.includes("/booked") ? 'logo-2' 
                        : location.pathname.includes("/signup") ? 'logo-2'
                        :  'logo'}`} 
                        src={Logo} alt=""/>
                    </Link>
                </div>
                <div className={
                    `${location.pathname.includes("/login") ? 'search-container-2' 
                    :  location.pathname.includes("/booked") ? 'search-container-2'
                    :  location.pathname.includes("/signup") ? 'search-container-2' 
                    : 'search-container'}`
                    }>
                    <form action="">
                        <input type="text" placeholder="Search your Destination.." name="search"/>
                    </form>
                </div>
                <div onClick={handleBurger} className={
                    `${location.pathname.includes("/login") ? 'header-hamburger-2' 
                    : location.pathname.includes("/booked") ? 'header-hamburger-2'
                    : location.pathname.includes("/signup") ? 'header-hamburger-2'
                    : 'header-hamburger'}`
                    }>
                    <h4>{faBar}</h4>
                </div>
                <nav className="header-nav">
                    <ul className={
                        `${location.pathname.includes("/login") ? 'header-nav-links-2' 
                        : location.pathname.includes("/booked") ? 'header-nav-links-2'
                        : location.pathname.includes("/signup") ? 'header-nav-links-2' 
                        : 'header-nav-links'}`
                        } id="header-nav-links-id">
                        <li><Link style={{ textDecoration: 'none' }} to="">News</Link></li>
                        <li><Link style={{ textDecoration: 'none' }} to="">Destination</Link></li>
                        <li><Link style={{ textDecoration: 'none' }} to="">Blog</Link></li>
                        <li><Link style={{ textDecoration: 'none' }} to="">Contact</Link></li>

                        {loggedInUser.success ? 
                        <div className="dropdown">
                            <li style={{textTransform:'uppercase', fontSize:'25px', color:'orange'}}>{loggedInUser.name}</li>
                            <div onClick={()=> setLoggedInUser({})} className="dropdown-content">
                                <a href="#">Log Out</a>
                            </div>
                        </div>
                        

                        :<Link to="/login"><button className="btn-main">Login</button></Link>}
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;
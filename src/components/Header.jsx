import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNav = () => {

    const openNav = () => {
        document.getElementById("sidenav-mobile").style.width = "60vw";
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-light header-custom" >
            <div className="container-fluid" >
                <div className="header-content-container">
                    <div style={{flex: 1}}>
                        <button onClick={openNav} className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-brand logo-container">
                            <Link to='/personnel'>
                                <img src={window.location.origin + '/638-6386919_react-logo-png.png'} className="logo" alt="Gadjian" srcSet=""/>
                            </Link>
                            {/* GADJIAN */}
                        </div>
                    </div>
                    <div style={{flex: 2}}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent:'flex-end'}}>
                            <div className="header-username">
                                Hallo, <span style={{ color: '#23c7c6', fontWeight: 'bold' }}>Gadjian User</span>
                            </div>
                            <div style={{ display: 'flex', alignItems:'center', justifyContent: 'center', height: '40px', width: '40px', maxHeight: '40px', maxWidth: '40px', border: '1px solid grey', margin: '0 5px 0 5px', borderRadius: '50%'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="grey" className="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav> 
    )
}

export default HeaderNav;
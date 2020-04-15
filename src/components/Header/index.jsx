import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Header(listWays) {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className='container'>
                    <Link to="/" className="navbar-brand"> Blog Nevola </Link>
                    <ul className="navbar-nav justify-content-end">
                        {
                            listWays.way.map((element, index) => {
                                return (
                                    <li key={index} className="nav-item">
                                        <Link className="nav-link" to={element.way}> {element.nameWay} </Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
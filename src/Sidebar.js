import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import { Link } from "react-router-dom";
import { SidebarData } from './nav';
import './nav.css';
import { IconContext } from 'react-icons';
import download from './login.png';

function Sidebar() {
  const [sidebar, setSidebar] = useState(true);
    

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
      
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' >
            <li className='navbar-toggle'>
            <img src = {download} style = {{width:"140px" , height :"30px",pointerEvents:"all"}}/>

            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar ;

import React from 'react';
import '../App.css';
import { SideBarData } from './SideBarData';

function SideBar() {
  return (
    <div className = 'Sidebar'>
        <div className='logo'>LOGO</div>
        <ul className='Sidebarlist'>{SideBarData.map((val, key) => {
        return <li key={key} className='row' id={window.location.pathname === val.link ? "active" : ""} onClick={
            () => {window.location.pathname = val.link;}
        }> <div id='icon'>{val.icon}</div>
        <div id='title'>{val.title}</div></li>
    })}</ul></div>
  )
}

export default SideBar;
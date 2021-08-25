import React from 'react';
import './Sidebar.css';
import SidebarOptions from './SidebarOptions/SidebarOptions';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <SidebarOptions></SidebarOptions>
        </div>
    );
};

export default Sidebar;
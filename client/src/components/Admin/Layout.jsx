import React, {useContext} from 'react';
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex">
            <Sidebar/>
            <div className="w-full ml-16 md:ml-56">
                <Header/>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;
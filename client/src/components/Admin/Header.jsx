import React, {useContext, useEffect, useRef, useState} from 'react';
import { GoBell } from "react-icons/go";
import {AuthContext} from "../../context/AuthContext.jsx";

const Header = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const user = JSON.parse(localStorage.getItem("userData"))

    useEffect(() => {
        const handleClickOutside = (event) =>{
            if (menuRef.current && !menuRef.current.contains(event.target)){
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex justify-between items-center p-4">
            <div>
                <h1 className="text-xs">Welcome!</h1>
                <p className="text-xl font-semibold">{user.username}</p>
            </div>
            <div className="flex items-center space-x-5">
                <div className="hidden md:flex">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:right-2 focus:ring-indigo-600"
                    />
                </div>
                <div className="relative flex items-center space-x-5 s">
                    <button className="relative text-2xl text-gray-600">
                        <GoBell size={28}/>
                        <span
                            className="absolute top-0 right-0 -mt-1 -mr-1 flex justify-center items-center bg-indigo-600 text-white font-semibold text-[10px] w-5 h-4 rounded-full border-2 border-white">
                            9
                        </span>
                    </button>
                    <div ref={menuRef}>
                        <img
                            className="w-8 g-8 rounded-full border-4 border-indigo-400 cursor-pointer"
                            src="http://randomuser.me/api/portraits/women/50.jpg"
                            alt=""
                            onClick={()=>setOpen(!open)}
                        />
                        {open && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                                <a href="/login" className="block px-4 py-2 hover:bg-gray-100">Сhange the Account</a>
                                <a href="/main" className="block px-4 py-2 hover:bg-gray-100">Home</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
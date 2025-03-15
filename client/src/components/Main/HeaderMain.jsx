import React, {useContext, useEffect, useRef, useState} from 'react';
import {GoBell} from "react-icons/go";
import {AuthContext} from "../../context/AuthContext.jsx";
import {Link} from 'react-router-dom';
import {GrLogin} from 'react-icons/gr';
import {Md3dRotation} from "react-icons/md";
import axios from "axios";

const Header = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const user = JSON.parse(localStorage.getItem("userData"))
    const {logout, userProjects, userFiles} = useContext(AuthContext)

    useEffect(() => {
        const response = async () => {
            try {
                const resp = await axios.get(`/api/file/userfiles/${user.userID}`)
                userProjects(resp.data)
            } catch (error) {
                console.log(error)
            }
        }
        response()

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
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
                {
                    user ?
                        <p className="text-xl font-semibold">{user.username}</p>
                        :
                        <p className="text-xl font-semibold">No name</p>
                }
            </div>
            <div className="flex items-center space-x-5">
                <div className="relative flex items-center space-x-5 s">
                    <button className="relative text-2xl text-gray-600">
                        <GoBell size={28}/>
                        <span
                            className="absolute top-0 right-0 -mt-1 -mr-1 flex justify-center items-center bg-indigo-600 text-white font-semibold text-[10px] w-5 h-4 rounded-full border-2 border-white">
                            9
                        </span>
                    </button>

                    {userFiles.length > 0
                        ?
                        <Link to="/projects">
                            <Md3dRotation
                                className={`w-8 g-8 rounded-full border-4 border-gray-300 cursor-pointer bg-gray-300 hover:bg-gray-300 hover:text-white text-red-600 `}
                                size={30}
                            />
                        </Link>
                        :
                        <Md3dRotation
                            className={`w-8 g-8 rounded-full border-4 border-gray-300 bg-gray-300 hover:bg-gray-300 text-white `}
                            size={30}
                        />
                    }

                    <div ref={menuRef}>
                        {user
                            ?
                            <img
                                className="w-8 g-8 rounded-full border-4 border-indigo-400 cursor-pointer"
                                src="http://randomuser.me/api/portraits/women/50.jpg"
                                alt=""
                                onClick={() => setOpen(!open)}
                            />
                            :
                            <div
                                className="content-center w-8 h-8 rounded-2xl border-4 border-indigo-400 cursor-pointer"
                                onClick={() => setOpen(!open)}
                            >
                                <GrLogin size={20}/>
                            </div>
                        }
                        {open && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                                <Link to="/main" onClick={() => setOpen(false)}
                                      className="block px-4 py-2 hover:bg-gray-100">
                                    Home
                                </Link>
                                {user &&
                                    <Link to="/login"
                                          className="block px-4 py-2 hover:bg-gray-100"
                                          onClick={() => logout()}
                                    >
                                        Сhange the Account
                                    </Link>
                                }
                                {user
                                    ?
                                    <a onClick={() => {
                                        setOpen(false);
                                        logout()
                                    }} className="cursor-pointer block px-4 py-2 hover:bg-gray-100">
                                        Logout
                                    </a>
                                    :
                                    <Link to={'/login'} onClick={() => {
                                        setOpen(false);
                                        logout()
                                    }} className="cursor-pointer block px-4 py-2 hover:bg-gray-100">
                                        LogIn
                                    </Link>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
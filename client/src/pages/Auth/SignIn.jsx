import React, {useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/user/login',
                {
                    username: username, password: password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            localStorage.setItem("userData", JSON.stringify({
                userID: response.data.userID,
                token: response.data.token,
                username: response.data.username
            }))
            navigate('/main')
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className="flex mt-[20vh] flex-col justify-center px-6 py-2 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Login
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2">
                            Sign in
                        </button>
                    </div>

                    <div className="text-sm">
                        <Link to='/main' className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Home
                        </Link>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default SignIn;

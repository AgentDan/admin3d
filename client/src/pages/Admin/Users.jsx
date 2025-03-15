import React, {useEffect, useState} from 'react';
import axios from "axios";

const Users = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [users, setUsers] = useState([])
    const [errUser, setErrUser] = useState("")

    const listUsers = async () => {
        try {
            const response = await axios.get('/api/user/list')
            setUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const errorsUser = (err) => {
        setErrUser(err)
        setTimeout(() => {
            setErrUser('')
        }, 2000)
    }

    const onChangeUser = async () => {
        if (!username || password.length < 4) {
            errorsUser("Некорректныe данные")
            return
        }
        try {
            const response = await axios.post('/api/user/registration', {
                username,
                password
            })
            if (response.status === 201) {
                listUsers()
                setUsername("")
                setPassword("")
            }
        } catch (error) {
            errorsUser(error?.response?.data?.message || "Ошибка регистрации")
        }
    }

    const onClickDeleteuser = async (id) => {

        const confirmation = window.prompt('Введите "DELETE" для удаления пользователя:');
        if (confirmation !== "DELETE") {
            errorsUser("Удаление отменено");
            return;
        }
        try {
            await axios.delete(`/api/user/delete/${id}`)
            listUsers()
        } catch (error) {
            errorsUser(error?.response?.data?.message)
            console.log(error)
        }
    }

    useEffect(() => {
        listUsers()
    }, []);

    return (
        <>
            <div>
                <div className="mt-2 text-2xl mb-2">Register user:</div>
                <input
                    type="text"
                    placeholder="User Name"
                    value={username}
                    className="mx-1 px-4 py-2 border-2 border-black rounded-lg bg-gray-100 hover:bg-gray-200"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="mx-1 px-4 py-2 border-2 border-black rounded-lg bg-gray-100 hover:bg-gray-200"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="ml-2 p-1 rounded-lg hover:bg-amber-400 bg-amber-300"
                    onClick={onChangeUser}
                >
                    Save
                </button>

                {errUser && <div className="text-red-600">{errUser}</div>}

            </div>
            <div>
                <div className="mt-4 text-2xl">
                    LIST
                </div>
                <table className="table-auto border-collapse border border-gray-300 w-full">
                    <thead>
                    <tr className="bg-gray-300">
                        <th className="border border-gray-400 px-4 py-2">#</th>
                        <th className="border border-gray-400 px-4 py-2">Users</th>
                        <th className="border border-gray-400 px-4 py-2"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((item, index) => {
                            return (
                                <tr key={item._id} className="bg-gray-100">
                                    <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                    <td className="text-left border border-gray-400 px-4 py-2">{item.username}</td>
                                    <td
                                        className="border border-gray-400 hover:bg-gray-200 px-4 py-2 text-red-600 cursor-pointer"
                                        onClick={() => onClickDeleteuser(item._id)}
                                    >X
                                    </td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>

            </div>
        </>
    );
};

export default Users;
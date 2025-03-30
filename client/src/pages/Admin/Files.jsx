import {useEffect, useState} from "react"
import axios from "axios"

function Files() {
    const [file, setFile] = useState(null)
    const [planFile, setPlanFile] = useState(null)
    const [files, setFiles] = useState([])
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState("")
    const [selectedSortUser, setSelectedSortUser] = useState("")
    const [errFile, setErrFile] = useState("")

    const fetchFiles = async () => {
        try {
            const response = await axios.get("/api/file/list")
            setFiles(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUsers = async () => {
        try {
            const promise = await axios.get('/api/user/list')
            setUsers(promise.data)
        } catch (error) {
            console.log(error)
        }
    }
    const onChangeFile = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile)
        }
    }
    const onChangePlanFile = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setPlanFile(selectedFile)
        }
    }

    const errors = (err) => {
        setErrFile(err)
        setTimeout(() => {
            setErrFile("");
        }, 2000);
    }

    const onClickFile = async () => {

        if (!file) {
            errors('Choose a file')
            return
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("userId", selectedUser);

        try {
            await axios.post('/api/file/addfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setFile(null)
            document.querySelector("input[type=file]").value = ""
            await fetchFiles()
        } catch (error) {
            setFile(null)
            document.querySelector("input[type=file]").value = ""
            errors(error.response?.data?.message)
        }
    }

    const onClickDeletefile = async (id) => {
        try {
            await axios.delete(`/api/file/delete/${id}`);
            setFiles(files.filter((file) => file._id !== id));
        } catch (error) {
            console.log(error)
        }
    }

    const filteredFiles = selectedSortUser
        ? files.filter((file) => file.owner._id === selectedSortUser)
        : files;

    useEffect(() => {
        fetchFiles()
        fetchUsers()
    }, []);

    return (
        <>
            <div>
                <div className="mt-2 text-2xl mb-2">Upload Project:</div>
                <input
                    id="projectFileInput"
                    type="file"
                    onChange={onChangeFile}
                    className="hidden"
                />
                <label
                    htmlFor="projectFileInput"
                    className="mx-1 cursor-pointer px-4 py-2 border-2 border-black rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                    Project file
                </label>
                <input
                    id="planFileInput"
                    type="file"
                    onChange={onChangePlanFile}
                    className="hidden"
                />
                <label
                    htmlFor="planFileInput"
                    className="mx-1 cursor-pointer px-4 py-2 border-2 border-black rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                    Plan file
                </label>
                <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="mx-1 px-4 py-2 border-2 border-black rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                    <option value="">Выберите пользователя</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.username}
                        </option>
                    ))}
                </select>
                <button
                    className="ml-2 p-1 rounded-lg hover:bg-amber-400 bg-amber-300"
                    onClick={onClickFile}
                >
                    Upload
                </button>

                {errFile && <div className="text-red-600">{errFile}</div>}

                {file &&
                    <div className="mt-2 text-gray-700 flex">Project File: {file.name}
                        <div
                            className="cursor-pointer flex justify-center items-center border-2 text-red-600 rounded-2xl w-6 h-6 ml-2 "
                            onClick={() => {
                                setFile(null);
                                document.querySelector("#projectFileInput").value = "";
                            }}
                        >
                            X
                        </div>
                    </div>
                }

                {planFile &&
                    <div className="mt-2 flex text-gray-700">Plan File: {planFile.name}
                        <div
                            className="cursor-pointer flex justify-center items-center border-2 text-red-600 rounded-2xl w-6 h-6 ml-2 "
                            onClick={() => {
                                setPlanFile(null);
                                document.querySelector("#planFileInput").value = "";
                            }}
                        >
                            X
                        </div>
                    </div>
                }
            </div>
            <div>
                <div className="mt-4 text-2xl">
                    LIST
                </div>
                <select
                    value={selectedSortUser}
                    onChange={(e) => setSelectedSortUser(e.target.value)}
                    className="mx-1 px-4 py-2 border-2 border-black rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                    <option value="">Все пользователи</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.username}
                        </option>
                    ))}
                </select>
                <table className="table-auto border-collapse border border-gray-300 w-full">
                    <tbody>
                    <tr className="bg-gray-300">
                        <th className="border border-gray-400 px-4 py-2">#</th>
                        <th className="border border-gray-400 px-4 py-2">NameFile</th>
                        <th className="border border-gray-400 px-4 py-2">Owner</th>
                        <th className="border border-gray-400 px-4 py-2"></th>
                    </tr>
                    </tbody>
                    <tbody>
                    {
                        filteredFiles.map((item, index) => {
                            return (
                                <tr key={item._id} className="bg-gray-100">
                                    <th className="border border-gray-400 px-4 py-2">{index + 1}</th>
                                    <th className="text-left border border-gray-400 px-4 py-2">{item.file}</th>
                                    <th className="text-left border border-gray-400 px-4 py-2">{item.owner.username}</th>
                                    <th
                                        className="border border-gray-400 hover:bg-gray-200 px-4 py-2 text-red-600 cursor-pointer"
                                        onClick={() => onClickDeletefile(item._id)}
                                    >X
                                    </th>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Files

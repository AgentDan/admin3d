import {useCallback, useEffect, useState} from "react";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userID, setUserID] = useState(null);
    const [username, setUsername] = useState(null);
    const [userFiles, setUserFiles] = useState([]);
    const [loading, setLoading] = useState(true); // Добавлен флаг загрузки

    const userProjects = useCallback((files) => {
        if (files.length !== 0) {
            setUserFiles(files)
            localStorage.setItem("projects", JSON.stringify({projects: files}))
        }
    }, []);

    const login = useCallback((token, id, username) => {
        setToken(token);
        setUsername(username);
        setUserID(id);
        localStorage.setItem("userData", JSON.stringify({userID: id, token, username}));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserID(null);
        setUsername(null);
        setUserFiles([]);
        localStorage.removeItem("userData");
        localStorage.removeItem("projects");
    }, []);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("userData"));
        if (savedData?.token) {
            login(savedData.token, savedData.userID, savedData.username);
        }
        setLoading(false); // Снимаем флаг загрузки после обработки localStorage
    }, [login]);

    return {userID, token, username, login, logout, userFiles, userProjects, loading};
};

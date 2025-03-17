import './App.css'
import Layout from "./components/Admin/Layout.jsx";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Users from "./pages/Admin/Users.jsx";
import Home from "./pages/Admin/Home.jsx";
import Files from "./pages/Admin/Files.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import LayoutMain from "./components/Main/LayoutMain.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import {useAuth} from "./hooks/auth.hook.js";
import Construc from "./components/Constructor/Construc.jsx";

function App() {
    const {login, logout, token, username, userID, userFiles, userProjects, loading} = useAuth()
    const adminUser = "67d35793594ff4b68525ca9f"

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <AuthContext.Provider value={{login, logout, token, username, userID, userFiles, userProjects}}>
                <BrowserRouter>
                    <Routes>
                        {userID === adminUser && (
                            <Route path="/admin" element={<Layout admin={adminUser}/>}>
                                <Route index element={<Home/>}/>
                                <Route path="/admin/users" element={<Users/>}/>
                                <Route path="/admin/files" element={<Files/>}/>
                            </Route>
                        )}

                        <Route
                            path="/projects"
                            element={
                                localStorage.getItem('projects')
                                    ?
                                    (
                                        <Construc userFiles={userFiles}/>
                                    )
                                    :
                                    (<Navigate to="/main" replace/>)
                            }
                        />

                        <Route path="/main" element={<LayoutMain/>}/>

                        <Route path="/login" element={<SignIn/>}/>

                        <Route path="*" element={<Navigate to="/main" replace/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthContext.Provider>
        </>
    )
}

export default App

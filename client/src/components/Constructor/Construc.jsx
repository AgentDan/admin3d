import React, {useEffect, useRef, useState} from 'react';
import Constructor from "./Constructor.jsx";
import {Link} from "react-router-dom";
import {CiMenuKebab} from "react-icons/ci";
import Zaglushka from "./Zaglushka.jsx";

const Construc = () => {
    const [projects, setProjects] = useState([]);
    const [projectCurrent, setProjectCurrent] = useState();
    const [arr, setArr] = useState([])
    const [openprojects, setOpenprojects] = useState(true)
    const [openavatar, setOpenavatar] = useState(false)
    const [openelements, setOpenelements] = useState(true)
    const [fileName, setFileName] = useState()
    const avatarRef = useRef()
    const projectsRef = useRef()

    useEffect(() => {
        const savedProjects = localStorage.getItem("projects");
        if (savedProjects) {
            try {
                const files = JSON.parse(savedProjects);
                if (files && Array.isArray(files.projects)) {
                    setProjects(files.projects.map((item) => item.file));
                }
            } catch (error) {
                console.error("Ошибка парсинга localStorage:", error);
            }
        }

        const handleClickOutside = (event) => {
            if (avatarRef.current && !avatarRef.current.contains(event.target)) {
                setOpenavatar(false)
            }
            if (projectsRef.current && !projectsRef.current.contains(event.target)) {
                setOpenprojects(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const onClickFile = async () => {
            if (!projectCurrent) return;

            const filePath = `/documents/${projectCurrent.replace(/\.[^/.]+$/, "")}.pdf`;

            try {
                const response = await fetch(filePath, {method: "HEAD"});
                const contentType = response.headers.get("content-type");

                (response.ok && contentType?.includes("application/pdf"))
                    ?
                    setFileName(true)
                    :
                    setFileName(false)

            } catch (error) {
                console.error("Ошибка при проверке файла:", error);
                alert("Ошибка при доступе к файлу!");
            }
        };
        onClickFile()

    }, [projectCurrent]);

    const onClickProject = (file) => {
        if (file === projectCurrent) {
            return
        }
        setArr([])
        setProjectCurrent(file)
    }

    return (
        <div>
            {
                projectCurrent ?
                    <Constructor setOpenelements={setOpenelements}
                                 openelements={openelements}
                                 nameFile={projectCurrent}
                                 arr={arr}
                                 setArr={setArr}
                    />
                    :
                    <Zaglushka
                        setOpenelements={setOpenelements}
                        openelements={openelements}
                        nameFile={projectCurrent}
                        arr={arr}
                        setArr={setArr}
                    />
            }
            <div
                className="hover:bg-gray-400 cursor-pointer absolute top-1 right-48 border-4 border-indigo-400 rounded-2xl w-auto px-2 g-8 "
                onClick={() => setOpenprojects(!openprojects)}
            >
                projects: {projectCurrent}
            </div>
            <div className="cursor-pointer absolute top-1 right-8 border-4 border-indigo-400 rounded-2xl w-8 h-8 ">
                <img
                    className="w-8 g-8 rounded-full"
                    src="http://randomuser.me/api/portraits/women/50.jpg"
                    alt=""
                    onClick={() => setOpenavatar(!openavatar)}
                />
            </div>
            <div
                className=" content-center right-32 top-1 hover:bg-gray-400 cursor-pointer absolute border-4 border-indigo-400 rounded-2xl w-8 h-8 "
                onClick={() => setOpenelements(!openelements)}
            >
                <CiMenuKebab className="flex items-center justify-center h-6 w-6 "/>
            </div>
            <div
                className={`${fileName ? "text-red-600 border-indigo-400 hover:bg-gray-400 cursor-pointer" : "text-gray-300 border-gray-400"} text-center content-center right-20 top-1 absolute border-4 rounded-2xl w-8 h-8 `}
                onClick={() => {
                    if (fileName && projectCurrent) {
                        const filePath = `/documents/${projectCurrent.replace(/\.[^/.]+$/, "")}.pdf`;
                        window.open(filePath, "_blank");
                    }
                }}
            >
                P
            </div>
            {openprojects &&
                <div
                    ref={projectsRef}
                    className="absolute top-10 right-48 "
                    onClick={() => setOpenprojects(false)}
                >
                    <div
                        className="flex flex-col items-start backdrop-blur-sm bg-white/30 w-44 h-auto rounded-3xl p-3 mt-1">
                        {projects.map((i) => (
                            <div
                                className="cursor-pointer hover:text-white"
                                onClick={() => onClickProject(i)}
                            >
                                {i.replace(/\.[^/.]+$/, "")}
                            </div>
                        ))}
                    </div>
                </div>
            }
            {openavatar && (
                <div ref={avatarRef}
                     className="absolute top-10 right-2 flex flex-col items-start backdrop-blur-sm bg-white/30 w-44 h-auto rounded-3xl p-1 mt-1"
                >
                    <Link to="/main"
                          onClick={() => setOpenavatar(false)}
                          className="block px-4 py-1 hover:text-white"
                    >
                        Home
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Construc;
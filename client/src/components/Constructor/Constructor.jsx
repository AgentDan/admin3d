import React, {useEffect, useState} from 'react';
import Buttons from "./Buttons/Buttons.jsx";
import Experience from "./Experience/Experience.jsx";
import {Canvas} from "@react-three/fiber";
import {useGLTF} from "@react-three/drei";
import {v1} from "uuid";

const Constructor = ({openelements, setOpenelements, nameFile, arr, setArr}) => {
    const {nodes, materials} = useGLTF(`./uploads/${nameFile}`);

    useEffect(() => {
        if (!nodes) return;
        const meshes = Object.values(nodes || {}).filter(node => node.isMesh);
        let arrModel = []
        meshes.map((item) => {
            let a = {
                id: v1(),
                name: item.name.replace(/[0-9_]/g, ""),
                fullName: item.name,
                check: item.name[1] === "0",
                group: Number(isNaN(Number(item.name.slice(0,1))) === false ? item.name.slice(0,1) : NaN),
            }
            arrModel.push(a)
        })
        setArr(arrModel)
    }, [nameFile, nodes]);

    return (
        <div className="h-screen bg-amber-300">
            <Canvas style={{background: "#AAAAAA"}} camera={{position: [0, 2, 5], fov: 35}}>
                <Experience
                    arr={arr}
                    materials={materials}
                    nodes={nodes}
                />
            </Canvas>
            <Buttons
                arr={arr}
                setArr={setArr}
                openelements={openelements}
                setOpenelements={setOpenelements}
            />
        </div>
    );
};

export default Constructor;
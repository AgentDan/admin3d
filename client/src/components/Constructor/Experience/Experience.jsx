import React, { useEffect } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Cube } from "../Cube.jsx";

const Experience = ({ arr, materials, nodes }) => {
    const { camera } = useThree(); // Доступ к камере

    useEffect(() => {
        if (!nodes) return;

        const meshes = Object.values(nodes).filter(node => node.isMesh);
        if (meshes.length === 0) return;

        let boundingBox = new THREE.Box3().setFromObject(meshes[0]);
        meshes.forEach(mesh => boundingBox.expandByObject(mesh));

        const center = new THREE.Vector3();
        boundingBox.getCenter(center);

        const size = boundingBox.getSize(new THREE.Vector3());
        const maxSize = Math.max(size.x, size.y, size.z);
        const distance = maxSize * 1.5; // Устанавливаем дистанцию

        camera.position.set(center.x, center.y, distance);
        camera.lookAt(center);
    }, [nodes, camera]);

    return (
        <>
            <Stage intensity={0.2} environment="city" shadows={false}>
                <Cube arr={arr} materials={materials} nodes={nodes} />
            </Stage>
            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
        </>
    );
};

export default Experience;

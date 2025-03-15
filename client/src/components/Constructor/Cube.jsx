export function Cube({arr, materials, nodes}) {

    return (
        <>
            {
                arr.map((item) =>
                    nodes[item.fullName] && nodes[item.fullName].geometry && item.check || item.name === "default" ? (
                        <mesh
                            key={item.id}
                            geometry={nodes[item.fullName].geometry}
                            material={materials[item.fullName]}
                        />
                    ) : null
                )
            }
        </>
    )
}
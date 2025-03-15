import {createContext, useContext, useEffect, useState} from "react"

const ConfiguratorContextRender = createContext()

export const ConfiguratorProviderRender = ({children}) => {
    return (
        <ConfiguratorContextRender.Provider>
            {children}
        </ConfiguratorContextRender.Provider>
    )
}

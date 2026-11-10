import React, { createContext, useState } from "react-native" 

export const BatteryContext = createContext();

export function BatteryProvider({ children }) {
    const [batteryData, setBatteryData] = useState(null)

    return (
        <BatteryContext.Provider 
            value = {{
                batteryData, setBatteryData
            }}
        >
            { children }
        </BatteryContext.Provider>
    )
}
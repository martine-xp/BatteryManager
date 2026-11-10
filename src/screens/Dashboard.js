import React, { useState, useEffect } from "react"

import {
    StatusBar, Text, View, StyleSheet, Image, ScrollView, 
    NativeModules, NativeEventEmitter, TouchableOpacity
} from "react-native"


import { useNavigation } from "@react-navigation/native"


import { SafeAreaView } from "react-native-safe-area-context"

import { COLORS } from "../constants/fonts"
import BatteryLevel from '../components/BatteryLevel'
import BatteryDetails from '../components/BatteryDetails'

import img from "../../assets/battery.png"

import Plug from "../../assets/icons/power.svg"
import Favourite from "../../assets/icons/favorite.svg"
import Charger from "../../assets/icons/charger.svg"
import Temperature from "../../assets/icons/temperature.svg"
import Technology from "../../assets/icons/technology.svg"
import Charging from "../../assets/icons/battery_charging.svg"

import DetailsScreen from "./DetailsScreen"

const { BatteryManager } = NativeModules;
const batteryEmitter = new NativeEventEmitter(BatteryManager);



function MoreDetails({info}) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity 
            onPress={() => navigation.navigate('Details', {
                info,
            })}
        style = {{
            padding: 10,
            borderWidth: 1,
            borderColor: COLORS.secondary,
            margin: 10,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style = {{
                fontWeight: 'bold',
                color: COLORS.secondary,
            }}>More Details</Text>
        </TouchableOpacity>
    )
}

 
export default function Dashboard() {

    const [battery, setBattery] = useState(null)
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const subscription = batteryEmitter.addListener(
            'BatteryChanged', data => {
                setBattery(data)
                setLoading(false)
            }
        )

        return () => subscription.remove()

    }, [])


    function TopBar() {
        return (
            <View style = {styles.top_app_bar}>
                <Text style = {{
                    color: COLORS.light,
                    fontWeight: 'bold',
                    fontSize: 15,
                    textAlign: 'center',
                }}>Battery Management App</Text>
            </View>
        )
    }


    function renderTopGrid(voltage, temperature) {
        return (
            <View style = {{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
            }}>
                {/* card */}
                <View style = {{
                    flex: 1,
                    padding: 5,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    borderRadius: 5,
                    margin: 5,
                    overflow: 'hidden',
                    flexDirection: 'row',
                }}>
                    <View>
                        <Charger
                            width = {40}
                            height = {40}
                            fill = {COLORS.secondary} />
                    </View>

                    <View style = {{
                        flex: 1,
                    }}>
                        <Text style = {{
                            fontWeight: 'bold',
                            color: COLORS.secondary,
                        }}>Voltage</Text>
                        
                        <Text style = {{
                            fontWeight: 'bold',
                            color: COLORS.textSecondary,
                        }}>{voltage}</Text>

                        <Text style = {{
                            fontSize: 9,
                            color: COLORS.textSecondary,
                        }}>voltage status</Text>
                    </View>
                    
                </View>


                <View style = {{
                    flex: 1,
                    padding: 5,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    borderRadius: 5,
                    margin: 5,
                    overflow: 'hidden',
                    flexDirection: 'row',
                }}>
                    <View>
                        <Temperature
                            width = {40}
                            height = {40}
                            fill = {COLORS.warning} />
                    </View>

                    <View style = {{
                        flex: 1,
                    }}>
                        <Text style = {{
                            fontWeight: 'bold',
                            color: COLORS.warning,
                        }}>Temperature</Text>
                        
                        <Text style = {{
                            fontWeight: 'bold',
                            color: COLORS.textSecondary,
                        }}>{temperature}</Text>

                        <Text style = {{
                            fontSize: 9,
                            color: COLORS.textSecondary,
                        }}>Battery temperature</Text>
                    </View>
                    
                </View>


                
            </View>
        )
    }


    function renderBottomGrid(status, health) {

        function getStatus(batteryStatus) {
            switch(batteryStatus) {
                case 1: 
                    return "Unknown" 
                case 2: 
                    return "Charging"
                case 3: 
                    return "Discharging";
                case 4: 
                    return "Not Charging"
                case 5: 
                    return "Full"
                default :
                    return "loading..."
            }
        }
        
        function getHealth(batteryHealth) {
            switch(health) {
                case 2: 
                    return "Good"
                case 3: 
                    return "Overheat"
                case 4: 
                    return "Dead"
                case 5: 
                    return "Over Voltage"
                case 6: 
                    return "Failure" 
                case 7: 
                    return "Cold"
                default: 
                    return "loading..."
            }
        }


        return (
            <View style = {{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {/* card */}
                <View style = {{
                    flex: 1,
                    padding: 5,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    borderRadius: 5,
                    margin: 5,
                    overflow: 'hidden',
                    flexDirection: 'row',
                }}>
                    <View>
                        <Plug
                            width = {40}
                            height = {40}
                            fill = {COLORS.blue} />
                    </View>

                    <View style = {{
                        flex: 1,
                    }}>
                        <Text style = {{
                            fontWeight: 'bold',
                            color: COLORS.blue,
                        }}>Status</Text>
                        
                        <Text style = {{
                            fontWeight: 'bold',
                            color: COLORS.textSecondary,
                        }}>{getStatus(status)}</Text>

                        <Text style = {{
                            fontSize: 9,
                            color: COLORS.textSecondary,
                        }}>battery status</Text>
                    </View>
                    
                </View>


                <View style = {{
                    flex: 1,
                    padding: 5,
                    borderWidth: 1,
                    borderColor: COLORS.border,
                    borderRadius: 5,
                    margin: 5,
                    overflow: 'hidden',
                    flexDirection: 'row',
                }}>
                    <View>
                        <Favourite
                            width = {40}
                            height = {40}
                            fill = {COLORS.danger} />
                    </View>

                    <View style = {{
                        flex: 1,
                    }}>
                        <Text style = {{
                            fontWeight: 'bold',
                            color: COLORS.danger,
                        }}>Health</Text>
                        
                        <Text style = {{
                            fontWeight: 'bold',
                            color: COLORS.textSecondary,
                        }}>{getHealth(health)}</Text>

                        <Text style = {{
                            fontSize: 9,
                            color: COLORS.textSecondary,
                        }}>Battery condition</Text>
                    </View>
                    
                </View>

                
            </View>
        )
    }


    function renderBottomContainer(technology, health, plugged, level) {
        
        function getTechnology(tech) {
            if(tech.trim() === "") return "Unknown";
            else return tech;
        }

        function getHealth(batteryHealth) {
            switch(batteryHealth) {
                case 2: 
                    return "Good"
                case 3: 
                    return "Overheat"
                case 4: 
                    return "Dead"
                case 5: 
                    return "Over Voltage"
                case 6: 
                    return "Failure" 
                case 7: 
                    return "Cold"
                default: 
                    return "loading..."
            }
        }

        function getPluggedType(plugType) {
            switch(plugType) {
                case 0: 
                    return "Not plugged";
                case 1: 
                    return "AC Charger"
                case 2: 
                    return "USB cahrger"
                case 4: 
                    return "Unkown"
                default :
                    return "loading..."
            }
        }
        
        return (
            <View style = {{
                padding: 5,
                marginTop: 10,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: COLORS.border,
            }}>

                <View style = {{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>

                    <Text style = {{
                        color: COLORS.secondary,
                        fontWeight: 'bold',
                    }}>Battery Status</Text>

                    <Text style = {{
                        color: COLORS.secondary,
                        fontWeight: 'bold',
                    }}>Plugged (AC)</Text>

                </View>


                <View style = {{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 5,
                    marginTop: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <View style = {{
                        padding: 10,
                        borderWidth: 0.5,
                        borderBottomWidth: 0,
                        borderLeftWidth: 0,
                        borderColor: COLORS.border,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}>

                        {/* icon */}
                        <Technology 
                            width = {20}
                            height = {20}
                            fill = {COLORS.secondary} />
                        {/* caption */}
                        <Text style = {{
                            color: COLORS.textSecondary,
                            fontSize: 9,
                        }}>Technology</Text>
                        {/* status */}

                        <Text style = {{
                            color: COLORS.textSecondary,
                            fontSize: 8,
                        }}>{ getTechnology(technology) }</Text>

                    </View>


                    <View style = {{
                        padding: 10,
                        borderWidth: 0.5,
                        borderBottomWidth: 0,
                        borderLeftWidth: 0,
                        borderColor: COLORS.border,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}>

                        {/* icon */}
                        <Favourite 
                            width = {20}
                            height = {20}
                            fill = {COLORS.secondary} />
                        {/* caption */}
                        <Text style = {{
                            color: COLORS.textSecondary,
                            fontSize: 9,
                        }}>Health</Text>

                        {/* status */}
                        <Text style = {{
                            color: COLORS.textSecondary,
                            fontSize: 8,
                        }}>{ getHealth(health) }</Text>

                    </View>


                    <View style = {{
                        padding: 10,
                        borderWidth: 0.5,
                        borderBottomWidth: 0,
                        borderLeftWidth: 0,
                        borderColor: COLORS.border,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}>

                        {/* icon */}
                        <Plug 
                            width = {20}
                            height = {20}
                            fill = {COLORS.secondary} />

                        {/* caption */}
                        <Text style = {{
                            color: COLORS.textSecondary,
                            fontSize: 9,
                        }}>Plugged</Text>

                        {/* status */}
                        <Text style = {{
                            color: COLORS.textSecondary,
                            fontSize: 8,
                        }}>{ getPluggedType(plugged) }</Text>

                    </View>


                    <View style = {{
                        padding: 10,
                        borderWidth: 0.5,
                        borderBottomWidth: 0,
                        borderRightWidth: 0,
                        borderColor: COLORS.border,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}>

                        {/* icon */}
                        <Charging 
                            width = {20}
                            height = {20}
                            fill = {COLORS.secondary} />

                        {/* caption */}
                        <Text style = {{
                            color: COLORS.textSecondary,
                            fontSize: 9,
                        }}>Level</Text>

                        {/* status */}
                        <Text style = {{
                            color: COLORS.textSecondary,
                            fontSize: 8,
                        }}>{ level }</Text>

                    </View>


                </View>

                
            </View>
        )
    }


    return (
        <SafeAreaView style = {styles.container}>
            <StatusBar 
                backgroundColor = {COLORS.dark}
            />

                {/*Top bar */}
                {TopBar()}

                <ScrollView style = {{
                    ...styles.container,
                    padding: 10,
                }}>

                    <BatteryLevel 
                        level = { 
                            loading ? "loading..."
                            : ((battery.level * 100)/ battery.scale) + "%"
                        }
                    />


                    {/* render top grid container */}
                    <View style = {{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                        marginTop: 10,
                    }}>
                        <Text style = {{
                            color: COLORS.light,
                        }}>Basic Information</Text>
                    </View>
                    {renderTopGrid(
                        loading ? "loading..." : (battery.voltage/1000).toFixed(2) + "V", 
                        loading ? "loading..." : (battery.temperature/10.0) + '\u00b0C'
                    )}
                    
                    {renderBottomGrid(
                        loading? "loading..." : battery.status,
                        loading? "loading..." : battery.health
                    )}


                    {renderBottomContainer(
                        loading? "loading..." : battery.technology,
                        loading? "loading..." : battery.health,
                        loading? "loading..." : battery.plugged,
                        loading? "loading..." : battery.level + "%"
                    )}

                    {
                        loading? 
                        <View style = {{
                            borderRadius: 15,
                            borderWidth: 1,
                            margin: 10,
                            padding: 10,
                            borderColor: COLORS.secondary,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style = {{
                                color: COLORS.secondary,
                            }}>Loading please wait...</Text>
                        </View>
                        : <MoreDetails info = {battery}/>
                    }
                    

                    <View style = {{
                        padding: 10,
                        backgroundColor: COLORS.dark,
                    }}></View>


                </ScrollView>

            
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    top_app_bar: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        backgroundColor: COLORS.dark,
    },
    container : {
        flex: 1,
        backgroundColor: COLORS.dark,
    },
    txt: {
        color: COLORS.secondary,
        padding:2,
        fontWeight: 'bold',
        fontSize: 12,
    }
})
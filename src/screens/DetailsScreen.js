import React, { useEffect, useState } from "react"

import {View, Text, ScrollView, StyleSheet, 
    TouchableOpacity, NativeModules, NativeEventEmitter
} from "react-native"


import { COLORS } from "../constants/fonts"
import { SafeAreaView } from "react-native-safe-area-context"

import Loader from "../components/Loader"

import BackIcon from "../../assets/icons/back.svg"
import Battery from "../../assets/icons/battery_charging.svg"
import Clock from "../../assets/icons/clock.svg"
import Favorite from "../../assets/icons/favorite.svg"
import Technology from "../../assets/icons/technology.svg"
import Power from "../../assets/icons/power.svg"
import Charger from "../../assets/icons/charger.svg"
import Temperature from "../../assets/icons/temperature.svg"
import Description from "../../assets/icons/description.svg"
import Bars from "../../assets/icons/bars.svg"

import BatteryLevel from "../components/BatteryLevel"


const { BatteryManager } = NativeModules;

const batteryEmitter = new NativeEventEmitter(BatteryManager);


export default function DetailsScreen({ navigation, route }) {

    const {info} = route.params;

    const [battery, setBattery] = useState(info);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const subscription = batteryEmitter.addListener(
            'BatteryChanged', data => {
                setBattery(data);
            }
        )

        return () => subscription.remove()

    }, [])

    function TopBar() {
        return (
            <View style = {styles.top_app_bar}>

                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style = {{
                    padding: 5,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: COLORS.light,
                    marginRight: 10, }}>

                    <BackIcon
                        width = {20}
                        height = {20} />

                </TouchableOpacity>


                <Text style = {{
                    color: COLORS.light,
                    fontWeight: 'bold',
                    fontSize: 15,
                    textAlign: 'center',
                }}>Battery Details</Text>

            </View>
        )
    }


    function BatteryLevel() {

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

        return (
            <View style = {{
                backgroundColor: COLORS.dark,
                borderRadius: 10,
                borderColor: COLORS.border,
                borderWidth: 1,
                padding:5,
                flexDirection: 'row',
            }}>

                <View style = {{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Battery 
                        width = {65}
                        height = {65}
                        fill = {COLORS.secondary} />
                </View>

                <View style = {{
                    flex: 1,
                }}>
                    <Text style = {{
                        fontWeight: 'bold',
                        color: COLORS.secondary,
                        fontSize: 15,
                    }}>Battery Level</Text>

                    <Text style = {{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: COLORS.textSecondary,
                    }}> { loading ? "loading..." : battery.level + "%" } </Text>

                    <View style = {{
                        flex:1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>

                        <View style = {{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Power 
                                width = {15}
                                height = {15}
                                fill = {COLORS.textSecondary}
                            />
                            <Text style = {{
                                fontSize: 10,
                                marginHorizontal: 2,
                                color: COLORS.textSecondary,
                            }}>Charging status</Text>
                        </View>

                        <Text style = {{
                            fontSize: 10,
                            marginHorizontal: 2,
                            color: COLORS.textSecondary,
                        }}>{ 
                            loading? "loading..." : getStatus(battery.status) }</Text>

                    </View>


                    <View style = {{
                        flex:1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>

                        <View style = {{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 2,
                        }}>
                            <Favorite 
                                width = {15}
                                height = {15}
                                fill = {COLORS.textSecondary}
                            />
                            <Text style = {{
                                fontSize: 10,
                                marginHorizontal: 2,
                                color: COLORS.textSecondary,
                            }}>Battery Health</Text>
                        </View>

                        <Text style = {{
                            fontSize: 10,
                            marginHorizontal: 2,
                            color: COLORS.textSecondary,
                        }}> { loading? "loading..." : getHealth(battery.health) }</Text>

                    </View>

                </View>
                
                
            </View>
        )
    }


    function GeneralInfo() {

        function getTechnology(tech) {
            if(tech.trim() === "") return "Unknown";
            else return tech;
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

        function getBatteryPresence(batteryHealth) {
            if(batteryHealth > 1 && batteryHealth < 8) {
                return "Present"
            }else {
                return "No Battery"
            }
        }

        return (
            <View style = {{
                borderWidth: 1,
                borderColor: COLORS.cards,
                marginTop: 10,
                padding: 5,
                borderRadius: 5, 
                backgroundColor: COLORS.dark,
            }}>
                <Text style = {{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: COLORS.secondary,
                    padding: 10,
                }}>Genaral Information</Text>

                <View style = {{
                    borderWidth: 0.5,
                    borderColor: COLORS.border,
                    padding: 5,
                    margin: 2,
                    flex: 1,
                }}>
                    

                    <View style = {{
                        flex: 1,
                        flexDirection: 'row',
                        marginVertical: 2,
                        padding: 10,
                        borderBottomWidth: 0.5,
                        borderColor: COLORS.border,
                    }}>

                        <View style = {{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Technology 
                                width = {20}
                                height = {20}
                                fill = {COLORS.secondary}
                            />
                            <Text style = {{
                                fontSize: 13,
                                color: COLORS.textSecondary,
                            }}>
                                Battery Technology
                            </Text>
                        </View>

                        <Text style = {{
                            fontSize: 13,
                            color: COLORS.textSecondary,
                        }}>{ loading? "loading..." : getTechnology(battery.technology) }</Text>

                    </View>

                    <View style = {{
                        flex: 1,
                        flexDirection: 'row',
                        marginVertical: 2,
                        padding: 10,
                        borderBottomWidth: 0.5,
                        borderColor: COLORS.border,
                    }}>

                        <View style = {{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Power 
                                width = {20}
                                height = {20}
                                fill = {COLORS.secondary}
                            />
                            <Text style = {{
                                fontSize: 13,
                                color: COLORS.textSecondary,
                            }}>
                                Power Source
                            </Text>
                        </View>

                        <Text style = {{
                            fontSize: 13,
                            color: COLORS.textSecondary,
                        }}>{ loading? "loading..." : getPluggedType(battery.plugged)}</Text>

                    </View>


                    <View style = {{
                        flex: 1,
                        flexDirection: 'row',
                        marginVertical: 2,
                        padding: 10,
                    }}>

                        <View style = {{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Description 
                                width = {20}
                                height = {20}
                                fill = {COLORS.secondary}
                            />
                            <Text style = {{
                                fontSize: 13,
                                color: COLORS.textSecondary,
                            }}>
                                Battery Presence
                            </Text>
                        </View>

                        <Text style = {{
                            fontSize: 13,
                            color: COLORS.textSecondary,
                        }}>{ loading? "loading..." : getBatteryPresence(battery.health) }</Text>

                    </View>


                </View>

            </View>
        )
    }


    function senserInfo() {

        function getPluggedType(plugType) {
            switch(plugType) {
                case 0: 
                    return "Not plugged";
                case 1: 
                    return "AC Charger"
                case 2: 
                    return "USB charger"
                case 4: 
                    return "Unkown"
                default :
                    return "loading..."
            }
        }

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

        return (
            <View style = {{
                borderWidth: 1,
                borderColor: COLORS.cards,
                marginTop: 10,
                padding: 5,
                borderRadius: 5, 
                backgroundColor: COLORS.dark,
            }}>
                <Text style = {{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: COLORS.secondary,
                    padding: 10,
                }}>Battery Sensors</Text>

                <View style = {{
                    borderWidth: 0.5,
                    borderColor: COLORS.border,
                    padding: 5,
                    margin: 2,
                    flex: 1,
                }}>
                    

                    <View style = {{
                        flex: 1,
                        flexDirection: 'row',
                        marginVertical: 2,
                        padding: 10,
                        borderBottomWidth: 0.5,
                        borderColor: COLORS.border,
                    }}>

                        <View style = {{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Charger 
                                width = {20}
                                height = {20}
                                fill = {COLORS.secondary}
                            />
                            <Text style = {{
                                fontSize: 13,
                                color: COLORS.textSecondary,
                            }}>
                                Voltage
                            </Text>
                        </View>

                        <Text style = {{
                            fontSize: 13,
                            color: COLORS.textSecondary,
                        }}>{loading? "loading..." : (battery.voltage/1000).toFixed(2)}V</Text>

                    </View>

                    <View style = {{
                        flex: 1,
                        flexDirection: 'row',
                        marginVertical: 2,
                        padding: 10,
                        borderBottomWidth: 0.5,
                        borderColor: COLORS.border,
                    }}>

                        <View style = {{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Temperature 
                                width = {20}
                                height = {20}
                                fill = {COLORS.secondary}
                            />
                            <Text style = {{
                                fontSize: 13,
                                color: COLORS.textSecondary,
                            }}>
                                Battery Temperature
                            </Text>
                        </View>

                        <Text style = {{
                            fontSize: 13,
                            color: COLORS.textSecondary,
                        }}>{ loading?"loading..." : (battery.temperature/10.0) + '\u00b0c' }</Text>

                    </View>

                    <View style = {{
                        flex: 1,
                        flexDirection: 'row',
                        marginVertical: 2,
                        padding: 10,
                        borderBottomWidth: 0.5,
                        borderColor: COLORS.border,
                    }}>

                        <View style = {{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Power 
                                width = {20}
                                height = {20}
                                fill = {COLORS.secondary}
                            />
                            <Text style = {{
                                fontSize: 13,
                                color: COLORS.textSecondary,
                            }}>
                                Charger Type
                            </Text>
                        </View>

                        <Text style = {{
                            fontSize: 13,
                            color: COLORS.textSecondary,
                        }}>{ loading? "loading..." : getPluggedType(battery.plugged)}</Text>

                    </View>


                    <View style = {{
                        flex: 1,
                        flexDirection: 'row',
                        marginVertical: 2,
                        padding: 10,
                    }}>

                        <View style = {{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Bars 
                                width = {20}
                                height = {20}
                                fill = {COLORS.secondary}
                            />
                            <Text style = {{
                                fontSize: 13,
                                color: COLORS.textSecondary,
                            }}>
                                Charging Status
                            </Text>
                        </View>

                        <Text style = {{
                            fontSize: 10,
                            color: COLORS.textSecondary,
                            backgroundColor: COLORS.primary,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 5,
                            borderRadius: 10,
                            color: COLORS.light,
                        }}>{ loading? "loading..." : getStatus(battery.status) }</Text>

                    </View>

                </View>

            </View>
        )
    }


    return (

        <SafeAreaView style = {styles.container}>

            {/*render appbar*/}
            {TopBar()}

            

            <ScrollView style = {{...styles.container,
                padding: 5,
            }}>

                {/* battery level */}
                {BatteryLevel()}

                {/* general informations */}
                {GeneralInfo()}
                {senserInfo()}

                <View style = {{
                    padding: 10,
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.dark,
    },

})
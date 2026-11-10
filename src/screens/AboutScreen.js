import {View, Text, ScrollView, StyleSheet, TouchableOpacity, 
    Image, StatusBar, Platform
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { COLORS } from '../constants/fonts'
import BackButton from "../../assets/icons/back.svg"
import Battery from "../../assets/battery_logo.png"


export default function AboutScreen({navigation}) {

    function renderAppBar() {
        return (
            <View style = {{
                padding: 10,
                backgroundColor: COLORS.dark,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}>

                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style = {{
                        padding: 5,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: COLORS.light,
                }}>
                    <BackButton 
                        width = {20}
                        height = {20} />
                </TouchableOpacity>
                
                <Text style = {{
                    marginHorizontal: 10,
                    fontWeight: 'bold',
                    color: COLORS.light,
                    fontSize: 20,
                }}>About</Text>
            </View>
        )
    }


    function renderTopBar() {
        return (
            <View style = {{
                padding: 10,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                <View style = {{
                    width: '80%',
                    height: '80%',
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image 
                        source = {Battery}
                        resizeMode= "stretch"
                        style = {{
                            width: '80%',
                            height: '80%',
                            borderRadius: 20,
                        }}/>
                </View>

                <View style = {{
                    flexDirection: 'row',
                }}>
                    <Text style = {{
                        color: COLORS.secondary,
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginHorizontal: 2,
                    }}>Battery</Text> 

                    <Text style = {{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: COLORS.textSecondary,
                    }}>Management App</Text>

                </View>


                <Text style = {{
                    color: COLORS.textSecondary,
                    fontSize: 13,
                    textAlign: 'center',
                }}>
                    Battery Management App helps you monitor your
                    battery health and status in real Time
                </Text>

                <Text style = {{
                    color: COLORS.textSecondary,
                    fontSize: 13,
                    textAlign: 'center',
                }}>Simple, fast and reliable</Text>
       
            </View>
        )
    }


    return (
        <SafeAreaView style = {styles.container}>

            {/* render app bar */}
            <View style = {{
                marginBottom: 2,
            }}>
                {renderAppBar()}

                <StatusBar
                    barStyle= "light-content"
                    backgroundColor={COLORS.dark}
                 />

            </View>
            
            <ScrollView style = {{...styles.container,
                padding: 5,
            }} >
                {/* to appbar caption */}
                <View style = {{
                    padding: 10,
                    height: 300,
                }}>
                    {renderTopBar()}
                </View>


                <View style = {{
                    padding: 10,
                    borderWidth: 1,
                    flex: 1,
                    borderColor: COLORS.border,
                    margin: 10,
                    borderRadius: 10,
                }}>
                    <Text style = {{
                        color: COLORS.secondary,
                        fontWeight: 'bold',
                        padding: 5,
                    }}>About the App</Text>

                    <Text style = {{
                        color: COLORS.textSecondary,
                        fontSize: 13,
                    }}>
                        This app provides real-time informations about your device
                        battery including percentage, voltage, temperature, charging
                        status and battery health. Stay informed and keep your battery healthy
                    </Text>

                </View>

                <View style = {{
                    padding: 10,
                }}></View>
                
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.dark,
    }
})
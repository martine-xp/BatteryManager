import { useEffect } from "react";
import { ImageBackground, StyleSheet, StatusBar, 
    View, Text, Animated, ActivityIndicator
} from "react-native";

import { COLORS } from "../constants/fonts"
import BottomTabs from "../navigation/BottomTabNavigator"
import splashImg from "../../assets/splash_image.jpg"
import Loader from "../components/Loader";


function TopSplashContainer() {
    return (
        <View style = {styles.top_container}>
            <Text style = {styles.txt}>BM App</Text>
        </View>
    )
}

function BottomSplashContainer() {
    return (
        <View
            style = {styles.bottom_container}>

            <Loader />
            <Text style = {{color: COLORS.light, padding: 10}}>Loading please wait...</Text>
        </View>
    )
}

export default function SplashScreen({navigation}) {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('bottomTabs')
        }, 3000)

        return () => clearTimeout(timer);
        
    }, []);

    return (
        <ImageBackground
            source = {splashImg}
            style = {styles.container}>
                
            <StatusBar hidden = {true} />

            {/* Top splash container */}
            {TopSplashContainer()}

            {/* Bottom splash container */}
            {BottomSplashContainer()}

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top_container: {
        flex:1,
        justifyContent: 'flex-end',
    },
    txt: {
        color: COLORS.light,
        textAlign: 'center',
        marginBottom: 90,
        fontWeight: 'bold',
        fontSize: 20,
    },
    bottom_container: {
        height: "20%",
        justifyContent: 'center',
        alignItems: 'center',
    },
})
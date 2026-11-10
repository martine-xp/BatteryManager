import { createNativeStackNavigator } from "@react-navigation/native-stack"

import SplashScreen from "../screens/SplashScreen"
import BottomTabs from "./BottomTabNavigator"
import DetailsScreen from "../screens/DetailsScreen"

const Stack = createNativeStackNavigator()

export default function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={
                {
                    headerShown: false,
                    animation: 'slide_from_right',
                }
            }
        >

            <Stack.Screen
                name = "splash"
                component={SplashScreen} />
            
            <Stack.Screen 
                name = "bottomTabs"
                component={BottomTabs} />

            <Stack.Screen 
                name = "Details" 
                component = {DetailsScreen} />

        </Stack.Navigator>
    )
}
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React, {useState, useEffect } from "react"

import Dashboard from "../screens/Dashboard";
import DetailsScreen from "../screens/DetailsScreen";
import AboutScreen from "../screens/AboutScreen";

import { COLORS } from "../constants/fonts"

import Home from "../../assets/home.svg"
import Info from "../../assets/info.svg"
import About from "../../assets/about.svg"

const Tab = createBottomTabNavigator()


function BottomTabBar() {

    const [users, setUsers] = useState({
        name: 'martine',
        age: 20
    })

    return (

        <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'shift',
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarInactiveTintColor: COLORS.secondary,
                    tabBarActiveBackgroundColor: COLORS.textPrimary,

                    tabBarStyle: {
                        backgroundColor: COLORS.dark,
                        borderWidth: 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 60,
                    }
                }}>

                <Tab.Screen name= "Dashboard"
                    component={Dashboard} 
                    options={{
                        tabBarIcon: () => 
                            <Home 
                                width = {25} 
                                height = {25}
                                fill = {COLORS.secondary} />
                    }}          
                />

                {/*<Tab.Screen name = "Details" 
                    component = {DetailsScreen} 

                    options = {{
                        tabBarIcon: () => 
                            <Info 
                                width = {25} 
                                height = {25}
                                fill = {COLORS.secondary} />

                    }}
                />*/}
                
                <Tab.Screen name = "About" 
                    component = {AboutScreen} 
                    options={{
                        tabBarIcon: () =>
                            <About 
                                width = {25} 
                                height = {25}
                                fill = {COLORS.secondary} />
                    }}
                />
                    
        </Tab.Navigator>

    )
}

export default function BottomTabs() {
    return (
        <BottomTabBar />
    )
}
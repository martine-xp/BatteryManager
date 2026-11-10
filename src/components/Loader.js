import React, { useEffect, useRef } from 'react'
import { Animated, View, Text, StyleSheet } from "react-native"
import { COLORS } from "../constants/fonts"


export default function Loader() {

    const rotate = useRef(new Animated.Value(0)).current;

    useEffect(() => {

        Animated.loop(
            Animated.timing(rotate, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ).start();

    }, []);


    const spin = rotate.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View
            style = {[styles.loader,
                {transform: [{rotate: spin}]}
            ]} />
    )
}

const styles = StyleSheet.create({
    loader: {
        width: 50,
        height: 50,
        borderWidth: 5,
        borderRadius: 200,
        borderTopColor: COLORS.secondary,
        borderLeftColor: COLORS.secondary,
        borderRightColor: COLORS.secondary,
        borderColor: COLORS.light,
    }
})
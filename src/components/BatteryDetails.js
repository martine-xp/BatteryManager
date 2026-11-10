import { View, Text, Image, StyleSheet, FlatList} from 'react-native'
import { COLORS } from '../constants/fonts'

import img from '../../assets/battery.png'
import Power from "../../assets/icons/power.svg"

let data = [
    {
        id: 1,
        name: 'Voltage',
        status: '4.18V',
        caption: 'Current battery Voltage',
        profile: {img}
    },
    {
        id: 2,
        name: 'Temperatue',
        status: '31.2',
        caption: 'Battery Temperature',
        profile: {img}
    },
    {
        id: 3,
        name: 'Charging Status',
        status: 'Charging',
        caption: 'Battery is charging',
        profile: {img}
    },
    {
        id: 4,
        name: 'Charging Health',
        status: 'Good',
        caption: 'Battery condition is good',
        profile: {img}
    }
]

export default function BatteryDetails() {

    return (

        <View>
            <Text>wellcome</Text>
        </View>
            
    )
}
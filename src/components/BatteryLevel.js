import {View, Text, StyleSheet, Image} from 'react-native'
import {COLORS} from '../constants/fonts'
import BatteryImage from '../../assets/icons/battery_charging.svg'

export default function BatteryLevel({level}) {
    return (
        <View style = {styles.container}>
            <View style = {{...styles.column,
                overflow: 'hidden',
                width: '30%',
                padding: 10,
                borderWeight: 10,
                justifyContent: 'center',
            }}>
                <BatteryImage 
                    width = {100}
                    height = {100}
                    fill = {COLORS.secondary}
                />
            </View>
            
            <View style = {{...styles.column,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style = {{
                    color: COLORS.secondary,
                    fontWeight: 'bold',
                    width: '100%',
                    fontSize: 20,
                    paddingVertical: 5,

                }}>Battery Level</Text>

                <Text style = {{
                    width: '100%',
                    fontWeight: 'bold',
                    fontSize: 25,
                    color: COLORS.textSecondary,
                }}>
                    {level}
                </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: COLORS.border,
        paddingVertical: 0,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 150,
        backgroundColor: 'green',
        overflow: 'hidden',
        backgroundColor: COLORS.dark,

    },
    column: {
        height: '100%',
        alignItems: 'center',
        padding: 0,
    }
})
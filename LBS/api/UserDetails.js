import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Context } from '../App';
import GetCall from './GetCall';
import { ENDPOINT_Signals } from './Constants';

const UserDetails = ({item, navigation}) => {
    const {s_user, s_points} = useContext(Context)
    const[selectedUser, setSelectedUser] = s_user
    const[selectedPoints, setSelectedPoints] = s_points

    const onClick = async() => {
        console.log(`${ENDPOINT_Signals}location/${item.stiprumai.join('/')}`)
        const data = await GetCall(`${ENDPOINT_Signals}location/${item.stiprumai.join('/')}`)
        setSelectedPoints(null)
        setSelectedUser({x: data.x, y: data.y})
        navigation.navigate('Home')
    }

    return (
        <TouchableOpacity>
            <Pressable onPress={async() => await onClick()}>
                <View style={styles.card}>
                    <View style={styles.macView}>
                        <Text style={styles.macText}>{item.mac ? `MAC: ${item.mac}` : 'Custom'}</Text>
                        <View style={styles.borderline} />
                    </View>
                    <View style={styles.signalsView}>
                        <Text style={styles.text}>AP1: {item.stiprumai[0]}</Text>
                        <Text style={styles.text}>AP2: {item.stiprumai[1]}</Text>
                        <Text style={styles.text}>AP3: {item.stiprumai[2]}</Text>
                    </View>
                </View>
            </Pressable>
        </TouchableOpacity>
    )
}

export default UserDetails

const styles = StyleSheet.create({
    card: {
        width: '60%',
        borderColor: 'black',
        borderWidth: 1.5,
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 10,
    },
    macView: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signalsView: {
        flexDirection: 'row'
    },
    borderline: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.35)',
        width: '90%',
        height: 5
    },
    text: {
        color: 'black',
        fontSize: 14,
        marginRight: 5
    },
    macText: {
        color: 'black',
        fontSize: 14,
    }
})
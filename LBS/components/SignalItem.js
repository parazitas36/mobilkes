import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useContext, useLayoutEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Pressable } from '@react-native-material/core'
import { Picker } from '@react-native-picker/picker'
import { Context } from '../App'
import GetCall from '../api/GetCall'
import { ENDPOINT_Signals } from '../api/Constants'

const SignalItem = ({ item, visibleState }) => {

    const { s_user } = useContext(Context)
    const [selectedUser, setSelectedUser] = s_user
    const [showSignalsList, setShowSignalsList] = visibleState

    const onClick = async() => {
        const data = await GetCall(`${ENDPOINT_Signals}location/${item.stiprumai.join('/')}`)
        setSelectedUser({x: data.x, y: data.y})
        setShowSignalsList(false)
    }

    return (
        <View style={styles.itemView}>
            <Text style={{ fontSize: 16, color: 'black' }}>{`ID: ${item.id} {${item.stiprumai.join(', ')}} `}</Text>
            <TouchableOpacity>
                <Pressable style={styles.showhidebtn} onPress={() => (async() => await onClick())()}>
                    <Text style={{ color: 'black' }}>Show</Text>
                </Pressable>
            </TouchableOpacity>
        </View>
    )
}

export default SignalItem

const styles = StyleSheet.create({
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    showhidebtn: {
        width: 60,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 5,
    }
})
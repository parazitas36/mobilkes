import { StyleSheet, Text, View, Modal } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { Context } from '../App'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Pressable } from '@react-native-material/core'
import CheckBox from '@react-native-community/checkbox'
import { getSignals } from '../database/db'
import SignalItem from './SignalItem'


const SignalsModal = ({ visibleState }) => {
    const { s_points } = useContext(Context)
    const [selectedPoints, setSelectedPoints] = s_points
    const [showSignalsList, setShowSignalsList] = visibleState

    useLayoutEffect(() => {
        (async () => {
            if (selectedPoints === null) {
                await getSignals({ signalsState: [selectedPoints, setSelectedPoints] })
            }
        })()

    }, [])

    

    return (
        <Modal animationType='slide' visible={showSignalsList}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{
                    color: 'black', 
                    fontSize: 24, 
                    textAlign: 'center', 
                    fontWeight: '500',
                    marginTop: 10}}>
                    Select which signals' location you want to find
                </Text>
                {selectedPoints && selectedPoints.length === 0 && <Text>No signals were added.</Text>}
                {selectedPoints && selectedPoints.length > 0 &&
                    selectedPoints.map((i) => {
                        return <SignalItem item={i} visibleState={[showSignalsList, setShowSignalsList]}/>
                    })}

                <TouchableOpacity>
                    <Pressable onPress={() => setShowSignalsList(false)} style={styles.closebtn}>
                        <Text style={{color: 'black', fontSize: 16, fontWeight: '500'}}>Close</Text>
                    </Pressable>
                </TouchableOpacity>

            </View>
        </Modal>
    )
}

export default SignalsModal

const styles = StyleSheet.create({
    closebtn: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'center',
        marginTop: 25,
        borderRadius: 5,
        padding: 10
    },
})
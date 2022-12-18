import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const PressableText = ({ text, textColor, onClick }) => {

    const styles = StyleSheet.create({
        text: {
            color: textColor ?? 'black',
            fontSize: 16,
            marginLeft: 10,
        }
    })

    return (
        <TouchableOpacity>
            <Pressable onPress={() => onClick()}>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        </TouchableOpacity>
    )
}
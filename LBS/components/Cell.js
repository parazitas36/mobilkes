import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Cell = ({ x, y, empty, user, size }) => {
    const styles = StyleSheet.create({
        view: {
            backgroundColor: empty ? 'none' : user ? 'tomato' : 'rgba(0, 0, 0, 0.85)',
            borderRadius: 1,
            width: size,
            height: size,
            alignSelf: 'center',
        }
    })

  return (
    <View style={styles.view}/>
  )
}

export default Cell
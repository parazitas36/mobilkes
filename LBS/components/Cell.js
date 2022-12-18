import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Cell = ({ x, y, empty, user, points, size }) => {
  var bg_color = 'rgba(0, 0, 0, 0.85)'

  if (empty) {
    bg_color = 'none'
  }

  if (user !== null && user.x == x && user.y == y) {
    bg_color = 'tomato'
  }
  const styles = StyleSheet.create({
    view: {
      backgroundColor: bg_color,
      borderRadius: 1,
      width: size,
      height: size,
      alignSelf: 'center',
    }
  })

  return (
    <View style={styles.view} />
  )
}

export default Cell
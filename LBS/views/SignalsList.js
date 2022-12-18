import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { useState, useContext, useLayoutEffect } from 'react'
import { Context } from '../App'
import { getSignals, insertSignals } from '../database/db'
import { PressableText } from '../components/PressableText'
import { ActivityIndicator } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AddSignalDialog from '../components/AddSignalDialog'
import { Provider } from '@react-native-material/core'

const Item = ({ item }) => {
  return (
    <View style={styles.itemView}>
      <View style={{ width: '70%' }}>
        <Text style={{ color: 'black', fontSize: 14 }}>
          {`ID: ${item.id} {${item.stiprumai.join(', ')}}`}
        </Text>
      </View>
      <View style={styles.clickablesView}>
        <PressableText text={'edit'} textColor={'green'} onClick={() => console.log('edit')} />
        <PressableText text={'remove'} textColor={'red'} onClick={() => console.log('remove')} />
      </View>
    </View>
  )
}

const FAB = ({ onCLick }) => {
  return (
    <TouchableOpacity>
      <Pressable style={styles.fab} onPress={onCLick}>
        <FontAwesome5 name='plus' color='#694fad' size={28} />
      </Pressable>
    </TouchableOpacity>
  )
}

const SignalsList = () => {
  const { s_points } = useContext(Context)
  const [selectedPoints, setSelectedPoints] = s_points
  const [isLoaded, setIsLoaded] = useState(selectedPoints === null)
  const [visible, setVisible] = useState(false)
  const [reload, setReload] = useState(false)

  useLayoutEffect(() => {
    (async () => {
      await getSignals({ signalsState: [selectedPoints, setSelectedPoints] })

      setIsLoaded(true)
      setReload(false)
    })()
  }, [reload === true])

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color="#694fad" />
        <Text>Loading</Text>
      </View>
    )
  }

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <AddSignalDialog 
          state={[visible, setVisible]} 
          reloadState={[reload, setReload]} />
        <ScrollView>
          {selectedPoints && selectedPoints.length > 0 && selectedPoints.map((i) => {
            return <Item item={i} />
          })}
          {selectedPoints && selectedPoints.length === 0 && <Text>No signals were added.</Text>}
        </ScrollView>
        <View style={{ width: '100%', alignItems: 'flex-end', height: 100, justifyContent: 'center', paddingRight: 15 }}>
          <FAB onCLick={() => setVisible(!visible)} />
        </View>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  itemView: {
    width: '90%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    alignSelf: 'center',
  },
  clickablesView: {
    width: '30%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  fab: {
    backgroundColor: '#93AD4F',
    width: 55,
    height: 55,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90,
    position: 'relative',
  },
})

export default SignalsList
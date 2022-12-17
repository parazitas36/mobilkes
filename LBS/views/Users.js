import { React, useState, useLayoutEffect } from 'react'
import UserDetails from '../api/UserDetails'
import { ScrollView } from 'react-native-gesture-handler'
import { View, StyleSheet, Text } from 'react-native'
import { getUsers, insertUsers, usersExists } from '../database/db'
import { ENDPOINT_Users } from '../api/Constants'
import GetCall from '../api/GetCall'
import { ActivityIndicator } from 'react-native-paper'

const Users = ({navigation}) => {
  const [data, setData] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [usersExist, setUsersExist] = useState(null)

  useLayoutEffect(() => {
    (async () => {
      if (usersExist === null) {
        await usersExists({ usersExistState: [usersExist, setUsersExist] })
      }
      console.log('after ', usersExist)
      if (usersExist !== null && !usersExist && data === null) {
        const resp_data = await GetCall(ENDPOINT_Users)

        await insertUsers(resp_data)
        setData(resp_data)
      } else if (usersExist !== null && data === null) {
        await getUsers({ usersState: [data, setData] })
      }

      setIsLoaded(true)
    })()
  }, [usersExist])


  if (!isLoaded || data === null) {
    return (
      <View style={styles.view}>
        <ActivityIndicator size='large' color="#694fad" />
        <Text>Loading</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      {data !== null && data.length > 0 && data.map((x) => {
        return <UserDetails item={x} navigation={navigation}/>
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(204, 205, 198, 0.33)',
  },
})

export default Users
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Cell from '../components/Cell'
import GetCall from '../api/GetCall'
import { ENDPOINT_Grid } from '../api/Constants'

const device_width = Dimensions.get('screen').width
const device_height = Dimensions.get('screen').height

const Home = () => {
    const[data, setData] = useState([])

    useLayoutEffect(() => {
        (async() => {
            const resp_data = await GetCall(ENDPOINT_Grid)
            setData(resp_data)
        })()
    }, [])

    const Grid = () => {
        if(data && data.length > 0){
            var x_low = data.reduce((prev, curr) => {
                return prev.x < curr.x ? prev : curr
            }).x

            var x_hi = data.reduce((prev, curr) => {
                return prev.x > curr.x ? prev : curr
            }).x

            var y_low = data.reduce((prev, curr) => {
                return prev.y < curr.y ? prev : curr
            }).y

            var y_hi = data.reduce((prev, curr) => {
                return prev.x > curr.x ? prev : curr
            }).y

            const cell_width = device_width / (x_hi - x_low + 1)
            const cell_height = device_height / (y_hi - y_low + 1)

            const cell_size = Math.min(cell_height, cell_width) * .65

            var rows = [];
            for (var row = y_hi; row >= y_low; row--) {
                var cells = [];
                for (var cell = x_low; cell <= x_hi; cell++) {
                    cells.push(
                        <Cell 
                            x={cell} 
                            y={row} 
                            empty={data.filter((c) => {
                                return c.x == cell && c.y == row && c.data == null
                            }).length > 0}
                            user={false} 
                            size={cell_size}
                        />
                    )
                }
                rows.push(cells)
            }
            return rows
        }
    }

  return (
    <ScrollView contentContainerStyle={styles.view}>
        {data && data.length > 0 && Grid().map((x) => {
            return <View style={styles.gridView}>
            {x.map((y) => {
                return y
            })}
            </View>
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
    gridView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
})

export default Home
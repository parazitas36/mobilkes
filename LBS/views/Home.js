import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator, Text, ToastAndroid } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import Cell from '../components/Cell'
import GetCall from '../api/GetCall'
import { ENDPOINT_Grid } from '../api/Constants'
import { createTables, dbExists, getGrid, insertGrid } from '../database/db'
import { Context } from '../App'

const device_width = Dimensions.get('screen').width
const device_height = Dimensions.get('screen').height

const Home = () => {
    const [dbExist, setDbExist] = useState(gridData === null ? null : true)
    const { s_user, s_points, grid } = useContext(Context)
    const[selectedUser, setSelectedUser] = s_user
    const[selectedPoints, setSelectedPoints] = s_points
    const[gridData, setGridData] = grid
    const [isLoaded, setIsLoaded] = useState(gridData === null)

    useLayoutEffect(() => {
        (async () => {
            if (dbExist === null) {
                await dbExists({ dbExistState: [dbExist, setDbExist] })
            }

            if (dbExist !== null && !dbExist && gridData === null) {
                await createTables()
                
                ToastAndroid.show("Loading data from api.",
                    ToastAndroid.SHORT);
                const resp_data = await GetCall(ENDPOINT_Grid)
                await insertGrid(resp_data)

                setGridData(resp_data)
            } else if (dbExist !== null && gridData === null) {
                ToastAndroid.show("Loading data from local database.",
                    ToastAndroid.SHORT);
                await getGrid({ gridState: [gridData, setGridData] })
            }

            setIsLoaded(true)
        })()
    }, [dbExist])

    const Grid = () => {
        if (gridData && gridData.length > 0) {
            var x_low = gridData.reduce((prev, curr) => {
                return prev.x < curr.x ? prev : curr
            }).x

            var x_hi = gridData.reduce((prev, curr) => {
                return prev.x > curr.x ? prev : curr
            }).x

            var y_low = gridData.reduce((prev, curr) => {
                return prev.y < curr.y ? prev : curr
            }).y

            var y_hi = gridData.reduce((prev, curr) => {
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
                            empty={gridData.filter((c) => {
                                return c.x == cell && c.y == row && c.data == null
                            }).length > 0}
                            user={selectedUser}
                            points={selectedPoints}
                            size={cell_size}
                        />
                    )
                }
                rows.push(cells)
            }
            return rows
        }
    }

    if (!isLoaded || gridData === null) {
        return (
            <View style={styles.view}>
                <ActivityIndicator size='large' color="#694fad" />
                <Text>Loading</Text>
            </View>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.view}>
            {gridData && gridData.length > 0 && Grid().map((x) => {
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
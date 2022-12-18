import { useState } from 'react';
import { enablePromise, openDatabase } from 'react-native-sqlite-storage';

enablePromise(true)

export const gridTable = 'grid'
export const usersTable = 'users'
export const signalsTable = 'signals'

export const getDBConnection = async () => {
    return openDatabase({ name: 'LocalCache.db', location: 'default' })
}

export const dbExists = async ({ dbExistState }) => {
    const db = await getDBConnection()
    const [dbExist, setDbExist] = dbExistState
    await db.transaction(txn => {
        txn.executeSql(`SELECT name FROM sqlite_master WHERE type='table' AND name='${gridTable}'`,
            [],
            (sqlTxn, res) => {
                setDbExist(res.rows.length > 0)
            },
            error => {
                setDbExist(false)
            })
    })
}

export const usersExists = async ({ usersExistState }) => {
    const db = await getDBConnection()
    const [usersExist, setUsersExist] = usersExistState
    await db.transaction(txn => {
        txn.executeSql(`SELECT mac FROM '${usersTable}'`,
            [],
            (sqlTxn, res) => {
                setUsersExist(res.rows.length > 0)
            },
            error => {
                setUsersExist(false)
            })
    })
}

export const createTables = async () => {

    await deleteTable(`DROP TABLE IF EXISTS ${gridTable}`)
    await deleteTable(`DROP TABLE IF EXISTS ${usersTable}`)
    await deleteTable(`DROP TABLE IF EXISTS ${signalsTable}`)

    await createTable(`CREATE TABLE IF NOT EXISTS ${gridTable}(x INTEGER, y INTEGER, data TEXT NULL)`)
    await createTable(`CREATE TABLE IF NOT EXISTS ${usersTable}(mac VARCHAR, ap1 INTEGER, ap2 INTEGER, ap3 INTEGER)`)
    await createTable(`CREATE TABLE IF NOT EXISTS ${signalsTable}(id INTEGER PRIMARY KEY AUTOINCREMENT, ap1 INTEGER, ap2 INTEGER, ap3 INTEGER)`)
}

const createTable = async (query) => {
    const db = await getDBConnection()

    await db.transaction(txn => {
        txn.executeSql(query,
            [],
            (sqlTxn, res) => {
                console.log('table created successfully')
            },
            error => {
                console.log(error)
            })
    })
}

export const insertGrid = async (grid) => {
    const db = await getDBConnection()

    const query = `INSERT INTO ${gridTable}(x, y, data) values` +
        grid.map(i => `(${i.x}, ${i.y}, '${JSON.stringify(i.data)}')`).join(',');

    await db.transaction(txn => {
        txn.executeSql(query,
            [],
            (sqlTxn, res) => {
                console.log('Grid inserted')
            },
            error => {
                console.log(error)
            })
    })
}

export const insertUsers = async (users) => {
    const db = await getDBConnection()

    const query = `INSERT INTO ${usersTable}(mac, ap1, ap2, ap3) values` +
        users.map(i => `('${i.mac}', ${i.stiprumai[0]}, ${i.stiprumai[1]}, ${i.stiprumai[2]})`).join(',');

    await db.transaction(txn => {
        txn.executeSql(query,
            [],
            (sqlTxn, res) => {
                console.log('Users inserted')
            },
            error => {
                console.log(error)
            })
    })
}

export const insertSignals = async (signals) => {
    const db = await getDBConnection()

    const query = `INSERT INTO ${signalsTable}(ap1, ap2, ap3) values` +
        signals.map(i => `(${i.ap1}, ${i.ap2}, ${i.ap3})`).join(',');
    console.log(query)

    await db.transaction(txn => {
        txn.executeSql(query,
            [],
            (sqlTxn, res) => {
                console.log('Signals inserted')
            },
            error => {
                console.log(error)
            })
    })
}

const deleteTable = async (query) => {
    const db = await getDBConnection()

    await db.transaction(txn => {
        txn.executeSql(query,
            [],
            (sqlTxn, res) => {
                console.log('table deleted successfully')
            },
            error => {
                console.log(error)
            })
    })
}

export const getGrid = async ({gridState}) => {
    try {
        const db = await getDBConnection()
        const [gridData, setGridData] = gridState

        await db.transaction(txn => {
            txn.executeSql(`SELECT * FROM ${gridTable}`,
                [],
                (sqlTxn, res) => {
                    let grid = []

                    for(var i = 0; i < res.rows.length; i++){
                        let item = res.rows.item(i)
                        grid.push({x: item.x, y: item.y, data: JSON.parse(item.data)})
                    }
                    setGridData(grid)
                },
                error => {
                    console.log(error)
                })
        })

    } catch (error) {
        console.log(error);
    }
}

export const getUsers = async ({usersState}) => {
    try {
        const db = await getDBConnection()
        const [data, setData] = usersState

        await db.transaction(txn => {
            txn.executeSql(`SELECT * FROM ${usersTable}`,
                [],
                (sqlTxn, res) => {
                    let users = []

                    for(var i = 0; i < res.rows.length; i++){
                        let item = res.rows.item(i)
                        users.push({ mac: item.mac, stiprumai: [item.ap1, item.ap2, item.ap3]})
                    }
                    setData(users)
                },
                error => {
                    console.log(error)
                })
        })

    } catch (error) {
        console.log(error);
    }
}

export const getSignals = async ({signalsState}) => {
    try {
        const db = await getDBConnection()
        const [selectedPoints, setSelectedPoints] = signalsState

        await db.transaction(txn => {
            txn.executeSql(`SELECT * FROM ${signalsTable}`,
                [],
                (sqlTxn, res) => {
                    let signals = []

                    for(var i = 0; i < res.rows.length; i++){
                        let item = res.rows.item(i)
                        signals.push({ 
                            id: item.id, 
                            stiprumai: [item.ap1, item.ap2, item.ap3],
                            color: null,
                            selected: false
                        })
                    }
                    setSelectedPoints(signals)
                },
                error => {
                    console.log(error)
                })
        })

    } catch (error) {
        console.log(error);
    }
}
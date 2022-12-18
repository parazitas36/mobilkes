import React, {useState} from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
    Text,
    TextInput,
    Stack
} from "@react-native-material/core";
import { insertSignals } from "../database/db";

const Insert = async (ap1, ap2, ap3) => {
    const signals = [{ ap1: ap1, ap2: ap2, ap3: ap3}]

    await insertSignals(signals)
} 

const AddSignalDialog = ({ state, reloadState }) => {

    const [visible, setVisible] = state
    const [reload, setReload] = reloadState

    const [ap1, setAp1] = useState(0)
    const [ap2, setAp2] = useState(0)
    const [ap3, setAp3] = useState(0)

    return (
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                <DialogHeader title="Dialog Header" />
                <DialogContent>
                    <Stack spacing={2}>
                        <Text>{`Enter a signal strength for each access point(AP).`}</Text>
                        <TextInput placeholder="AP1" value={ap1} onChangeText={setAp1} keyboardType='number-pad' variant="standard" />
                        <TextInput placeholder="AP2" value={ap2} onChangeText={setAp2} keyboardType='number-pad' variant="standard" />
                        <TextInput placeholder="AP3" value={ap3} onChangeText={setAp3} keyboardType='number-pad' variant="standard" />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        title="Cancel"
                        compact
                        variant="text"
                        onPress={() => {
                            setAp1(0)
                            setAp2(0)
                            setAp3(0) 
                            setVisible(false)
                        }}
                    />
                    <Button
                        title="Ok"
                        compact
                        variant="text"
                        onPress={() => (async() => {
                            await Insert(Number(ap1), Number(ap2), Number(ap3))
                            setAp1(0)
                            setAp2(0)
                            setAp3(0) 
                            setReload(true)
                            setVisible(false)
                        })()}
                    />
                </DialogActions>
            </Dialog>
    )
}

export default AddSignalDialog
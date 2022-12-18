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
import { editSignal } from "../database/db";

const Update = async (signal) => {

    await editSignal(signal)
} 

const EditSignalDialog = ({ state, reloadState, current }) => {

    const [editMode, setEditMode] = state
    const [reload, setReload] = reloadState

    const [ap1, setAp1] = useState(current.ap1)
    const [ap2, setAp2] = useState(current.ap2)
    const [ap3, setAp3] = useState(current.ap3)

    return (
            <Dialog visible={editMode} onDismiss={() => setEditMode(false)}>
                <DialogHeader title="Edit signals" />
                <DialogContent>
                    <Stack spacing={2}>
                        <Text>{`Edit signal strength for each access point(AP).`}</Text>
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
                            setEditMode(false)
                        }}
                    />
                    <Button
                        title="Ok"
                        compact
                        variant="text"
                        onPress={() => (async() => {
                            await Update({ id: Number(current.id), ap1: Number(ap1), ap2: Number(ap2), ap3: Number(ap3)})
                            setAp1(0)
                            setAp2(0)
                            setAp3(0) 
                            setReload(true)
                            setEditMode(false)
                        })()}
                    />
                </DialogActions>
            </Dialog>
    )
}

export default EditSignalDialog
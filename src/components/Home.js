import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import GenerationSteps from "./GenerationSteps";

const Home = () => {
    const [open, setOpen] = useState(false)
    const [widget, setWidget] = useState('')

    const onPressBtn = (widgetName) => {
        setOpen(true)
        setWidget(widgetName)
    }

    return (
        <View style={styles.screen}>
            <TouchableOpacity style={styles.button} onPress={() => onPressBtn('camera')}>
                <Text>Capture with camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => onPressBtn('gallery')}>
                <Text>Upload from gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text>My pictures</Text>
            </TouchableOpacity>
            <GenerationSteps open={open} widget={widget} setOpen={setOpen}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    input: {
        borderColor: "gray",
        width: "80%",
        color: 'black',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#2E8B57',
        marginBottom: 10
    },
});

export default Home
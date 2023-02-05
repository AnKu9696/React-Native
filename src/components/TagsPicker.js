import React, {useCallback} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

const TagsPicker = ({description, setDescription, sendEditedImg, onPressBackButton, steps, setSteps}) => {

    const onPressNextButton = useCallback(() => {
        setSteps(steps + 1)
        sendEditedImg()
    }, [steps, setSteps, sendEditedImg])

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={setDescription}
                    value={description}
                    placeholderTextColor="#000"
                    placeholder="Description"
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={onPressBackButton}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onPressNextButton}>
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#2E8B57',
        marginBottom: 10,
        marginRight: 10
    },
});

export default TagsPicker
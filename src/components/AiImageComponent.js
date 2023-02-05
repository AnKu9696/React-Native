import {ActivityIndicator, Image, StyleSheet, View} from "react-native";
import React from "react";

const AiImageComponent = ({aiImage}) => {
    return (
        <View style={styles.view}>
            {aiImage ? (
                <>
                    <Image source={{uri: aiImage}} style={styles.photo}/>
                    {/*<TouchableOpacity style={styles.button}>*/}
                    {/*    <Text>Save</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity style={styles.button} onPress={clearImage}>*/}
                    {/*    <Text>Delete</Text>*/}
                    {/*</TouchableOpacity>*/}
                </>
            ) : <ActivityIndicator/>}
        </View>
    )
}
const styles = StyleSheet.create({
    photo: {
        width: 256,
        height: 256
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 10,
        backgroundColor: '#2E8B57',
    },
    view: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default AiImageComponent
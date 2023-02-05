import React, {useCallback} from 'react';
import {Image, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {images} from "../../assets";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";


export const ImagePickerView = ({handleImageRect, widget}) => {
    const onImageLibraryPress = useCallback(() => {
        const options = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: true,
            maxWidth: 256,
            maxHeight: 256
        };
        launchImageLibrary(options, (img) => {
            handleImageRect(img)
        })
    }, [handleImageRect]);


    const onCameraPress = useCallback(() => {
        const options = {
            saveToPhotos: false,
            mediaType: 'photo',
            includeBase64: false,
        };
        launchCamera(options, (img) => {
            handleImageRect(img)
        })
    }, [handleImageRect]);

    return (
        <View style={styles.view}>
            <SafeAreaView style={styles.buttons}>
                {widget === 'gallery' && (
                    <Pressable style={styles.button} onPress={onImageLibraryPress}>
                        <Image style={styles.buttonIcon} source={images.image}/>
                        <Text style={styles.buttonText}>Library</Text>
                    </Pressable>
                )}
                {widget === 'camera' && (
                    <Pressable style={styles.button} onPress={onCameraPress}>
                        <Image style={styles.buttonIcon} source={images.camera}/>
                        <Text style={styles.buttonText}>Camera</Text>
                    </Pressable>
                )}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonIcon: {
        width: 30,
        height: 30,
        margin: 10,
    },
    buttons: {
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
    },
});

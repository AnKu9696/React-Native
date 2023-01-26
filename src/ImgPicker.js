import {Button, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useEffect, useRef, useState} from "react";

export default function ImgPicker() {
    const cameraRef = useRef(Camera)
    const [hasPermission, setHasPermission] = useState(false);
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(null)
    const [url, setUrl] = useState('')
    const devices = useCameraDevices();
    const device = devices.back;

    const onPress = () => {
        console.log(photo)
    };

    useEffect(() => {
        (async () => {
            const status = await Camera.requestCameraPermission();
            setHasPermission(status === 'authorized');
        })();
    }, []);

    const takePhoto = async () => {
        try {
            if (cameraRef.current === null) {
                return
            }
            const photo = cameraRef.current.takePhoto()
            setPhoto(photo)
        } catch (err) {
            throw new Error(err)
        }
    }

    return (
        device != null &&
        hasPermission && (
            <>
                {photo === null && (
                    <>
                        <Camera
                            ref={cameraRef}
                            style={StyleSheet.absoluteFill}
                            device={device}
                            isActive={true}
                            photo={true}
                        />
                        <View style={styles.screen}>
                            <TouchableOpacity
                                onPress={takePhoto}
                                style={styles.roundButton1}>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                {photo !== null && (
                    <View style={styles.screen}>
                        <Button style title={'Send photo'} onPress={onPress}/>
                        <Button style title={'Reset photo'} onPress={() => setPhoto(null)}/>
                    </View>
                )}
            </>
        )
    );
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    roundButton1: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        marginBottom: 20,
        backgroundColor: 'gray',
    },
});
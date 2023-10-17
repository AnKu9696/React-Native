import {Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {images} from "../../../assets";
import {BallIndicator,} from 'react-native-indicators';
import LinearGradient from "react-native-linear-gradient";
import {CameraRoll} from "@react-native-camera-roll/camera-roll";
import Toast from "react-native-toast-message";
import ReactNativeBlobUtil from "react-native-blob-util";
import {getPermissionAndroid} from "../../helpers/androidPermision";

const GeneratedImage = ({aiImage, onClose}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const downloadImage = async () => {
        if (Platform.OS === 'android') {
            const granted = await getPermissionAndroid();
            if (!granted) {
                return;
            }
        }
        if (Platform.OS === 'android') {
            const {config, fs} = ReactNativeBlobUtil;
            const PictureDir = fs.dirs.PictureDir;
            const date = new Date()
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path:
                        PictureDir +
                        '/image_' +
                        Math.floor(date.getTime() +
                            date.getSeconds() / 2) + '.png',
                    description: 'Image',
                },
            };
            config(options)
                .fetch('GET', aiImage)
                .then(res => CameraRoll.save(res.data, {type: 'photo'}))
                .then(() => alert('Image Downloaded Successfully.'))
        } else {
            CameraRoll.save(aiImage, {type: 'photo'})
                .then(() => Toast.show({
                    type: 'success',
                    text1: 'The image has been successfully added to your device library!'
                })).catch(err => console.log('err:', err))
        }
    };

    return (
        <View style={[styles.view, aiImage ? {height: '91%'} : {height: '100%'}]}>
            {aiImage ?
                (
                    <View style={styles.container}>
                        <View style={{flex: 3}}>
                            <Text style={[styles.textBold, {marginBottom: 19}]}>Congratulations!</Text>
                            <Image style={[styles.photo, {
                                width: Math.floor(windowWidth * 0.86),
                                height: Math.floor(windowHeight * 0.54)
                            }]} source={{uri: aiImage}}/>
                        </View>
                        <View style={{marginTop: '20%', flex: 1}}>
                            <TouchableOpacity
                                style={[styles.button, {
                                    width: '100%',
                                    alignItems: "center",
                                    marginBottom: 20,
                                    paddingVertical: '5.5%'
                                }]}
                                onPress={downloadImage}>
                                <Text style={[styles.textBold, {fontSize: 18}]}>Save</Text>
                            </TouchableOpacity>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                            colors={['rgba(152, 151, 218, 0.2)', 'rgba(22, 22, 24, 0.2)']}
                                            style={styles.buttonContainer}>
                                <TouchableOpacity style={{width: '100%', alignItems: "center", paddingVertical: '5.5%'}}
                                                  onPress={onClose}>
                                    <Text style={[styles.textBold, {fontSize: 18}]}>New Picture</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                ) :
                (
                    <View style={styles.textContainer}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={{flex: 4}}>
                                <Text style={styles.textBold}>Lenscake</Text>
                                <Text style={[styles.textLight, {marginBottom: 30}]}>Powered with AI</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Image source={images.homeLogo}/>
                            </View>
                        </View>
                        <Text style={[styles.textLight, {marginBottom: 8}]}>Wait a second</Text>
                        <Text style={styles.textBold}>Neural engine is generating a picture..</Text>
                        <View style={{flex: 1}}>
                            <Image style={{width: '100%', height: '80%', resizeMode: 'contain'}}
                                   source={images.largeMyPictureHome}/>
                            <BallIndicator count={8} size={70} color={'#8484C7'}/>
                        </View>
                    </View>
                )}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    photo: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#BBBBFC',
    },
    button: {
        paddingVertical: 15,
        backgroundColor: '#BBBBFC',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 20
    },
    view: {
        backgroundColor: '#1B1B27',
        borderRadius: 40,
        padding: 25,
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: '#35344A',
        borderWidth: 1,
        borderColor: '#BBBBFC',
        borderRadius: 20,
    },
    textBold: {
        fontSize: 32,
        fontWeight: 500,
        color: 'white',
        opacity: 1,
        fontFamily: 'Rubik-Medium'
    },
    textLight: {
        color: '#B9B2C4',
        fontFamily: 'Rubik-Light',
        fontSize: 16
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: Platform.OS === 'ios' ? '11%' : '1%'
    },
});

export default GeneratedImage
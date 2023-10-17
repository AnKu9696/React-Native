import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {images} from "../../../assets";
import React from "react";
import LinearGradient from "react-native-linear-gradient";

const AddNewImage = ({
                            widget,
                            setWidget,
                            onImageLibraryPress,
                            onCameraPress,
                            imageUri,
                            setSteps,
                            steps,
                            setOriginalImage
                        }) => {
    const onNextPress = () => {
        setSteps(steps + 1)
        setWidget(null)
    }

    return (
        <View style={styles.view}>
            <View style={{flex: 1}}>
                <Text style={[styles.textBold]}>Create a new picture</Text>
                    {imageUri ? (
                        <View style={{flexDirection: 'row', flex:1, justifyContent: 'space-between', marginTop: '7%', marginBottom:'15%'}}>
                            <View style={{justifyContent:'space-between'}}>
                                <Text style={[styles.textBold, {fontSize: 20}]}>File</Text>
                                <View>
                                    <Text style={[styles.textBold, {
                                        color: '#3E8BFF',
                                        fontSize: 18,
                                        marginBottom: 23,
                                        marginTop: 23,
                                        position: 'relative'
                                    }]}>avatar.png</Text>
                                    <TouchableOpacity style={{position: 'absolute', top: '13%', right: '22%'}}
                                                      onPress={() => setOriginalImage(null)}>
                                        <Image source={images.cancelButton}/>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.uploadButton}
                                                  onPress={widget === 'gallery' ? onImageLibraryPress : onCameraPress}>
                                    <Text style={[styles.textBold, {fontSize: 18}]}>Upload New</Text>
                                </TouchableOpacity>
                            </View>
                            <Image style={[styles.uploadedImage, {
                                borderWidth: 2,
                                borderColor: '#BBBBFC',
                                borderRadius: 20
                            }]}
                                   source={{uri: imageUri}}/>
                        </View>
                    ) : (
                        <View style={{maxHeight: '50%', marginBottom:'14%'}}>
                            <Text style={[styles.textBold, { fontSize: 20, marginTop: 20, marginBottom: 15}]}>Upload your
                                first file</Text>
                            <TouchableOpacity style={{width: '50%', height:'70%'}} onPress={onImageLibraryPress}>
                                <Image style={[styles.newImageButton]}
                                       source={images.newImage} />
                            </TouchableOpacity>
                        </View>
                    )}
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                colors={['rgba(152, 151, 218, 0.2)', 'rgba(22, 22, 24, 0.2)']}
                                style={styles.buttonContainer}>
                    <TouchableOpacity style={{width: '100%', alignItems: 'center',paddingVertical: '5.5%'}}
                                      onPress={onNextPress}>
                        <Text style={[styles.textBold, {fontSize: 18}]}>Next</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#1B1B27',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 40,
        height: '46%',
      padding: '7%'
    },
    buttonIcon: {
        width: 30,
        height: 30,
        margin: 10,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
    },
    buttonContainer: {
        marginBottom: '6%',
        flexDirection: 'row',
        backgroundColor: '#35344A',
        borderWidth: 1,
        borderColor: '#BBBBFC',
        borderRadius: 20,

    },
    uploadButton: {
        backgroundColor: 'rgba(176, 176, 217, 0.4)',
        borderWidth: 1,
        borderColor: '#5A5766',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '8%',
        paddingHorizontal: '5%'
    },
    uploadedImage: {
        width: '40%',
        height: '100%',
        marginLeft: 20
    },
    newImageButton: {
        width: '73%',
        height: '100%',
    },
    textBold: {
        fontSize: 32,
        fontWeight: 500,
        color: 'white',
        opacity: 1,
        fontFamily: 'Rubik-Medium'
    }
});

export default AddNewImage
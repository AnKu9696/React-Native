import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import GenerationSteps from "./GenerationSteps";
import LinearGradient from "react-native-linear-gradient";
import {images} from "../../assets";
import BottomPanel from "./BottomPanel";


const Home = () => {
    const [widget, setWidget] = useState('')

    const onPressBtn = (widgetName) => {
        setWidget(widgetName)
    }

    return (
        <View style={styles.screen}>
            <View style={styles.textContainer}>
                <View>
                    <Text style={styles.textBold}>Lenscake</Text>
                    <Text style={[styles.textLight, {marginBottom: '12%'}]}>Powered with AI</Text>
                    <Text style={styles.textLight}>Make something really cool!</Text>
                    <Text style={styles.textBold}>Start creating</Text>
                </View>
                <Image style={{marginRight: 30}} source={images.homeLogo}/>

            </View>

            <LinearGradient colors={['rgba(152, 151, 218, 0.2)', 'rgba(22, 22, 24, 0.2)']}
                            style={{width: '100%', height: '21%'}}>
                <TouchableOpacity style={[styles.button]} onPress={() => onPressBtn('camera')}>
                    <View style={{maxWidth: '62%', justifyContent: 'center'}}>
                        <Text style={[styles.textMedium, {marginBottom: 10}]}>Capture with camera</Text>
                        <Text style={styles.textLight}>Launch camera and starking makining new
                            pictures </Text>
                    </View>
                    <View style={{width: '38%', justifyContent: 'center', paddingRight: 13}}>
                        <Image style={{width: '100%', resizeMode: 'contain'}} source={images.cameraHome}/>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
            <LinearGradient colors={['rgba(152, 151, 218, 0.2)', 'rgba(22, 22, 24, 0.2)']}
                            style={{width: '100%', height: '21%'}}>
                <TouchableOpacity style={[styles.button]} onPress={() => onPressBtn('gallery')}>
                    <View style={{width: '62%', justifyContent: 'center'}}>
                        <Text style={[styles.textMedium, {marginBottom: 10}]}>Upload from gallery</Text>
                        <Text style={styles.textLight}>Launch camera and starking makining new
                            pictures </Text>
                    </View>
                    <View style={{width: '38%', justifyContent: 'center', paddingRight: 13}}>
                        <Image style={{width: '100%', resizeMode: 'contain'}} source={images.myPictureHome}/>
                    </View>
                </TouchableOpacity>
            </LinearGradient>
            <LinearGradient colors={['rgba(152, 151, 218, 0.2)', 'rgba(22, 22, 24, 0.2)']}
                            style={{width: '100%', height: '21%', opacity: 0.3}}>
                <View style={[styles.button]}>
                    <View style={{width: '62%', justifyContent: 'center'}}>
                        <Text style={[styles.textMedium, {marginBottom: 10}]}>My pictures</Text>
                        <Text style={styles.textLight}>See the list of pictures you’ve already created with
                            Cakelens</Text>
                    </View>
                    <View style={{width: '38%', justifyContent: 'center', paddingRight: 13}}>
                        <Image style={{width: '100%', resizeMode: 'contain'}} source={images.libraryHome}/>
                    </View>
                </View>
            </LinearGradient>
            <BottomPanel/>
            <GenerationSteps setWidget={setWidget} widget={widget}/>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#191923',
    },
    imageContainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        marginLeft: 40,
        marginRight: 30
    },
    button: {
        flexDirection: 'row',
        borderRadius: 10,
        height: '100%',
        paddingLeft: 30,
        justifyContent: 'space-between',
    },
    textContainer: {
        flex:1,
        flexDirection: 'row',
        marginTop: '12%',
        marginBottom: '3%',
        marginLeft: 30,
        justifyContent: 'space-between',
    },
    textBold: {
        color: 'white',
        fontFamily: 'Rubik-Medium',
        fontSize: 30
    },
    textMedium: {
        color: 'white',
        fontFamily: 'Rubik-Medium',
        fontSize: 20
    },
    textLight: {
        color: '#B9B2C4',
        fontFamily: 'Rubik-Light',
        fontSize: 16
    }
});

export default Home
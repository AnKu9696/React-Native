import React from "react";
import {Image, TouchableOpacity, StyleSheet, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {images} from "../../assets";

const BottomPanel = () => {
    return (
        <LinearGradient colors={['#25253D', 'rgba(37, 37, 61, 0)']} style={{ width: '100%',flex:1,maxHeight:'13%'}}>
            <View style={styles.panelContainer}>
                <Image source={images.menuButton} style={styles.icons}/>
                <Image source={images.searchButton} style={styles.icons}/>
                <Image source={images.cameraButton} style={styles.icons}/>
                <Image source={images.feedButton} style={styles.icons}/>
                <Image source={images.socialButton}/>
            </View>

        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    panelContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',

    },
    icons: {
        marginRight: '13%'
    }

})
export default BottomPanel
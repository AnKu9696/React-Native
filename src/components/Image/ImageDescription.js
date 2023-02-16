import React, {useCallback, useRef} from "react";
import {
    Animated,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Toast from "react-native-toast-message";

const ImageDescription = ({description, setDescription, sendEditedImg, steps, setSteps}) => {
    const heightAnim = useRef(new Animated.Value(55)).current;
    const inputRange = [55, 85];
    const outputRange = ["55%", "85%"]
    const animatedHeight = heightAnim.interpolate({inputRange, outputRange});


    const onPressNextButton = useCallback(() => {
        if (description.length === 0) {
            return  Toast.show({
                type: 'error',
                text1: 'Please add description first'
            });
        }
        setSteps(steps + 1)
        sendEditedImg()
    }, [steps, setSteps, sendEditedImg])

    const onKeyPress = (e) => {
        if (e.nativeEvent.key === 'Enter' || e.nativeEvent.pageX) {
            Keyboard.dismiss()
            Animated.timing(heightAnim, {
                toValue: 55,
                duration: 500,
                useNativeDriver: false,
            }).start();
        }
    }
    const heightChangeAnimation = () => {
        Animated.timing(heightAnim, {
            toValue: 85,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }
    return (
        <Animated.View style={[styles.view, {height: animatedHeight}]}>
            <View style={{flex:1}}>
            <TouchableWithoutFeedback onPress={onKeyPress}>
                <View style={styles.container}>
                    <Text style={[styles.textBold, {marginBottom: 8}]}>Well Done!</Text>
                    <Text style={[styles.textLight, {marginBottom: 24}]}>Now let’s combine your image with new
                        objects</Text>
                    <View style={{height:'71%', maxHeight: 225, flex: 1}}>
                        <TextInput
                            style={styles.input}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={setDescription}
                            value={description}
                            onKeyPress={onKeyPress}
                            onPressIn={heightChangeAnimation}
                            placeholderTextColor='rgba(28, 25, 34, 0.5)'
                            placeholder="Start typing what objects would you like to add to your image"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                            colors={['rgba(152, 151, 218, 0.2)', 'rgba(22, 22, 24, 0.2)']}
                            style={styles.buttonContainer}>
                <TouchableOpacity style={{width: '100%', alignItems: "center", paddingVertical: '5.5%'}}
                                  onPress={onPressNextButton}>
                    <Text style={[styles.textBold, {fontSize: 18}]}>Next</Text>
                </TouchableOpacity>
            </LinearGradient>
            </View>
        </Animated.View>

    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#1B1B27',
        borderRadius: 40,
        padding: 25
    },
    container: {
        flex: 1,
    },
    input: {
        width: "100%",
        height: '100%',
        fontFamily: 'Rubik-Light',
        fontSize: 16,
        color: 'rgba(28, 25, 34, 0.5)',
        backgroundColor: '#B9B2C4',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        paddingTop: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: '#35344A',
        borderWidth: 1,
        borderColor: '#BBBBFC',
        borderRadius: 20,
        marginBottom: '6%',
        marginTop: '15%'
    },
    textBold: {
        fontSize: 32,
        fontWeight: 500,
        color: 'white',
        opacity: 1,
        fontFamily: 'Rubik-Light'
    },
    textLight: {
        color: '#B9B2C4',
        fontFamily: 'Rubik-Light',
        fontSize: 16
    }
});

export default ImageDescription
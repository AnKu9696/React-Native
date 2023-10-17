import React, {useCallback, useRef, useState} from "react";
import {Image as ReactImage, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Gesture, GestureDetector, GestureHandlerRootView,} from "react-native-gesture-handler";
import {Canvas as SkiaCanvas, Image, Path, rect, rrect, useImage} from "@shopify/react-native-skia";
import base64 from "react-native-base64";
import {svgGenerator} from "../../helpers/svgGenerator";
import LinearGradient from "react-native-linear-gradient";
import {Group} from "@shopify/react-native-skia/src/renderer/components/Group";
import {images} from "../../../assets";
import Toast from 'react-native-toast-message';

const EditImage = ({img, saveEditedPhoto, setSteps, steps, toastRef}) => {
    const [paths, setPaths] = useState([]);
    const canvasRef = useRef(null)
    const image = useImage(img.assets[0].uri)
    const roundedRect = image && rrect(rect(0, 0, image.width(), image.height()), 20, 20);
    const pan = Gesture.Pan()
        .onStart((g) => {
            const newPaths = [...paths];
            newPaths[paths.length] = []
            newPaths[paths.length].push(`M ${g.x} ${g.y}`);
            setPaths(newPaths);
        })
        .onUpdate((g) => {
            const index = paths.length - 1;
            const newPaths = [...paths];
            if (newPaths?.[index]) {
                newPaths[index].push(`L ${g.x} ${g.y}`);
                setPaths(newPaths);
            }
        })
        .minDistance(1);

    const onSave = useCallback(() => {
        if (paths.length === 0) {
            return Toast.show({
                type: 'error',
                text1: 'Please edit photo first'
            });
        }
        const allSegments = []
        paths.forEach(el => {
            allSegments.push(el.join(''))
        })
        const svg = svgGenerator(image, allSegments, 20)
        saveEditedPhoto(base64.encode(svg))
        setSteps(steps + 1)
    }, [paths, saveEditedPhoto, setSteps, steps])

    const undoLastDraw = useCallback(() => {
        setPaths(paths.slice(0, -1))
    }, [paths])

    return (
        <GestureHandlerRootView style={styles.view}>
            {image && (
                <View style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: "center"}}>
                    <View>
                        <Text style={[styles.textBold, {marginBottom: 20}]}>Create a new picture</Text>
                        <Text style={styles.textLight}>Please draw on your image the place for new objects, i.e you can
                            draw the place for hat on
                            your head</Text>
                    </View>
                    <View style={{display: 'flex', flex: 3, marginTop: 20}}>
                        <View style={{position: 'relative', alignItems: 'center',marginBottom: '15%'}}>
                            <GestureDetector gesture={pan}>
                                <SkiaCanvas style={{
                                    borderRadius: 20,
                                    borderWidth: 2,
                                    borderColor: '#BBBBFC',
                                    position: "relative",
                                    width: image.width(),
                                    height: image.height(),
                                }} ref={canvasRef} mode={'continuous'}>
                                    <Group clip={roundedRect}>
                                        <Image image={image} x={0} y={0} fit={"fill"} width={image.width()}
                                               height={image.height()}/>
                                        {paths.map((p, index) => (
                                            <Path
                                                key={index}
                                                path={p.join(" ")}
                                                strokeWidth={20}
                                                style="stroke"
                                                strokeCap="round"
                                                strokeJoin="round"
                                                color={'white'}
                                            />
                                        ))}
                                    </Group>
                                </SkiaCanvas>
                            </GestureDetector>
                            <View style={{position: 'absolute', top: 10, right: 10}}>
                                <Pressable onPress={undoLastDraw}>
                                    <ReactImage source={images.eraserIcon}
                                                style={{
                                                    width: image.width() * 0.09,
                                                    height: image.height() * 0.07,
                                                    minHeight: 30,
                                                    minWidth: 30
                                                }}/>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:1, justifyContent:'flex-end'}}>
                        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                                        colors={['rgba(152, 151, 218, 0.2)', 'rgba(22, 22, 24, 0.2)']}
                                        style={styles.buttonContainer}>
                            <TouchableOpacity style={{width: '100%', alignItems: "center", paddingVertical: '5.5%'}}
                                              onPress={onSave}>
                                <Text style={[styles.textBold, {fontSize: 18}]}>Next</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>

            )}
        </GestureHandlerRootView>
    );
};
const styles = StyleSheet.create({
    eraseImage: {
        top: 0,
        bottom: 0
    },
    view: {
        backgroundColor: '#1B1B27',
        borderRadius: 40,
        height: '89%',
        padding: 25,
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: '#35344A',
        borderWidth: 1,
        borderColor: '#BBBBFC',
        borderRadius: 20,
        marginBottom: '6%'
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
    }
});

export default EditImage
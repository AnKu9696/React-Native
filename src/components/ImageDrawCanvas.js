import React, {useCallback, useRef, useState} from "react";
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Gesture, GestureDetector, GestureHandlerRootView,} from "react-native-gesture-handler";
import {Canvas as SkiaCanvas, Image as SkiaImage, Path, useImage} from "@shopify/react-native-skia";
import base64 from "react-native-base64";
import {svgGenerator} from "../helpers/svgGenerator";

const ImageDrawCanvas = ({img, saveEditedPhoto}) => {
    const [paths, setPaths] = useState([]);
    const canvasRef = useRef(null)
    const image = useImage(img.assets[0].uri)
    const windowWidth = Dimensions.get('window').width;


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
        const allSegments = []
        paths.forEach(el => {
            allSegments.push(el.join(''))
        })
        const svg = svgGenerator(image, allSegments, 20)
        saveEditedPhoto(base64.encode(svg))
    }, [paths, saveEditedPhoto])

    const undoLastDraw = useCallback(() => {
    },[paths])

    return (
        <>
            <GestureHandlerRootView style={{flex: 1}}>
                {image && (
                    <>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.button} onPress={onSave}>
                                <Text>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={undoLastDraw}>
                                <Text>Undo</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container}>
                            <GestureDetector gesture={pan}>
                                <SkiaCanvas style={{
                                    flex: 1,
                                    maxHeight: image.height(),
                                    maxWidth: image.width(),
                                    marginLeft: (windowWidth - image.width()) / 2,
                                    marginRight: (windowWidth - image.width()) / 2
                                }} ref={canvasRef}>
                                    <SkiaImage
                                        image={image}
                                        fit="contain"
                                        x={0}
                                        y={0}
                                        width={image.width()}
                                        height={image.height()}
                                    />
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
                                </SkiaCanvas>
                            </GestureDetector>
                        </View></>

                )}
            </GestureHandlerRootView>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#2E8B57',
        marginRight: 10
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 50,
        marginRight: 20,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
});

export default ImageDrawCanvas
import React, {useCallback, useRef, useState} from 'react'
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ImagePickerView} from "./ImagePickerView";
import ReactNativeBlobUtil from "react-native-blob-util";
import Canvas, {Image as CanvasImage} from "react-native-canvas";
import {centerImg} from "../helpers/centerCanvasImg";
import ImageDrawCanvas from "./ImageDrawCanvas";
import TagsPicker from "./TagsPicker";
import AiImageComponent from "./AiImageComponent";

const OPENAI_API_KEY = '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'

const GenerationSteps = ({open, widget, setOpen}) => {
    const canvasRef = useRef(null)
    const [originalImage, setOriginalImage] = useState(null);
    const [steps, setSteps] = useState(1)
    const [description, setDescription] = useState(null)
    const [aiImage, setAiImage] = useState('')
    const [pngBlob, setPngBlob] = useState({
        original: '',
        mask: ''
    });

    const sendEditedImg = useCallback(async () => {
        console.log('ORIGINAL', pngBlob.original)
        ReactNativeBlobUtil.fetch('POST', 'https://api.openai.com/v1/images/edits', {
            Authorization: `Bearer ${OPENAI_API_KEY}`
        }, [
            {name: 'image', filename: 'image.png', type: 'image/png', data: pngBlob.original},
            {name: 'mask', filename: 'mask.png', type: 'image/png', data: pngBlob.mask},
            {name: 'prompt', data: description},
            {name: 'size', data: '256x256'}
        ]).then((rsp) => {
            const result = rsp.json()
            setAiImage(result.data[0].url)
        })
    }, [pngBlob, description]);

    const saveEditedPhoto = useCallback((saveEdition) => {
        const actualPath = `data:image/svg+xml;base64, ${saveEdition}`;
        const image = new CanvasImage(canvasRef.current);
        const context = canvasRef.current.getContext('2d');
        const {xOffset, yOffset, newWidth, newHeight} = centerImg(originalImage, canvasRef)
        image.src = actualPath
        context.globalCompositeOperation = 'destination-out'
        image.addEventListener('load', async () => {
            context.drawImage(image, xOffset, yOffset, newWidth, newHeight);
            let dataURL = await canvasRef.current.toDataURL("image/png")
            setPngBlob({...pngBlob, mask: dataURL.replace('data:image/png;base64,', '').slice(1, -1)})
        });
    }, [pngBlob, centerImg, originalImage])


    const handleImageRect = useCallback((img) => {
        if (!(canvasRef.current instanceof Canvas)) {
            return;
        }
        const image = new CanvasImage(canvasRef.current);

        canvasRef.current.width = 256;
        canvasRef.current.height = 256;

        const context = canvasRef.current.getContext('2d');
        const {xOffset, yOffset, newWidth, newHeight} = centerImg(img, canvasRef)

        image.src = `data:${img.assets[0].type};base64, ${img.assets[0].base64}`

        image.addEventListener('load', async () => {
            context.drawImage(image, xOffset, yOffset, newWidth, newHeight);
            let dataURL = await canvasRef.current.toDataURL("image/png")
            setPngBlob({...pngBlob, original: dataURL.replace('data:image/png;base64,', '').slice(1, -1)})
            setOriginalImage(img)
        });
    }, [pngBlob]);

    const onPressBackButton = useCallback(() => {
        if (steps > 1) {
            setSteps(steps - 1)
        } else {
            setOpen(false)
        }
    }, [steps, setSteps, setOpen])

    return (
        <Modal
            visible={open}
        >
            {steps === 1 && (
                <ImagePickerView
                    handleImageRect={handleImageRect}
                    widget={widget}
                    steps={steps}
                    setSteps={setSteps}
                />
            )}
            {(steps === 2 && originalImage) && (
                <ImageDrawCanvas
                    img={originalImage}
                    saveEditedPhoto={saveEditedPhoto}
                    steps={steps}
                    setSteps={setSteps}
                />
            )}
            {steps === 3 && (
                <TagsPicker
                    description={description}
                    setDescription={setDescription}
                    steps={steps}
                    setSteps={setSteps}
                    sendEditedImg={sendEditedImg}/>
            )}
            {steps === 4 && (
                <AiImageComponent aiImage={aiImage}/>
            )}
            {steps !== 3 && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={onPressBackButton}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => setSteps(steps + 1)}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>
            )}
            <Canvas style={{display: 'none'}} ref={canvasRef}/>
        </Modal>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#2E8B57',
        marginBottom: 10,
        marginRight: 10
    },
});

export default GenerationSteps
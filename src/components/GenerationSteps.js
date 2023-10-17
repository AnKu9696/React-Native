import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Dimensions, StyleSheet} from "react-native";
import ReactNativeBlobUtil from "react-native-blob-util";
import Canvas, {Image as CanvasImage} from "react-native-canvas";
import EditImage from "./Image/EditImage";
import ImageDesription from "./Image/ImageDescription";
import GeneratedImage from "./Image/GeneratedImage";
import Modal from "react-native-modal";
import {centerImg} from "../helpers/centerCanvasImg";
import AddNewImage from "./Image/AddNewImage";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";
import Toast from 'react-native-toast-message';

const OPENAI_API_KEY = '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'

const GenerationSteps = ({widget, setWidget}) => {
    const canvasRef = useRef(null)
    const toastRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [originalImage, setOriginalImage] = useState(null);
    const [steps, setSteps] = useState(1)
    const [description, setDescription] = useState('')
    const [aiImage, setAiImage] = useState('')
    const [pngBlob, setPngBlob] = useState({
        original: '',
        mask: ''
    });
    const imageUri = originalImage && originalImage.assets[0].uri
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const sendEditedImg = useCallback(async () => {
        ReactNativeBlobUtil.fetch('POST', 'https://api.openai.com/v1/images/edits', {
            Authorization: `Bearer ${OPENAI_API_KEY}`
        }, [
            {name: 'image', filename: 'image.png', type: 'image/png', data: pngBlob.original},
            {name: 'mask', filename: 'mask.png', type: 'image/png', data: pngBlob.mask},
            {name: 'prompt', data: description},
            {name: 'size', data: '512x512'}
        ]).then((rsp) => {
            const result = rsp.json()
            setAiImage(result.data[0].url)
        })
    }, [pngBlob, description]);

    const saveEditedPhoto = useCallback((saveEdition) => {
        const actualPath = `data:image/svg+xml;base64, ${saveEdition}`;
        const image = new CanvasImage(canvasRef.current);
        const context = canvasRef.current.getContext('2d');
        image.src = actualPath
        context.globalCompositeOperation = 'destination-out'
        const {xOffset, yOffset, newWidth, newHeight} = centerImg(originalImage, canvasRef)
        image.addEventListener('load', async () => {
            context.drawImage(image, xOffset, yOffset, newWidth, newHeight);
            let dataURL = await canvasRef.current.toDataURL("image/png")
            setPngBlob({...pngBlob, mask: dataURL.replace('data:image/png;base64,', '').slice(1, -1)})
        });
    }, [pngBlob, originalImage])

    const handleImageRect = useCallback((img) => {
        if (!(canvasRef.current instanceof Canvas)) {
            return;
        }
        const image = new CanvasImage(canvasRef.current);

        canvasRef.current.width = 256
        canvasRef.current.height = 256

        const context = canvasRef.current.getContext('2d');
        const {xOffset, yOffset, newWidth, newHeight} = centerImg(img, canvasRef)

        image.src = `data:${img.assets[0].type};base64, ${img.assets[0].base64}`

        image.addEventListener('load', async () => {
            context.drawImage(image, xOffset, yOffset, newWidth, newHeight);
            let dataURL = await canvasRef.current.toDataURL("image/png")
            setPngBlob({...pngBlob, original: dataURL.replace('data:image/png;base64,', '').slice(1, -1)})
        });
    }, [pngBlob]);

    const onImageLibraryPress = useCallback(() => {
        const options = {
            selectionLimit: 1,
            mediaType: 'photo',
            quality: 1,
            includeBase64: true,
            maxWidth: Math.floor(windowWidth * 0.86),
            maxHeight: Math.floor(windowHeight * 0.54)
        };
        launchImageLibrary(options, (img) => {
            if (img.didCancel) {
                setWidget(null)
                return
            }
            handleImageRect(img)
            setOriginalImage(img)
            setOpen(true)
        })
    }, [handleImageRect]);

    const onCameraPress = useCallback(() => {
        const options = {
            saveToPhotos: false,
            mediaType: 'photo',
            quality: 1,
            includeBase64: true,
            maxWidth: Math.floor(windowWidth * 0.86),
            maxHeight: Math.floor(windowHeight * 0.54)
        };
        launchCamera(options, (img) => {
            if (img.didCancel) {
                setWidget(null)
                return
            }
            handleImageRect(img)
            setOriginalImage(img)
            setOpen(true)
        })
    }, [handleImageRect]);

    useEffect(() => {
        if (widget === 'camera') {
            onCameraPress()
        }
        if (widget === 'gallery') {
            onImageLibraryPress()
        }
    }, [widget, setWidget])

    const onClose = () => {
        setWidget(null)
        setSteps(1)
        setOpen(false)
        setDescription('')
        setAiImage(null)
    }

    return (
        <>
            <Modal
                isVisible={open}
                style={styles.view}
                animationIn={'slideInUp'}
                animationInTiming={1000}
                onBackdropPress={onClose}
            >
                {steps === 1 && (
                    <AddNewImage
                        onCameraPress={onCameraPress}
                        onImageLibraryPress={onImageLibraryPress}
                        widget={widget}
                        imageUri={imageUri}
                        setSteps={setSteps}
                        steps={steps}
                        setWidget={setWidget}
                        setOriginalImage={setOriginalImage}
                    />
                )}
                {(steps === 2 && originalImage) && (
                    <EditImage
                        img={originalImage}
                        saveEditedPhoto={saveEditedPhoto}
                        steps={steps}
                        setSteps={setSteps}
                        canvas={canvasRef}
                        toastRef={toastRef}
                    />
                )}
                {steps === 3 && (
                    <ImageDesription
                        description={description}
                        setDescription={setDescription}
                        steps={steps}
                        setSteps={setSteps}
                        sendEditedImg={sendEditedImg}
                        toastRef={toastRef}
                    />
                )}
                {steps === 4 && (
                    <GeneratedImage aiImage={aiImage} onClose={onClose}/>
                )}
                <Toast topOffset={50}/>
            </Modal>
            <Canvas style={{display: 'none'}} ref={canvasRef}/>
        </>
    )
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'flex-end',
        margin: 0,
        padding: 0,
        height: '100%'
    },

});

export default GenerationSteps
import React, {useState} from "react";
import {ActivityIndicator, Button, Image, StyleSheet, TextInput, View} from 'react-native';

const ImgEditor = () => {
    const [text, setText] = useState('')
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false);

    const onPress = async () => {
        setLoading(true)
        return fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                prompt: `${text}`,
                n: 1,
                size: "1024x1024",
            }),
        }).then(response => {
            if (!response.ok) {
                console.log(response.error)
            }
            response.json().then(rsp => {
                const {data} = rsp
                setUrl(data[0].url)
                setLoading(false)
            });
        });
    };

    const clearImg = () => {
        setUrl(null)
        setLoading(false)
    }
    return (
        <View style={{
            display: 'flex',
            justifyContent: 'center',
            height: '100%',
            backgroundColor: '#eeeee4'
        }}>
            {(!url && !loading) && (
                <>
                    <TextInput
                        label="Tags"
                        value={text}
                        onChangeText={text => setText(text)}
                    />
                    <Button raised onPress={onPress} title={'Generate'}/>
                </>
            )}
            {(!url && loading) && (
                <ActivityIndicator/>
            )}
            {url && (
                <>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: url
                        }}
                    />
                    <Button raised onPress={clearImg} title={'Clear'}/>
                </>
            )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: '100%',
        height: 500,
    }
});

export default ImgEditor
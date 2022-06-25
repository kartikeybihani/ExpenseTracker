import React from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Button,
    Platform,
    Image,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';

const AddButton = ({ ButtonName, imgSource, bgColor, txtColor, imgBackgroundColor }) => {
    return (
        <View style={{ borderColor: bgColor, backgroundColor: bgColor, pading: 8, borderWidth: 1, paddingVertical: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, marginBottom: 20 }}>
            <View style={{ borderColor: imgBackgroundColor, borderWidth: 0.5, backgroundColor: imgBackgroundColor, borderRadius: 10, padding: 5, paddingHorizontal: 10, width: 60, height: 65 }}>
                <Image source={imgSource} style={{ width: 35, height: 50, tintColor: '#dee0e3' }} />
            </View>
            <Text style={{ color: txtColor, fontSize: 22, paddingLeft: 20, fontWeight: '800' }}>{ButtonName}</Text>
        </View>
    )
}

export default AddButton


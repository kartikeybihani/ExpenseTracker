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
import Octicons from 'react-native-vector-icons/Octicons'

const AddButtonIcon = ({ ButtonName, iconName, bgColor, txtColor, bgColor1 }) => {
    return (
        <View style={{ borderColor: bgColor, backgroundColor: bgColor, pading: 8, borderWidth: 1, paddingVertical: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, marginBottom: 20 }} >
            <View style={{ borderColor: bgColor1, borderWidth: 0.5, backgroundColor: bgColor1, borderRadius: 10, padding: 5, paddingHorizontal: 10, width: 60, height: 65, alignItems: 'center', justifyContent: 'center' }}>
                <Octicons name={iconName} size={45} color='#dee0e3' />
            </View>
            <Text style={{ color: txtColor, fontSize: 22, paddingLeft: 20, fontWeight: '800' }}>{ButtonName}</Text>
        </View>
    )
}

export default AddButtonIcon
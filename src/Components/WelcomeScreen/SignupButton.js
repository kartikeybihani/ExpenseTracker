import React, { useContext } from 'react'
import { Text, Dimensions, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient'

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

function SignupButton() {
    return (
        <LinearGradient colors={['#4edec1', '#9edbcf']} style={[styles.mainButton, { justifyContent: 'center' }]}>
            <Text style={{ fontSize: 18, color: '#000000', fontWeight: "bold" }}>Sign Up for Free</Text>
        </LinearGradient>
    )
}

export default SignupButton

const styles = StyleSheet.create({
    mainButton: { height: 55, flexDirection: 'row', borderWidth: 1, padding: 10, width: WIDTH - 70, borderRadius: 5, alignItems: 'center' }
})
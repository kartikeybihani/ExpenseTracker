import React, { useContext } from 'react'
import { Text, Dimensions, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient'

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

function SocialButton({ iconName, iconText, iconSize }) {
    return (
        <LinearGradient colors={['#9edbcf', '#4edec1']} style={styles.mainButton}>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <FontAwesome name={iconName} size={iconSize} color="black" style={{ fontWeight: 'bold' }} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontSize: 18, color: 'black', fontWeight: "bold" }}>Continue with {iconText}</Text>
            </View>
        </LinearGradient>
    )
}

export default SocialButton

const styles = StyleSheet.create({
    mainButton: { height: 55, flexDirection: 'row', borderWidth: 1, padding: 10, width: WIDTH - 70, borderRadius: 5, alignItems: 'center' }
})
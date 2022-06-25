import React, { useContext } from 'react'
import { Text, Dimensions, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient'
import { AuthContext } from '../../Navigation/AuthProvider'
import SocialButton from '../../Components/WelcomeScreen/SocialLogin';
import SignupButton from '../../Components/WelcomeScreen/SignupButton';

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

function Welcome({ navigation }) {

    const { googleLogin } = useContext(AuthContext)

    return (
        <LinearGradient colors={['#2c52e8', '#abc4be']} style={{ width: WIDTH, height: HEIGHT / 2, flex: 1, paddingTop: 250 }} >
            <View style={{ alignItems: 'center' }}>
                <Image source={require('../../Assets/IconImage.png')} style={{}} />
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black', paddingTop: 20 }}>Track your Wallet</Text>
                <Text style={{ fontSize: 26, color: 'black', fontWeight: 'bold' }}>For Free</Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 30 }}>

                <TouchableOpacity style={{ paddingBottom: 15 }} onPress={() => navigation.navigate("Signup")}>
                    <SignupButton />
                </TouchableOpacity>

                <TouchableOpacity style={{ paddingBottom: 15 }} onPress={() => googleLogin()}>
                    <SocialButton iconSize={24} iconName="google" iconText="Google" />
                </TouchableOpacity>


                <TouchableOpacity style={{ paddingBottom: 15 }} onPress={() => { }}>
                    <SocialButton iconSize={24} iconName="facebook" iconText="Facebook" />
                </TouchableOpacity>


                <TouchableOpacity style={{ paddingBottom: 5, padding: 10, alignItems: 'center' }} onPress={() => navigation.navigate("Login")}>
                    <Text style={{ fontSize: 18, color: '#000000', fontWeight: "bold" }}>Log In </Text>
                </TouchableOpacity>


            </View>
        </LinearGradient>
    )
}


export default Welcome

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        marginTop: 300
    },
    mainButton: { height: 55, flexDirection: 'row', borderWidth: 1, padding: 10, width: WIDTH - 70, borderRadius: 5, alignItems: 'center' }
})
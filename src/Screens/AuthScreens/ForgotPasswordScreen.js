import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth'

const HEIGHT = Dimensions.get("window").height

function ForgotPassword({ navigation }) {

    const [email, setEmail] = useState('')

    const [emailErrMessage, setEmailErrMessage] = useState('')

    const [loading, isLoading] = useState(false);

    const [authErrMessage, setAuthErrMessage] = useState('')
    const [successMess, setSuccessMess] = useState(false)

    const onForgotPassword = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (email.length === 0) {
            setEmailErrMessage("Email can't be empty")
        }
        if (email.length !== 0 && reg.test(email) === false) {
            setEmailErrMessage('Email Not Valid')
        }
        if (reg.test(email) === true) {
            setEmailErrMessage(null)
            setSuccessMess(false)

            try {
                isLoading(true)
                await auth().sendPasswordResetEmail(email)
                setAuthErrMessage(null)
                setSuccessMess(true)
                setEmail(null)
                isLoading(false)
            }
            catch (error) {
                isLoading(false)

                if (error.code === 'auth/user-not-found') {
                    setAuthErrMessage('No user found with the given email.')
                }
                else {
                    setAuthErrMessage('Something went wrong.')
                }
                console.log(error)
            }
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#009387' }}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />

            <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingTop: 10, paddingHorizontal: 10, paddingBottom: 13 }}>
                <Ionicons name="arrow-back" size={35} color="white" />
            </TouchableOpacity>

            <Animatable.View animation="fadeInUpBig" style={styles.footer} >

                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <Feather name="mail" color="#05375a" size={20} />
                    <TextInput
                        placeholder="Your Email Address"
                        style={styles.textInput}
                        autoCapitalize="none"
                        keyboardType='email-address'
                        value={email}
                        onChangeText={(val) => setEmail(val)}
                    />
                </View>
                <Text style={styles.errTxt}>{emailErrMessage}</Text>

                {loading ? (<View style={styles.spinnerView}><ActivityIndicator size={55} color='black' /></View>) : null}

                <Text style={{ color: 'red', fontWeight: '600', alignSelf: "center" }}>{authErrMessage}</Text>
                {successMess ? (<Text style={{ color: '#05375a', fontWeight: '600', alignSelf: "center" }}>Password reset link has been sent to your email</Text>) : null}

                <TouchableOpacity onPress={() => onForgotPassword()} >
                    <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                        <Text style={[styles.textSign, { color: '#fff' }]}>FORGOT PASSWORD</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </Animatable.View>


        </View>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    signIn: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    forgotPasswordTxt: { color: '#009387', fontSize: 16, fontWeight: '700', paddingTop: 20 },
    errTxt: { fontSize: 13, color: 'red', paddingTop: 5 },
    spinnerView: {
        position: "absolute",
        zIndex: 1,
        left: 0,
        right: 0,
        top: -HEIGHT / 2,
        bottom: 0,
        alignContent: 'center',
        justifyContent: "center",
        backgroundColor: "#F5FCFF88",
    },
});
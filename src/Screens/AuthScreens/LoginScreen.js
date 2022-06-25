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

const Login = ({ navigation }) => {

    const [emailValidMessage, setEmailValidMessage] = useState(true)
    const [emailErr, setEmailErr] = useState(true)

    const [passwordValidMessage, setPasswordValidMessage] = useState(true)
    const [passwordLength, setPasswordLength] = useState(true)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    const [loginErrMessage, setLoginErrMessage] = useState(true)
    const [loginMess, setLoginMess] = useState('')

    const [loading, isLoading] = useState(false);

    const onLogin = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (!email && !password) {
            setEmailValidMessage(false)
            setPasswordValidMessage(false)
            return
        }
        if (password.length >= 6 && reg.test(email) === false) {
            setEmailValidMessage(true)
            setEmailErr(false)
            setPasswordValidMessage(true)
            setPasswordLength(true)
            return
        }
        if (password.length < 6 && password.length > 0 && reg.test(email) === false) {
            setEmailValidMessage(true)
            setEmailErr(false)
            setPasswordValidMessage(true)
            setPasswordLength(false)
            return
        }
        if (password.length < 6 && password.length > 0 && reg.test(email) === true) {
            setEmailValidMessage(true)
            setEmailErr(true)
            setPasswordValidMessage(true)
            setPasswordLength(false)
            return
        }
        if (!password && reg.test(email) === true) {
            setEmailValidMessage(true)
            setEmailErr(true)
            setPasswordValidMessage(false)
            setPasswordLength(true)
            return
        }
        if (!email && password.length < 6 && password.length > 0) {
            setEmailValidMessage(false)
            setEmailErr(true)
            setPasswordValidMessage(false)
            setPasswordLength(true)
        }
        if (reg.test(email) === false && !password) {
            setEmailErr(false)
            setEmailValidMessage(true)
            setPasswordValidMessage(false)
            setPasswordLength(true)
        }
        if (reg.test(email) === true && password.length >= 6) {
            try {
                isLoading(true)
                await auth().signInWithEmailAndPassword(email, password)
                isLoading(false)
                console.log('successful login')
            }
            catch (error) {
                setEmailErr(true)
                setEmailValidMessage(true)
                setPasswordValidMessage(true)
                setPasswordLength(true)
                isLoading(false)

                if (error.code === 'auth/wrong-password') {
                    setLoginErrMessage(false)
                    setLoginMess('Incorrect Password.')
                }
                if (error.code === 'auth/user-not-found') {
                    setLoginErrMessage(false)
                    setLoginMess('No user found with the given email.')
                }
                else {
                    setLoginErrMessage(false)
                    setLoginMess('Something went wrong.')
                }
                // alert(e)
                console.log(error)
            }
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />

            <View style={styles.headerView}>
                <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={{ paddingRight: 10 }}>
                    <Ionicons name="arrow-back" size={27} color="white" />
                </TouchableOpacity>
                <Text style={styles.text_header}>Sign in Now!</Text>
            </View>

            <Animatable.View animation="fadeInUpBig" style={styles.footer} >
                <ScrollView>

                    {/*Email*/}
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
                    {emailValidMessage ? null : (<Text style={styles.errTxt}>Email can't be empty</Text>)}
                    {emailErr ? null : (<Text style={styles.errTxt}>Email Not Valid</Text>)}

                    {/*Password*/}
                    <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather name="lock" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={secureTextEntry ? true : false}
                            style={styles.textInput}
                            value={password}
                            autoCapitalize="none"
                            onChangeText={(val) => setPassword(val)}
                        />
                        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                            <Feather name={secureTextEntry ? 'eye-off' : 'eye'} color="grey" size={20} />
                        </TouchableOpacity>
                    </View>
                    {passwordValidMessage ? null : (<Text style={styles.errTxt}>Password can't be empty</Text>)}
                    {passwordLength ? null : (<Text style={styles.errTxt}>Password should be of atleast 6 characters</Text>)}

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10 }}>
                        <Text style={{ color: 'grey' }}>By signing in you agree to our
                            <Text style={{ fontWeight: 'bold' }}>{' '}Terms of service</Text> {' '}and
                            <Text style={{ fontWeight: 'bold' }}>{' '}Privacy policy</Text>
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                        <Text style={styles.forgotPasswordTxt} >Forgot Password ?</Text>
                    </TouchableOpacity>

                    <View style={styles.button}>

                        {loading ? (<View style={styles.spinnerView}><ActivityIndicator size={55} color='black' /></View>) : null}

                        {loginErrMessage ? null : (<Text style={{ color: 'red', paddingBottom: 10, fontWeight: '600' }}>{loginMess}</Text>)}
                        <TouchableOpacity style={styles.signIn} onPress={() => onLogin()} >
                            <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                                <Text style={[styles.textSign, { color: '#fff' }]}>LOGIN</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={{ marginTop: 25 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                <Text style={{ color: '#009387', fontSize: 14 }}>Already have an account ?</Text>
                                <Text style={{ color: '#009387', fontWeight: 'bold', alignSelf: 'center', fontSize: 16 }}>Sign up</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    headerView: { flexDirection: 'row', alignItems: 'center', flex: 0.7, paddingHorizontal: 10 },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        alignSelf: 'center'
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
import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const HEIGHT = Dimensions.get("window").height

const Signup = ({ navigation }) => {

    const [name, setName] = useState('')

    const [email, setEmail] = useState('')

    const [nameValidMessage, setNameValidMessage] = useState(true)
    const [emailValidMessage, setEmailValidMessage] = useState(true)
    const [emailErr, setEmailErr] = useState(true)

    const [passwordValidMessage, setPasswordValidMessage] = useState(true)
    const [passwordLength, setPasswordLength] = useState(true)

    const [password, setPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = useState(true)

    const [signupErrMessage, setSignupErrMessage] = useState(true)
    const [signupMess, setSignupMess] = useState('')

    const [loading, isLoading] = useState(false);

    const onRegister = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (!email && !password && !name) {
            setEmailValidMessage(false)
            setPasswordValidMessage(false)
            setNameValidMessage(false)
            return
        }
        if (password.length >= 6 && reg.test(email) === false) {
            setNameValidMessage(true)
            setEmailValidMessage(true)
            setEmailErr(false)
            setPasswordValidMessage(true)
            setPasswordLength(true)
            return
        }
        if (password.length < 6 && password.length > 0 && reg.test(email) === false) {
            setNameValidMessage(true)
            setEmailValidMessage(true)
            setEmailErr(false)
            setPasswordValidMessage(true)
            setPasswordLength(false)
            return
        }
        if (password.length < 6 && password.length > 0 && reg.test(email) === true) {
            setNameValidMessage(true)
            setEmailValidMessage(true)
            setEmailErr(true)
            setPasswordValidMessage(true)
            setPasswordLength(false)
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
        if (reg.test(email) === true && password.length >= 6 && !name) {
            setEmailErr(true)
            setEmailValidMessage(true)
            setPasswordValidMessage(true)
            setPasswordLength(true)
            setNameValidMessage(false)
        }
        if (reg.test(email) === true && password.length >= 6 && name) {
            try {

                isLoading(true)
                await auth().createUserWithEmailAndPassword(email, password)
                // auth().currentUser.updateProfile({
                //     displayName: name
                // })

                // firestore().collection('users').doc(auth().currentUser.uid)
                //     .set({
                //         name: name,
                //         email: email,
                //         createdAt: firestore.Timestamp.fromDate(new Date())
                //     })

                isLoading(false)
                console.log("Successful Signup")
            }
            catch (error) {
                setEmailErr(true)
                setEmailValidMessage(true)
                setPasswordValidMessage(true)
                setPasswordLength(true)
                setNameValidMessage(true)

                isLoading(false)

                if (error.code === 'auth/email-already-in-use') {
                    setSignupErrMessage(false)
                    setSignupMess('User already exists with this email')
                }
                if (error.code === 'auth/weak-password') {
                    setSignupErrMessage(false)
                    setSignupMess('Weak Password')
                }
                // alert(e)
                console.log(error)
            }
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />

            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.7, paddingHorizontal: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={{ paddingRight: 10 }}>
                    <Ionicons name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>

            <Animatable.View animation="fadeInUpBig" style={styles.footer}>

                <ScrollView>

                    {/*Name*/}
                    <Text style={styles.text_footer}>Name</Text>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Your Name"
                            style={styles.textInput}
                            value={name}
                            autoComplete='name'
                            onChangeText={(val) => setName(val)}
                        />
                    </View>
                    {nameValidMessage ? null : (<Text style={{ fontSize: 13, color: 'red', paddingTop: 5 }}>Name can't be empty</Text>)}

                    {/*Email*/}
                    <Text style={[styles.text_footer, { marginTop: 35 }]}>Email</Text>
                    <View style={styles.action}>
                        <Feather name="mail" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Your Email Address"
                            style={styles.textInput}
                            keyboardType='email-address'
                            autoComplete='email'
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(val) => setEmail(val)}
                        />
                    </View>
                    {emailValidMessage ? null : (<Text style={{ fontSize: 13, color: 'red', paddingTop: 5 }}>Email can't be empty</Text>)}
                    {emailErr ? null : (<Text style={{ fontSize: 13, color: 'red', paddingTop: 5 }}>Email Not Valid</Text>)}

                    {/*Password*/}
                    <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
                    <View style={styles.action}>
                        <Feather name="lock" color="#05375a" size={20} />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={password}
                            onChangeText={(val) => setPassword(val)}
                        />
                        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                            <Feather name={secureTextEntry ? 'eye-off' : 'eye'} color="grey" size={20} />
                        </TouchableOpacity>
                    </View>
                    {passwordValidMessage ? null : (<Text style={{ fontSize: 13, color: 'red', paddingTop: 5 }}>Password can't be empty</Text>)}
                    {passwordLength ? null : (<Text style={{ fontSize: 13, color: 'red', paddingTop: 5 }}>Password should be of atleast 6 characters</Text>)}

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10 }}>
                        <Text style={{ color: 'grey' }}>By signing up you agree to our
                            <Text style={{ fontWeight: 'bold' }}>{' '}Terms of service</Text> {' '}and
                            <Text style={{ fontWeight: 'bold' }}>{' '}Privacy policy</Text>
                        </Text>
                    </View>

                    {/*Button*/}
                    <View style={styles.button}>

                        {loading ? (<View style={styles.spinnerView}><ActivityIndicator size={55} color='black' style={{}} /></View>) : null}

                        {signupErrMessage ? null : (<Text style={{ color: 'red', paddingBottom: 10, fontWeight: '600' }}>{signupMess}</Text>)}
                        <TouchableOpacity style={styles.signIn} onPress={() => onRegister()} >
                            <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                                <Text style={[styles.textSign, { color: '#fff' }]}>REGISTER</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <View style={{ marginTop: 25 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={{ color: '#009387', fontSize: 14 }}>Don't have an account ?</Text>
                                <Text style={{ color: '#009387', fontWeight: 'bold', alignSelf: 'center', fontSize: 16 }}>Sign in</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 0.7,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
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
        width: '90%',
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
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
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
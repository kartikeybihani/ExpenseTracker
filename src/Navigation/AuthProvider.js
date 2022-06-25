import React, { createContext, useState } from 'react'
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin';

export const AuthContext = createContext()

const HEIGHT = Dimensions.get("window").height

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, isLoading] = useState(false);

    if (loading) {
        return (
            <View style={styles.spinnerView}>
                <ActivityIndicator size={55} color='black' style={{}} />
            </View>
        )
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password)
                        console.log('successful login')
                    }
                    catch (e) {
                        alert(e)
                        console.log(e)
                    }
                },
                googleLogin: async () => {
                    try {
                        isLoading(true)
                        // Get the users ID token
                        const { idToken } = await GoogleSignin.signIn();

                        // Create a Google credential with the token
                        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

                        // Sign-in the user with the credential
                        auth().signInWithCredential(googleCredential);
                        isLoading(false)
                    }
                    catch (e) {
                        alert(e)
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password)
                        console.log('successful signup')
                    }
                    catch (e) {
                        alert(e)
                        console.log(e)
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut()
                        console.log('successful logout')
                    }
                    catch (e) {
                        alert(e)
                        console.log(e)
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const styles = StyleSheet.create({
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
})
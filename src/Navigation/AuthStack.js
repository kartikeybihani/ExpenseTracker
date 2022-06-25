import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-community/google-signin';

import Welcome from '../Screens/AuthScreens/WelcomeScreen'
import Login from '../Screens/AuthScreens/LoginScreen'
import Signup from '../Screens/AuthScreens/SignupScreen';
import ForgotPassword from '../Screens/AuthScreens/ForgotPasswordScreen'

const Stack = createNativeStackNavigator();

function AuthStack() {

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '539439440895-5t60ddajensuv5ilsllejn9tok19hnqn.apps.googleusercontent.com'
        })
    })

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default AuthStack
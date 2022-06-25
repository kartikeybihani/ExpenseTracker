import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';

import Home from '../Screens/HomeScreen';
import AddIncome from '../Screens/AppScreens/AddIncomeScreen'
import AddExpense from '../Screens/AppScreens/AddExpenseScreen';

const Stack = createNativeStackNavigator();

function StackNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{ headerStyle: { backgroundColor: "lightblue" }, headerLeft: null }} />
                <Stack.Screen name="Add Income" component={AddIncome} options={{ headerStyle: { backgroundColor: "lightblue" } }} />
                <Stack.Screen name="Add Expense" component={AddExpense} options={{ headerStyle: { backgroundColor: "lightblue" } }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default StackNavigation
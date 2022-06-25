import React, { useContext, useEffect, useState } from 'react';
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
    ScrollView,
    Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { VictoryTheme, VictoryPie, } from 'victory-native';
import * as Animatable from 'react-native-animatable';
import AddButton from '../Components/HomeScreen/AddButton'
import AddButtonIcon from '../Components/HomeScreen/AddButtonIcon';
import { AuthContext } from '../Navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore'

class Collection extends Array { sum(key) { return this.reduce((a, b) => a + (b[key] || 0), 0) } }

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function Home({ navigation }) {

    const { logout, user } = useContext(AuthContext)

    const expenseListItems = useSelector((state) => state.expense.expenseList);
    const incomeListItems = useSelector((state) => state.income.incomeList);

    for (let i = 0; i < expenseListItems.length; i++) { expenseListItems[i].amount = Number(expenseListItems[i].amount) }
    for (let i = 0; i < incomeListItems.length; i++) { incomeListItems[i].amount = Number(incomeListItems[i].amount) }

    const expenseSum = new Collection(...expenseListItems).sum("amount")
    const incomeSum = new Collection(...incomeListItems).sum("amount")

    const total = incomeSum + expenseSum;

    const incomePercent = Math.round((incomeSum / total) * 100)
    const expensePercent = Math.round((expenseSum / total) * 100)

    const pieChartData = [
        { name: `Income\n${incomePercent}%`, percent: incomePercent },
        { name: `Expense\n${expensePercent}%`, percent: expensePercent },
    ]

    return (
        < View >

            {expenseListItems.length !== 0 || incomeListItems.length !== 0 ? (
                <View style={styles.cardView}>
                    {/* Pie chart */}
                    <View style={{ alignItems: 'center' }}>
                        <VictoryPie
                            theme={VictoryTheme.material}
                            data={pieChartData}
                            x='name' y='percent'
                            animate
                            padding={{ bottom: 10 }}
                            width={WIDTH - 50}
                            height={(HEIGHT / 3) - 85}
                            labelRadius={15}
                            // innerRadius={10}
                            colorScale={['#81f032', 'tomato']}
                            style={{ labels: { fontSize: 14, fill: 'black' } }}
                        />
                    </View>

                    {/* Total sum and amounts */}
                    <Text style={styles.txt}>Current Data</Text>
                    <View style={styles.info}>
                        <View style={{ paddingRight: 20 }}>
                            <Text style={{ color: 'green', fontSize: 16, fontWeight: '700' }}>Income</Text>
                            <Text style={{ alignSelf: 'center', color: 'green', fontWeight: '500' }}>$ {incomeSum}</Text>
                        </View>
                        <View style={{ paddingRight: 20 }}>
                            <Text style={{ color: 'red', fontSize: 16, fontWeight: '700' }}>Expense</Text>
                            <Text style={{ alignSelf: 'center', color: 'red', fontWeight: '500' }}>$ {expenseSum}</Text>
                        </View>
                        <View>
                            <Text style={{ color: 'blue', fontSize: 16, fontWeight: '700' }}>Balance</Text>
                            <Text style={{ alignSelf: 'center', color: 'blue', fontWeight: '500' }}>$ {incomeSum - expenseSum}</Text>
                        </View>
                    </View>

                </View>
            ) : (
                <View style={{ borderRadius: 10, borderColor: 'grey', borderWidth: 0.7, width: Dimensions.get('window').width - 30, margin: 15, padding: 10, height: Dimensions.get('window').height / 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>$</Text>
                    <Text style={{ fontSize: 21, fontWeight: '600', color: 'black' }}>No Transactions yet!</Text>
                </View>
            )}

            <Animatable.View animation='fadeInUpBig'>

                <ScrollView style={{ marginHorizontal: 15 }}>

                    <TouchableOpacity onPress={() => navigation.navigate("Add Income")}>
                        <AddButton imgBackgroundColor='#4287f5' ButtonName='ADD INCOME' txtColor='#4287f5' imgSource={require('../Assets/icon0.png')} bgColor='#cedaed' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Add Expense")}>
                        <AddButton imgBackgroundColor='#eb706c' ButtonName='ADD EXPENSE' txtColor='#f74b45' imgSource={require('../Assets/icon1.png')} bgColor='#f2b3b1' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                        <AddButtonIcon iconName="note" txtColor='#E8a30e' bgColor='#edeb9f' bgColor1='#e8ad2e' ButtonName='ALL TRANSACTIONS' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                        <AddButtonIcon iconName="graph" txtColor='#237013' bgColor='#aee8e2' bgColor1='#237013' ButtonName='REPORTS' />
                    </TouchableOpacity>

                </ScrollView>

            </Animatable.View>

            <TouchableOpacity
                onPress={() => Alert.alert(
                    'Logout',
                    'Are you sure you want to logout ?',
                    [{ text: 'Cancel' },
                    { text: 'Yes', onPress: () => logout() }],
                    { cancelable: false })} >
                <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>Logout</Text>
            </TouchableOpacity>

            {/* <Text style={{ color: 'black', fontSize: 16, alignSelf: 'center' }}>{userData[2]}</Text> */}

        </View >
    )
}


export default Home

const styles = StyleSheet.create({
    cardView: { borderRadius: 10, borderColor: 'grey', borderWidth: 0.7, width: WIDTH - 30, margin: 15, padding: 10, height: Dimensions.get('window').height / 3 },
    txt: { alignSelf: 'center', color: 'black', fontSize: 16, paddingBottom: 5 },
    info: { justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 5 }
})
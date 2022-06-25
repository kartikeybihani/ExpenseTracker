import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Platform,
    TouchableOpacity,
    Alert,
    Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, deleteExpense } from '../../Redux/expenseRedux/reducers'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function AddExpense({ navigation }) {
    const dispatch = useDispatch()

    const [amount, setAmount] = useState();
    const [pickerVal, setPickerVal] = useState();
    const [description, setDescription] = useState();

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateText, setDateText] = useState(new Date().getDate() + ' / ' + (new Date().getMonth() + 1) + ' / ' + new Date().getFullYear())

    const showDateMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate)
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()

        setDateText(fDate)
    };

    const handleAddTask = () => {
        if (!amount) {
            Alert.alert("Oops!", "Please Enter the amount")
            return
        }
        if (amount === '0') {
            Alert.alert("Oops!", "Please enter more than zero")
            setAmount(null)
            return
        }
        else {
            dispatch(addExpense(amount))
            navigation.navigate("Home")
            setAmount(null);
            setDateText(new Date().getDate() + ' / ' + (new Date().getMonth() + 1) + ' / ' + new Date().getFullYear())
            setDescription(null)
        }
    }

    return (
        <View style={styles.modalView}>

            <View style={{ marginHorizontal: 15, paddingTop: 20 }}>

                <View style={{ borderWidth: 0.4, borderColor: 'grey', borderRadius: 5, padding: 7, backgroundColor: 'white' }}>
                    <Text style={{ fontWeight: 'bold', color: '#1469f5' }}>Amount ($)</Text>
                    <TextInput
                        placeholder="Amount"
                        style={{ color: 'black', fontSize: 18, borderBottomWidth: 1, marginBottom: 5 }}
                        value={amount}
                        keyboardType="number-pad"
                        returnKeyType='go'
                        onChangeText={(text) => setAmount(text)}
                    />
                </View>

                <View style={styles.inputs}>
                    <Text style={{ fontWeight: 'bold', color: '#1469f5' }}>Category</Text>
                    <Picker
                        style={{ left: -15 }}
                        selectedValue={pickerVal}
                        onValueChange={(itemValue, itemIndex) => setPickerVal(itemValue)}>
                        <Picker.Item label="Business" value="Business" />
                        <Picker.Item label="Housing" value="Housing" />
                        <Picker.Item label="Utilities" value="Utilities" />
                        <Picker.Item label="Food" value="Food" />
                        <Picker.Item label="Education" value="Education" />
                        <Picker.Item label="Medical" value="Medical" />
                        <Picker.Item label="Shopping" value="Shopping" />
                        <Picker.Item label="Fun" value="Fun" />
                        <Picker.Item label="Interest" value="Interest" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                </View>

                <View style={styles.inputs}>
                    <Text style={{ fontWeight: 'bold', color: '#1469f5' }}>Date</Text>
                    <TouchableOpacity onPress={() => showDateMode('date')}  >
                        <Text style={{ fontSize: 18, color: 'black', marginTop: 10, marginBottom: 5 }}>{dateText}</Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            display='default'
                            onChange={onChangeDate}
                        />
                    )}
                </View>

                <View style={styles.inputs}>
                    <Text style={{ fontWeight: 'bold', color: '#1469f5' }}>Note</Text>
                    <TextInput
                        placeholder="Note"
                        style={{ color: 'black', fontSize: 18, borderBottomWidth: 1, marginBottom: 5 }}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>

                <TouchableOpacity onPress={() => handleAddTask()} style={{ backgroundColor: 'white', borderWidth: 1, alignSelf: 'center', marginTop: 20, borderRadius: 10, paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 18, marginVertical: 10, color: 'black', alignSelf: 'center' }}>
                        Add Expense
                    </Text>
                </TouchableOpacity>


            </View>

        </View>
    )
}

export default AddExpense

const styles = StyleSheet.create({
    btn: {
        marginHorizontal: 5, borderWidth: 2, borderRadius: 5, padding: 10, width: Dimensions.get("window").width / 2 - 25, alignItems: 'center'
    },
    txt: { fontSize: 18, color: 'black' },
    modalView: {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: '#e9ebf0',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flex: 1
    },
    header: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#afc8f0',
        paddingHorizontal: 15,
        borderBottomEndRadius: 10,
        marginBottom: 10,
    },
    input: {
        paddingVertical: 5,
        borderColor: '#C0C0C0',
        borderBottomWidth: 1,
        width: WIDTH - 50,
        color: 'black',
        fontSize: 18
    },
    inputs: { borderWidth: 0.4, borderColor: 'grey', borderRadius: 5, padding: 7, backgroundColor: 'white', marginTop: 20 }
})
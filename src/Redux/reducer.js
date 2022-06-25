import { combineReducers } from 'redux'
import incomeReducer from './incomeRedux/reducers'
import expenseReducer from './expenseRedux/reducers'

export default combineReducers({
    income: incomeReducer,
    expense: expenseReducer
});

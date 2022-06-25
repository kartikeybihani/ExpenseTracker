import { ADD_EXPENSE, CLEAR_EXPENSES, DELETE_EXPENSE } from './actionTypes'

export const addExpense = (item) => ({
    type: ADD_EXPENSE,
    payload: item,
});

export const clearExpense = (item) => ({
    type: CLEAR_EXPENSES,
    payload: item,
});

export const deleteExpense = (item) => ({
    type: DELETE_EXPENSE,
    payload: item,
});

const initialState = {
    expenseList: [],
}

const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXPENSE:
            return {
                ...state,
                expenseList: state.expenseList.concat({
                    id: Math.random(),
                    amount: action.payload,
                }),
            };
        case DELETE_EXPENSE:
            return {
                ...state,
                expenseList: state.expenseList.filter((item) => item.id !== action.payload),
            };
        case CLEAR_EXPENSES:
            return {
                expenseList: [],
            };
        default:
            return state;
    }
};

export default expenseReducer;


import { ADD_INCOME, DELETE_INCOME, CLEAR_INCOMES } from './actionTypes'

export const addIncome = (item) => ({
    type: ADD_INCOME,
    payload: item,
});

export const clearIncomes = (item) => ({
    type: CLEAR_INCOMES,
    payload: item,
});

export const deleteIncome = (item) => ({
    type: DELETE_INCOME,
    payload: item,
});

const initialState = {
    incomeList: [],
}

const incomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INCOME:
            return {
                ...state,
                incomeList: state.incomeList.concat({
                    id: Math.random(),
                    amount: action.payload,
                }),
            };
        case DELETE_INCOME:
            return {
                ...state,
                incomeList: state.incomeList.filter((item) => item.id !== action.payload),
            };
        case CLEAR_INCOMES:
            return {
                incomeList: [],
            };
        default:
            return state;
    }
};

export default incomeReducer;


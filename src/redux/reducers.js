import { combineReducers } from "redux";
import { ADD_USER, CLEAR_CURRENT_USER, FETCH_QUIZ_CATEGORIES_FAILURE, FETCH_QUIZ_CATEGORIES_REQUEST, FETCH_QUIZ_CATEGORIES_SUCCESS, FETCH_QUIZ_FAILURE, FETCH_QUIZ_REQUEST, FETCH_QUIZ_SUCCESS, SET_CURRENT_USER } from "./types"

const userPrototype = {
    id: '1',
    name: 'vika',
    login: 'admin',
    password: '1111',
    dateOfBirth: '01.01.1111'
};
const initialUsersState = {
    users: [userPrototype],
};
const usersReducer = (state = initialUsersState, action)=>{
    switch(action.type){
        case ADD_USER:
            return { ...state, users: [...state.users, action.payload] };
        default: return state
    }
}


const initialCurrentUserState = {
    currentUser: undefined
}
const currentUserReducer = (state = initialCurrentUserState, action)=>{
    switch(action.type){
        case SET_CURRENT_USER:
            return { ...state, currentUser: action.payload };
        case CLEAR_CURRENT_USER:
            return { ...state, currentUser: action.payload };
        default: return state
    }
}

const initialCategiriesState = {
    loading: false,
    categories: [],
    error: ''
}
const categoriesReduser = (state = initialCategiriesState, action)=>{
    switch(action.type){
        case FETCH_QUIZ_CATEGORIES_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case FETCH_QUIZ_CATEGORIES_SUCCESS:
            return{
                loading: false,
                categories: action.payload,
                error: ''
            }
        case FETCH_QUIZ_CATEGORIES_FAILURE:
            return{
                loading: false,
                categories:[],
                error: action.payload
            }
        default:
            return state;
    }
}

const initialQuizState = {
    loading: false,
    questions: [],
    error:''
}
const quizReducer=(state = initialQuizState, action)=>{
    switch(action.type){
        case FETCH_QUIZ_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case FETCH_QUIZ_SUCCESS:
            return{
                loading: false,
                questions: action.payload,
                error: ''
            }
        case FETCH_QUIZ_FAILURE:
            return{
                loading: false,
                questions: [],
                error: action.type
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    users: usersReducer,
    currentUser: currentUserReducer,
    categories: categoriesReduser,
    quizQuestions: quizReducer
})

export default rootReducer;
import axios from "axios"
import { ADD_USER, CLEAR_CURRENT_USER, FETCH_QUIZ_CATEGORIES_FAILURE, FETCH_QUIZ_CATEGORIES_REQUEST, FETCH_QUIZ_CATEGORIES_SUCCESS, FETCH_QUIZ_FAILURE, FETCH_QUIZ_REQUEST, FETCH_QUIZ_SUCCESS, SET_CURRENT_USER } from "./types"

export const addUser=(user)=>({
    type: ADD_USER,
    payload: user
})

export const setCurrentUser = (user)=>({
    type: SET_CURRENT_USER,
    payload: user
})

export const clearCurrentUser = ()=>({
    type: CLEAR_CURRENT_USER,
    payload: undefined
})

const fetchQuizCategoriesRequest =()=>({
    type: FETCH_QUIZ_CATEGORIES_REQUEST
})

const fetchQuizCategoriesSuccess=(categories)=>({
    type: FETCH_QUIZ_CATEGORIES_SUCCESS,
    payload: categories
})

const fetchQuizCategoriesFailure=(error)=>({
    type: FETCH_QUIZ_CATEGORIES_FAILURE,
    payload: error
})

export const fetchCategories=()=>{
    return(dispatch)=>{
        dispatch(fetchQuizCategoriesRequest());
        axios.get('https://opentdb.com/api_category.php')
        .then((response)=>{
            const categories = response.data.trivia_categories;
            dispatch(fetchQuizCategoriesSuccess(categories))
        })
        .catch((error)=>{
            dispatch(fetchQuizCategoriesFailure(error.message))
        })
    }
}

const fetchQuizRequest=()=>({
    type: FETCH_QUIZ_REQUEST
})

const fetchQuizSucces=(quiz)=>({
    type : FETCH_QUIZ_SUCCESS,
    payload: quiz
})

const fetchQuizFailure=(error)=>({
    type: FETCH_QUIZ_FAILURE,
    payload: error
})

export const fetchQuiz = (countOfQuestions, category, difficulty, typeOfQuestions)=>{
    let url = `https://opentdb.com/api.php?amount=${countOfQuestions}`;
    if(category !== 'any'){
        url += `&category=${category}`
    }
    if(difficulty !== 'any'){
        url += `&difficulty=${difficulty}`
    }
    if(typeOfQuestions !== 'any'){
        url += `&type=${typeOfQuestions}`
    }
    return(dispatch)=>{
        dispatch(fetchQuizRequest());
        axios.get(url)
        .then((response)=>{
            const quiz = response.data.results;
            dispatch(fetchQuizSucces(quiz))
        })
        .catch((error)=>{
            dispatch(fetchQuizFailure(error.message))
        })
    }

}
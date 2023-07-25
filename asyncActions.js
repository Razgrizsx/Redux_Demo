const redux = require("redux")
const bindActionCreators = redux.bindActionCreators
const applyMiddleWare = redux.applyMiddleware
const thunk = require("redux-thunk").default
const axios = require("axios")



const initialState= {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED"
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED"
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED"

const fetchUsersRequest = () => {
    return{
        type: FETCH_USERS_REQUESTED
    }
}

const fetchUsersSucceeded = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users
    }
}

const fetchUsersFailed = (error) => {
    return{
        type: FETCH_USERS_FAILED,
        payload: error
    }
}


const reducer = (state= initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUESTED:
            return{
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCEEDED:
            return{
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILED:
            return{
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return{
                state
            }
    }
}

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res => {
            const users = res.data
            dispatch(fetchUsersSucceeded(users))
        })
        
        .catch(error => {dispatch(fetchUsersFailed(error.message))})
            
    }
}


const store = redux.createStore(reducer, applyMiddleWare(thunk))
store.subscribe(()=> {console.log(store.getState())})
store.dispatch(fetchUsers())
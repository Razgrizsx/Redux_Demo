const redux = require("redux")
const produce = require('immer').produce
const bindActionCreators = redux.bindActionCreators
const reduxLogger = require('redux-logger')
const applyMiddleWare = redux.applyMiddleware

const logger = reduxLogger.createLogger()

const initialState={
    name: "Chris",
    adress:{
        street: "123 Main St",
        city: "Boston",
        state: "MA"
    }
}

const STREET_UPDATED = "STREET_UPDATED"

const streetUpdate = (street) => {
    return{
        type: STREET_UPDATED,
        payload: street
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case STREET_UPDATED:
            /* return{
                ...state,
                adress:{
                    ...state.adress,
                    street: action.payload
                }
            } */

            return produce(state, (draft) => {
                draft.adress.street = action.payload
            })
            default:{
                return state
            }
    }    
}

const store = redux.createStore(reducer, applyMiddleWare(logger))
const unsubscribe = store.subscribe(()=>{})
const actions = bindActionCreators({streetUpdate}, store.dispatch)

actions.streetUpdate("almafuerte")

unsubscribe()
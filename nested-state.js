const redux = require("redux")
const produce = require('immer').produce
const bindActionCreators = redux.bindActionCreators

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
console.log(initialState)
const store = redux.createStore(reducer)
const unsubscribe = store.subscribe(()=>{console.log("Updated ", store.getState())})
const actions = bindActionCreators({streetUpdate}, store.dispatch)

actions.streetUpdate("almafuerte")

unsubscribe()
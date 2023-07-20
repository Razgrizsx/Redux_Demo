console.log("From Index.js")

const redux = require("redux")
const bindActionCreators = redux.bindActionCreators

const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCK = "CAKE_RESTOCK"
const ICECREAM_ORDERED = "ICECREAM_ORDERED"
const ICECREAM_RESTOCK = "ICECREAM_RESTOCK"

function restockCake(quantity = 1){
    return {
        type: CAKE_RESTOCK,
        payload: quantity
    }
}

function orderCake(){
    return {
    type: CAKE_ORDERED,
    payload: 1
}
}
const initialState={
    numCakes : 10,
    anotherProperty : 0
}

const reducer = (state= initialState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state,
                numCakes: state.numCakes - 1
            }
        case CAKE_RESTOCK:
            return {
                ...state,
                numCakes: state.numCakes + action.payload
            }
        default: 
            return state
    }
}

const store = redux.createStore(reducer)
console.log("Initial State ", store.getState())

const unsubscribe = store.subscribe(()=>console.log("Update state ", store.getState()))

/* store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(restockCake(3))
 */

const actions = bindActionCreators({orderCake, restockCake}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)

unsubscribe()
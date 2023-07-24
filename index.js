console.log("From Index.js")

const redux = require("redux")
const bindActionCreators = redux.bindActionCreators
const combienReducers = redux.combineReducers

const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCK = "CAKE_RESTOCK"
const ICECREAM_ORDERED = "ICECREAM_ORDERED"
const ICECREAM_RESTOCK = "ICECREAM_RESTOCK"

function orderIcecream(){
    return{
        type: ICECREAM_ORDERED
    }
}

function restockIcecream(quantity = 1){
    return{
        type: ICECREAM_RESTOCK,
        payload: quantity
    }
}

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
/* const initialState={
    numCakes : 10,
    numIcecream : 20
} */

const initialCakes = {
    numCakes: 10
}

const initialIcecreams = {
    numIcecream: 20
}

const cakeReducer = (state= initialCakes, action) => {
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

const icecreamReducer = (state= initialIcecreams, action) => {
    switch(action.type){
        case ICECREAM_ORDERED:
            return {
                ...state,
                numIcecream: state.numIcecream - 1
            }
        case ICECREAM_RESTOCK:
            return{
                ...state,
                numIcecream: state.numIcecream + action.payload
            }
        default: 
            return state
    }
}

const rootReducer = combienReducers({cake: cakeReducer,iceCream: icecreamReducer})

const store = redux.createStore(rootReducer)
console.log("Initial State ", store.getState())

const unsubscribe = store.subscribe(()=>console.log("Update state ", store.getState()))

/* store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(restockCake(3))
 */

const actions = bindActionCreators({orderCake, restockCake, orderIcecream, restockIcecream}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIcecream()
actions.restockIcecream(5)


unsubscribe()
//This file we create the Food Context
//We have astae value for the food which starts out as null
//We also have a Reducer function which updates our state whenever we dispatch an action
//The Global Context wraps our entire application so that we can access it in any other component
//
import { createContext, useReducer } from 'react'

export const FoodsContext = createContext()

//Inside this Reducer Function we have three different cases
export const foodsreducer = ( state, action ) => {
    switch(action.type){
        //Set Food is used when we fetch all of the foods to begin with like in the Home component
        case 'SET_FOODS':
            return{
                foods: action.payload
            }
        //Create Food is used when submit the form and add a new Food to the database
        case 'CREATE_FOOD':
             return{
                 foods: [action.payload, ...state.foods]
            }
        //Delete Food is used after we hit the delete button and remove a food from the database
        case 'DELETE_FOOD':
             return{
                 foods: state.foods.filter((w) => w._id !== action.payload._id )
            }
        default:
            return state
    }
}

// Create a Context Component
// Destructure the Children property from the props in this compoent
//Children property represent any components or templats that this wraps
//In this case that would be the <APP/> in index.js which
//therefore if we output the children then we are outputing the root app component
export const FoodsContextProvider = ({ children })=> {
    //Similar to useState but differs in that 
    const [state, dispatch] = useReducer(foodsreducer, {
        foods: null
    })

    return (
        <FoodsContext.Provider value={{...state, dispatch}}>
            { children }
        </FoodsContext.Provider>
    )
}
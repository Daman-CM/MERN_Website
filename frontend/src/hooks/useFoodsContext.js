// To consume the Food Context we have the useFoodsContext.js
//This file returns the context value which contains the food and dispatch function
//so if we want to use the context in any component we just use the hook useFoodsContext
import { FoodsContext } from "../context/FoodContext";
import { useContext } from "react";

export const useFoodsContext = () => {
    const context = useContext(FoodsContext)

    if(!context){
        throw Error('useFoodsContext must be used inside an FoodsContextProvider')
    }

    return context
}
//This file represents the Home Page Content
// We invoke the useFoodsContext hook to get the food and dispatch functions
//Inside we fetch the foods data from the backend api using the useEffects hook, which runs just once when the component renders
//Once we get the data back we use a dispatch function to update the global food context state
//In the template we cycle through the foods and for each food we output a FoodDetails component
import { useEffect } from "react"
import { useFoodsContext } from "../hooks/useFoodsContext"
import { useAuthContext } from '../hooks/useAuthContext'
// components
import FoodDetails from "../components/FoodDetails"
import FoodForm from "../components/FoodForm"

const Home = () => {
    const {foods, dispatch} = useFoodsContext()
    const {user} = useAuthContext() 

    useEffect(() => {
        //Grabbing all of the Foods
        // When we first load this component we preform a fetch
        const fetchFoods = async () => {
            const response = await fetch('/api/foods',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            //When the json data is okay we fire this dispatch function
            //which in turn fires foodsReducer in FoodContext.js
            if(response.ok) {
                dispatch({type: 'SET_FOODS', payload : json})
            }
        }
        if(user){
        fetchFoods()
        }
    }, [dispatch, user])
    return (
        //For each Food return the FoodDetails components which lists all of the Foods information
        <div className="home">
            <div className="foods">
                {foods && foods.map((food) => (
                    <FoodDetails key={food.id} food={food}/>
                ))}
            </div>
            <FoodForm/>
        </div>
    )   
}

export default Home
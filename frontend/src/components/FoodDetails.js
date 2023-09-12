//Inside this component file we just output the food Details e.g Name,Company, Amount and Caloriess
// we also have a button for deleting food which fires function which sends a delete request to the sever and also dispatch a delete action to update the global state and remove that food from it
//
import { useFoodsContext } from "../hooks/useFoodsContext"
import { useAuthContext } from '../hooks/useAuthContext'
// date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'



const FoodDetails = ({ food}) => {
    const {dispatch} = useFoodsContext()
    const { user} = useAuthContext()
    
    const handleClick = async() => {
        if(!user)
        {
            return
        }
        const response = await fetch('/api/foods/' + food._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_FOOD', payload: json})
        }
    }

    return (
        <div className="food-details">
            <h4>{food.name}</h4>
            <p><strong>Company: </strong>{food.company}</p>
            <p><strong>Amount: </strong>{food.amount}</p>
            <p><strong>Calories: </strong>{food.calories}</p>
            <p>{formatDistanceToNow(new Date(food.createdAt),{addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default FoodDetails
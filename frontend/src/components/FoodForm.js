//This file is the FoodForm component that is also nested in the Home component
//Inside this form Component is a simple form that can add new foods
//When we add a new food, we send a POST request to the sever and dispatch a  create action to update the global context
//

import { useState } from "react"
import { useFoodsContext } from "../hooks/useFoodsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const FoodForm = () => {
  const { dispatch } = useFoodsContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [amount, setAmount] = useState('')
  const [calories, setCalories] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

   //Async as we are reaching out to the API
    //Take the event function
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

     //Create some dummy Food object that we will send as the body of the Food
    const food = {name, company, amount, calories}

    //Use the Fetch API to send a Post Request
    // First argument in the fetch is the location its going
    // Second Argument is Object with Post request and body to send food
    //but we can't just send the food as it is so we convert to a JSON String
    //Finally we have header to say that the content is JSON
    const response = await fetch('/api/foods', {
      method: 'POST',
      body: JSON.stringify(food),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    //Get Json and store in const
    const json = await response.json()

     //Check if response was okay
    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
         // Set all of these empty so that if 
        //I want to make another enter after they are ready
      
      setName('')
      setCompany('')
      setAmount('')
      setCalories('')
      //if response ok then set the error null 
      //as there may have been an error previously
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_FOOD', payload: json})
    }
  }
  //This is a Form that creates a new Food
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Food</h3>

      <label>Food Name:</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Comapany:</label>
      <input 
        type="text"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
        className={emptyFields.includes('company') ? 'error' : ''}
      />

      <label>Amount:</label>
      <input 
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        className={emptyFields.includes('amount') ? 'error' : ''}
      />

      <label>Calories:</label>
      <input 
        type="number"
        onChange={(e) => setCalories(e.target.value)}
        value={calories}
        className={emptyFields.includes('calories') ? 'error' : ''}
      />
      <button>Add Food</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default FoodForm

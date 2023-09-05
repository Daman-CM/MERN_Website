import { useAuthContext } from "./useAuthContext"
import { useFoodsContext } from "./useFoodsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: foodsDispatch } = useFoodsContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        foodsDispatch({type: 'SET_FOODS', payload: null})
    }

    return {logout}

}
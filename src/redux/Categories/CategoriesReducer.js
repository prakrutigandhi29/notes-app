import { CATEGORIES } from "../../constants";
const initialState={
    categories:[],
}
export const categoriesReducer=(state=initialState,action)=>{
    const {type,payload}=action
    switch (type) {
        case CATEGORIES.LOAD:
            return{
                ...state,
                categories:[]
            }
        case CATEGORIES.LOAD_SUCCESS:
            return{
                ...state,
                categories:action.categories,
                snackbar:true,
                message:"Category added"
            }
        case CATEGORIES.ADD:
            return [...state,payload]

        case CATEGORIES.FETCH_NOTES:
            return{
                ...state,
                notes:payload
        }

    
        default:
            return state
    }
}
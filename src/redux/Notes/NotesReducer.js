import {NOTES} from '../../constants'
const initialState={
    notes:[],
    isLoading:false,
    isError:false,
    snackbar:false,
    message:""
}
    const notesReducer = (state = initialState, action) => {
      const{type,payload}=action
      switch (type) {
          case NOTES.LOAD:{
            return {
              ...state,
              isLoading: true,
              isError: false,
            };
          }
          case NOTES.LOAD_SUCCESS:
            return {
              ...state,
              notes: action.notes,
              isLoading: false,
              snackbar:state.snackbar,
              message:state.message
            };
          case NOTES.DELETE:
            {
              return {...state,
                notes:action.notes.filter(({ id }) => id !== payload.id),
                snackbar:true,
                message:"Note Deleted"
              };
            }
         case NOTES.EDIT:
          return state.map((item) => {
            if (item.id === payload.id) {
              return {
                ...item,
                ...payload,
                snackbar:true,
                message:"Note Edited",
              };
            } else {
              return item;
            }
          });
        case NOTES.CREATE:
          return{
          ...state,
          notes:action.notes.push(payload),
          snackbar:true,
          message:"Note added"
        }
        case NOTES.PIN:
          return state.map((item) => {
            if (item.id === payload.id) {
              return {
                ...item,
                ...payload,
                snackbar:true,
                message:"Note Pinned",
              };
            } else {
              return item;
            }
          });
        case NOTES.UNPIN:
          return state.map((item) => {
            if (item.id === payload.id) {
              return {
                ...item,
                ...payload,
                snackbar:true,
                message:"Note Unpinned",
              };
            } else {
              return item;
            }
          });
        case NOTES.SORT:{
          return{
            ...state,
            notes:payload
          }
        }
        default:
            return state;
        }
      };
      
      export default notesReducer;
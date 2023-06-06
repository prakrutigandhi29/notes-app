import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notesReducer from "./Notes/NotesReducer";
import { categoriesReducer } from "./Categories/CategoriesReducer";

const rootReducer=combineReducers({notesReducer,categoriesReducer})
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));


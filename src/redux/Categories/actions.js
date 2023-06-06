import { CATEGORIES, NOTES } from "../../constants"
export const requestCategories=()=>async(dispatch)=>{
    try{
        dispatch({
            type:CATEGORIES.LOAD
        })
        let categories
       await fetch('http://localhost:3000/categories')
        .then(res => res.json())
        .then(data => categories=data)

        dispatch({
            type: CATEGORIES.LOAD_SUCCESS,
            categories: categories,
            snackbar:true,
            message:"Category added"
          });
    }
    catch(e){
        console.log(e)
    }
}
export const addCategories=(category)=>async(dispatch)=>{
    try{
        await fetch('http://localhost:3000/categories',{
        method:'POST',
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({category})
      })
      dispatch({
          type:CATEGORIES.ADD,
          payload:category
      })
    }

    catch(e){
        console.log(e)
    }
}
export const fetchNotesCategoryWise=(category)=>async(dispatch)=>{
    let newNotes
    try{
        await fetch('http://localhost:3000/notes')
        .then(res => res.json())
        .then(data => {
        newNotes=data
        })
       if(category!=='All'){
           newNotes=newNotes.filter((note)=>note.category==category)
       }
        
        dispatch({
            type:NOTES.LOAD_SUCCESS,
            notes:newNotes,
            isError:false
        })
    }
    catch(e){
        console.log(e)
    }

}

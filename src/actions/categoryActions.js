export const fetchCategories = () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_CATEGORIES'})
      fetch('https://web-mart-backend.herokuapp.com/categories')
      .then(resp => resp.json())
      .then( json => {
        dispatch({ type: 'ADD_CATEGORIES', categories: json})
      })
    }
  }
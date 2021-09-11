
export const fetchShoppingCart = (userId) => {
    return (dispatch) => {
    dispatch({ type: 'LOADING_SHOPPING_CART'})
    fetch(`https://web-mart-backend.herokuapp.com/shopping_carts/${userId}`)
    .then(resp => resp.json())
    .then( json => {
      dispatch({ type: 'ADD_SHOPPING_CART', shoppingCart: json})
    })
  }
}

  export const addToCart = (item, currentUser) => {
    return (dispatch) => {
      let newItem = {
        item,
        cart: {id: currentUser.id}
      }
      const configObj = {
        method: "PATCH",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem)
    }
      fetch(`https://web-mart-backend.herokuapp.com/shopping_carts/${currentUser.id}`, configObj)
      .then(resp => {
          if (resp.ok) {
              return resp
                      .json()
                      .then(json => {
                        dispatch({type:'OPEN_ITEM_ADD_SUCCESS_MESSAGE'})
                        dispatch({ type: 'ADD_TO_CART', payload: item})
                      }  )
          } else {
              return resp
                      .json()
          }
      })

    
    }
  }

export const removeFromCart = (user, item) => {
  return(dispatch) => {
    let itemId = item.id
    let userId = user.id
    
    const configObj = {
      method: "DELETE",
      headers: {
          accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(itemId)
  }
  fetch(`https://web-mart-backend.herokuapp.com/shopping_carts/${userId}`, configObj)
  .then(resp => {
    if (resp.ok) {
      dispatch({type: "REMOVE_FROM_CART", payload: item})
        return resp.json()
    } else {
        return resp
         
    }
})

  }



} 

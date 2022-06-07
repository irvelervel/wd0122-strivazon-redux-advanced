// the reducer function takes the current state and the action that just got dispatched
// in order to computer the NEW application state!
// it's also a PURE FUNCTION (same input --> same output)

// just like a component's state, even the redux store has to start from somewhere...
// so let's write the initial state for Redux!

const initialState = {
  // let's implement a cart feature
  cart: {
    // in the cart, let's remember an array of books
    content: [], // the value of content will be our array of books in the cart!
  },
}

// = initialState means the DEFAULT VALUE of the argument!
const mainReducer = (state = initialState, action) => {
  // the reducer function will be in charge of computing the
  // new state of the application every time an action gets dispatched
  // our reducer needs to be told what to do when a particular action gets dispatched
  // so we have a bunch of possible actions, so let's write a switch case to manage them all!
  switch (action.type) {
    // the book is getting passed with action.payload
    case 'ADD_TO_CART':
      return {
        // this is now going to be the new value for the redux store
        // ALWAYS return an object from your reducer case!
        ...state,
        cart: {
          ...state.cart,
          //   content: state.cart.content.push(action.payload) // <-- TERRIBLE
          // push is FORBIDDEN here!
          content: [...state.cart.content, action.payload], // this works
          //   content: state.cart.content.concat(action.payload) // this also works
          // this is generating a new array! it's not messing up with the existing state
          // you DON'T WANT to mutate your arguments in a reducer function, because it's a pure function!s
        },
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: {
          ...state.cart,
          //   content: [
          //     ...state.cart.content.slice(0, action.payload),
          //     ...state.cart.content.slice(
          //       action.payload + 1,
          //       state.cart.content.length
          //     ),
          //   ],
          content: state.cart.content.filter((book, i) => i !== action.payload),
        },
      }
    default:
      // the default case is for an action.type that we didn't think of
      // maybe an edge case, maybe a bug, something unhandled...
      // what is the new state we're going to compute out of this edge case??
      return state
    // returning the state as it was in our default case makes the application unbreakable!
  }
}

export default mainReducer

import * as types from '../types'

export const initState = {
  dataIsLoading: false,
  selectedCity: 'Toronto',
  refineSearch: '',
  postalCode: '',
  cities: [],
  restaurants: []
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case types.DATA_IS_LOADING: {
      return {
        ...state,
        dataIsLoading: action.payload
      }
    }
    case types.CHANGE_CITY: {
      return {
        ...state,
        selectedCity: action.payload
      }
    }
    case types.UPDATE_REFINE_SEARCH: {
      return {
        ...state,
        refineSearch: action.payload
      }
    }  
    case types.UPDATE_POSTAL_CODE: {
      return {
        ...state,
        postalCode: action.payload
      }
    }        
    case types.FETCH_CITIES_SUCCESS: {
      return {
        ...state,
        cities: action.payload
      }
    }
    case types.FETCH_RESTAURANTS_SUCCESS: {
      return {
        ...state,
        restaurants: action.payload
      }     
    }
    default:
      // unchanged state
      return state
  }
}

export default rootReducer

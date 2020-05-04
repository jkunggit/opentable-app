import reducer from './rootReducer'
import * as actions from '../types'
import {FaItalic} from 'react-icons/fa'

describe ('Root Reducer', () => {
  let initialState = null
  beforeEach( () => {
    initialState = {
      dataIsLoading: false,
      selectedCity: 'Toronto',
      cities: [],
      restaurants: []        
    }    
  })

  it ('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it ('should handle DATA_IS_LOADING', () => {
    const resp = reducer(initialState, { type: actions.DATA_IS_LOADING, payload: true })
    expect(resp.dataIsLoading).toBe(true)
  })
  it ('should handle FETCH_RESTAURANTS', () => {
    const data =  [
      { 
        name: "Scaramouche Restaurant",
        address: "1 Benvenuto Place",
        area: "Toronto / SW Ontario",
      },
      {
        name: "The Sultan's Tent",
        address: "49 Front St E",
        area: "Toronto / SW Ontario",
      }      
    ]
    const resp = reducer(initialState, { type: actions.FETCH_RESTAURANTS_SUCCESS, payload: data})
    expect(resp.restaurants).toEqual(data)
  })  
})


import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { render, cleanup, fireEvent, act, waitFor, getByText } from '@testing-library/react';
import axios from 'axios'

import reducer, { initState } from '../reducers/rootReducer'
import Restaurants from './Restaurants'


jest.mock('axios');

const renderWithRedux = (
  component,
  { initState, store = createStore(reducer, initState, applyMiddleware(thunk)) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

describe ("Restaurants", () => {
  afterEach(cleanup)

  beforeEach( () => {
    axios.get.mockResolvedValueOnce({
      data: {
        count: 3,
        cities: [
          "Toronto",
          "San Francisco",
          "New York"
        ]      
      },
    })  
    .mockResolvedValueOnce({
      data: {
        total_entries: 2,
        per_page: 25,
        current_page: 1,
        restaurants: [
          {
            id: 21307,
            name: "Scaramouche Restaurant",
            address: "1 Benvenuto Place",
            city: "Toronto",
            state: "ON",
            area: "Toronto / SW Ontario"
          },
          {
            id: 82957,
            name: "The Sultan's Tent",
            address: "49 Front St E",
            city: "Toronto",
            state: "ON",
            area: "Toronto / SW Ontario"
          },
          {
            id: 52957,
            name: "The Quick",
            address: "1345 Hummingbird Crt",
            city: "Toronto",
            state: "ON",
            area: "Toronto / SW Ontario"
          }                     
        ]     
      },
    })
    .mockResolvedValueOnce({
      data: {
        total_entries: 2,
        per_page: 25,
        current_page: 1,
        restaurants: [
          {
            id: 21307,
            name: "Scaramouche Restaurant",
            address: "1 Benvenuto Place",
            city: "Toronto",
            state: "ON",
            area: "Toronto / SW Ontario",
            postal_code: 'L1V 7T43'
          },
          {
            id: 82957,
            name: "The Sultan's Tent",
            address: "49 Front St E",
            city: "Toronto",
            state: "ON",
            area: "Toronto / SW Ontario",
            postal_code: 'A0V 7H4'
          },
          {
            id: 52957,
            name: "The Quick Pita",
            address: "1345 Hummingbird Crt",
            city: "Toronto",
            state: "ON",
            area: "Toronto / SW Ontario",
            postal_code: 'B8T 5R1'
          }                     
        ]     
      },
    })   
  })

  it ('should find all restaurants matching refine search: The Sultan\'s Tent ...', async () => {
    const { container, queryByLabelText, getByText, debug } = renderWithRedux(<Restaurants />)
    
    act(() => {
      fireEvent.change(container.querySelector('#refineSearch'), { target: { value: 'Tent'} })
    })
    
    act(() => {
      fireEvent.click(container.querySelector('#applyBtn'))
    })
      
    await waitFor( () => expect(container.querySelector('.data-listing')).not.toBe(null))
    expect(container.querySelector('.data-listing').innerHTML).toMatchSnapshot()
  })

  it ('should find all restaurants matching postal code search: The Quick Pita..', async () => {
    const { container, queryByLabelText, debug } = renderWithRedux(<Restaurants />)
    
    act(() => {
      fireEvent.change(container.querySelector('#postalCode'), { target: { value: 'b8t 5r1'} })
    })
    
    act(() => {
      fireEvent.click(container.querySelector('#applyBtn'))
    })
      
    await waitFor( () => expect(container.querySelector('.data-listing')).not.toBe(null))
    expect(container.querySelector('.data-listing').innerHTML).toMatchSnapshot()
  })

  it ('should render with redux', async () => {
    // const store = createStore(reducer, initState, applyMiddleware(thunk))
    const { container, queryByLabelText, debug } = renderWithRedux(<Restaurants />)
    
    await waitFor( () => expect(container.querySelector('.data-listing')).not.toBe(null))

    expect(queryByLabelText('City').value).toBe('Toronto')
    expect(container.querySelector('.data-listing').innerHTML).toMatchSnapshot()
  })  
})
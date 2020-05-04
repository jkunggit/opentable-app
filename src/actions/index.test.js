import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'

import * as actions from '.'
import * as types from '../types'

jest.mock('axios');
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  it('should create an action to change the city', () => {
    const city = 'Halifax'
    const expectedAction = {
      type: types.CHANGE_CITY,
      payload: city
    }
    expect(actions.changeCity(city)).toEqual(expectedAction)
  })

  it('should create an action to fetch cities', async () => {
    const resp = {
      count: 3,
      cities: [
        "Chicago",
        "San Francisco",
        "New York"
      ]
    }

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: resp
      })
    );
    const store = mockStore({ cities: [] })

    await store.dispatch(actions.fetchCities(''));
    // return of async actions
    const getActions = store.getActions()
    expect(getActions[0].type).toEqual(types.FETCH_CITIES_SUCCESS)
    expect(getActions[0].payload).toMatchSnapshot()

  })


  it('should create an action to fetch restaurant listing', async () => {
    const resp = {
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
        },
        {
          id: 82957,
          name: "The Sultan's Tent",
          address: "49 Front St E",
          city: "Toronto",
          state: "ON",
          area: "Toronto / SW Ontario",
        }
      ]
    }

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: resp
      })
    );
    const store = mockStore({ restaurants: [] })

    await store.dispatch(actions.fetchRestaurants({url: ''}));
    // return of async actions
    const getActions = store.getActions()
    expect(getActions[2].type).toEqual(types.FETCH_RESTAURANTS_SUCCESS)
    expect(getActions[2].payload).toMatchSnapshot()
  })

  it('should filter by refine search', async () => {
    const resp = {
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
        },
        {
          id: 82957,
          name: "The Sultan's Tent",
          address: "49 Front St E",
          city: "Toronto",
          state: "ON",
          area: "Toronto / SW Ontario",
        }
      ]
    }

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: resp
      })
    );
    const store = mockStore({ restaurants: [] })

    await store.dispatch(actions.fetchRestaurants({url: 'xxx', refineSearch: 'place'}));
    // return of async actions
    const getActions = store.getActions()
    // should only include the first record
    expect(getActions[2].type).toEqual(types.FETCH_RESTAURANTS_SUCCESS)
    expect(getActions[2].payload).toMatchSnapshot()
  })


  it('should filter by postal_code', async () => {
    const resp = {
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
          postal_code: "l1V 7H8"
        },
        {
          id: 82957,
          name: "The Sultan's Tent",
          address: "49 Front St E",
          city: "Toronto",
          state: "ON",
          area: "Toronto / SW Ontario",
          postal_code: "P2X 9J6"
        }
      ]
    }

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: resp
      })
    );
    const store = mockStore({ restaurants: [] })

    await store.dispatch(actions.fetchRestaurants({url: 'xxx', postalCode: 'P2X'}));
    // return of async actions
    const getActions = store.getActions()
    // should only include the 2nd record
    expect(getActions[2].type).toEqual(types.FETCH_RESTAURANTS_SUCCESS)
    expect(getActions[2].payload).toMatchSnapshot()
  })
  
  // there is more testing here but I don't got time to do the rest as it's similar to the first test
})
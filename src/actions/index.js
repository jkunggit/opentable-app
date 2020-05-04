import axios from 'axios'
import * as types from '../types'

export const fetchRestaurants = (params) => {
  return (dispatch) => {
    dispatch(dataIsLoading(true));
    const response = axios.get(params.url)

    response.then(({ data }) => {
      dispatch(dataIsLoading(false));
      // apply any filtering
      const refineSearch = params.refineSearch ? params.refineSearch.toLowerCase() : false
      const postalCode = params.postalCode ? params.postalCode.toLowerCase() : false
      
      const reduceData = data.restaurants.filter(item => {
        let include = true
        const properties = {
          name: item.name,
          address: item.address,
          area: item.area
        }
        if (refineSearch || postalCode) {

          let matched_search = false
          let matched_postalCode = false
          if (postalCode) {
            if (item.postal_code.toLowerCase().includes(postalCode)) {
              matched_postalCode = true
            }
          }          
          if (refineSearch) {
            for (let key in properties) {
              if (properties[key].toLowerCase().includes(refineSearch)) {
                matched_search = true
                break
              }
            }
          }
          // if user entered both search and postalcode then both should match
          if (refineSearch && postalCode) {
            include = matched_postalCode && matched_search
          }
          else {
            include = matched_postalCode || matched_search
          }
        }
        return include
      }).map(item => {
        return {
          name: item.name,
          address: item.address,
          area: item.area
        }
      })

      // dispatch({ type: types.FETCH_RESTAURANTS, payload: reduceData })
      dispatch(fetchRestaruantsSuccess(reduceData))
    }).catch( err => {
      dispatch(dataHasErrored(true));
    })
  }
}

export const fetchRestaruantsSuccess = (restaurants) => {
  return {
    type: types.FETCH_RESTAURANTS_SUCCESS,
    payload: restaurants
  }
}


export const fetchCities = (url) => {
  return (dispatch) => {
    const response = axios.get(url)
    response.then(({ data }) => {
      // dispatch({ type: types.FETCH_CITIES, payload: data.cities })
      dispatch(fetchCitiesSuccess(data.cities))
    }).catch(err => {
      dispatch(dataHasErrored(true));
    })
  }
}

export const fetchCitiesSuccess = (cities) => {
  return {
    type: types.FETCH_CITIES_SUCCESS,
    payload: cities
  }
}

export const changeCity = (city) => {
  return {
    type: types.CHANGE_CITY,
    payload: city
  }
}

export const updateRefineSearch = (val) => {
  return {
    type: types.UPDATE_REFINE_SEARCH,
    payload: val
  }
}

export const updatePostalCode = (val) => {
  return {
    type: types.UPDATE_POSTAL_CODE,
    payload: val
  }
}

export function dataIsLoading(bool) {
  return {
    type: types.DATA_IS_LOADING,
    payload: bool
  };
}

export function dataHasErrored(bool) {
  return {
    type: 'DATA_HAS_ERRORED',
    payload: bool
  };
}

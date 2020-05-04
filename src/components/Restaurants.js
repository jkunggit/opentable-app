import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FaExclamationTriangle } from 'react-icons/fa';

import { fetchRestaurants, fetchCities, changeCity, updateRefineSearch, updatePostalCode } from '../actions'
import DataListing from './DataListing'
import config from '../config'

class Restaurants extends Component {
  componentDidMount() {
    // initially load the city for the auto complete list and toronto data
    this.props.fetchCities(`${config.apiEndpoint}/cities`)
    this.props.fetchRestaurants({url: `${config.apiEndpoint}/restaurants?city=${this.props.selectedCity}`})
  }

  onChangeHandler = (e) => {
    e.persist()
    const id = e.target.id 
    const value = e.target.value
    switch(id){
      case 'changeCity':
        this.props.changeCity(value)
      break
      case 'postalCode':
        this.props.updatePostalCode(value)
      break
      case 'refineSearch':
        this.props.updateRefineSearch(value)
      break
    } 
  }  

  applySearch = (e) => {
    e.preventDefault()
    this.props.fetchRestaurants({
      url: `${config.apiEndpoint}/restaurants?city=${this.props.selectedCity}`, 
      refineSearch: this.props.refineSearch,
      postalCode: this.props.postalCode
    })
  }

  showListing = () => {
    const { restaurants, dataIsLoading } = this.props
    if(dataIsLoading) {
      return (
        <div className='loader'>Loading ...</div>
      )
    } else { 
      return restaurants.length ? 
        <DataListing restaurants={restaurants} /> 
      : 
        <div className='warning'><FaExclamationTriangle /> No restaurants matched your search criteria</div> 
    }
  }

  render () {
    const { selectedCity, refineSearch, postalCode, cities, restaurants, dataIsLoading } = this.props
   
    return (
      <main className='site-content'>
        <form>
          <div className="form-group">
            <label htmlFor='selectedCity'>City</label>
            <input 
              name='selectedCity'
              id='selectedCity'
              type='text'
              value={selectedCity} 
              onChange={this.onChangeHandler}
              list='dataListCities'
              title='City'
              placeholder='Enter City'
            />
            <datalist id="dataListCities">
              {cities.map((city, index) =>
                <option key={index} value={city} />
              )}      
            </datalist>            
          </div>
          <div className="form-group">
            <label htmlFor='refineSearch'>Address/name/area</label>
            <input 
              id='refineSearch'
              name='refineSearch'
              type='text'
              value={refineSearch} 
              onChange={this.onChangeHandler}
              title='Refine by name, address, or area'
              placeholder="Refine Search by name, address, or area"
            />          
          </div>
          <div className="form-group">
            <label htmlFor='postalCode'>Postal Code</label>
            <input 
              id='postalCode'
              name='postalCode'
              type='text'
              value={postalCode} 
              onChange={this.onChangeHandler}
              title='Search by Postal Code'
              placeholder="Search by postal Code"
            />          
          </div>         
          <div className='form-group'>
            <button id='applyBtn' onClick={this.applySearch}>Apply</button>  
          </div>     
        </form>
        {this.showListing()}
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataIsLoading: state.dataIsLoading,
    selectedCity: state.selectedCity,
    refineSearch: state.refineSearch,
    postalCode: state.postalCode,
    cities: state.cities,
    restaurants: state.restaurants
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCity: (city) => { dispatch(changeCity(city)) },
    updateRefineSearch: (val) => { dispatch(updateRefineSearch(val)) },
    updatePostalCode: (val) => { dispatch(updatePostalCode(val)) },
    fetchCities: (url) => { dispatch(fetchCities(url)) },
    fetchRestaurants: (url) => { dispatch(fetchRestaurants(url)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants)

import React, { Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import config from '../config'

class RestaurantDetail extends Component {
  state = {
    data: {}
  }

  goBack = (e) => {
    e.preventDefault()
    this.props.history.push('/')
  }

  async componentDidMount () {
    const name =  (new URLSearchParams(this.props.location.search)).get('name')
    // get the info
    try {
      const response = await axios.get(`${config.apiEndpoint}/restaurants?city=${this.props.selectedCity}&name=${name}`)
      if (response.status === 200) {
        this.setState({data: response.data.restaurants[0]})
      } else {
        console.error('Error loading data')
      }
    }
    catch(error){
      console.error(error)  
    }
  }

  displayRestaurantDetails = () => {
    const data = this.state.data
    return (
      <div className='restaurant-container'>
        <h1>Restaurant: {data.name}</h1>
        <div className='detail-group'>
          <div className='label'>Address</div>
          <div className='info'>{data.address}</div>
        </div>
        <div className='detail-group'>
          <div className='label'>Area</div>
          <div className='info'>{data.area}</div>
        </div>
        <div className='detail-group'>
          <div className='label'>City</div>
          <div className='info'>{data.city}</div>
        </div>
        <div className='detail-group'>
          <div className='label'>phone</div>
          <div className='info'>{data.phone}</div>
        </div>
        <div className='detail-group'>
          <div className='label'>website Reservation</div>
          <div className='info'>
            <a target="_blank" rel="noopener noreferrer" href={data.reserve_url}>{data.reserve_url}</a>
          </div>
        </div>
        <div className='button-container'>
          <button className='go-back-btn' onClick={this.goBack}>Go back</button>
        </div>         
      </div>
    )
  }

  render () {
    return (
      <main className='site-content'>
        {this.displayRestaurantDetails()}
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCity: state.selectedCity,
  }
}

export default connect(mapStateToProps)(RestaurantDetail)

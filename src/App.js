import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import './scss/style.scss'
import Navbar from './components/Navbar'
import Restaurants from './components/Restaurants'
import RestaurantDetail from './components/RestaurantDetail'
import Footer from './components/Footer'


class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='app'>
          <Navbar />
          <Route exact path='/' component={Restaurants} />
          <Route path='/detail:name' component={RestaurantDetail} />
          <Footer />
        </div>      
      </BrowserRouter>
    )
  }
}

export default App

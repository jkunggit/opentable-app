import React from 'react'
import { Link, withRouter } from 'react-router-dom'


const DataListing = ({ restaurants, history }) => {
  const loadDetail = (name) => {
    history.push(`/detail${name}`)
  }

  return (
    <table className='data-listing'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Area</th>
        </tr>
      </thead>
      <tbody>
        {restaurants.map((resturant, index) => {
          const { name, address, area } = resturant
          return (
            <tr key={index} onClick={() => { loadDetail(name) }}>
              <td>{name}</td>
              <td>{address}</td>
              <td>{area}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default withRouter(DataListing) // so we have access to the history

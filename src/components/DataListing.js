import React from 'react'

const DataListing = ({ restaurants, history }) => {
  const loadDetail = (name) => {
    history.push(`/detail?name=${name}`)
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

export default DataListing

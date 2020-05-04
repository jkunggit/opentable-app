import React from 'react';
import { FaUtensils } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className='nav-header'>
      <div className='nav-title'>
        <h1><FaUtensils />Restaurant Listing</h1>
      </div>
    </nav>
  )
}

export default Navbar

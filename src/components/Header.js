import React from 'react';
import { FaUtensils } from 'react-icons/fa';

const Header = () => {
  return (
    <header className='header-container'>
      <div className='header-title'>
        <FaUtensils />Restaurant Listing
      </div>
    </header>
  )
}

export default Header

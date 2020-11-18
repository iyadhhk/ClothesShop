import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { MdMoreHoriz } from 'react-icons/md';
import { IconContext } from 'react-icons';
import './ProductCard.css';

const ProductCard = ({ imgUrl }) => {
  return (
    <div className='card'>
      <div className='card__container'>
        <img src={imgUrl} alt='product' />
        <div className='card__menu'>
          <IconContext.Provider
            value={{ color: 'white', size: '1.4rem', className: 'global-class-name' }}>
            <div className='card__menu__link'>
              <span className='tooltip-content'>Full View</span>
              <MdMoreHoriz />
            </div>
          </IconContext.Provider>
          <IconContext.Provider
            value={{ color: 'white', size: '1.2rem', className: 'global-class-name' }}>
            <div className='card__menu__link'>
              <span className='tooltip-content'>To WishList</span>
              <FaHeart />
            </div>
          </IconContext.Provider>
        </div>
      </div>
      <div className='card__details'>
        <p>stars</p>
        <p>product name</p>
        <p>price</p>
        <button>add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;

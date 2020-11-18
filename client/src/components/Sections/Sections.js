import React from 'react';
import { Link } from 'react-router-dom';
import './Sections.css';
const Sections = () => {
  return (
    <div className='sections'>
      <div className='sections__menu sections__kids'>
        <div
          className='sections__img'
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/5693891/pexels-photo-5693891.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)',
          }}
        />
        <Link to='/kids'>
          <button className='sections__menu__btn'>kids</button>
        </Link>
      </div>
      <div className='sections__menu sections__hats'>
        <div
          className='sections__img'
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1878821/pexels-photo-1878821.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)',
          }}
        />
        <Link to='/hats'>
          <button className='sections__menu__btn'>hats</button>
        </Link>
      </div>
      <div className='sections__menu sections__shoes'>
        <div
          className='sections__img'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-1.2.1&auto=format&fit=crop&w=758&q=80)',
          }}
        />
        <Link to='/shoes'>
          <button className='sections__menu__btn'>shoes</button>
        </Link>
      </div>
      <div className='sections__menu sections__accessories'>
        <div
          className='sections__img'
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/908629/pexels-photo-908629.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)',
          }}
        />
        <Link to='/accessories'>
          <button className='sections__menu__btn'>accessories</button>
        </Link>
      </div>
      <div className='sections__menu sections__men'>
        <div
          className='sections__img'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)',
          }}
        />
        <Link to='/men'>
          <button className='sections__menu__btn'>men</button>
        </Link>
      </div>
      <div className='sections__menu sections__women'>
        <div
          className='sections__img'
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)',
          }}
        />
        <Link to='/women'>
          <button className='sections__menu__btn'>women</button>
        </Link>
      </div>
    </div>
  );
};

export default Sections;

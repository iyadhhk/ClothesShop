import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../features/authSlice';
import { ImSearch } from 'react-icons/im';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import { FaShoppingBag, FaHeart } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const handleLog = () => {
    dispatch(logout());
  };
  const userMenu = !isAuth ? (
    <Fragment>
      <Link to='/login'>
        <span>Sign In</span>
      </Link>
      <Link to='/signup'>
        <span>Register</span>
      </Link>
    </Fragment>
  ) : (
    <Fragment>
      <Link to='/profile'>
        <span>Profile</span>
      </Link>
      <Link to='/'>
        <span onClick={handleLog}>Sign out</span>
      </Link>
    </Fragment>
  );
  return (
    <div className='navbar'>
      <div className='navbar__nav'>
        <Link to='/'>
          <span className='navbar__nav__link'>Home</span>
        </Link>
        <Link to='/men'>
          <span className='navbar__nav__link'>Men</span>
        </Link>
        <Link to='/women'>
          <span className='navbar__nav__link'>Women</span>
        </Link>
        <Link to='/shoes'>
          <span className='navbar__nav__link'>Shoes</span>
        </Link>
        <Link to='/accessories'>
          <span className='navbar__nav__link'>Accessories</span>
        </Link>
      </div>
      <div className='navbar__user'>
        <div className='navbar__user__search'>
          <input className='navbar__user__searchInput' type='text' />

          <IconContext.Provider
            value={{ color: 'white', size: '1rem', className: 'global-class-name' }}>
            <div className='navbar__user__searchIcon'>
              <ImSearch />
            </div>
          </IconContext.Provider>
        </div>
        <div className='navbar__user__menu'>
          <div className='navbar__user__account'>
            {/* <span>Account</span> */}
            <IconContext.Provider
              value={{ color: 'white', size: '1.5rem', className: 'global-class-name' }}>
              <div className='navbar__nav__link'>
                <RiAccountPinCircleFill />
              </div>
            </IconContext.Provider>
            <div className='navbar__user__account__menu'>{userMenu}</div>
          </div>

          <Link to='/wishlist'>
            {/* <span className='navbar__nav__link'>WishList</span> */}
            <IconContext.Provider
              value={{ color: 'white', size: '1.2rem', className: 'global-class-name' }}>
              <div className='navbar__nav__link'>
                <FaHeart />
              </div>
            </IconContext.Provider>
          </Link>
          <Link to='/cart'>
            {/* <span className='navbar__nav__link'>Cart</span> */}
            <IconContext.Provider
              value={{ color: 'white', size: '1.2rem', className: 'global-class-name' }}>
              <div className='navbar__nav__link'>
                <FaShoppingBag />
              </div>
            </IconContext.Provider>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

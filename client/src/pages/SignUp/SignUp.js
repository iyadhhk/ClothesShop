import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register, initErrors } from '../../features/authSlice';

import { ImSpinner9 } from 'react-icons/im';
import { IconContext } from 'react-icons';
import './SignUp.css';

const SignUp = () => {
  const [values, setValues] = useState({
    email: '',
    username: '',
    password: '',
  });
  const { email, username, password } = values;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initErrors());
  }, [dispatch]);

  const { status, errors } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(register(values));
  };
  return (
    <div className='signup'>
      <div className='signup__section'>
        <div className='signup__container'>
          <h1>Sign Up</h1>
          <form>
            <div className='signup__form__group'>
              <h4>Username</h4>
              {errors && errors.data.filter((err) => err.param === 'username')[0] ? (
                <Fragment>
                  <input
                    type='text'
                    className='signup__container__form__input error__input'
                    name='username'
                    value={username}
                    onChange={handleChange}
                  />
                  <span>
                    {errors.data.filter((err) => err.param === 'username')[0].msg}
                  </span>
                </Fragment>
              ) : (
                <input
                  type='text'
                  className='signup__container__form__input valid__input'
                  name='username'
                  value={username}
                  onChange={handleChange}
                />
              )}
            </div>
            <div className='signup__form__group'>
              <h4>E-mail</h4>
              {errors && errors.data.filter((err) => err.param === 'email')[0] ? (
                <Fragment>
                  <input
                    type='text'
                    className='signup__container__form__input error__input'
                    name='email'
                    value={email}
                    onChange={handleChange}
                  />
                  <span>{errors.data.filter((err) => err.param === 'email')[0].msg}</span>
                </Fragment>
              ) : (
                <input
                  type='text'
                  className='signup__container__form__input valid__input'
                  name='email'
                  value={email}
                  onChange={handleChange}
                />
              )}
            </div>
            <div className='signup__form__group'>
              <h4>Password</h4>
              {errors && errors.data.filter((err) => err.param === 'password')[0] ? (
                <Fragment>
                  <input
                    type='text'
                    className='signup__container__form__input error__input'
                    name='password'
                    value={password}
                    onChange={handleChange}
                  />
                  <span>
                    {errors.data.filter((err) => err.param === 'password')[0].msg}
                  </span>
                </Fragment>
              ) : (
                <input
                  type='text'
                  className='signup__container__form__input valid__input'
                  name='password'
                  value={password}
                  onChange={handleChange}
                />
              )}
            </div>
            <button type='submit' className='signup__signInButton' onClick={handleClick}>
              {status === 'loading' ? (
                <IconContext.Provider value={{ className: 'spinner' }}>
                  <div>
                    <ImSpinner9 />
                  </div>
                </IconContext.Provider>
              ) : (
                <span>Sign up</span>
              )}
            </button>
          </form>
          <p>
            You have an account? <span className='signup__signInLink'>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

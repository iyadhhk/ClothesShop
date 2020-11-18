import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, initErrors } from '../../features/authSlice';

import { ImSpinner9 } from 'react-icons/im';
import { IconContext } from 'react-icons';
import './Login.css';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { email, password } = values;
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
    dispatch(login(values));
  };
  return (
    <div className='login'>
      <div className='login__section'>
        <div className='login__container'>
          <h1>Sign In</h1>
          <form>
            <div className='login__form__group'>
              <h4>E-mail</h4>
              {errors && errors.data.filter((err) => err.param === 'email')[0] ? (
                <Fragment>
                  <input
                    type='text'
                    className='login__container__form__input error__input'
                    name='email'
                    value={email}
                    onChange={handleChange}
                  />
                  <span>{errors.data.filter((err) => err.param === 'email')[0].msg}</span>
                </Fragment>
              ) : (
                <input
                  type='text'
                  className='login__container__form__input valid__input'
                  name='email'
                  value={email}
                  onChange={handleChange}
                />
              )}
            </div>
            <div className='login__form__group'>
              <h4>Password</h4>
              {errors && errors.data.filter((err) => err.param === 'password')[0] ? (
                <Fragment>
                  <input
                    type='text'
                    className='login__container__form__input error__input'
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
                  className='login__container__form__input valid__input'
                  name='password'
                  value={password}
                  onChange={handleChange}
                />
              )}
            </div>
            <button type='submit' className='login__signInButton' onClick={handleClick}>
              {status === 'loading' ? (
                <IconContext.Provider value={{ className: 'spinner' }}>
                  <div>
                    <ImSpinner9 />
                  </div>
                </IconContext.Provider>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
          <p>
            Don't have an account? <span className='login__signUpLink'>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

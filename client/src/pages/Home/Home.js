import React from 'react';
import './Home.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import Sections from '../../components/Sections/Sections';

const Home = () => {
  return (
    <div className='home'>
      <Sections />
      <div className='list'>
        <ProductCard imgUrl='https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=358&q=80' />
        <ProductCard imgUrl='https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80' />
        <ProductCard imgUrl='https://images.unsplash.com/photo-1514989940723-e8e51635b782?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' />
        <ProductCard imgUrl='https://images.unsplash.com/photo-1554735490-5974588cbc4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80' />
        <ProductCard imgUrl='https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=553&q=80' />
      </div>
    </div>
  );
};

export default Home;

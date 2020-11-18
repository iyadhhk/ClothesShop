import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './AddProduct.css';
import { addProduct } from '../../features/productSlice';

const AddProduct = () => {
  const [values, setValues] = useState({
    productName: '',
    price: 0,
    details: '',
    image: [],
    preview: [],
  });
  useEffect(() => {
    console.log('formdata', values);
  }, [values]);
  const dispatch = useDispatch();
  const { productName, price, details, image, preview } = values;
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const fileHandler = (e) => {
    const files = Object.values(e.target.files);
    console.log('logging files', e.target.files);
    console.log('logging files', files);
    setValues({
      ...values,
      image: [...e.target.files],
      preview: [...files.map((file) => URL.createObjectURL(file))],
    });
    files.map((file) => URL.revokeObjectURL(file));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('inside submit', values);
    const { productName, price, details, image, preview } = values;
    let formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price);
    // data.append('details', details);
    formData.append('image', image);
    formData.forEach((value, key) => {
      console.log('key,value', key, value);
    });
    dispatch(addProduct(formData));
  };
  return (
    <div className='addproduct'>
      <h1>add new product</h1>
      <div className='addproduct__form'>
        <form>
          <h5>Product name</h5>
          <input type='text' name='productName' onChange={onChange} />
          <h5>Price</h5>
          <input type='text' name='price' onChange={onChange} />
          <h5>Details</h5>
          <input type='text' name='details' onChange={onChange} />
          <h5>Image</h5>

          {/* <input
            className='addproduct__fileButton'
            type='file'
            name='image'
            onChange={fileHandler}
          /> */}
          {/* this is for multiple files upload */}
          <input
            className='addproduct__fileButton'
            type='file'
            name='image'
            onChange={fileHandler}
            multiple
          />

          <button type='submit' className='addproduct__submit' onClick={onSubmit}>
            Add
          </button>
        </form>
      </div>
      {preview.map((prev, i) => (
        <img key={i} className='addproduct__preview' src={prev} alt='d' />
      ))}
    </div>
  );
};

export default AddProduct;

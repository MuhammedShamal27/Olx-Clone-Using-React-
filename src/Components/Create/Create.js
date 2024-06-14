import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name,setName] = useState('');
  const [category,setCategory] =useState('');
  const [price,setPrice] = useState('');
  const [image,setImage] = useState('');

  const [nameError,setNameError] = useState('');
  const [categoryError,setCategoryError] = useState('');
  const [priceError,setPriceError] = useState('');
  const [imageError,setImageError] = useState('');

  const {firebase} =useContext(FirebaseContext)
  const {user} =useContext(AuthContext)

  const date =new Date()

  const navigate =useNavigate();

  const validateName = (name) =>{
    const regex = /^[a-zA-Z0-9\s]+(?: [a-zA-Z0-9]+)*$/;
    if (!name){
      return 'Name is required';
    }else if (!regex.test(name)){
      return 'Name can only contain alphabets and numbers';
    }else{
      return '';
    }
  };

  const validateCategory = (category) => {
    const regex = /^[a-zA-Z0-9\s]+(?: [a-zA-Z0-9]+)*$/;
    if (!category) {
      return 'Category is required';
    } else if (!regex.test(category)) {
      return 'Category can only contain alphabets and numbers';
    } else {
      return '';
    }
  };

  const validatePrice = (price)=>{
    if (!price){
      return 'price is required'
    }else if ( price <=0){
      return 'price should be greater than Zero'
    }else{
      return '';
    }
  };

  const validateImage = (image) => {
    if (!image) {
      return 'Image is required';
    } else {
      return '';
    }
  };

  const handleSubmit = (e)=>{

    e.preventDefault();

    const nameError = validateName(name);
    const categoryError = validateCategory(category);
    const priceError = validatePrice(price);
    const imageError = validateImage(image);

    setNameError(nameError);
    setCategoryError(categoryError);
    setPriceError(priceError);
    setImageError(imageError);

    if (!nameError && !categoryError && !priceError && !imageError){

      firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
        ref.getDownloadURL().then((url)=>{
          console.log(url)
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId:user.uid,
            createdAt:date.toDateString()
          })
          navigate('/')
        })
      })
    }
    };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            {nameError && <span className='error'>{nameError}</span>}
            <br/>
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            {categoryError && <span className="error">{categoryError}</span>}
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            
            <input 
              className="input"
              type="number"
              id="fname"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              name="Price" />
              <br />
              {priceError && <span className="error">{priceError}</span>}
            <br />
            
          <br />
          {image && <img alt="Posts" width="200px" height="200px" src={URL.createObjectURL(image)}></img>}
        
            <br />
            <input 
              onChange={(e)=>{
                setImage(e.target.files[0])
              }}
              type="file" />
              <br />
              {imageError && <span className="error">{imageError}</span>}
            <br />
            <button type='submit' className="uploadBtn">upload and Submit</button>
            </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState({
    name: '',
    price: '',
    actualPrice: '',
    description: '',
    category: '',
    stock: '',
    images: [],
    sizes: [],
    keyWords: []
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    if(name === 'keyWords'){
      setValue((prevData)=>({
        ...prevData,
        keyWords : value.split(',').map(word => word.trim())
      }))
    }else{
      setValue((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleFile = (e) => {
    setValue({
      ...value,
      images: e.target.files
    });
  };

  const handleCheck = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setValue((prevData) => ({
        ...prevData,
        sizes: [...prevData.sizes, value]
      }));
    } else {
      setValue((prevData) => ({
        ...prevData,  
        sizes: prevData.sizes.filter((item) => item !== value)
      }));
    }
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(value.name === '' || value.price === '' || value.actualPrice === '' || value.description === ''
      || value.images === ''|| value.category === '' || value.stock === ''
    ){
      toast.error('Fields should not be empty')
    }else if(value.stock < 1){
      toast.info('Please enter correct stock')
    }else if(value.price < 0 || value.actualPrice < 0){
      toast.info('Enter correct prices')
    }else if (value.price > value.actualPrice) {
      toast.info('Selling price is not greater than actual price');
    }
    else{
      const formData = new FormData()

      formData.append('name', value.name);
      formData.append('price', value.price);
      formData.append('actualPrice', value.actualPrice);
      formData.append('stock', value.stock);
      formData.append('sizes', value.sizes.join(','));
      formData.append('description', value.description);
      formData.append('category', value.category);
      formData.append('keyWords', value.keyWords.join(','));
      
      
  
      try {
        let response = await axios.post('http://localhost:5050/form',formData)

        toast.success('form submitted successfully');

        setValue({
          name: '',
          price: '',
          actualPrice: '',
          description: '',
          category: '',
          stock: '',
          images: [],
          sizes: [],
          keyWords: []
        });
      } catch (error) {
        toast.error('not submitted')
      }
    }
  }

  return (
    <div>
      <div className='product-form'>
        <div className='form'>
          <form onSubmit={handleSubmit}>
            <h2>Add Product</h2>
            <div className="inputFields">
              <div className='row'>
                <label><span>*</span> Product Name</label>
                <input type="text" name='name' value={value.name} onChange={handleInput} />
              </div>
              <div>
                <label><span>*</span> Description</label>
                <textarea type="text" name='description' value={value.description} onChange={handleInput} />
              </div>
              <div className='column'>
                <div>
                  <label><span>*</span> Product Actual Price</label>
                  <input type="number" name='actualPrice' value={value.actualPrice} onChange={handleInput} />
                </div>
                <div className='row'>
                  <label><span>*</span> Selling Price</label>
                  <input type="number" name='price' value={value.price} onChange={handleInput} />
                </div>
              </div>
              <div className="column">
                <div>
                  <label><span>*</span> Stock</label>
                  <input type="number" name='stock' value={value.stock} onChange={handleInput} />
                </div>
                <div>
                  <label><span>*</span>Category</label>
                  <select name="category" value={value.category} onChange={handleInput}>
                    <option value={''}>Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="home">Home</option>
                    <option value="clothing">Clothing</option>
                    <option value="beauty">Beauty</option>
                    <option value="fashion">Fashion</option>
                    <option value="interior">Interior</option>
                    <option value="furniture">Furniture</option>
                    <option value="kitchen">Kitchen</option>
                  </select>
                </div>
              </div>
              <div className='row'>
                <label><span>*</span> Add Images</label>
                <input type="file" name='images' onChange={handleFile} multiple />
              </div>
              <div className='row sizes'>
                <div>
                  <label>Available Sizes</label>
                </div>
                <div>
                  <input type="checkbox" value='s' onChange={handleCheck} />S
                  <input type="checkbox" value='m' onChange={handleCheck} />M
                  <input type="checkbox" value='l' onChange={handleCheck} />L
                  <input type="checkbox" value='xl' onChange={handleCheck} />XL
                  <input type="checkbox" value='xxl' onChange={handleCheck} />XXL
                </div>
              </div>
              <div className='row'>
                <label>Key Words</label>
                <input type="text" name='keyWords' value={value.keyWords} onChange={handleInput} />
                <p className='info'>Please Enter Seperated By coma</p>
              </div>
            </div>
            <div className="btn">
              <button type='submit'>ADD PRODUCT</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default App;

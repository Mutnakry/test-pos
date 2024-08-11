import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './component/Login';
import Register from './component/Register';
import Home from './page/Home';
import Category from './page/Category';
import { ToastContainer } from 'react-toastify'
import Customer from './page/Customer';
import Product from './page/Product'
import AddCategory from './page/AddCategory';
import UpdateCategory from './page/UpdateCategory';
import ShowProduct from './page/ShowProduct';
import Showprodcuttest from './page/Showprodcuttest';
import TableSale from './sale/TableSale';

import Paginate from './page/Paginate';
 import Invoice from './component/incide/Incoive';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/product" element={<Product />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/updatecategory/:id" element={<UpdateCategory />} />
          <Route path='/showproduct/:id' element={<ShowProduct/>}></Route>
          <Route path='/showproducttest' element={<Showprodcuttest/>}></Route>
          <Route path="/products/category/:categoryId" element={<ShowProduct />} />
          {/* test */}
          {/* <Route path="/sale/:categoryId" element={<TableSale />} /> */}


          <Route path="/tablesale" element={<TableSale />} />


          <Route path="/paginate" element={<Paginate />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>

  );
};

export default App;



{/* <ul>
{usertype === 'user' && <li><a id='home' href="#home">Home</a></li>}
{usertype === 'user' && <li><a id='news' href="#news">News</a></li>}
{usertype === 'admin' && <li><a id='contact' href="#contact">Contact</a></li>}
{usertype === 'admin' && <li><a id='about' href="#about">About</a></li>}
</ul> */}
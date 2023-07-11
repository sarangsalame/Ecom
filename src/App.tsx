import React from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import CardComp from './components/Card/CardComp';
import Register from './components/Register/Register';
import AddCategory from './components/AddCategory/AddCatergory';
import AddProducts from './components/Add Products/AddProducts'
import ProductDetailsPage from './components/Product/ProductsDetailsPage';
import ProductByCategory from './components/Product/ProductByCategory';
import { ToastContainer } from 'react-toastify';
import PlaceOrder from './pages/Customer/PlaceOrder';
import NoPageFound from './components/NoPageFound';
import Footer from './components/Footer/Footer';
import Users from './pages/Admin/Users';
import Orders from './pages/Admin/Orders';
import AllProductsAdmin from './pages/Admin/AllProductsAdmin';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/products_id/:id" element={<ProductDetailsPage/>} />
        <Route path="/admin_addCategory" element={<AddCategory/>} />
        <Route path="/admin_addProduct" element={<AddProducts/>} /> 
        <Route path="/admin_products" element={<AllProductsAdmin/>} />
        <Route path="/admin_users" element={<Users/>} />
        <Route path="/admin_orders" element={<Orders/>} />
        <Route path="/category" element={<ProductByCategory/>} />
        <Route path="/place_order" element={<PlaceOrder/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/card" element={<CardComp/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<NoPageFound/>} />
      </Routes>
      <Footer/>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  
  );
}

export default App;

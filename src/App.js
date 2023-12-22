
import './App.css';
import {  Navigate, Route,Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Nopage from './pages/nopage/Nopage';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import Allproducts from './pages/allproducts/Allproducts';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import MyState from './context/data/MyState';


function App() {
  return (

    <MyState>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allproducts" element={<Allproducts />} />
        <Route path="/order" element={
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        } />
     
        <Route path="/dashboard" element={
          <ProtectedRouteForAdmin>
            <Dashboard />
          </ProtectedRouteForAdmin>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productInfo/:id" element={<ProductInfo />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addProduct" element={
          <ProtectedRouteForAdmin>
            <AddProduct />
          </ProtectedRouteForAdmin>
        } />
        <Route path="/updateProduct" element={
          <ProtectedRouteForAdmin>
            <UpdateProduct />
          </ProtectedRouteForAdmin>
        }/>
      
        
        <Route path="/*" element={<Nopage/>} />
      </Routes>
      <ToastContainer />
    </MyState>
  
   
   
  );
}

export default App;

// users Protected Routes

export const ProtectedRoute = ({children}) =>{
  const user = localStorage.getItem("user");
  if(user){
    return children
  }
  else{
    return <Navigate to={'/login'} />
  }
}


// admin Protected Routes

export const ProtectedRouteForAdmin = ({children}) =>{
  const admin =  JSON.parse(localStorage.getItem('user'))
  console.log(admin.user.email);
  if(admin.user.email=== 'kumar1@gmail.com'){
    return children
  }
  else{
    return<Navigate to ='/login' />
  }
}




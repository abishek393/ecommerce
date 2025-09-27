import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { jwtDecode } from "jwt-decode";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/landing/Landing';
import Dashboard from "./adminDashboard/dashboard/dashboard";
import GetUsers from './adminDashboard/Users/getUsers/GetUsers';
import Order from './adminDashboard/order/order';
import { store } from './store/Store';
import {Provider } from "react-redux";
import Register from './pages/auth/register/Register';



function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setRole(decoded.role);

      }
      catch (error) {
        console.error("Invalid token", error);
        setRole(null)
      }
    }

  }, [])

  return (
    <>
      <div>
        <Provider store = {store}>
          <BrowserRouter>
            <Routes>
            
              <Route path='/' element={<Landing />} />
              <Route path='register' element={<Register/>}/>
              <Route path='login' element={<Login/>}/>
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/userList' element={<GetUsers />} />
              <Route path='/orderList' element={<Order />} />

            </Routes>
          </BrowserRouter>
        </Provider>


      </div>
    </>
  )
}

export default App

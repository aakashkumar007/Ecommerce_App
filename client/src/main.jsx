import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import "antd/dist/reset.css";
import { ToastContainer } from 'react-toastify';
import { AuthProvider, useAuth } from './context/auth.jsx';
import {CartProvider} from "./context/Cart.jsx"
import { SearchProvider } from './context/Search.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
<AuthProvider>
   <SearchProvider>
   <CartProvider>
    <ToastContainer
      position="top-center"
      autoClose={500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover={false}
      draggable
      theme="light"

    />
    <App />
   </CartProvider>
   </SearchProvider>
  </AuthProvider>
  

)

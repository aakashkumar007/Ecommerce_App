/* eslint-disable no-unused-vars */
import Layout from './components/layouts/Layout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import HomePage from './pages/HomePage'
import About from  './pages/About'
import Contact from "./pages/Contact";
import Signup from './pages/Signup'
import PageNotFound from './pages/PageNotFound'
import SignIn from './pages/SignIn'
import Dashboard from './user/Dashboard';
import PrivateRoute from './privateRoute/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import PrivateAdminRoute from './privateRoute/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import UpdateProduct from './pages/admin/UpdateProduct';
import CreateProduct from './pages/admin/CreateProduct';


function App() {
  return (
   <BrowserRouter>
   <Header/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/about' element={<About/>}/>

      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='user' element={<Dashboard/>}/>
      </Route>

      <Route path='/AdminDashboard' element={<PrivateAdminRoute/>}>
      <Route path='admin' element={<AdminDashboard/>}/>
      <Route path='admin/create-product' element={<CreateProduct/>}/>
      <Route path='admin/update-product/:slug' element={<UpdateProduct/>}/>
      </Route>

      <Route path='/signup' element={<Signup/>}/>
      <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    <Footer/>
   </BrowserRouter>
  )
}

export default App

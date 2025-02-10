
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import AdminLogin from './Components/adminLogin';
import UserHeader from './Components/UserHeader';
import AddBook from './Components/AddBook';
import './App.css'
import ViewBooks from './Components/ViewBooks';
import Books from './Components/Books';
import Favorite from './Components/Favorites';
import ProductDetails from './Components/ProductDetails';


const App = () =>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element= {<Register />} />
        <Route path ='/header' element = {<Header />} />
        <Route path ='/sidebar' element = {<Sidebar />} />
        <Route path ='/dashboard' element ={<Dashboard />} />
        <Route path='/adminLogin' element = {<AdminLogin />} />
        <Route path='/userheader' element = {<UserHeader/>}/>
        <Route path='/addbook' element = {<AddBook/>} />
        <Route path = '/viewbooks' element = {<ViewBooks/>}/>
        <Route path = '/books' element = {<Books/>}/>
        <Route path = '/favorite' element = {<Favorite/>}/>
        <Route path = '/productDetails/:id' element = {<ProductDetails/>}/>
       </Routes>
    </BrowserRouter>
  )
}
export default App

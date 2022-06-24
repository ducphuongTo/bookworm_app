import React, { Component } from "react";
import "../css/app.css";

import Home from "./pages/Home/Home";
import Header from "./Components/base/Header/Header";
import {Routes, Route,Link,BrowserRouter as Router} from 'react-router-dom'
import ShopPage from "./Components/base/ShopPage/ShopPage";
import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart"

function App() {
    return (
        <div className="App">
        <Header/>
         <Router>
            
            <Routes>
                <Route exact path='/' element={<Home/>} active></Route>
                <Route  path='/shop' element={<ShopPage/>}></Route>
                <Route  path='/about' element={<About/>}></Route>
                <Route  path='/about' element={<Cart/>}></Route>
            </Routes>
         </Router>
            
        </div>

    )
}
export default App;

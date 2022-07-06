import Home from "./pages/Home/Home";
import Header from "./Components/base/Header/Header";
import { Routes, Route } from "react-router-dom";
import ShopPage from "./pages/ShopPage/ShopPage";
import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";
import Detail from "./pages/Detail/Detail"
import "../css/app.css";
import { Login } from "./Components/base/Login/Login";
import { useState } from "react";
import axios from "axios";


axios.interceptors.request.use(function (config){
    const token = localStorage.getItem('auth_token')
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config
})

function App() {
    const [cartItems,setCartItems] = useState([])
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/books/:id" element={<Detail />}></Route>
                <Route path="/shop" element={<ShopPage />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/cart" element={<Cart cartItems={cartItems} />}></Route>
                {/* <Route path="/login" element={<Login/>}></Route> */}
            </Routes>
        </div>
    );
}
export default App;

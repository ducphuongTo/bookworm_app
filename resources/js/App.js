import Home from "./pages/Home/Home";
import Header from "./Components/base/Header/Header";
import { Routes, Route } from "react-router-dom";
import ShopPage from "./pages/ShopPage/ShopPage";
import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";
import Detail from "./pages/Detail/Detail"
import "../css/app.css";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/books/:id" element={<Detail />}></Route>
                <Route path="/shop" element={<ShopPage />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
            </Routes>
        </div>
    );
}
export default App;

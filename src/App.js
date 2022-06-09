import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
//import Products from "./pages/ProductList"

import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
// // import Announcement from "./components/Announcement";
// // import Navbar from "./components/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  //Redirect
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";


 
const App = () => {

  const user = useSelector((state) => state.user.currentUser)

  return <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products/:category" element={<ProductList />}/>
                        <Route path="/product/:id" element={<Product/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/success" element={<Success/>}/>
                        <Route path="/login" element={ user ? <Navigate to={"/"} /> : <Login/>}/>
                        <Route path="/register" element={ user ? <Navigate to={"/"} /> : <Register/>}/>
                    </Routes>
            </BrowserRouter>

};





export default App;
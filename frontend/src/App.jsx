import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Contact from './pages/Contacts/Contact';

import Signup from "./pages/Auths/Signup";
import Login from "./pages/Auths/Login";


function App() {
 

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup/>}></Route>
          <Route path='/products' element={<Products />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      {/* <h1>Hello World..!</h1> */}
    </>
  );
}

export default App;

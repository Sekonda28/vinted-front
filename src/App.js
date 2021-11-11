import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {


  return (
    <Router>
          <Header />
      <Routes>
      <Route path="/offer/:id" element={<Offer />}></Route>
      <Route path= "/signup" element = {<Signup />}></Route>
      <Route path= "/login" element = {<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        
      </Routes>
    </Router>
  );
}

export default App;

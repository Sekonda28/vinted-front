import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";

function App() {


  return (
    <Router>
          <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/offer/:id" element={<Offer />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

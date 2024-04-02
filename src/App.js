import { Route, Routes } from "react-router-dom"
import Media from "./pages/media"
import Home from "./pages/home"
import Donate from "./pages/donate";
import Login from "./pages/login";


function App() {

  

  return (
    
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/media" element={<Media/>}/>
            <Route path="/donate" element={<Donate/>}/>
            <Route path="/login" element={<Login/>}/>
          </Routes>

  );
}

export default App;

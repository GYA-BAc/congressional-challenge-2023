import { Route, Routes } from "react-router-dom"
import Media from "./pages/media"
import Home from "./pages/home"
import Donate from "./pages/donate";


function App() {

  

  return (
    
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/media" element={<Media/>}/>
            <Route path="/donate" element={<Donate/>}/>
          </Routes>

  );
}

export default App;

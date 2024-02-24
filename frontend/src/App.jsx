import "./App.css";
import { Route, Routes } from "react-router-dom";
import Index from "./components/Customer/Routes/Index"
import VNPayDemo from "./data/VNPayDemo";
import Admin from "./components/Admin"
import RouteShop from "./components/Shop/Route/RouteShop";
import Editor from "./components/Shop/Product/Editor";

function App() {
  return (
    <>
    <Routes>
      <Route path="/shop/*" element={<RouteShop/>} />
      <Route path="/*" element={<Index/>}/>
      <Route path="/test" element={<VNPayDemo/>}/>
      <Route path="/admin/*" element={<Admin/>}/>
      <Route path="/test1" element={<Editor/>}/>
    </Routes>
    </>
    
  );
}

export default App;

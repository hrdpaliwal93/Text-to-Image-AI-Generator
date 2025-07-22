import { Routes, Route } from "react-router-dom"
import Buycredit from "./pages/Buycredit"
import Home from "./pages/Home"
import Result from "./pages/Result"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Login from "./components/Login"

function App() {


  return <>
 <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
  
    <Navbar />
    <Login />
 
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Buy" element={<Buycredit />} />
    <Route path="/Result" element={<Result/>} />

    
 </Routes>
 <Footer />

 </div>

   
    </>
  
}

export default App

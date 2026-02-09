import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {Route, Routes} from "react-router";
import Home from "./scenes/Home";
import Contact from "./scenes/Contact";
import Posts from "./scenes/Posts";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wpisy" element={<Posts />} />
        <Route path="/kontakt" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App

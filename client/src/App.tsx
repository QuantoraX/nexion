import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contactus from "./pages/Contactus";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <LenisScroll />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contactus />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

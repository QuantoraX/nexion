import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contactus from "./pages/Contactus";
import Portfolio from "./pages/Portfolio";
import PortfolioDetails from "./pages/PortfolioDetails";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";

// Admin Imports
import AdminLayout from "./admin/layout";
import Login from "./admin/pages/login";
import Dashboard from "./admin/dashbord";
import ContactAdmin from "./admin/pages/contact";
import TestimonialsAdmin from "./admin/pages/textimonials";
import AddBlogs from "./admin/pages/addblogs";
import AddPortfolio from "./admin/pages/addprotofile";

import { Chatbot } from "./components/chatbot";
import { WhatsAppButton } from "./components/whatsapp-button";

function FrontendLayout() {
  return (
    <>
      <LenisScroll />
      <Navbar />
      <Outlet />
      <WhatsAppButton />
      <Chatbot />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Frontend Public Pages */}
        <Route element={<FrontendLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<PortfolioDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
        </Route>

        {/* Secret Admin Login Route */}
        <Route path="/cms_dash" element={<Login />} />

        {/* Protected Dashboard Admin Space */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="contact" element={<ContactAdmin />} />
          <Route path="testimonials" element={<TestimonialsAdmin />} />
          <Route path="blogs" element={<AddBlogs />} />
          <Route path="portfolio" element={<AddPortfolio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

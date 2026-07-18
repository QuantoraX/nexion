import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer"
import LenisScroll from "./components/lenis-scroll"
import Home from "./pages/Home"

function App() {

  return (
    <>
      <LenisScroll />
      <Navbar />
      <Home />
      <Footer />
    </>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import PetsPage from "./pages/PetsPage"
import AdoptPage from "./pages/AdoptPage"
import LostFoundPage from "./pages/LostFoundPage"
import ContactPage from "./pages/ContactPage"
import AboutPage from "./pages/AboutPage"

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pets" element={<PetsPage />} />
            <Route path="/adopt" element={<AdoptPage />} />
            <Route path="/lost-found" element={<LostFoundPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App


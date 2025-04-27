import { Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from '@/components/theme-provider'
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import PetsPage from "./pages/PetsPage"
import AdoptPage from "./pages/AdoptPage"
import LostFoundPage from "./pages/LostFoundPage"
import ContactPage from "./pages/ContactPage"
import AboutPage from "./pages/AboutPage"
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn');

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/adopt" element={<AdoptPage />} />
          <Route path="/lost-found" element={<LostFoundPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={
            isAdminLoggedIn
              ? <AdminDashboard />
              : <Navigate to="/admin/login" replace />
          } />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App;

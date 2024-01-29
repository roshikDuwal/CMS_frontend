import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Loader from "./components/shared/Loader"
import Navbar from "./components/ui/navbar/Navbar"
import NoNavbar from "./utils/NoNavbar"
import ProtectedRoute from "./utils/ProtectedRoute"
import AdminService from "./pages/admin/AdminService"


const Home = lazy(() => import("./pages/home/Home"))
const About = lazy(() => import("./pages/about/About"))
const Contact = lazy(() => import("./pages/contact/Contact"))
const Service = lazy(() => import("./pages/service/Service"))
const SingleService = lazy(() => import("./pages/service/SingleService"))
const Error = lazy(() => import("./pages/error/Error"))
const Footer = lazy(() => import("./components/ui/footer/Footer"))

//Auth
const Login = lazy(() => import("./pages/auth/Login"))
const Register = lazy(() => import("./pages/auth/Register"))
const Logout = lazy(() => import("./pages/auth/Logout"))

//Admin
const AdminLayout = lazy(() => import("./components/layouts/AdminLayout"))
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"))
const AdminContacts = lazy(() => import("./pages/admin/AdminContacts"))

const App = () => {

  return (
    <Router>

      <NoNavbar>
        <Navbar />
      </NoNavbar>

      <Suspense fallback={<Loader />}>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/service/:id" element={<ProtectedRoute><SingleService /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute>
            <Contact />
          </ProtectedRoute>} />


          {/* Admin  */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} >
            <Route path="users" element={<ProtectedRoute> <AdminUsers /></ProtectedRoute>} />
            <Route path="contacts" element={<ProtectedRoute> <AdminContacts /></ProtectedRoute>} />
            <Route path="services" element={<ProtectedRoute> <AdminService /></ProtectedRoute>} />
          </Route>

          {/* Auth  */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Error  */}
          <Route path="*" element={<Error />} />

        </Routes>
      </Suspense>

      <NoNavbar>
        <Footer />
      </NoNavbar>

    </Router>
  )
}

export default App
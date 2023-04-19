import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/auth/login.page"
import Dashboard from "./pages/dashboard.page"
import User from "./pages/user.page"
import RentedVehicles from './pages/rented-vehicles.page'
import Settings from './pages/settings.page'
import SalesAndPayments from './pages/sales-and-payments.page'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/sales-and-payments' element={<SalesAndPayments />} />
        <Route path='/users' element={<User />} />
        <Route path='/rented-cars' element={<RentedVehicles />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </Router>
  )
}
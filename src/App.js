import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/auth/login.page"
import Dashboard from "./pages/dashboard"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  )
}
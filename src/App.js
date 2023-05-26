import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/login.page'
import Dashboard from './pages/dashboard.page'
import User from './pages/user/user.page'
import RentedVehicles from './pages/registered-vehicles/rengistered-vehicles.page'
import Settings from './pages/settings/settings.page'
import SalesAndPayments from './pages/sales-and-payments/sales-and-payments.page'
import AddVehicle from './pages/registered-vehicles/add-vehicle.page'
import Invoicing from './pages/sales-and-payments/sub-menu/invoicing.page'
import Transactions from './pages/transactions/transactions.page'
import UserProfile from './pages/user/user-profile.page'
import RegisteredVehicleProfile from './pages/registered-vehicles/registered-vehicle-profile.page'
import AddCard from './pages/transactions/add-card.component'
import ProtectedRoutes from './components/private-routes.component'
import CreateInvoice from './pages/sales-and-payments/sub-menu/create-invoice.page'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Expense from './pages/expense/expense.page'
import AddExpense from './pages/expense/add-expense.page'
import AddUser from './pages/user/add-user.page'
import Vendors from './pages/vendors/vendors.page'

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sales-and-payments" element={<SalesAndPayments />} />
            <Route path="/users" element={<User />} />
            <Route path="/registered-vehicles" element={<RentedVehicles />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/add-vehicle" element={<AddVehicle />} />
            <Route path="/invoicing" element={<Invoicing />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/user-profile/:id" element={<UserProfile />} />
            <Route
              path="/vehicle-profile/:id"
              element={<RegisteredVehicleProfile />}
            />
            <Route path="/add-card" element={<AddCard />} />
            <Route path="/create-invoice" element={<CreateInvoice />} />
            <Route path="/expenses" element={<Expense />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/vendors" element={<Vendors />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={1}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </>
  )
}

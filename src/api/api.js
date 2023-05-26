const BASE_URL = 'https://xpress-rental.onrender.com'
// const BASE_URL = 'http://localhost:8001'
const API = {
  LOGIN: `${BASE_URL}/auth/login`,
  GET_USER_DETAILS: `${BASE_URL}/auth/get-profile`,
  CHANGE_PASSWORD: `${BASE_URL}/auth/change-password`,
  EDIT_PROFILE: `${BASE_URL}/auth/edit-profile`,

  CREATE_INVOICE: `${BASE_URL}/invoice/create`,
  GET_INVOICES: `${BASE_URL}/invoices`,
  DELETE_INVOICE: `${BASE_URL}/invoices/`,
  GET_INVOICE_TOTAL: `${BASE_URL}/invoices/total`,
  GET_MONTHLY_INFLOW: `${BASE_URL}/invoices/monthly-stats`,

  ADD_VEHICLE: `${BASE_URL}/cars/add`,
  GET_VEHICLES: `${BASE_URL}/cars`,
  GET_TOTAL_VEHICLES_COUNT: `${BASE_URL}/cars-total`,

  ADD_EXPENSE: `${BASE_URL}/expenses/add`,
  DELETE_EXPENSE: `${BASE_URL}/expenses/`,
  UPDATE_EXPENSE: `${BASE_URL}/expenses/`,
  GET_EXPENSES: `${BASE_URL}/expenses`,
  GET_EXPENSES_TOTAL: `${BASE_URL}/expense-total`,
  GET_RECENT_EXPENSES: `${BASE_URL}/recent-expenses`,
  GET_MONTHLY_OUTFLOW: `${BASE_URL}/expenses/monthly-outflow`,

  DELETE_VEHICLE_PROFILE: `${BASE_URL}/cars/`,
  GET_VEHICLE_DATA: `${BASE_URL}/cars/`,
  GET_RECENT_CARS: `${BASE_URL}/recent-cars`,

  GET_RENTING_HISTORY: `${BASE_URL}/invoices/history/`,

  GET_CUSTOMERS: `${BASE_URL}/customers/`,
  CREATE_CUSTOMER: `${BASE_URL}/customers/create`,
  DELETE_CUSTOMER_PROFILE: `${BASE_URL}/customers`,
  DEACTIVATE_PROFILE: `${BASE_URL}/deactivate-customer/`,

  CREATE_VENDOR: `${BASE_URL}/vendor/create`,
  GET_ALL_VENDORS: `${BASE_URL}/vendors`,
}

export default API

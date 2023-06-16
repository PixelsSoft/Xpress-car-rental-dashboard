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
  CREATE_RECURRING_INVOICE: `${BASE_URL}/recurring-invoices/create`,
  GET_RECURRING_INVOICES: `${BASE_URL}/recurring-invoices`,
  GET_SINGLE_INVOICE_DETAILS: `${BASE_URL}/invoices/details/`,

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
  RECORD_EXPENSE: `${BASE_URL}/expenses/record`,

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
  DELETE_VENDOR: `${BASE_URL}/vendors/delete`,

  ADD_PAYMENT_METHOD: `${BASE_URL}/payment-method/create`,
  GET_ALL_PAYMENT_METHODS: `${BASE_URL}/payment-methods`,

  ADD_PAYMENT_ACCOUNT: `${BASE_URL}/payment-account/create`,
  GET_PAYMENT_ACCOUNTS: `${BASE_URL}/payment-accounts`,

  GET_TRANSACTIONS: `${BASE_URL}/transaction-history`,
  CREATE_TRANSACTION: `${BASE_URL}/transaction-history/create`,
}

export default API

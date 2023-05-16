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

    ADD_VEHICLE: `${BASE_URL}/cars/add`,
    GET_VEHICLES: `${BASE_URL}/cars`,
    GET_TOTAL_VEHICLES_COUNT: `${BASE_URL}/cars-total`,

    ADD_EXPENSE: `${BASE_URL}/expenses/add`,
    DELETE_EXPENSE: `${BASE_URL}/expenses/`,
    UPDATE_EXPENSE: `${BASE_URL}/expenses/`,
    GET_EXPENSES: `${BASE_URL}/expenses`,
    GET_EXPENSES_TOTAL: `${BASE_URL}/expense-total`,

    DELETE_VEHICLE_PROFILE: `${BASE_URL}/cars/`,
    GET_VEHICLE_DATA: `${BASE_URL}/cars/`,

    GET_RENTING_HISTORY: `${BASE_URL}/invoices/history/`,
}

export default API
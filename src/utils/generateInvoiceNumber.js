import {v4 as uuidv4} from "uuid";

function generateInvoiceNumber() {
    const id = uuidv4()
    const invoiceNumber = id.slice(0, 8)
    return 'INV-' + invoiceNumber
}

export default generateInvoiceNumber
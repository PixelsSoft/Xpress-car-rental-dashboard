import { toast } from 'react-toastify'

export const successNotify = (mesg) => {
  toast.success(mesg, {
    position: 'bottom-center',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'light',
  })
}

export const errorNotify = (mesg) => {
  toast.error(mesg, {
    position: 'bottom-center',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'light',
  })
}

import { JSX } from 'react';
import { toast } from 'react-toastify';
const STANDART_ERR_MSG = "Some error occurred";


export const notify = (message: string | JSX.Element | null, type: string) => {
  toast.dismiss();
  if (message === null) [(message = STANDART_ERR_MSG)];
  if (type === 'error') {
    toast.error(message, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  } else if (type === 'success') {
    toast.success(message, {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
};

export const handleAPIError = (data: any) => {
  notify(data.msg || data?.data.msg || STANDART_ERR_MSG, 'error');
};
export const handleAPISuccess = (data: any) => {
  notify(data.msg || data?.data.msg || '', 'success');
};

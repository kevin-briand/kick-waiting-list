import { useContext } from 'react';
import ToastContext from '../components/toast/context/ToastContext';

const useToast = () => useContext(ToastContext);

export default useToast;

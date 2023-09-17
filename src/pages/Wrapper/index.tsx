import { Outlet } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Wrapper() {
  return (
    <>
      <Outlet />
      <ToastContainer
        position='top-right'
        autoClose={4000}
        hideProgressBar={false}
        limit={3}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        style={{ marginTop: '1rem' }}
      />
    </>
  );
}

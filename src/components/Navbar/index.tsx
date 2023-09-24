/* eslint-disable react/function-component-definition */
// import {
//     Container
// } from './styles';

const Navbar: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <>
    {children}
    <nav
      style={{
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        color: 'black',
        width: '100vw',
        height: '10vh',
      }}
    >
      <h1>helo</h1>
    </nav>
  </>
);

export { Navbar };

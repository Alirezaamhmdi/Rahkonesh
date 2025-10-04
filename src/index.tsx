import { BrowserRouter, Router } from 'react-router-dom';
import App from './App';
import './assets/font/Estedad-Medium.ttf'
import './index.css'
const Main = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
export default Main ;
import { BrowserRouter, Router } from 'react-router-dom';
import App from './App';
import './index.css'
const Main = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
export default Main;
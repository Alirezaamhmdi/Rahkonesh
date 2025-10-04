import ReactDOM from 'react-dom/client';
import  EnvContext  from './context/envContext';
import {  logPageView } from './analytics/analytics';
import Main from './index';
import './styles.css';
import './index.css'
import './assets/styles/font-style.css'

import './assets/styles/styles.css'

// initGA();

logPageView();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const env = {
  DOMAIN_URL:'http://teamyer.com',
  BACE_URL:'https://teamyer-backend.liara.run',
  CLUDE_URL:'https://image-timyer.s3.ir-thr-at1.arvanstorage.ir'

  // DOMAIN_URL:'http://localhost:3000',
  // BACE_URL:'http://localhost:4000',
  // CLUDE_URL:'https://image-timyer.s3.ir-thr-at1.arvanstorage.ir'
}


root.render(
    <EnvContext.Provider value={env}>
      <Main /> 
    </EnvContext.Provider>
);
// reportWebVitals();

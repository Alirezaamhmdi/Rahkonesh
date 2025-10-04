import ReactGA from 'react-ga4';

const GA_TRACKING_ID = 'G-ZDST88XCE3';

export const initGA : () => void = () => {
  ReactGA.initialize(GA_TRACKING_ID);
};


export const logPageView : () => void  = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

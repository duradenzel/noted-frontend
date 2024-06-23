import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="dev-z8i5zkg0.eu.auth0.com"
    clientId="eSuGXdnb1av8CbLRdywfMYxCpVjxjuxy"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "htpps://noted/api",
    }}
    useRefreshTokens
    cacheLocation="localstorage"
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
);

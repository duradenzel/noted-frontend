import './App.css';
import CampaignDetailsPage from './components/pages/CampaignDetailsPage';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
<<<<<<< HEAD
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
=======
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
>>>>>>> 54feba7 (more eslint fixing)

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/campaigns/:campaignId"
            element={<CampaignDetailsPage />}
          />

          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

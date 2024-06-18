import './App.css';
import ApiPage from './components/pages/ApiPage';
import CampaignDetailsPage from './components/pages/CampaignDetailsPage';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
//import { HubConnectionBuilder } from '@microsoft/signalr';

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();
  console.log(user);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  // const connection = new HubConnectionBuilder()
  // .withUrl('http://localhost:5170/NotificationHub') 
  // .build();
  
  // connection.start()
  // .then(() => console.log('Connected to SignalR hub'))
  // .catch(err => console.error('Error connecting to hub:', err));
  
  // connection.on('ReceiveMessage', message => {
  //     console.log('Received message:', message);
      
  // });

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
          <Route path="/apipage" element={<ApiPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

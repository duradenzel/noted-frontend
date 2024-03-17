
import './App.css'
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import ResourceTableTabs from './components/ResourceTableTabs';
import Sidebar from './components/Sidebar';
import { SidebarLayout } from './components/SidebarLayout';
import { BrowserRouter, Route, BrowserRouter as Router, Routes} from 'react-router-dom';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

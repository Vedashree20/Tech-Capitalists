import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AboutUs from './Pages/AboutUs';
import SideBar from './Components/SideBar';
import OptionChain from './Pages/OptionChain';
import Dashboard from './Pages/Dashboard';
import MarketNews from './Pages/MarketNews';
import Notifications from './Pages/Notifications';
import Settings from './Pages/Settings';


function App() {
  return (
    <div className="App">
      <div className='container-'>
        <SideBar />
        <Router>
        <Routes>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/optionchain' element={<OptionChain />}></Route>
          <Route path='/marketnews' element={<MarketNews />}></Route>
          <Route path='/notifications' element={<Notifications />}></Route>
          <Route path='/aboutus' element={<AboutUs />}></Route>
          <Route path='/settings' element={<Settings />}></Route>
          
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;

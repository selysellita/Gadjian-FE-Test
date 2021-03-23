import './App.css';
import SideNavs from './components/SideNav';
import Home from './pages/Home';
import Personnels from './pages/Personnel';
import Attendance from './pages/Attendance';
import HeaderUI from './components/Header';
import SideNavMobile from './components/SideNavMobile';
import { Switch, Route } from 'react-router-dom';

function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh' }}>
      {/* mobile sidebar */}
      <SideNavMobile />
        
      {/* Header */}
      <HeaderUI />

      <div style= {{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>

        {/* SideBar */}
        <div className="sidenav-container">
          <SideNavs />
        </div>
        
        {/* Content */}
        <div style={{ flex: 3, height: '100%', backgroundColor: '#f9f9f9' }} >
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/personnel' exact component={Personnels} />
            <Route path='/attendance' exact component={Attendance} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;

import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import Register from './components/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = '/' Component={Login} />
        <Route exact path = '/login' Component={Login} />
        <Route exact path = '/register-now' Component={Register} />
        <Route exact path = '/dashboard' Component={Dashboard} />
        <Route exact path = '/map/:id' Component={MapView} />
      </Routes>
  </BrowserRouter>
  )
}
export default App;
//
//
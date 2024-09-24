import { Routes, Route } from 'react-router-dom';
import './App.css'

// Pages
import { Home } from './pages/Home'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Storage } from './pages/Storage'

// Components
import { UserProvider } from './components/UserContext';
import { Navbar } from './components/Navbar';
import { PageNotFound } from './components/PageNotFound';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <div className='content'>
          <Routes>
            <Route path='/' Component={Home} />
            <Route path='/signup' Component={SignUp} />
            <Route path='/signin' Component={SignIn} />
            <Route path='/storage' Component={Storage} />
            {/* <Route path='*' Component={PageNotFound} /> */}
          </Routes>
        </div>

        <Navbar />
      </div>
    </UserProvider>
  );
}

export default App;

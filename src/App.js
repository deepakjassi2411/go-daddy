import './App.css';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router';
import RepoDetails from './components/RepoDetails/RepoDetails';
import NotFound from './components/NotFound/NotFound';

const NavBar = () => {
  return (
    <header className='navbar'>
      <div className='navbar-item'>
        <img src="godaddy-logo.png" width="150px" alt="Not found" />
      </div>
      <div className='navbar-item' onClick={() => {
        window.location.href = '/'
      }}>Repos</div>
    </header>
  )

};

function App() {
  return (
    <div className="App">
      <NavBar />
      <main className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/repo-detail/:id" element={<RepoDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

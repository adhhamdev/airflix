import { useEffect } from 'react';
import { NavLink, Outlet, useNavigation } from 'react-router-dom';
import './App.css';
import logo from './images/cover.png';

const App = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const authorize = async () => {
      let storedSession = JSON.parse(localStorage.getItem('guestSession'));
      if (storedSession == null) {
        const createGuestSession = await (
          await fetch(
            'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=08a7337c36b62d4a8a9dfafd26b3afb6'
          )
        ).json();
        storedSession = createGuestSession;
        localStorage.setItem(
          'guestSession',
          JSON.stringify(createGuestSession)
        );
      }
    };
    authorize();
  }, []);

  return (
    <div className='App'>
      {(navigation.state == 'submitting' || navigation.state == 'loading') && (
        <div className='loader'>
          <img src={logo} alt='Airflix Logo' />
        </div>
      )}
      <header>
        <a href='/'>
          <img className='logo' src={logo} alt='Airflix logo' role='banner' />
        </a>
        <nav>
          <NavLink to='/' role='button' data-tooltip='HOME'>
            <i className='fas fa-compass'></i>
          </NavLink>
          <NavLink to='search' role='button' data-tooltip='SEARCH'>
            <i className='fas fa-search'></i>
          </NavLink>
          <NavLink to='rated' role='button' data-tooltip='RATED'>
            <i className='fas fa-star'></i>
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default App;

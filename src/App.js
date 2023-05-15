import logo from "./images/cover.png";
import "./App.css";
import { Outlet, NavLink, useNavigation } from "react-router-dom";
import { useEffect } from "react";

const App = () => {

  useEffect(() => {
    const authorize = async () => {
      let storedSession = JSON.parse(localStorage.getItem('guestSession'));
      if(storedSession == null) {
        const createGuestSession = await (await fetch('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=08a7337c36b62d4a8a9dfafd26b3afb6')).json(); 
        storedSession = createGuestSession;
        localStorage.setItem('guestSession', JSON.stringify(createGuestSession))
      }
    }
    authorize();
  }, [])

  const navigation = useNavigation();
  const setLinkState = ({isActive, isPending}) => {
    return isActive ? "active" : isPending ? "pending" : "";
  }
  
  return (
    <div className="App">
      {(navigation.state == 'submitting' || navigation.state == 'loading') && <div className="loader"></div>}
      <header>
        <a href="/">
          <img className="logo" src={logo} alt="Airflix logo" role="banner" />
        </a>
        <div className="userActions">
          <nav>
            <NavLink className={setLinkState} to="/" role="button" data-tooltip="HOME">
              <i className="fas fa-compass"></i>
            </NavLink>
            <NavLink className={setLinkState} to="search" role="button" data-tooltip="SEARCH">
              <i className="fas fa-search"></i>
            </NavLink>
            <NavLink className={setLinkState} to="rated" role="button" data-tooltip="RATED">
              <i className="fas fa-star"></i>
            </NavLink>
          </nav>
          <i className="fas fa-life-ring support" title="SUPPORT"></i>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <small>&copy;Copyright {new Date().getFullYear()} • built by Adhham Dev with ❤️ • All Rights Reserved</small>
      </footer>
      <div className="darkCorner"></div>
    </div>
  );
}
export default App;
